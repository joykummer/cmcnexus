from rest_framework.permissions import BasePermission


class ValidatePermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.validate_case')


class ClosePermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.close_case')


class ReopenPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.reopen_case')


class RejectPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.reject_case')


class AssignOrganisationPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.assign_organisations')


class MatchOrganisationPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.match_organisations')


class AcceptRejectCasePermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.update_match')
