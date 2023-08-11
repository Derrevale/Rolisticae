# Generated by Django 4.1.5 on 2023-07-31 10:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('character', '0003_rename_charisma_character_destiny_points_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Statistics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('strength', models.IntegerField()),
                ('strength_bonus', models.IntegerField(default=0)),
                ('dexterity', models.IntegerField()),
                ('dexterity_bonus', models.IntegerField(default=0)),
                ('constitution', models.IntegerField()),
                ('constitution_bonus', models.IntegerField(default=0)),
                ('perception', models.IntegerField()),
                ('perception_bonus', models.IntegerField(default=0)),
                ('charisma', models.IntegerField()),
                ('charisma_bonus', models.IntegerField(default=0)),
                ('intelligence', models.IntegerField()),
                ('intelligence_bonus', models.IntegerField(default=0)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='statistics', to='character.character')),
            ],
        ),
    ]
