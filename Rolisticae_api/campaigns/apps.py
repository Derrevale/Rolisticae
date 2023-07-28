# Importation du module nécessaire
from django.apps import AppConfig  # Pour la configuration de l'application

# Classe pour la configuration de l'application Campaigns
class CampaignsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # Définition du champ auto par défaut
    name = 'campaigns'  # Nom de l'application
    verbose_name = 'Campaigns'  # Nom affiché pour l'application
