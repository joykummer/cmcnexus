# Generated by Django 3.0.4 on 2020-04-21 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cases', '0029_merge_20200420_1934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='nature_of_referral',
            field=models.CharField(choices=[('Emergency', 'Emergency'), ('Urgent', 'Urgent'), ('Life changing', 'Life changing')], default='Emergency', max_length=20),
        ),
    ]
