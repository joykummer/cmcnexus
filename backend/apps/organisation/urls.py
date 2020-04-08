from django.urls import path

from .views import GetAllOrganisations, GetUpdateByIdView

urlpatterns = [
    path('', GetAllOrganisations.as_view()),
    path('<int:id>/', GetUpdateByIdView.as_view())
]
