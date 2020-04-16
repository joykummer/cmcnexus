from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand

default_groups_permissions = [
    {
        "name": "MedCo",
        "permissions": [
            "view_case",
            "change_case",
            "validate_case",
            "reject_case",
        ]
    },
    {
        "name": "Partner Organisation",
        "permissions": [
            "view_case",
        ]
    },
    {
        "name": "Case Coordinator",
        "permissions": [
            "view_case",
            "change_case",
            "close_case",
            "assign_organisations",
            "match_organisations",
            "view_organisation",
            "add_organisation",
            "change_organisation",
            "delete_organisation",
        ]
    },
    {
        "name": "Doctor/Nurse",
        "permissions": [
            "add_case",
            "view_case",
            "change_case",
            "delete_case",
        ]
    },
]


class Command(BaseCommand):
    help = 'Creates permission groups for and gives them the default permissions. ' \
           'If a group already exists, nothing is done.'

    def handle(self, *args, **options):
        for default_groups_permission in default_groups_permissions:
            new_group, created = Group.objects.get_or_create(name=default_groups_permission["name"])

            if created:
                self.stdout.write('Created new group "%s"... ' % default_groups_permission["name"]
                                  + self.style.SUCCESS("OK"))
                for permission_codename in default_groups_permission["permissions"]:
                    if Permission.objects.filter(codename=permission_codename).exists():
                        permission = Permission.objects.get(codename=permission_codename)
                        new_group.permissions.add(permission)
                        self.stdout.write((' |- Add permission "%s"... ' % permission_codename)
                                          + self.style.SUCCESS("OK"))
                    else:
                        self.stdout.write((' |- Permission "%s" does not exist... ' % permission_codename)
                                          + self.style.ERROR("FAIL"))
            else:
                self.stdout.write(
                    self.style.WARNING('Group "%s" already exists. Continuing.' % default_groups_permission["name"]))
