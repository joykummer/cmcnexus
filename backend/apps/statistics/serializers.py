from rest_framework import serializers

from apps.categories.serializer import CategorySerializer


class YearlyCasesSerializer(serializers.Serializer):
    year = serializers.DateTimeField(format="%Y")
    cases_created = serializers.IntegerField()


class CasesCategorySerializer(serializers.Serializer):
    categories = CategorySerializer()
    count = serializers.IntegerField()
