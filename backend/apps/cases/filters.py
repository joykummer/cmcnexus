from rest_framework.filters import BaseFilterBackend


class PermissionsFilter(BaseFilterBackend):
    """
    A filter backend that limits results to those where the requesting user
    has read object level permissions.
    """
    perm_format = '%(app_label)s.view_%(model_name)s'
    shortcut_kwargs = {
        'accept_global_perms': True,
        'any_perm': True,
    }

    def filter_queryset(self, request, queryset, view):
        from guardian.shortcuts import get_objects_for_user, get_perms_for_model

        user = request.user
        permissions = get_perms_for_model(queryset.model).values_list('codename')

        permission = [self.perm_format % {
            'app_label': queryset.model._meta.app_label,
            'model_name': queryset.model._meta.model_name,
        },
                      #*[f'{queryset.model._meta.app_label}.{perm[0]}' for perm in permissions]
                      ]

        return get_objects_for_user(
            user, permission, queryset,
            **self.shortcut_kwargs)