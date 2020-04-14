from django.db.models import Q
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView, GenericAPIView
from rest_framework.response import Response

from apps.cases.models import Case
from apps.cases.permissions import ValidatePermission, ClosePermission, RejectPermission, MatchOrganizationPermission, \
    AssignOrganizationPermission
from apps.cases.serializers import CaseSerializer
from apps.helpers.permissions import CustomDjangoModelPermission


class ListCreateCaseView(ListCreateAPIView):
    queryset = Case.objects.none()
    serializer_class = CaseSerializer
    permission_classes = [CustomDjangoModelPermission]

    def get_queryset(self):
        return Case.objects.filter(Q(title__icontains=self.request.query_params.get('search', '')) | Q(
            description__icontains=self.request.query_params.get('search', '')))

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
    permission_classes = [CustomDjangoModelPermission, ValidatePermission]
    lookup_url_kwarg = 'case_id'

    def update(self, request, *args, **kwargs):
        case = self.get_object()
        case.validate()
        return Response(self.get_serializer(case).data)


class CloseCaseView(UpdateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [CustomDjangoModelPermission, ClosePermission]
    lookup_url_kwarg = 'case_id'

    def update(self, request, *args, **kwargs):
        case = self.get_object()
        case.close()
        return Response(self.get_serializer(case).data)


class RejectCaseView(UpdateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [CustomDjangoModelPermission, RejectPermission]
    lookup_url_kwarg = 'case_id'

    def update(self, request, *args, **kwargs):
        case = self.get_object()
        case.reject()
        return Response(self.get_serializer(case).data)


class MatchOrganisation(GenericAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [CustomDjangoModelPermission, MatchOrganizationPermission]
    lookup_url_kwarg = 'case_id'

    def post(self, request, *args, **kwargs):
        case = self.get_object()
        partner_ids = self.request.data.get("partner_ids")
        for partner_id in partner_ids:
            case.matched_partners.add(partner_id)
        return Response(self.get_serializer(case).data)

    def delete(self, request, *args, **kwargs):
        case = self.get_object()
        partner_ids = self.request.data.get("partner_ids")
        for partner_id in partner_ids:
            case.matched_partners.remove(partner_id)
        return Response(self.get_serializer(case).data)


class AssignOrganisation(GenericAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer
    permission_classes = [CustomDjangoModelPermission, AssignOrganizationPermission]
    lookup_url_kwarg = 'case_id'

    def post(self, request, *args, **kwargs):
        case = self.get_object()
        partner_ids = self.request.data.get("partner_ids")
        for partner_id in partner_ids:
            case.assigned_partners.add(partner_id)
        return Response(self.get_serializer(case).data)

    def delete(self, request, *args, **kwargs):
        case = self.get_object()
        partner_ids = self.request.data.get("partner_ids")
        for partner_id in partner_ids:
            case.assigned_partners.remove(partner_id)
        return Response(self.get_serializer(case).data)
