# sweets/admin.py
from django.contrib import admin
from .models import Sweet

@admin.register(Sweet)
class SweetAdmin(admin.ModelAdmin):
    list_display = ('id','name','category','price','quantity','added_by','created_at')
    search_fields = ('name','category','description')
