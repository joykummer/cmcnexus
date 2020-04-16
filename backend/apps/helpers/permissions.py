import copy

from django.http import Http404
from rest_framework.permissions import DjangoModelPermissions, DjangoObjectPermissions, SAFE_METHODS
from rest_framework_guardian.filters import ObjectPermissionsFilter


def has_any_perms(user, obj, perm_list):
    return any(user.has_perm(perm, obj) for perm in perm_list)


class CustomDjangoModelPermission(DjangoObjectPermissions):

    def __init__(self):
        self.perms_map = copy.deepcopy(self.perms_map)
        self.perms_map['GET'] = ['%(app_label)s.view_%(model_name)s']
        self.perms_map['OPTIONS'] = ['%(app_label)s.view_%(model_name)s']
        self.perms_map['HEAD'] = ['%(app_label)s.view_%(model_name)s']
