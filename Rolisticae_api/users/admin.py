# Importation des modules nécessaires
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import User
from character.models import Character  # Assurez-vous que l'importation est correcte

# Définition de l'inline pour le modèle Character
class CharacterInline(admin.StackedInline):
    model = Character
    extra = 0  # Nombre de formulaires supplémentaires à afficher

# Définition de l'admin pour le modèle User
class UserAdmin(DefaultUserAdmin):
    inlines = [CharacterInline]

# Remplacement de l'administration par défaut du modèle User par l'UserAdmin personnalisé
if admin.site.is_registered(User):
    admin.site.unregister(User)
admin.site.register(User, UserAdmin)