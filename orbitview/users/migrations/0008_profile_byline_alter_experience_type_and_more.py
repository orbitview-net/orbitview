# Generated by Django 5.1.7 on 2025-03-12 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_experience_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='byline',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='experience',
            name='type',
            field=models.CharField(choices=[('EDU', 'Education'), ('CLUB', 'Club'), ('WORK', 'Work')], max_length=10),
        ),
        migrations.AlterField(
            model_name='organization',
            name='type',
            field=models.CharField(choices=[('CORP', 'Corporation'), ('NONP', 'Nonprofit'), ('CLUB', 'Club'), ('STARTUP', 'Startup'), ('GOV', 'Government Agency'), ('EDU', 'Educational Institution'), ('SMB', 'Small Business'), ('FREELANCE', 'Freelance/Independent'), ('PARTNER', 'Partnership'), ('OSS', 'Open Source Project')], default='CORP', max_length=20),
        ),
    ]
