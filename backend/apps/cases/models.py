from django.db import models
from django.contrib.auth import get_user_model
from django_xworkflows import models as xwf_models
from django.utils.translation import gettext as _
import xworkflows

from apps.organisations.models import Organisation
from apps.categories.models import Category

User = get_user_model()


class CaseWorkflow(xwf_models.Workflow):
    log_model = ''
    states = (
        ('requested', _(u"Requested")),
        ('open', _(u"Open")),
        ('closed', _(u"Closed")),
        ('rejected', _(u"Rejected"))
    )
    transitions = (
        ('validate', 'requested', 'open'),
        ('close', ('open', 'rejected'), 'closed'),
        ('reopen', 'closed', 'open'),
        ('reject', ('requested', 'open'), 'rejected')
    )
    initial_state = 'requested'


class Case(xwf_models.WorkflowEnabled, models.Model):

    GENDER_CHOICES = (
        ("F", 'Female'),
        ("M", 'Male'),
    )
    LANGUAGE_CHOICES = (
        ("French", "French"),
        ("English", "English"),
        ("Spanish", "Spanish")
    )
    NATURE_CHOICES = (
        ("Emergency", "Emergency"),
        ("Urgent", "Urgent"),
        ("Life changing", "Life changing")
    )

    title = models.CharField(max_length=100)
    language = models.CharField(choices=LANGUAGE_CHOICES, max_length=10, default='')
    nature_of_referral = models.CharField(choices=NATURE_CHOICES, max_length=20, default='Emergency')
    patient_id = models.IntegerField(default=0)
    location = models.CharField(max_length=200, default='', blank=True)
    country = models.CharField(max_length=100)
    age = models.CharField(max_length=50, blank=True, default='')
    birth_date = models.CharField(max_length=50, blank=True, default='')
    sex = models.CharField(choices=GENDER_CHOICES, default="F", max_length=10)
    description = models.TextField(blank=True, default='')
    history_description = models.TextField(blank=True, default='')
    diagnosis = models.TextField(blank=True, default='')
    past_medical_history = models.TextField(blank=True, default='')
    physical_examination = models.TextField(blank=True, default='')
    investigations = models.TextField(blank=True, default='')
    current_treatment = models.TextField(blank=True, default='')
    justification = models.TextField(blank=True, default='')
    recommendation = models.TextField(blank=True, default='')
    outcome = models.CharField(max_length=100, blank=True, default='')

    categories = models.ManyToManyField(
        to=Category,
        related_name='cases',
    )
    consent = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    status = xwf_models.StateField(CaseWorkflow)
    organisations = models.ManyToManyField(
        to=Organisation,
        blank=True,
        through='Partnership',
    )
    created_by = models.ForeignKey(
        to=User,
        related_name="cases_created",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    @xworkflows.transition_check("reject")
    def hook(self, *args, **kwargs):
        if self.partnered_organisations.filter(status="assigned").exists():
            return False
        return True

    class Meta:
        permissions = [
            ("validate_case", "Can validate cases"),
            ("close_case", "Can close cases"),
            ("reopen_case", "Can reopen cases"),
            ("reject_case", "Can reject cases"),
            ("assign_organisations", "Can assign a case to a matched and accepted organisation"),
            ("match_organisations", "Can match organisations to cases"),
            ("update_match", "Can set a matched partnership to accepted/rejected"),
            ("view_dashboard", "Can look at the dashboard to see statistics and insights."),
            ("view_general_info", "Can view general information about a case"),
            ("update_general_info", "Can update general information about a case"),
            ("view_medical_info", "Can view medical information about a case"),
            ("update_medical_info", "Can update medical information about a case"),
        ]

    def __str__(self):
        return f'Case {self.id}: {self.title}'


class PartnerWorkflow(xwf_models.Workflow):
    log_model = ''
    states = (
        ('matched', _(u"Matched")),
        ('accepted', _(u"Accepted")),
        ('assigned', _(u"Assigned")),
        ('rejected', _(u"Rejected"))
    )
    transitions = (
        ('downgrade', 'accepted', 'matched'),
        ('accept', ('matched', 'assigned'), 'accepted'),
        ('assign', 'accepted', 'assigned'),
        ('reject', 'matched', 'rejected'),
        ('unreject', 'rejected', 'matched')

    )
    initial_state = 'matched'


class Partnership(xwf_models.WorkflowEnabled, models.Model):
    case = models.ForeignKey(
        to=Case,
        on_delete=models.CASCADE,
        related_name='partnered_organisations'
    )
    organisation = models.ForeignKey(
        to=Organisation,
        on_delete=models.CASCADE,
        related_name='partnered_cases'
    )
    status = xwf_models.StateField(PartnerWorkflow)

    class Meta:
        unique_together = ('case', 'organisation')
