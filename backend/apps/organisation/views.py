from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from .models import Organisation
from .serializer import OrganisationSerializer


class GetAllOrganisations(ListCreateAPIView):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer


class GetUpdateByIdView(RetrieveUpdateAPIView):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
    lookup_url_kwarg = 'id'
