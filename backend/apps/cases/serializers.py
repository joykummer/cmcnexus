from rest_framework import serializers
from apps.cases.models import Case


class CaseSerializer(serializers.ModelSerializer):
    sex = serializers.ChoiceField(choices=Case.GENDER_CHOICES)

    class Meta:
        model = Case
        fields = '__all__'