from django.db import models
from django.conf import settings
from campaigns.models import Campaign
from ckeditor.fields import RichTextField  # Pour les champs de texte enrichi
from rest_framework.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

class Race(models.Model):
    name = models.CharField(max_length=100)
    description = RichTextField()
    strength_bonus = models.IntegerField(default=0)
    strength_malus = models.IntegerField(default=0)
    dexterity_bonus = models.IntegerField(default=0)
    dexterity_malus = models.IntegerField(default=0)
    constitution_bonus = models.IntegerField(default=0)
    constitution_malus = models.IntegerField(default=0)
    perception_bonus = models.IntegerField(default=0)
    perception_malus = models.IntegerField(default=0)
    charisma_bonus = models.IntegerField(default=0)
    charisma_malus = models.IntegerField(default=0)
    intelligence_bonus = models.IntegerField(default=0)
    intelligence_malus = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Character(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='characters')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    level = models.IntegerField()
    health_points = models.IntegerField()
    mana_points = models.IntegerField()
    destiny_points = models.IntegerField()
    experience = models.IntegerField()
    race = models.ForeignKey(Race, on_delete=models.SET_NULL, null=True)
    sex = models.CharField(max_length=100)
    size = models.CharField(max_length=100)
    # Include other fields as needed
    def __str__(self):
        return f"[{self.user.username}] {self.first_name} {self.last_name} "

class Equipment(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='equipment')
    name = models.CharField(max_length=100)
    roll = models.CharField(max_length=100)
    description = RichTextField()

class MagicItem(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='magic_items')
    name = models.CharField(max_length=100)
    description = RichTextField()
    quantity = models.IntegerField()

class MiscellaneousItem(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='miscellaneous_items')
    name = models.CharField(max_length=100)
    description = RichTextField()
    quantity = models.IntegerField()

class FoodDrink(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='food_drinks')
    name = models.CharField(max_length=100)
    description = RichTextField()
    quantity = models.IntegerField()

class HealingPotion(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='healing_potions')
    name = models.CharField(max_length=100)
    description = RichTextField()
    quantity = models.IntegerField()

class Wealth(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='wealth')
    gold_pieces = models.IntegerField(default=0)
    silver_pieces = models.IntegerField(default=1)
    copper_pieces = models.IntegerField(default=10)
    bank = models.IntegerField(default=0)

class Knowledge(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='knowledge')
    name = models.CharField(max_length=100)
    description = RichTextField()
    strength_bonus = models.IntegerField(default=0)
    strength_malus = models.IntegerField(default=0)
    dexterity_bonus = models.IntegerField(default=0)
    dexterity_malus = models.IntegerField(default=0)
    constitution_bonus = models.IntegerField(default=0)
    constitution_malus = models.IntegerField(default=0)
    perception_bonus = models.IntegerField(default=0)
    perception_malus = models.IntegerField(default=0)
    charisma_bonus = models.IntegerField(default=0)
    charisma_malus = models.IntegerField(default=0)
    intelligence_bonus = models.IntegerField(default=0)
    intelligence_malus = models.IntegerField(default=0)


class History(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='history')
    text = RichTextField(default="Joueur - ")

class Note(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='notes')
    text = RichTextField()

class Statistics(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='statistics')
    strength = models.IntegerField(default=55)
    strength_bonus = models.IntegerField(default=0)
    strength_malus = models.IntegerField(default=0)

    dexterity = models.IntegerField(default=55)
    dexterity_bonus = models.IntegerField(default=0)
    dexterity_malus = models.IntegerField(default=0)

    constitution = models.IntegerField(default=55)
    constitution_bonus = models.IntegerField(default=0)
    constitution_malus = models.IntegerField(default=0)

    perception = models.IntegerField(default=55)
    perception_bonus = models.IntegerField(default=0)
    perception_malus = models.IntegerField(default=0)

    charisma = models.IntegerField(default=55)
    charisma_bonus = models.IntegerField(default=0)
    charisma_malus = models.IntegerField(default=0)

    intelligence = models.IntegerField(default=55)
    intelligence_bonus = models.IntegerField(default=0)
    intelligence_malus = models.IntegerField(default=0)

    def calculate_bonus(self):
        race = self.character.race
        knowledge = self.character.knowledge.all()

        self.strength_bonus = race.strength_bonus + sum(k.strength_bonus for k in knowledge)
        self.strength_malus = race.strength_malus + sum(k.strength_malus for k in knowledge)

        self.constitution_bonus = race.constitution_bonus + sum(k.constitution_bonus for k in knowledge)
        self.constitution_malus = race.constitution_malus + sum(k.constitution_malus for k in knowledge)

        self.dexterity_bonus = race.dexterity_bonus + sum(k.dexterity_bonus for k in knowledge)
        self.dexterity_malus = race.dexterity_malus + sum(k.dexterity_malus for k in knowledge)

        self.perception_bonus = race.perception_bonus + sum(k.perception_bonus for k in knowledge)
        self.perception_malus = race.perception_malus + sum(k.perception_malus for k in knowledge)

        self.charisma_bonus = race.charisma_bonus + sum(k.charisma_bonus for k in knowledge)
        self.charisma_malus = race.charisma_malus + sum(k.charisma_malus for k in knowledge)

        self.intelligence_bonus = race.intelligence_bonus + sum(k.intelligence_bonus for k in knowledge)
        self.intelligence_malus = race.intelligence_malus + sum(k.intelligence_malus for k in knowledge)


    def save(self, *args, **kwargs):
        self.calculate_bonus()
        super().save(*args, **kwargs)

    @receiver(post_save, sender=Race)
    def update_statistics_on_race_save(sender, instance, **kwargs):
        for character in instance.character_set.all():
            statistics = character.statistics.first()
            if statistics:
                statistics.calculate_bonus()
                statistics.save()

    @receiver(post_save, sender=Knowledge)
    def update_statistics_on_knowledge_save(sender, instance, **kwargs):
        statistics = instance.character.statistics.first()
        if statistics:
            statistics.calculate_bonus()
            statistics.save()

    @receiver(post_save, sender=Character)
    def update_statistics_on_character_save(sender, instance, created, **kwargs):
        if created:
            Statistics.objects.create(character=instance)
        statistics = instance.statistics.first()
        if statistics:
            statistics.calculate_bonus()
            statistics.save()
