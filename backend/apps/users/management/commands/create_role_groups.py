from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand

default_groups_permissions = [
    {
        "name": "Medical Coordinator",
        "permissions": [
            "view_case",
            "change_case",
            "validate_case",
            "reject_case",
            "view_organisation",
            "view_general_info",
            "view_medical_info",
            "update_general_info",
            "update_medical_info"
        ]
    },
    {
        "name": "Partner Organisation",
        "permissions": [
            "view_case",
            "update_match",
            "view_general_info"
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
            "view_dashboard",
            "view_medical_info",
            "view_general_info",
            "update_general_info"
        ]
    },
    {
        "name": "Doctor/Nurse",
        "permissions": [
            "add_case",
            "view_case",
            "change_case",
            "delete_case",
            "view_medical_info",
            "view_general_info",
            "update_general_info",
            "update_medical_info"
        ]
    },
    {
        "name": "Expert",
        "permissions": [
            "view_case",
            "reject_case",
            "view_dashboard",
            "view_medical_info",
            "view_general_info"
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
            else:
                self.stdout.write(
                    self.style.WARNING('Group "%s" already exists.' % default_groups_permission["name"])
                    + " Adding missing permissions...")
            for permission_codename in default_groups_permission["permissions"]:
                if Permission.objects.filter(codename=permission_codename).exists():
                    permission = Permission.objects.get(codename=permission_codename)
                    new_group.permissions.add(permission)
                    self.stdout.write((' |- Add permission "%s"... ' % permission_codename)
                                      + self.style.SUCCESS("OK"))
                else:
                    self.stdout.write((' |- Permission "%s" does not exist... ' % permission_codename)
                                      + self.style.ERROR("FAIL"))
