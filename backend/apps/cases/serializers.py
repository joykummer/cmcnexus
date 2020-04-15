from rest_framework import serializers

from apps.cases.models import Case, PartneredOrganisations
from apps.organisations.serializer import OrganisationSerializer
from apps.users.serializer import FullUserSerializer

from apps.categories.serializer import CategorySerializer


class PartneredOrganisationsSerializer(serializers.ModelSerializer):
    organisation = OrganisationSerializer(read_only=True)

    class Meta:
        model = PartneredOrganisations
        fields = ['status','organisation']


class CaseSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    created_by = FullUserSerializer(read_only=True)
    partnered_organisations = PartneredOrganisationsSerializer(many=True)

    class Meta:
        model = Case
        exclude = ('organisations',)


class CreateCaseSerializer(serializers.ModelSerializer):
    created_by = FullUserSerializer(read_only=True)


    class Meta:
        model = Case
        fields = '__all__'

