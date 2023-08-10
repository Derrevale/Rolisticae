from rest_framework import serializers
from .models import Character, Equipment, MagicItem, MiscellaneousItem, FoodDrink, HealingPotion, History, Statistics, \
    Race, Knowledge


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
        ref_name = 'EquipmentSerializerCharacter'


class MagicItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MagicItem
        fields = '__all__'
        ref_name = 'MagicItemSerializerCharacter'


class MiscellaneousItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiscellaneousItem
        fields = '__all__'
        ref_name = 'MiscellaneousItemSerializerCharacter'


class FoodDrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodDrink
        fields = '__all__'
        ref_name = 'FoodDrinkSerializerCharacter'


class HealingPotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealingPotion
        fields = '__all__'
        ref_name = 'HealingPotionSerializerCharacter'


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'
        ref_name = 'HistorySerializerCharacter'


class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = '__all__'
        ref_name = 'StatisticsSerializerCharacter'


class KnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Knowledge
        fields = ['name', 'description', 'strength_bonus', 'strength_malus', 'dexterity_bonus', 'dexterity_malus',
                  'constitution_bonus', 'constitution_malus', 'perception_bonus', 'perception_malus', 'charisma_bonus',
                  'charisma_malus', 'intelligence_bonus', 'intelligence_malus']
        ref_name = 'KnowledgeSerializerCharacter'


class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Race
        fields = '__all__'
        ref_name = 'RaceSerializerCharacter'  # Ajoutez cette ligne


class CharacterSerializer(serializers.ModelSerializer):
    equipment_set = EquipmentSerializer(many=True)
    magic_items = MagicItemSerializer(many=True, read_only=True)
    miscellaneous_items = MiscellaneousItemSerializer(many=True, read_only=True)
    food_drinks = FoodDrinkSerializer(many=True, read_only=True)
    healing_potions = HealingPotionSerializer(many=True, read_only=True)
    history = HistorySerializer(many=True, read_only=True)
    statistics = StatisticsSerializer(many=True, read_only=True)
    race = RaceSerializer(read_only=True)
    knowledge = KnowledgeSerializer(many=True, read_only=True)

    class Meta:
        model = Character
        fields = '__all__'
        ref_name = 'CharacterSerializerCharacter'  # Ajoutez cette ligne
