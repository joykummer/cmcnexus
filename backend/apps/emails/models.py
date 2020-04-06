from django.core.mail import send_mail
from django.db import models

from apps.emails.content import write_password_reset_email, write_registration_email

EMAIL_TYPES = {
    'UserRegistration': 'UR',
    'PasswordReset': 'PR',
}
EMAIL_CONTENT_CONSTRUCTOR = {
    EMAIL_TYPES['UserRegistration']: write_registration_email,
    EMAIL_TYPES['PasswordReset']: write_password_reset_email,
}
EMAIL_TYPE_CHOICES = [(value, key) for value, key in enumerate(EMAIL_TYPES)]

EMAIL_SUBJECTS = {
    EMAIL_TYPES['UserRegistration']: 'Capricorn Sharks User Registration',
    EMAIL_TYPES['PasswordReset']: 'Capricorn Sharks Password Reset',
}


class Email(models.Model):
    to = models.EmailField()
    type = models.CharField(max_length=2, choices=EMAIL_TYPE_CHOICES)
    is_sent = models.BooleanField(default=False)
    validation_code = models.IntegerField()

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def send(self):
        send_mail(
            subject=EMAIL_SUBJECTS[self.type],
            message=EMAIL_CONTENT_CONSTRUCTOR[self.type](self.validation_code),
            from_email='student.sharks@propulsionacademy.com',
            recipient_list=[self.to],
            fail_silently=False,
        )
        self.is_sent = True
        self.save()

    def __str__(self):
        return f'Email {self.type} to {self.to}'
