from rest_framework import serializers

from apps.organisation_category.models import Category_Organisation


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category_Organisation
        fields = ['name']
