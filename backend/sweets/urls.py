from django.urls import path
from .views import (
    RegisterView, SweetListCreateView, SweetDetailView,
    search_sweets, purchase_sweet, restock_sweet, get_user_info
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('auth/me/', get_user_info, name='user_info'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('sweets/', SweetListCreateView.as_view(), name='sweet_list_create'),
    path('sweets/<int:pk>/', SweetDetailView.as_view(), name='sweet_detail'),
    path('sweets/search/', search_sweets, name='sweet_search'),

    path('sweets/<int:pk>/purchase/', purchase_sweet, name='sweet_purchase'),
    path('sweets/<int:pk>/restock/', restock_sweet, name='sweet_restock'),
]
