from django.urls import path

from .views import GetAllOrganisationCategories

urlpatterns = [
    path('', GetAllOrganisationCategories.as_view()),
]
