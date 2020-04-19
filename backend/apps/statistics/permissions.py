from rest_framework.permissions import BasePermission


class DashboardPermission(BasePermission):

    def has_permission(self, request, view):
        return request.user.has_perm('cases.view_dashboard')
