from rest_framework import serializers


class StatCaseSerializer(serializers.Serializer):
    year = serializers.DateTimeField(format="%Y")
    cases_created = serializers.IntegerField()
