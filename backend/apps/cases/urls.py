from django.urls import path

from apps.cases.views import RetrieveUpdateDeleteCaseView, ValidateCaseView, CloseCaseView, \
    RejectCaseView, MatchOrganisation, AssignOrganisation, AcceptCase, RejectCase, ListCaseView, CreateCaseView

urlpatterns = [
    path('', ListCaseView.as_view()),
    path('add/', CreateCaseView.as_view()),
    path('<int:id>/', RetrieveUpdateDeleteCaseView.as_view()),
    path('<int:case_id>/validate/', ValidateCaseView.as_view()),
    path('<int:case_id>/close/', CloseCaseView.as_view()),
    path('<int:case_id>/reject/', RejectCaseView.as_view()),
    path('<int:case_id>/match/', MatchOrganisation.as_view()),
    path('<int:case_id>/assign/', AssignOrganisation.as_view()),
    path('<int:case_id>/accept/', AcceptCase.as_view()),
    path('<int:case_id>/reject/', RejectCase.as_view()),
]
