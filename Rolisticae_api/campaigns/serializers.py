# Importation des modules nécessaires
from rest_framework import serializers  # Pour les sérialiseurs
from .models import Campaign  # Importation du modèle Campaign

# Sérialiseur pour les campagnes
class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign  # Utilisation du modèle Campaign
        fields = '__all__'  # Sérialisation de tous les champs
