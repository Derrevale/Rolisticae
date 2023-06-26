from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'campaigns', 'character_sheets', 'password']
        extra_kwargs = {'password': {'write_only': True}}
