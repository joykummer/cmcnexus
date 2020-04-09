from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.cases.models import Case
from apps.cases.serializers import CaseSerializer


class ListCreateCaseView(ListCreateAPIView):
    queryset = Case.objects.all()
    serializer_class = CaseSerializer


class RetrieveUpdateDeleteCaseView(RetrieveUpdateDestroyAPIView):
    queryset = Case
    serializer_class = CaseSerializer
    lookup_url_kwarg = 'id'
