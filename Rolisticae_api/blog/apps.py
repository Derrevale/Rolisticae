# Importation du module nécessaire
from django.apps import AppConfig  # Pour la configuration de l'application

# Classe pour la configuration de l'application Blog
class BlogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # Définition du champ auto par défaut
    name = 'blog'  # Nom de l'application
