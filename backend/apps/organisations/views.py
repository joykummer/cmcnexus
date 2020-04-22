from django.db.models import Q
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView, CreateAPIView

from apps.organisations.models import Organisation
from apps.organisations.serializer import OrganisationSerializer, CreateOrganisationSerializer
from apps.helpers.permissions import CustomDjangoModelPermission


class GetAllOrganisations(ListAPIView):
    queryset = Organisation.objects.none()
    permission_classes = [CustomDjangoModelPermission]
    serializer_class = OrganisationSerializer

    def get_queryset(self):
        return Organisation.objects.filter(Q(name__icontains=self.request.query_params.get('search', '')) | Q(
            tag__icontains=self.request.query_params.get('search', '')))


class CreateOrganisations(CreateAPIView):
    queryset = Organisation.objects.none()
    serializer_class = CreateOrganisationSerializer
    permission_classes = [CustomDjangoModelPermission]


class GetUpdateByIdView(RetrieveUpdateAPIView):
    queryset = Organisation.objects.all()
    lookup_url_kwarg = 'id'
    permission_classes = [CustomDjangoModelPermission]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrganisationSerializer
        return CreateOrganisationSerializer
        

class ListOrganisationsByCategory(ListAPIView):
    queryset = Organisation.objects.none()
    serializer_class = OrganisationSerializer
    permission_classes = [CustomDjangoModelPermission]

    def get_queryset(self):
        category = self.kwargs['category_id']
        return Organisation.objects.filter(category=category)
