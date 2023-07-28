# Importation des modules nécessaires
from rest_framework import viewsets  # Pour les vues
from .models import Campaign  # Importation du modèle Campaign
from .serializers import CampaignSerializer  # Importation du sérialiseur CampaignSerializer

# Vue pour les campagnes
class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()  # Utilisation de toutes les instances de Campaign
    serializer_class = CampaignSerializer  # Utilisation du sérialiseur CampaignSerializer
