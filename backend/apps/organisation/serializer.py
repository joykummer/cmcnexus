from rest_framework import serializers

from .models import Organisation
from ..organisation_category.serializer import CategorySerializer


class OrganisationSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Organisation
        fields = [
            'id',
            'name',
            'description',
            'category',
            'tag',
            'members',
        ]
