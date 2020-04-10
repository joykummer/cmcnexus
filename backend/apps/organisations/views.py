from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView

from .models import Organisation
from .serializer import OrganisationSerializer


class GetAllOrganisations(ListCreateAPIView):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer

    def get_queryset(self):
        return Organisation.objects.filter(name__icontains=self.request.query_params.get('search', ''))


class GetUpdateByIdView(RetrieveUpdateAPIView):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
    lookup_url_kwarg = 'id'


class ListOrganisationsByCategory(ListAPIView):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
    lookup_url_kwarg = 'category_id'

    def get_queryset(self):
        category = self.kwargs['category_id']
        return self.queryset.filter(category=category)
