# Importation des modules nécessaires
from ckeditor.fields import RichTextField  # Pour les champs de texte enrichi
from django.db import models  # Pour les modèles de base de données
from dateutil.rrule import *  # Pour les règles de récurrence
from dateutil.parser import *  # Pour l'analyse des dates
import pytz  # Pour la gestion des fuseaux horaires

# Choix pour la fréquence des événements
FREQUENCY_CHOICES = [
    (DAILY, 'Daily'),
    (WEEKLY, 'Weekly'),
    (MONTHLY, 'Monthly'),
    (YEARLY, 'yearly'),
]

# Modèle pour les calendriers
class Calendar(models.Model):
    name = models.CharField(max_length=255)  # Nom du calendrier
    description = models.TextField()  # Description du calendrier
    slug = models.SlugField(null=False, blank=False, unique=True, verbose_name='Slug')  # Slug du calendrier

    # Méthode pour convertir l'objet en chaîne de caractères
    def __str__(self):
        return self.name  # Retourne le nom du calendrier

# Modèle pour les événements
class Event(models.Model):
    title = models.CharField(max_length=255)  # Titre de l'événement
    Debut = models.DateTimeField(null=True, default=None)  # Date de début de l'événement
    Fin = models.DateTimeField(null=True, default=None)  # Date de fin de l'événement
    location = models.CharField(max_length=255)  # Lieu de l'événement
    description = RichTextField(null=True)  # Description de l'événement
    category = models.ForeignKey(Calendar, on_delete=models.CASCADE)  # Catégorie de l'événement (lien vers un calendrier)
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création de l'événement
    updated_at = models.DateTimeField(auto_now=True)  # Date de dernière mise à jour de l'événement
    recurrency = models.BooleanField(default=False)  # Indique si l'événement est récurrent
    rrule = models.CharField(max_length=255, null=True, blank=True)  # Règle de récurrence de l'événement
    frequency = models.PositiveSmallIntegerField(choices=FREQUENCY_CHOICES, default=DAILY)  # Fréquence de l'événement
    count = models.PositiveSmallIntegerField(default=1)  # Nombre d'occurrences de l'événement
    interval = models.PositiveSmallIntegerField(default=1)  # Intervalle entre les occurrences de l'événement

    # Méthode pour convertir l'objet en chaîne de caractères
    def __str__(self):
        return self.title  # Retourne le titre de l'événement

    # Méthode pour sauvegarder l'événement
    def save(self, *args, **kwargs):
        choice = [
            (0, 'YEARLY'),
            (1, 'MONTHLY'),
            (2, 'WEEKLY'),
            (3, 'DAILY'),
        ]
        # Création de la règle de récurrence
        self.rrule = "FREQ={};DTSTART={};INTERVAL={};COUNT={}".format(
            choice[self.frequency][1], self.Debut.astimezone(pytz.UTC).strftime("%Y%m%dT%H%M%S"), self.interval,
            self.count
        )
        super().save(*args, **kwargs)  # Appel de la méthode save() de la classe parente
