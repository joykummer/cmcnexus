from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView, CreateAPIView

from .models import Organisation
from .serializer import OrganisationSerializer, CreateOrganisationSerializer


class GetAllOrganisations(ListAPIView):
    serializer_class = OrganisationSerializer

    def get_queryset(self):
        return Organisation.objects.filter(name__icontains=self.request.query_params.get('search', ''))


class CreateOrganisations(CreateAPIView):
    queryset = Organisation
    serializer_class = CreateOrganisationSerializer


class GetUpdateByIdView(RetrieveUpdateAPIView):
    queryset = Organisation
    serializer_class = OrganisationSerializer
    lookup_url_kwarg = 'id'


class ListOrganisationsByCategory(ListAPIView):
    serializer_class = OrganisationSerializer

    def get_queryset(self):
        category = self.kwargs['category_id']
        return self.queryset.filter(category=category)
