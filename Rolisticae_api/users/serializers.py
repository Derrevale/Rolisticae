from rest_framework import serializers
from .models import User
from character.models import  (
    Character,
    Race,
    Equipment,
    MagicItem,
    MiscellaneousItem,
    FoodDrink,
    HealingPotion,
    Wealth,
    Knowledge,
    History,
    Note,
    Statistics
)

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ['name','roll','description']
        ref_name = 'EquipmentSerializerUser'  # Ajoutez cette ligne

class RaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Race
        fields = ['name']
        ref_name = 'RaceSerializerUser'

class MagicItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MagicItem
        fields = ['name', 'description', 'quantity']
        ref_name = 'MagicItemSerializerUser'

class MiscellaneousItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiscellaneousItem
        fields = ['name', 'description', 'quantity']
        ref_name = 'MiscellaneousItemSerializerUser'


class FoodDrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodDrink
        fields = ['name', 'description', 'quantity']
        ref_name = 'FoodDrinkSerializerUser'


class HealingPotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealingPotion
        fields = ['name', 'description', 'quantity']
        ref_name = 'HealingPotionSerializerUser'


class WealthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wealth
        fields = ['gold_pieces', 'silver_pieces', 'copper_pieces', 'bank']


class KnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Knowledge
        fields = ['name', 'description', 'strength_bonus', 'strength_malus', 'dexterity_bonus', 'dexterity_malus', 'constitution_bonus', 'constitution_malus', 'perception_bonus', 'perception_malus', 'charisma_bonus', 'charisma_malus', 'intelligence_bonus', 'intelligence_malus']

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['text']
        ref_name = 'HistorySerializerUser'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['text']

class StatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistics
        fields = ['strength', 'strength_bonus', 'strength_malus', 'dexterity', 'dexterity_bonus', 'dexterity_malus', 'constitution', 'constitution_bonus', 'constitution_malus', 'perception', 'perception_bonus', 'perception_malus', 'charisma', 'charisma_bonus', 'charisma_malus', 'intelligence', 'intelligence_bonus', 'intelligence_malus']
        ref_name = 'StatisticsSerializerUser'

class CharacterSerializer(serializers.ModelSerializer):
    race = RaceSerializer()
    equipment_set = EquipmentSerializer(many=True)
    magic_items = MagicItemSerializer(many=True)
    miscellaneous_items = MiscellaneousItemSerializer(many=True)
    food_drinks = FoodDrinkSerializer(many=True)
    healing_potions = HealingPotionSerializer(many=True)
    wealth = WealthSerializer(many=True)
    knowledge = KnowledgeSerializer(many=True)
    history = HistorySerializer(many=True)
    notes = NoteSerializer(many=True)
    statistics = StatisticsSerializer(many=True)

    class Meta:
        model = Character
        fields = ['id', 'first_name', 'campaign', 'last_name', 'level', 'health_points', 'mana_points', 'destiny_points', 'health_points_max', 'mana_points_max', 'race', 'equipment_set', 'magic_items', 'miscellaneous_items', 'food_drinks', 'healing_potions', 'wealth', 'knowledge', 'history', 'notes', 'statistics']
        ref_name = 'CharacterSerializerUser'  # Ajoutez cette ligne

class UserSerializer(serializers.ModelSerializer):
    characters = CharacterSerializer(many=True, read_only=True)  # Nouveau champ pour les personnages

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'password', 'characters']  # Ajoutez characters à fields
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
