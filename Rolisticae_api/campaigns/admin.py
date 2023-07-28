# Importation des modules nécessaires
from django.contrib import admin  # Pour l'administration de Django
from .models import Campaign  # Importation du modèle Campaign

# Classe pour l'administration du modèle Campaign
@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')  # Afficher le nom et la description dans la liste des campagnes
    list_filter = ('name',)  # Ajouter un filtre pour rechercher par nom de campagne
    search_fields = ('name', 'description')  # Ajouter une barre de recherche pour le nom et la description de la campagne
