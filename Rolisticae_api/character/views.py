from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from .models import Character, Race, Equipment, Knowledge, Statistics, History, HealingPotion, FoodDrink, \
    MiscellaneousItem, MagicItem
from .serializers import CharacterSerializer
from .serializers import RaceSerializer
from .serializers import EquipmentSerializer
from .serializers import KnowledgeSerializer
from .serializers import StatisticsSerializer
from .serializers import HistorySerializer
from .serializers import HealingPotionSerializer
from .serializers import FoodDrinkSerializer
from .serializers import MiscellaneousItemSerializer
from .serializers import MagicItemSerializer


class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer


class RaceViewSet(viewsets.ModelViewSet):
    queryset = Race.objects.all()
    serializer_class = RaceSerializer


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer


class KnowledgeViewSet(viewsets.ModelViewSet):
    queryset = Knowledge.objects.all()
    serializer_class = KnowledgeSerializer


class StatisticsViewSet(viewsets.ModelViewSet):
    queryset = Statistics.objects.all()
    serializer_class = StatisticsSerializer


class HistoryViewSet(viewsets.ModelViewSet):
    queryset = History.objects.all()
    serializer_class = HistorySerializer


class HealingPotionViewSet(viewsets.ModelViewSet):
    queryset = HealingPotion.objects.all()
    serializer_class = HealingPotionSerializer


class FoodDrinkViewSet(viewsets.ModelViewSet):
    queryset = FoodDrink.objects.all()
    serializer_class = FoodDrinkSerializer


class MiscellaneousItemViewSet(viewsets.ModelViewSet):
    queryset = MiscellaneousItem.objects.all()
    serializer_class = MiscellaneousItemSerializer


class MagicItemViewSet(viewsets.ModelViewSet):
    queryset = MagicItem.objects.all()
    serializer_class = MagicItemSerializer
