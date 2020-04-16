from django.db.models import Q
from rest_framework.generics import RetrieveUpdateDestroyAPIView, UpdateAPIView, GenericAPIView, \
    ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework_guardian.filters import ObjectPermissionsFilter


from apps.cases.permissions import ValidatePermission, MatchOrganisationPermission, \
    AssignOrganisationPermission
from apps.cases.models import Case, Partnership
from apps.cases.permissions import ClosePermission, RejectPermission
from apps.cases.serializers import CaseSerializer
from apps.helpers.permissions import CustomDjangoModelPermission
from apps.cases.serializers import CreateCaseSerializer


class ListCaseView(ListAPIView):
    queryset = Case.objects.none()
    serializer_class = CaseSerializer
    permission_classes = [CustomDjangoModelPermission]
    filter_backends = [ObjectPermissionsFilter]

    def get_queryset(self):
        return Case.objects.filter(Q(title__icontains=self.request.query_params.get('search', '')) | Q(
            description__icontains=self.request.query_params.get('search', '')))


class CreateCaseView(CreateAPIView):
    queryset = Case.objects.none()
    serializer_class = CreateCaseSerializer
    permission_classes = [CustomDjangoModelPermission]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class RetrieveUpdateDeleteCaseView(RetrieveUpdateDestroyAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [CustomDjangoModelPermission]
    lookup_url_kwarg = 'id'


class ValidateCaseView(UpdateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [ValidatePermission]
    lookup_url_kwarg = 'case_id'

    def update(self, request, *args, **kwargs):
        case = self.get_object()
        case.validate()
        return Response(self.get_serializer(case).data)


class CloseCaseView(UpdateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [ClosePermission]
    lookup_url_kwarg = 'case_id'

    def update(self, request, *args, **kwargs):
        case = self.get_object()
        case.close()
        return Response(self.get_serializer(case).data)


class RejectCaseView(UpdateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [RejectPermission]
    lookup_url_kwarg = 'case_id'

    def update(self, request, *args, **kwargs):
        case = self.get_object()
        case.reject()
        return Response(self.get_serializer(case).data)


class MatchOrganisation(GenericAPIView):
    queryset = Case
    serializer_class = CaseSerializer
    permission_classes = [MatchOrganisationPermission]
    lookup_url_kwarg = 'case_id'

    def post(self, request, *args, **kwargs):
        case = self.get_object()
        organisation_ids = self.request.data.get("partner_ids")
        for organisation_id in organisation_ids:
            Partnership(case_id=case.id, organisation_id=organisation_id).save()
        return Response(self.get_serializer(case).data)

    def delete(self, request, *args, **kwargs):
        case = self.get_object()
        organisation_ids = self.request.data.get("partner_ids")
        for organisation_id in organisation_ids:
            Partnership.objects.get(case_id=case.id, organisation_id=organisation_id).delete()
        return Response(self.get_serializer(case).data)


class AssignOrganisation(GenericAPIView):
    queryset = Case
    serializer_class = CaseSerializer
    permission_classes = [AssignOrganisationPermission]
    lookup_url_kwarg = 'case_id'

    def post(self, request, *args, **kwargs):
        case = self.get_object()
        organisation_ids = self.request.data.get("partner_ids")
        for organisation_id in organisation_ids:
            match = Partnership.objects.get(case_id=case.id, organisation_id=organisation_id)
            match.assign()
        return Response(self.get_serializer(case).data)

    def delete(self, request, *args, **kwargs):
        case = self.get_object()
        organisation_ids = self.request.data.get("partner_ids")
        for organisation_id in organisation_ids:
            match = Partnership.objects.get(case_id=case.id, organisation_id=organisation_id)
            match.accept()
        return Response(self.get_serializer(case).data)


class AcceptCaseAsOrg(GenericAPIView):
    queryset = Case
    serializer_class = CaseSerializer
    permission_classes = [AssignOrganisationPermission]
    lookup_url_kwarg = 'case_id'

    def post(self, request, *args, **kwargs):
        case = self.get_object()
        organisation_id = self.request.data.get("partner_ids")
        match = Partnership.objects.get(case_id=case.id, organisation_id=organisation_id)
        match.accept()
        return Response(self.get_serializer(case).data)

    def delete(self, request, *args, **kwargs):
        case = self.get_object()
        organisation_id = self.request.data.get("partner_ids")
        match = Partnership.objects.get(case_id=case.id, organisation_id=organisation_id)
        match.downgrade()
        return Response(self.get_serializer(case).data)


class RefuseCaseAsOrg(GenericAPIView):
    queryset = Case
    serializer_class = CaseSerializer
    permission_classes = [AssignOrganisationPermission]
    lookup_url_kwarg = 'case_id'

    def delete(self, request, *args, **kwargs):
        case = self.get_object()
        organisation_id = self.request.data.get("partner_ids")
        match = Partnership.objects.get(case_id=case.id, organisation_id=organisation_id)
        match.reject()
        return Response(self.get_serializer(case).data)
