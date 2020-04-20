from django.contrib.auth.models import Group
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


class CaseSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    created_by = FullUserSerializer(read_only=True)
    partnered_organisations = PartnershipSerializer(many=True)

    class Meta:
        model = Case
        exclude = ('organisations',)


class CreateCaseSerializer(ObjectPermissionsAssignmentMixin, serializers.ModelSerializer):
    created_by = FullUserSerializer(read_only=True)

    class Meta:
        model = Case
        fields = '__all__'

    def get_permissions_map(self, created):
        doctor = Group.objects.get(name="Doctor/Nurse")
        case_coordinator = Group.objects.get(name="Case Coordinator")
        med_co = Group.objects.get(name="Medical Coordinator")
        expert = Group.objects.get(name="Expert")

        return {
            'view_case': [doctor, case_coordinator, med_co, expert],
            'change_case': [doctor, med_co, case_coordinator],
            'delete_case': [doctor],
        }
