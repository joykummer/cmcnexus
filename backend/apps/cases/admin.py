from django import forms
from django.contrib import admin
from django.utils.translation import gettext as _

from guardian.admin import GuardedModelAdmin, UserManage

from apps.cases.models import Case


class EmailUserManage(UserManage):
    user = forms.EmailField(label=_("Email"))


class CustomGuardedModelAdmin(GuardedModelAdmin):
    def get_obj_perms_user_select_form(self, request):
        return EmailUserManage


admin.site.register(Case, CustomGuardedModelAdmin)
