# Generated by Django 5.1.7 on 2025-03-12 01:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_birth', models.DateField()),
                ('membership', models.CharField(choices=[('C', 'Creator'), ('L', 'Learner')], max_length=1)),
                ('website', models.URLField(blank=True, max_length=2083, null=True)),
                ('linkedin', models.URLField(blank=True, max_length=2083, null=True)),
                ('external_links', models.JSONField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
