from django.urls import path

from apps.cases.views import ListCreateCaseView, RetrieveUpdateDeleteCaseView, ValidateCaseView, MatchPartnersView, \
    AssignPartnersView, CloseCaseView, RejectCaseView

urlpatterns = [
    path('', ListCreateCaseView.as_view()),
    path('<int:id>/', RetrieveUpdateDeleteCaseView.as_view()),
    path('<int:case_id>/validate/', ValidateCaseView.as_view()),
    path('<int:case_id>/match/', MatchPartnersView.as_view()),
    path('<int:case_id>/assign/', AssignPartnersView.as_view()),
    path('<int:case_id>/close/', CloseCaseView.as_view()),
    path('<int:case_id>/reject/', RejectCaseView.as_view()),
]
