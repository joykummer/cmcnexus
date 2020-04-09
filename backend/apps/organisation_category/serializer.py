from rest_framework import serializers

from apps.organisation_category.models import Organisation_Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation_Category
        fields = '__all__'
