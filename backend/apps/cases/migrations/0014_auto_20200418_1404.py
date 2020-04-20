# Generated by Django 3.0.4 on 2020-04-18 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0013_auto_20200418_1335'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='language',
            field=models.CharField(choices=[('German', 'German'), ('English', 'English'), ('Spanish', 'Spanish')], default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='case',
            name='nature_of_referral',
            field=models.CharField(choices=[('Urgent', 'Urgent'), ('Life changing', 'Life changing'), ('Emergency', 'Emergency')], default='', max_length=20),
        ),
    ]
