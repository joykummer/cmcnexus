from rest_framework.generics import ListAPIView

from apps.organisation_category.models import Organisation_Category
from apps.organisation_category.serializer import CategorySerializer


class GetAllOrganisationCategories(ListAPIView):
    queryset = Organisation_Category.objects.all()
    serializer_class = CategorySerializer
