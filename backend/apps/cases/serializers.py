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


class GeneralInfoSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    created_by = FullUserSerializer(read_only=True)
    partnered_organisations = PartnershipSerializer(many=True)

    class Meta:
        model = Case
        fields = ['title', 'country', 'location', 'age', 'language', 'nature_of_referral', 'patient_id', 'age', 'birth_date', 'categories', 'created_by', 'partnered_organisations']


class MedicalInfoSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    created_by = FullUserSerializer(read_only=True)
    partnered_organisations = PartnershipSerializer(many=True)

    class Meta:
        model = Case
        fields = ['description', 'history_description', 'diagnosis', 'past_medical_history', 'physical_examination',
                  'investigations', 'current_treatment', 'justification', 'recommendation', 'consent', 'sex',
                  'comments', 'outcome', 'status']


def get_general_or_medical_info(request):
    if request.method == 'GET':
        if request.user.has_perm("cases.view_general_info", "cases.view_medical_info"):
            return CaseSerializer
        elif request.user.has_perm("cases.view_general_info"):
            return GeneralInfoSerializer
    else:
        if request.user.has_perm("cases.update_general_info"):
            return GeneralInfoSerializer
        else:
            return CaseSerializer
