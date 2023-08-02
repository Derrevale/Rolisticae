from rest_framework import serializers
from .models import Character, Equipment, MagicItem, MiscellaneousItem, FoodDrink, HealingPotion, History, Statistics, Race

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'

class MagicItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MagicItem
        fields = '__all__'

class MiscellaneousItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiscellaneousItem
        fields = '__all__'

class FoodDrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodDrink
        fields = '__all__'

class HealingPotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealingPotion
        fields = '__all__'

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'

class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = '__all__'

class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Race
        fields = '__all__'

class CharacterSerializer(serializers.ModelSerializer):
    equipment = EquipmentSerializer(many=True, read_only=True)
    magic_items = MagicItemSerializer(many=True, read_only=True)
    miscellaneous_items = MiscellaneousItemSerializer(many=True, read_only=True)
    food_drinks = FoodDrinkSerializer(many=True, read_only=True)
    healing_potions = HealingPotionSerializer(many=True, read_only=True)
    history = HistorySerializer(many=True, read_only=True)
    statistics = StatisticsSerializer(many=True, read_only=True)
    race = RaceSerializer(read_only=True)

    class Meta:
        model = Character
        fields = '__all__'
