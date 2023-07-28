# Importation des modules nécessaires
from django.apps import AppConfig

# Définition de la configuration de l'application 'users'
class UsersConfig(AppConfig):
    # Définition du type de champ à utiliser pour les champs d'ID auto-incrémentés
    default_auto_field = 'django.db.models.BigAutoField'
    # Nom de l'application
    name = 'users'
