from django.urls import path

from apps.cases.views import ListCreateCaseView, RetrieveUpdateCaseView

urlpatterns = [
    path('', ListCreateCaseView.as_view()),
    path('<int:id>/', RetrieveUpdateCaseView.as_view())
]