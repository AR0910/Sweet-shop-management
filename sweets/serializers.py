from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sweet

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and returning users.
    Automatically hashes password using Django's create_user method.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', '')
        )
        return user


class SweetSerializer(serializers.ModelSerializer):
    added_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Sweet
        fields = ['id', 'name', 'description', 'category', 'price', 'quantity', 'added_by', 'created_at', 'updated_at']
