from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class FullUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'department', 'first_name', 'last_name', 'phone', 'created']
        read_only_fields = ['id', 'created']
