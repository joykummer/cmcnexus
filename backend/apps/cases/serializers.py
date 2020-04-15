from rest_framework import serializers
from rest_framework_guardian.serializers import ObjectPermissionsAssignmentMixin

from apps.cases.models import Case
from apps.organisations.serializer import OrganisationSerializer
from apps.users.serializer import FullUserSerializer


class CaseSerializer(ObjectPermissionsAssignmentMixin, serializers.ModelSerializer):
    created_by = FullUserSerializer(read_only=True)
    matched_partners = OrganisationSerializer(many=True, read_only=True)
    assigned_partners = OrganisationSerializer(many=True, read_only=True)

    class Meta:
        model = Case
        fields = '__all__'

    def get_permissions_map(self, created):
        current_user = self.context['request'].user

        return {
            'view_post': [current_user],
            'change_post': [current_user]
        }
