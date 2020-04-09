from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from rest_framework import serializers

User = get_user_model()


class FullUserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()

    def get_permissions(self, obj):
        group_permissions = Permission.objects.filter(group__in=obj.groups.all()).distinct().values_list('codename')
        return [perm[0] for perm in group_permissions]

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'department', 'first_name', 'last_name', 'phone', 'date_joined',
                  'permissions']
        read_only_fields = ['id', 'date_joined', 'email']
