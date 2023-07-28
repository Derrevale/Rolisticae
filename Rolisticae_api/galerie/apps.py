# Importation du module AppConfig de Django
from django.apps import AppConfig

# Définition de la configuration de l'application 'galerie'
class GalerieConfig(AppConfig):
    # Définition du type de champ à utiliser pour les clés primaires automatiques
    default_auto_field = 'django.db.models.BigAutoField'
    # Nom de l'application
    name = 'galerie'
