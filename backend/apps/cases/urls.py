from django.urls import path

from apps.cases.views import ListCreateCaseView, RetrieveUpdateDeleteCaseView

urlpatterns = [
    path('', ListCreateCaseView.as_view()),
    path('<int:id>/', RetrieveUpdateDeleteCaseView.as_view())
]
