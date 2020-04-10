from rest_framework import serializers

from apps.categories.models import Category


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    @staticmethod
    def get_id(category):
        return category.get_id_display()