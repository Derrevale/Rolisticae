from django.contrib import admin
from .models import Campaign

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    list_filter = ('name',)  # Ajoute un filtre de recherche par nom de campagne
    search_fields = ('name', 'description')  # Ajoute une barre de recherche pour le nom et la description de la campagne
