from django.urls import path

from apps.cases.views import ListCreateCaseView, RetrieveUpdateDeleteCaseView, ValidateCaseView, CloseCaseView, \
    RejectCaseView, ToggleMatchPartner, ToggleAssignPartner

urlpatterns = [
    path('', ListCreateCaseView.as_view()),
    path('<int:id>/', RetrieveUpdateDeleteCaseView.as_view()),
    path('<int:case_id>/validate/', ValidateCaseView.as_view()),
    path('<int:case_id>/close/', CloseCaseView.as_view()),
    path('<int:case_id>/reject/', RejectCaseView.as_view()),
    path('<int:case_id>/match/<int:partner_id>/', ToggleMatchPartner.as_view()),
    path('<int:case_id>/assign/<int:partner_id>/', ToggleAssignPartner.as_view()),
]
