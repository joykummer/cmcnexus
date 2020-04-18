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
        ('created', _(u"Created")),
        ('open', _(u"Open")),
        ('closed', _(u"Closed")),
        ('rejected', _(u"Rejected"))
    )
    transitions = (
        ('validate', 'created', 'open'),
        ('close', 'open', 'closed'),
        ('reject', ('created', 'open'), 'rejected')
    )
    initial_state = 'created'


class Case(xwf_models.WorkflowEnabled, models.Model):

    GENDER_CHOICES = (
        ("F", 'Female'),
        ("M", 'Male'),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    diagnosis = models.TextField()
    justification = models.TextField()
    recommendation = models.TextField()
    categories = models.ManyToManyField(
        to=Category,
        related_name='cases',
    )
    consent = models.BooleanField(default=False)
    age = models.CharField(max_length=50)
    sex = models.CharField(choices=GENDER_CHOICES, default="F", max_length=10)
    country = models.CharField(max_length=100)
    comments = models.TextField(blank=True, default='')
    outcome = models.CharField(max_length=100, blank=True, default='')
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
            ("reject_case", "Can reject cases"),
            ("assign_organisations", "Can assign a case to a matched and accepted organisation"),
            ("match_organisations", "Can match organisations to cases"),
            ("update_match", "Can set a matched partnership to accepted/rejected"),
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
