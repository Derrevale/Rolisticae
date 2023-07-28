# Importation des modules nécessaires
from rest_framework import serializers  # Pour les sérialiseurs
from .models import Appointment, AppointmentDate, Vote  # Importation des modèles

# Sérialiseur pour les dates de rendez-vous
class AppointmentDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentDate  # Utilisation du modèle AppointmentDate
        fields = '__all__'  # Sérialisation de tous les champs

# Sérialiseur pour les rendez-vous
class AppointmentSerializer(serializers.ModelSerializer):
    dates = AppointmentDateSerializer(many=True, read_only=True)  # Sérialisation des dates de rendez-vous

    class Meta:
        model = Appointment  # Utilisation du modèle Appointment
        fields = ['id', 'name', 'description', 'dates']  # Sérialisation de ces champs

# Sérialiseur pour les votes
class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote  # Utilisation du modèle Vote
        fields = '__all__'  # Sérialisation de tous les champs
