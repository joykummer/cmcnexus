from rest_framework.generics import ListAPIView

from apps.organisation_category.models import Category_Organisation
from apps.organisation_category.serializer import CategorySerializer


class GetAllOrganisationCategories(ListAPIView):
    queryset = Category_Organisation.objects.all()
    serializer_class = CategorySerializer
