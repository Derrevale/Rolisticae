# Importation du module nécessaire
from django.apps import AppConfig  # Pour la configuration de l'application

# Classe pour la configuration de l'application Appointment
class AppointmentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # Définition du champ auto par défaut
    name = 'appointment'  # Nom de l'application
