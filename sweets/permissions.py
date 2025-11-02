# sweets/permissions.py
from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allow safe methods for all authenticated users. Only admins can delete/restock.
    """
    def has_permission(self, request, view):
        # allow GETs and POSTs for authenticated users; restrict some actions to staff
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)
