from django.db import models
from django.contrib.auth import get_user_model
from django_xworkflows import models as xwf_models
from django.utils.translation import gettext as _


from apps.organisations.models import Organisation
from apps.categories.models import Category

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
        default=0
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
        through='PartneredOrganisations',
    )
    # assigned_partners = models.ManyToManyField(
    #     to=Organisation,
    #     related_name='assigned_cases',
    #     blank=True,
    # )
    # accepted_partners = models.ManyToManyField(
    #     to=Organisation,
    #     related_name='accepted_cases',
    #     blank=True,
    # )
    # matched_partners = models.ManyToManyField(
    #     to=Organisation,
    #     related_name='matched_cases',
    #     blank=True,
    # )
    created_by = models.ForeignKey(
        to=User,
        related_name="cases_created",
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    class Meta:
        permissions = [
            ("validate_case", "Can validate cases"),
            ("close_case", "Can close cases"),
            ("reject_case", "Can reject cases"),
            ("assign_organizations", "Can assign a case to a matched and accepted organization"),
            ("match_organizations", "Can match organizations to cases"),
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
        ('reject', 'matched', 'rejected')
    )
    initial_state = 'matched'


class PartneredOrganisations(xwf_models.WorkflowEnabled, models.Model):
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




