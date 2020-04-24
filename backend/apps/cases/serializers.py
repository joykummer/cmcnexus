from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework_guardian.serializers import ObjectPermissionsAssignmentMixin

from apps.cases.models import Case, PartnerWorkflow
from apps.users.serializer import UserForCaseSerializer
from apps.comments.serializers import CommentSerializer

from apps.categories.serializer import CategorySerializer


class CaseSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    created_by = UserForCaseSerializer(read_only=True)
    comments = CommentSerializer(many=True)
    match_stats = serializers.SerializerMethodField()
    closing_reason = serializers.SerializerMethodField()

    @staticmethod
    def get_closing_reason(case):
        return case.get_closing_reason_display()

    def get_match_stats(self, obj):
        status_count = []
        for state in PartnerWorkflow.states:
            count = obj.partnered_organisations.filter(status=state).count()
            status_count.append({
                "status": state.name,
                "count": count
            })
        return status_count

    class Meta:
        model = Case
        exclude = ('organisations',)


class CreateCaseSerializer(ObjectPermissionsAssignmentMixin, serializers.ModelSerializer):
    created_by = UserForCaseSerializer(read_only=True)

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
    created_by = UserForCaseSerializer(read_only=True)
    match_stats = serializers.SerializerMethodField()

    def get_match_stats(self, obj):
        status_count = []
        for state in PartnerWorkflow.states:
            count = obj.partnered_organisations.filter(status=state).count()
            status_count.append({
                "status": state.name,
                "count": count
            })
        return status_count

    class Meta:
        model = Case
        fields = ['id', 'status', 'title', 'country', 'location', 'age', 'consent', 'language', 'nature_of_referral', 'patient_id',
                  'age', 'birth_date', 'categories', 'created_by', 'match_stats', 'closing_reason']


class MedicalInfoSerializer(serializers.ModelSerializer):
    created_by = UserForCaseSerializer(read_only=True)

    class Meta:
        model = Case
        fields = ['description', 'history_description', 'diagnosis', 'past_medical_history', 'physical_examination',
                  'investigations', 'current_treatment', 'justification', 'recommendation', 'sex',
                  'comments', 'outcome', 'status']


class CloseCaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Case
        fields = ['closing_reason']


def get_general_or_medical_info(request):
    if request.method == 'GET':
        if request.user.has_perms(["cases.view_general_info", "cases.view_medical_info"]):
            return CaseSerializer
        elif request.user.organisation.categories.filter(pk=1).exists():
            return CaseSerializer
        elif request.user.has_perm("cases.view_general_info"):
            return GeneralInfoSerializer
    else:
        if request.user.has_perms(["cases.update_general_info", "cases.update_medical_info"]):
            return CreateCaseSerializer
        elif request.user.has_perm("cases.update_general_info"):
            return GeneralInfoSerializer
        elif request.user.organisation.categories.filter(pk=1).exists():
            return CaseSerializer
        else:
            return GeneralInfoSerializer
