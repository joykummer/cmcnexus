from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.organisations.serializer import OrganisationSerializer

User = get_user_model()


class FullUserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()
    organisation = OrganisationSerializer(read_only=True)

    def get_permissions(self, obj):
        return [perm.split('.')[1] for perm in obj.get_all_permissions()]

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'department', 'organisation', 'first_name', 'last_name', 'phone', 'date_joined',
                  'permissions']
        read_only_fields = ['id', 'date_joined', 'email']


class UserForCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'phone']
        read_only_fields = ['username', 'email', 'first_name', 'last_name', 'phone']
