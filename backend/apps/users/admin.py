from django.contrib import admin
from django.contrib.auth import get_user_model

from django.contrib.auth.admin import UserAdmin

User = get_user_model()


@admin.register(User)
class UserAdmin(UserAdmin):
    readonly_fields = ('date_joined', 'last_login')
    # fields shown when creating a new instance
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'department', 'phone', 'organisation', 'password1', 'password2')}
         ),
    )
    # fields when reading / updating an instance
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password', 'department', 'phone', 'organisation')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Groups', {'fields': ('groups',)}),
    )
    # fields which are shown when looking at an list of instances
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff')
    ordering = ('email',)
