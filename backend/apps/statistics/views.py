from django.db.models import Count
from django.db.models.functions import TruncYear
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.cases.models import Case
from apps.statistics.permissions import DashboardPermission
from apps.statistics.serializers import StatCaseSerializer


class StatisticsBundleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cases = Case.objects.all()\
            .annotate(year=TruncYear('created'))\
            .values("year")\
            .annotate(cases_created=Count('id'))\
            .order_by("-year")

        statistics = {
            "yearly_cases": StatCaseSerializer(cases, many=True).data,
        }

        return Response(statistics)
