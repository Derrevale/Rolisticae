# Generated by Django 4.1.5 on 2023-07-31 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0004_statistics'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='statistics',
            name='strength',
        ),
        migrations.AddField(
            model_name='statistics',
            name='trength',
            field=models.IntegerField(default=55),
        ),
        migrations.AlterField(
            model_name='history',
            name='text',
            field=models.TextField(default='Joueur - '),
        ),
        migrations.AlterField(
            model_name='statistics',
            name='charisma',
            field=models.IntegerField(default=55),
        ),
        migrations.AlterField(
            model_name='statistics',
            name='constitution',
            field=models.IntegerField(default=55),
        ),
        migrations.AlterField(
            model_name='statistics',
            name='dexterity',
            field=models.IntegerField(default=55),
        ),
        migrations.AlterField(
            model_name='statistics',
            name='intelligence',
            field=models.IntegerField(default=55),
        ),
        migrations.AlterField(
            model_name='statistics',
            name='perception',
            field=models.IntegerField(default=55),
        ),
        migrations.AlterField(
            model_name='wealth',
            name='bank',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='wealth',
            name='copper_pieces',
            field=models.IntegerField(default=10),
        ),
        migrations.AlterField(
            model_name='wealth',
            name='gold_pieces',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='wealth',
            name='silver_pieces',
            field=models.IntegerField(default=1),
        ),
    ]
