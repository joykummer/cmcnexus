from requests import Response
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView

from apps.cases.models import Case
from apps.comments.models import Comment
from apps.comments.serializers import CommentSerializer


class CreateComment(CreateAPIView):
    serializer_class = CommentSerializer
    lookup_url_kwarg = 'case_id'
    queryset = Case

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, case=Case.objects.get(id=self.kwargs['case_id']))


class ListCaseComments(ListAPIView):
    serializer_class = CommentSerializer
    lookup_url_kwarg = 'case_id'

    def get_queryset(self):
        case = self.kwargs.get("case_id")
        return Comment.objects.filter(case__id=case)


class RetrieveUpdateDestroyComment(RetrieveUpdateDestroyAPIView):
    queryset = Comment
    serializer_class = CommentSerializer
    lookup_url_kwarg = 'comment_id'

