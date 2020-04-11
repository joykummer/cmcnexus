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


class AssignOrganizationPermission(BasePermission):

    def has_permission(self, request, view):
        request.user.has_perm('cases.assign_organizations')


class MatchOrganizationPermission(BasePermission):

    def has_permission(self, request, view):
        request.user.has_perm('cases.match_organizations')
