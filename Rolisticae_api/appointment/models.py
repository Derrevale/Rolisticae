# Importation des modules nécessaires
from django.conf import settings  # Pour accéder aux paramètres de configuration de Django
from django.db import models  # Pour les modèles de base de données

# Modèle pour les rendez-vous
class Appointment(models.Model):
    name = models.CharField(max_length=255)  # Nom du rendez-vous
    description = models.TextField()  # Description du rendez-vous

    # Méthode pour convertir l'objet en chaîne de caractères
    def __str__(self):
        return self.name  # Retourne le nom du rendez-vous

# Modèle pour les dates de rendez-vous
class AppointmentDate(models.Model):
    appointment = models.ForeignKey(Appointment, related_name='dates', on_delete=models.CASCADE)  # Clé étrangère vers le rendez-vous
    date = models.DateField()  # Date du rendez-vous
    start_time = models.TimeField()  # Heure de début du rendez-vous
    end_time = models.TimeField()  # Heure de fin du rendez-vous

    # Méthode pour convertir l'objet en chaîne de caractères
    def __str__(self):
        return f'{self.date} {self.start_time}-{self.end_time}'  # Retourne la date et l'heure du rendez-vous

# Modèle pour les votes
class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Clé étrangère vers l'utilisateur
    appointment_date = models.ManyToManyField(AppointmentDate, related_name='votes')  # Relations multiples vers les dates de rendez-vous

    # Méthode pour convertir l'objet en chaîne de caractères
    def __str__(self):
        return f'{self.user} - {", ".join(str(date) for date in self.appointment_date.all())}'  # Retourne l'utilisateur et les dates de rendez-vous
