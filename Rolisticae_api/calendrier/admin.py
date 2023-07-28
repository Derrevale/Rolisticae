# Importation des modules nécessaires
from django.contrib import admin  # Pour l'administration de Django
from .models import Calendar, Event  # Importation des modèles

# Classe pour l'administration du modèle Event en tant qu'inline
class EventInline(admin.TabularInline):
    model = Event  # Utilisation du modèle Event
    extra = 0  # Nombre d'extra forms à afficher
    fields = ('title', 'Debut', 'Fin', 'description')  # Champs à afficher
    show_change_link = True  # Afficher le lien de modification
    verbose_name_plural = 'Events'  # Nom pluriel pour Event

# Classe pour l'administration du modèle Calendar
@admin.register(Calendar)
class CalendarAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Champs à afficher dans la liste
    prepopulated_fields = {'slug': ('name',)}  # Pré-remplir le slug à partir du nom
    inlines = [EventInline]  # Utilisation de EventInline

# Classe pour l'administration du modèle Event
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'Debut', 'Fin', 'location', 'category', 'created_at', 'updated_at')  # Champs à afficher dans la liste
    list_filter = ('category', 'recurrency')  # Filtres à utiliser
    search_fields = ('title', 'location', 'category__name')  # Champs à utiliser pour la recherche
    exclude = ('rrule',)  # Champs à exclure

    # Organisation des champs en sections
    fieldsets = (
        (None, {
            'fields': ('title','category', 'Debut', 'Fin', 'location','description')  # Section sans titre
        }),
        ('Optional', {
            'fields': ('recurrency','frequency', 'count', 'interval'),  # Section "Optional"
            'classes': ('collapse',)  # Classe pour rendre la section repliable
        }),
    )
