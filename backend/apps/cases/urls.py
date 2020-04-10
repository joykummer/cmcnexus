from django.urls import path

from apps.cases.views import ListCreateCaseView, RetrieveUpdateDeleteCaseView, ValidateCaseView, CloseCaseView, \
    RejectCaseView, MatchOrganisation, AssignOrganisation

urlpatterns = [
    path('', ListCreateCaseView.as_view()),
    path('<int:id>/', RetrieveUpdateDeleteCaseView.as_view()),
    path('<int:case_id>/validate/', ValidateCaseView.as_view()),
    path('<int:case_id>/close/', CloseCaseView.as_view()),
    path('<int:case_id>/reject/', RejectCaseView.as_view()),
    path('<int:case_id>/match/', MatchOrganisation.as_view()),
    path('<int:case_id>/assign/', AssignOrganisation.as_view()),
]
