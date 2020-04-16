from rest_framework.generics import ListAPIView

from apps.categories.models import Category
from apps.categories.serializer import CategorySerializer
from apps.helpers.permissions import CustomDjangoModelPermission


class GetAllCategories(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
