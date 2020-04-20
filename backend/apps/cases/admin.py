from django import forms
from django.contrib import admin
from django.utils.translation import gettext as _

from guardian.admin import GuardedModelAdmin, UserManage

from apps.cases.models import Case, Partnership
from apps.comments.models import Comment


class EmailUserManage(UserManage):
    user = forms.EmailField(label=_("Email"))


class PartnershipInline(admin.TabularInline):
    model = Partnership
    extra = 1  # how many rows to show


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1  # how many rows to show


class CustomGuardedModelAdmin(GuardedModelAdmin):
    inlines = (PartnershipInline,CommentInline)

    def get_obj_perms_user_select_form(self, request):
        return EmailUserManage


admin.site.register(Case, CustomGuardedModelAdmin)
