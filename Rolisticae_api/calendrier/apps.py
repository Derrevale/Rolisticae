# Importation du module nécessaire
from django.apps import AppConfig  # Pour la configuration de l'application

# Classe pour la configuration de l'application Calendrier
class CalendrierConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # Définition du champ auto par défaut
    name = 'calendrier'  # Nom de l'application
