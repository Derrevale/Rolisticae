from django.db import models
from django.conf import settings
from campaigns.models import Campaign
from ckeditor.fields import RichTextField  # Pour les champs de texte enrichi
from rest_framework.exceptions import ValidationError


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
    race = models.CharField(max_length=100)
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

class History(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='history')
    text = RichTextField(default="Joueur - ")

class Note(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='notes')
    text = RichTextField()

class Statistics(models.Model):
    character = models.ForeignKey(Character, on_delete=models.CASCADE, related_name='statistics')
    trength = models.IntegerField(default=55)
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
        self.strength += race.strength_bonus + sum(k.strength_bonus for k in knowledge)
        self.strength -= race.strength_malus + sum(k.strength_malus for k in knowledge)

        self.constitution += race.constitution_bonus + sum(k.constitution_bonus for k in knowledge)
        self.constitution -= race.constitution_malus + sum(k.constitution_malus for k in knowledge)

        self.dexterity += race.dexterity_bonus + sum(k.dexterity_bonus for k in knowledge)
        self.dexterity -= race.dexterity_malus + sum(k.dexterity_malus for k in knowledge)

        self.perception += race.perception_bonus + sum(k.perception_bonus for k in knowledge)
        self.perception -= race.perception_malus + sum(k.perception_malus for k in knowledge)

        self.charisma += race.charisma_bonus + sum(k.charisma_bonus for k in knowledge)
        self.charisma -= race.charisma_malus + sum(k.charisma_malus for k in knowledge)

        self.intelligence += race.intelligence_bonus + sum(k.intelligence_bonus for k in knowledge)
        self.intelligence -= race.intelligence_malus + sum(k.intelligence_malus for k in knowledge)

        self.save()

    def clean(self):
        # Calculate the total value of the statistics
        total_value = self.strength + self.dexterity + self.constitution + self.perception + self.charisma + self.intelligence

        # If the total value exceeds 330, raise a ValidationError
        if total_value > 330:
            raise ValidationError("The total value of the statistics cannot exceed 330.")

        # Check if any individual statistic exceeds 100
        stats = [self.strength, self.dexterity, self.constitution, self.perception, self.charisma, self.intelligence]
        if any(stat > 100 for stat in stats):
            raise ValidationError("No individual statistic can exceed 100.")

    def save(self, *args, **kwargs):
        self.clean()
        self.calculate_bonus()
        super().save(*args, **kwargs)
