from rest_framework import serializers

from apps.cases.models import Case
from apps.organisations.serializer import OrganisationSerializer
from apps.users.serializer import FullUserSerializer


class CaseSerializer(serializers.ModelSerializer):
    created_by = FullUserSerializer(read_only=True)
    matched_partners = OrganisationSerializer(many=True, read_only=True)
    assigned_partners = OrganisationSerializer(many=True, read_only=True)

    class Meta:
        model = Case
        fields = '__all__'
