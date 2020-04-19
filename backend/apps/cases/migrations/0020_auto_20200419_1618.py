# Generated by Django 3.0.4 on 2020-04-19 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0019_auto_20200419_0913'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='case',
            options={'permissions': [('validate_case', 'Can validate cases'), ('close_case', 'Can close cases'), ('reject_case', 'Can reject cases'), ('assign_organisations', 'Can assign a case to a matched and accepted organisation'), ('match_organisations', 'Can match organisations to cases'), ('update_match', 'Can set a matched partnership to accepted/rejected'), ('view_general_info', 'Can view general information about a case'), ('update_general_info', 'Can update general information about a case'), ('view_medical_info', 'Can view medical information about a case'), ('update_medical_info', 'Can update medical information about a case')]},
        ),
        migrations.AlterField(
            model_name='case',
            name='nature_of_referral',
            field=models.CharField(choices=[('Urgent', 'Urgent'), ('Life changing', 'Life changing'), ('Emergency', 'Emergency')], default='', max_length=20),
        ),
    ]
