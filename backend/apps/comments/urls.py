from django.urls import path

from apps.comments.views import RetrieveUpdateDestroyComment, CreateComment, ListCaseComments

urlpatterns = [
    path('<int:comment_id/>', RetrieveUpdateDestroyComment.as_view()),
    path('new/<int:case_id>', CreateComment.as_view()),
    path('case/<int:case_id>/', ListCaseComments.as_view()),
]