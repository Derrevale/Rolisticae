from rest_framework import serializers
from .models import Character, Equipment, MagicItem, MiscellaneousItem, FoodDrink, HealingPotion, Wealth, Knowledge, History, Note

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = '__all__'

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

class WealthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wealth
        fields = '__all__'

class KnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Knowledge
        fields = '__all__'

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
