from rest_framework import serializers

from apps.cases.models import Case
from apps.organisation.serializer import OrganisationSerializer


class CaseSerializer(serializers.ModelSerializer):
    sex = serializers.SerializerMethodField()
    assigned_partners = OrganisationSerializer(read_only=True, many=True)
    matched_partners = OrganisationSerializer(read_only=True, many=True)
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = Case
        fields = '__all__'

    @staticmethod
    def get_sex(case):
        return case.get_sex_display()

    # def get_created_by(case):
    #     return
