from rest_framework.permissions import BasePermission


class ValidatePermission(BasePermission):

    def has_permission(self, request, view):
        request.user.has_perm('cases.validate')


class ClosePermission(BasePermission):

    def has_permission(self, request, view):
        request.user.has_perm('cases.close')


class RejectPermission(BasePermission):

    def has_permission(self, request, view):
        request.user.has_perm('cases.reject')
