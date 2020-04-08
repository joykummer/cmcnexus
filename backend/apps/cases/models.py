from django.db import models


class Case(models.Model):
    SEXES = (
        ('0', 'Female'),
        ('1', 'Male'),
    )

    title = models.CharField(max_length=160)
    description = models.TextField()
    diagnosis = models.TextField()
    justification = models.TextField()
    recommendation = models.TextField()
    category = models.CharField(max_length=200)
    consent = models.BooleanField(default=False)
    age = models.IntegerField(null=True)
    sex = models.BooleanField(choices=SEXES, default=0)
    country = models.CharField(max_length=150)
    comments = models.TextField()
    outcome = models.CharField(max_length=160)
    created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    


    




    country = CountryField(blank_label='(select country)')
    street = models.CharField(max_length=270)
    city = models.CharField(max_length=90)

    def __str__(self):
        return f'Case {self.id}: {self.title}'
