from django.db.models import Q
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.cases.models import Case
from apps.cases.serializers import CaseSerializer


class ListCreateCaseView(ListCreateAPIView):
    serializer_class = CaseSerializer

    def get_queryset(self):
        return Case.objects.filter(Q(title__icontains=self.request.query_params.get('search', '')) | Q(
            description__icontains=self.request.query_params.get('search', '')))

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class RetrieveUpdateDeleteCaseView(RetrieveUpdateDestroyAPIView):
    queryset = Case
    serializer_class = CaseSerializer
    lookup_url_kwarg = 'id'
