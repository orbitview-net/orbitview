# Generated by Django 5.1.7 on 2025-03-13 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_organization_industry'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='slogan',
            field=models.CharField(default='-', max_length=255),
        ),
    ]
