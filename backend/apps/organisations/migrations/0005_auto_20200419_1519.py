# Generated by Django 3.0.4 on 2020-04-19 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0004_auto_20200410_1537'),
        ('organisations', '0004_remove_organisation_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organisation',
            name='categories',
            field=models.ManyToManyField(related_name='organisations', to='categories.Category'),
        ),
    ]
