from rest_framework import viewsets
from .models import Character,Race
from .serializers import CharacterSerializer
from .serializers import RaceSerializer

class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class RaceViewSet(viewsets.ModelViewSet):
    queryset = Race.objects.all()
    serializer_class = RaceSerializer