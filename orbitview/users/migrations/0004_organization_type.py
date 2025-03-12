# Generated by Django 5.1.7 on 2025-03-12 01:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_organization_profile_profile_pic'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='type',
            field=models.CharField(choices=[('CORP', 'Corporation'), ('NONP', 'Nonprofit'), ('STARTUP', 'Startup'), ('GOV', 'Government Agency'), ('EDU', 'Educational Institution'), ('SMB', 'Small Business'), ('FREELANCE', 'Freelance/Independent'), ('PARTNER', 'Partnership'), ('OSS', 'Open Source Project')], default='CORP', max_length=20),
        ),
    ]
