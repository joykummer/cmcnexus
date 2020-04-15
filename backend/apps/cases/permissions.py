from rest_framework.permissions import BasePermission


class ValidatePermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.validate_case')


class ClosePermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.close_case')


class RejectPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.reject_case')


class AssignOrganizationPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.assign_organisations')


class MatchOrganizationPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.match_organisations')
