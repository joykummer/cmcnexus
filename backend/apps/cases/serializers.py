from rest_framework import serializers

from apps.cases.models import Case
from apps.organisations.serializer import OrganisationSerializer
from apps.users.serializer import FullUserSerializer

from apps.categories.serializer import CategorySerializer


class CaseSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)
    created_by = FullUserSerializer(read_only=True)
    matched_partners = OrganisationSerializer(many=True, read_only=True)
    assigned_partners = OrganisationSerializer(many=True, read_only=True)

    class Meta:
        model = Case
        fields = '__all__'


class CreateCaseSerializer(serializers.ModelSerializer):
    created_by = FullUserSerializer(read_only=True)
    matched_partners = OrganisationSerializer(many=True, read_only=True)
    assigned_partners = OrganisationSerializer(many=True, read_only=True)
    accepted_partners = OrganisationSerializer(many=True, read_only=True)

    class Meta:
        model = Case
        fields = '__all__'
