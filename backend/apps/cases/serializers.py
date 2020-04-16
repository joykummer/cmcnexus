from rest_framework import serializers
from rest_framework_guardian.serializers import ObjectPermissionsAssignmentMixin

from apps.cases.models import Case, Partnership
from apps.organisations.serializer import OrganisationSerializer
from apps.users.serializer import FullUserSerializer

from apps.categories.serializer import CategorySerializer


class PartnershipSerializer(serializers.ModelSerializer):
    organisation = OrganisationSerializer(read_only=True)

    class Meta:
        model = Partnership
        fields = ['status', 'organisation']


class CaseSerializer(ObjectPermissionsAssignmentMixin, serializers.ModelSerializer):
    category = CategorySerializer(many=True)
    created_by = FullUserSerializer(read_only=True)
    partnered_organisations = PartnershipSerializer(many=True)

    class Meta:
        model = Case
        exclude = ('organisations',)

    def get_permissions_map(self, created):
        current_user = self.context['request'].user

        return {
            'view_post': [current_user],
            'change_post': [current_user]
        }


class CreateCaseSerializer(ObjectPermissionsAssignmentMixin, serializers.ModelSerializer):
    created_by = FullUserSerializer(read_only=True)

    class Meta:
        model = Case
        fields = '__all__'

    def get_permissions_map(self, created):
        current_user = self.context['request'].user

        return {
            'view_post': [current_user],
            'change_post': [current_user]
        }

