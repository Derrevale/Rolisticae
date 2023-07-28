# Importation des modules nécessaires
from .models import Calendar, Event  # Importation des modèles
from rest_framework import serializers  # Pour les sérialiseurs

# Sérialiseur pour les calendriers
class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar  # Utilisation du modèle Calendar
        fields = '__all__'  # Sérialisation de tous les champs

# Sérialiseur pour les événements
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event  # Utilisation du modèle Event
        fields = '__all__'  # Sérialisation de tous les champs
