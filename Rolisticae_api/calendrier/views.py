# Importation des modules nécessaires
from django.shortcuts import render  # Pour le rendu des vues
from dateutil.rrule import rrule, DAILY, WEEKLY, MONTHLY  # Pour les règles de récurrence
from rest_framework.response import Response  # Pour les réponses de l'API
from .models import Calendar, Event  # Importation des modèles
from .serializers import CalendarSerializer, EventSerializer  # Importation des sérialiseurs
from rest_framework import viewsets  # Pour les vues

# Vue pour les calendriers
class CalendarysViewset(viewsets.ModelViewSet):
    serializer_class = CalendarSerializer  # Utilisation du sérialiseur CalendarSerializer
    queryset = Calendar.objects.all()  # Tous les calendriers sont récupérés
    tags = ['EventManager - Calendrier']  # Tags pour la vue

# Vue pour les événements
class EventViewset(viewsets.ModelViewSet):
    serializer_class = EventSerializer  # Utilisation du sérialiseur EventSerializer
    queryset = Event.objects.all()  # Tous les événements sont récupérés
    tags = ['EventManager - Event']  # Tags pour la vue

    # Méthode pour obtenir les événements récurrents
    def get_recurrent_events(self, request, *args, **kwargs):
        events = self.queryset.filter(rrule__isnull=False)  # Filtrage des événements récurrents
        recurrent_events = []  # Liste pour stocker les événements récurrents
        for event in events:
            rule = rrule.rrulestr(event.rrule)  # Création de la règle de récurrence
            for date in rule:
                recurrent_event = event  # Création d'un nouvel événement pour chaque occurrence
                recurrent_event.start_date = date  # Mise à jour de la date de début
                recurrent_events.append(recurrent_event)  # Ajout de l'événement à la liste
        serializer = self.serializer_class(recurrent_events, many=True)  # Sérialisation des événements
        return Response(serializer.data)  # Retour des événements sérialisés
