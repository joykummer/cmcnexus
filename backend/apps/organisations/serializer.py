from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework_guardian.serializers import ObjectPermissionsAssignmentMixin

from apps.organisations.models import Organisation
from apps.cases.models import Partnership
from apps.categories.serializer import CategorySerializer


class PartnershipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partnership
        fields = ['status', 'case']


class OrganisationSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    partnered_cases = PartnershipSerializer(many=True)

    class Meta:
        model = Organisation
        fields = [
            'id',
            'name',
            'description',
            'services',
            'categories',
            'tag',
            'partnered_cases',
        ]


class CreateOrganisationSerializer(ObjectPermissionsAssignmentMixin, serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = [
            'name',
            'description',
            'services',
            'categories',
            'tag',
        ]

    def get_permissions_map(self, created):
        case_coordinator = Group.objects.get(name="Case Coordinator")
        med_co = Group.objects.get(name="Medical Coordinator")

        return {
            'view_organisation': [case_coordinator, med_co],
            'change_organisation': [case_coordinator],
            'delete_organisation': [case_coordinator],
        }
