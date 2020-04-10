from django.urls import path

from .views import GetAllCategories

urlpatterns = [
    path('', GetAllCategories.as_view()),
]
