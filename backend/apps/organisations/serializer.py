from rest_framework import serializers

from .models import Organisation
from ..categories.serializer import CategorySerializer


class OrganisationSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)

    class Meta:
        model = Organisation
        fields = [
            'id',
            'name',
            'description',
            'services',
            'categories',
            'tag',
        ]


class CreateOrganisationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organisation
        fields = [
            'name',
            'description',
            'services',
            'categories',
            'tag',
        ]
