# Generated by Django 4.1.5 on 2023-07-31 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0001_initial'),
        ('character', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='character',
            name='campaign',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='characters', to='campaigns.campaign'),
        ),
        migrations.DeleteModel(
            name='Campaign',
        ),
    ]