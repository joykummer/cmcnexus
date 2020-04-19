from requests import Response
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView

from apps.comments.models import Comment
from apps.comments.serializers import CommentSerializer


class CreateComment(CreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment
    lookup_url_kwarg = 'case_id'

    def create(self, request, *args, **kwargs):
        case = self.get_object()
        comment = Comment(content=request.data['content'], author=request.user, case=case)
        comment.save()
        return Response()


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

    def create(self, request, *args, **kwargs):
        case = self.get_object()
        comment = Comment(content=request.data['content'], author=request.user, case=case)
        comment.save()
        return Response()
