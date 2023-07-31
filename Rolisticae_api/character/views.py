from rest_framework import generics
from .models import Character, Equipment, MagicItem, MiscellaneousItem, FoodDrink, HealingPotion, Wealth, Knowledge, History, Note
from .serializers import CharacterSerializer, EquipmentSerializer, MagicItemSerializer, MiscellaneousItemSerializer, FoodDrinkSerializer, HealingPotionSerializer, WealthSerializer, KnowledgeSerializer, HistorySerializer, NoteSerializer

class CharacterList(generics.ListCreateAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class CharacterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

# Repeat the above two classes for each of the other models (Equipment, MagicItem, etc.), replacing 'Character' with the appropriate model name
