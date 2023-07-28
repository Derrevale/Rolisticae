# Importation des modules nécessaires
from django.urls import path  # Pour les chemins d'URL
from .views import campaign_list  # Importation de la vue campaign_list

app_name = 'campaigns'  # Nom de l'application

# Définition des chemins d'URL
urlpatterns = [
    path('list/', campaign_list, name='campaign_list'),  # Chemin pour la liste des campagnes
]
