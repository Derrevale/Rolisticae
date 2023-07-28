# Importation des modules nécessaires
from django.contrib import admin
from .models import User

# Enregistrement du modèle User dans l'interface d'administration de Django
admin.site.register(User)
