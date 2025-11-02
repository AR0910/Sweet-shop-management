# sweetshop_api/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({"message": "Sweet Shop API. See /api/"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root),
    path('api/', include('sweets.urls')),
]
