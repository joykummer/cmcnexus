from django.db import models
from django.contrib.auth import get_user_model
from django_xworkflows import models as xwf_models
from django.utils.translation import gettext as _


from apps.organisations.models import Organisation

User = get_user_model()


class CaseWorkflow(xwf_models.Workflow):
    log_model = ''
    states = (
        ('created', _(u"Created")),
        ('validated', _(u"Validated")),
        ('closed', _(u"Closed")),
        ('rejected', _(u"Rejected"))
    )
    transitions = (
        ('validate', 'created', 'validated'),
        ('close', 'validated', 'closed'),
        ('reject', ('created', 'validated'), 'rejected')
    )
    initial_state = 'created'


class Case(xwf_models.WorkflowEnabled, models.Model):

    GENDER_CHOICES = (
        (0, 'Female'),
        (1, 'Male'),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    diagnosis = models.TextField()
    justification = models.TextField()
    recommendation = models.TextField()
    category = models.CharField(max_length=100)
    consent = models.BooleanField(default=False)
    age = models.CharField(max_length=50)
    sex = models.BooleanField(choices=GENDER_CHOICES, default=0)
    country = models.CharField(max_length=100)
    comments = models.TextField(blank=True, default='')
    outcome = models.CharField(max_length=100, blank=True, default='')
    created = models.DateTimeField(auto_now_add=True)
    status = xwf_models.StateField(CaseWorkflow)
    assigned_partners = models.ManyToManyField(
        to=Organisation,
        related_name='assigned_cases',
        blank=True,
    )
    matched_partners = models.ManyToManyField(
        to=Organisation,
        related_name='matched_cases',
        blank=True,
    )
    created_by = models.ForeignKey(
        to=User,
        related_name="cases_created",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    class Meta:
        permissions = [
            ("validate", "Can validate cases"),
            ("close", "Can close cases"),
            ("reject", "Can reject cases"),
            ("assign_organizations", "Can assign a case to a matched and accepted organization"),
            ("match_organizations", "Can match organizations to cases"),
        ]

    def __str__(self):
        return f'Case {self.id}: {self.title}'
