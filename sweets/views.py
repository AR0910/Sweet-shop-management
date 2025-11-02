from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Sweet
from .serializers import SweetSerializer, UserSerializer
from .permissions import IsAdminUser


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    """
    Returns user info including is_staff flag.
    """
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
    })


# Register user
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# List and create sweets
class SweetListCreateView(generics.ListCreateAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)


# Retrieve / update / delete sweets
class SweetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        if not self.request.user.is_staff:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only admin users can delete sweets.")
        instance.delete()


# Search sweets
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def search_sweets(request):
    q = request.query_params.get('q', '')
    category = request.query_params.get('category')
    min_price = request.query_params.get('min_price')
    max_price = request.query_params.get('max_price')

    queryset = Sweet.objects.all()
    if q:
        queryset = queryset.filter(
            Q(name__icontains=q) | Q(description__icontains=q)
        )
    if category:
        queryset = queryset.filter(category__iexact=category)
    if min_price:
        try:
            queryset = queryset.filter(price__gte=float(min_price))
        except ValueError:
            pass
    if max_price:
        try:
            queryset = queryset.filter(price__lte=float(max_price))
        except ValueError:
            pass

    serializer = SweetSerializer(queryset, many=True)
    return Response(serializer.data)


# Purchase a sweet
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def purchase_sweet(request, pk):
    sweet = get_object_or_404(Sweet, pk=pk)
    amount = int(request.data.get('amount', 1))
    if amount <= 0:
        return Response({"detail": "Amount must be positive."}, status=status.HTTP_400_BAD_REQUEST)
    if sweet.quantity < amount:
        return Response({"detail": "Insufficient stock."}, status=status.HTTP_400_BAD_REQUEST)
    sweet.purchase(amount)
    return Response({"detail": "Purchase successful.", "quantity": sweet.quantity}, status=status.HTTP_200_OK)


# Restock sweets (admin only)
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, IsAdminUser])
def restock_sweet(request, pk):
    sweet = get_object_or_404(Sweet, pk=pk)
    amount = int(request.data.get('amount', 1))
    if amount <= 0:
        return Response({"detail": "Amount must be positive."}, status=status.HTTP_400_BAD_REQUEST)
    sweet.restock(amount)
    return Response({"detail": "Restocked successfully.", "quantity": sweet.quantity}, status=status.HTTP_200_OK)
