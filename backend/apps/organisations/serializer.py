from rest_framework import serializers

from .models import Organisation
from ..categories.serializer import CategorySerializer


class OrganisationSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()

    class Meta:
        model = Organisation
        fields = [
            'id',
            'name',
            'description',
            'services',
            'category',
            'tag',
            'members',
        ]


class CreateOrganisationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organisation
        fields = [
            'name',
            'description',
            'services',
            'category',
            'tag',
            'members',
        ]
