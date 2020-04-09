from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from apps.cases.models import Case
from apps.cases.serializers import CaseSerializer


class ListCreateCaseView(ListCreateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class RetrieveUpdateCaseView(RetrieveUpdateAPIView):
    queryset = Case
    serializer_class = CaseSerializer
    lookup_url_kwarg = 'id'
