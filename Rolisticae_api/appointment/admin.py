# Importation des modules nécessaires
from django.contrib import admin  # Pour l'administration de Django
from .models import Appointment, AppointmentDate, Vote  # Importation des modèles

# Classe pour afficher les dates de rendez-vous dans l'administration
class AppointmentDateInline(admin.TabularInline):
    model = AppointmentDate  # Utilisation du modèle AppointmentDate
    extra = 1  # Nombre de lignes à afficher
    fields = ('date', 'start_time', 'end_time')  # Champs à afficher

# Classe pour l'administration du modèle Appointment
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')  # Champs à afficher dans la liste
    inlines = [AppointmentDateInline]  # Inclusion de la classe AppointmentDateInline

# Enregistrement du modèle Appointment avec la classe AppointmentAdmin
admin.site.register(Appointment, AppointmentAdmin)

# Classe pour l'administration du modèle Vote
class VoteAdmin(admin.ModelAdmin):
    list_display = ('user', 'appointment_dates_list')  # Champs à afficher dans la liste

    # Méthode pour afficher la liste des dates de rendez-vous
    def appointment_dates_list(self, obj):
        return ", ".join([str(date) for date in obj.appointment_date.all()])  # Conversion des dates en chaînes de caractères et jointure avec une virgule
    appointment_dates_list.short_description = 'Appointment Dates'  # Description courte pour le champ

# Enregistrement du modèle Vote avec la classe VoteAdmin
admin.site.register(Vote, VoteAdmin)
