from django.urls import path

from .views import GetAllOrganisations, GetUpdateByIdView, ListOrganisationsByCategory, CreateOrganisations

urlpatterns = [
    path('', GetAllOrganisations.as_view()),
    path('add/', CreateOrganisations.as_view()),
    path('<int:id>/', GetUpdateByIdView.as_view()),
    path('category/<int:category_id>/', ListOrganisationsByCategory.as_view())
]
