# Generated by Django 3.0.4 on 2020-04-09 09:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category_Organisation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('U', 'Undefined'), ('M', 'Medical'), ('A', 'Administrative'), ('L', 'Logistics')], default='U', max_length=1)),
            ],
        ),
    ]