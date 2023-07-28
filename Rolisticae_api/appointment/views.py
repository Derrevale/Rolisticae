# Importation des modules nécessaires
from rest_framework import viewsets  # Pour les vues
from .models import Appointment, Vote  # Importation des modèles
from .serializers import AppointmentSerializer, VoteSerializer  # Importation des sérialiseurs

# Vue pour les rendez-vous
class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()  # Tous les rendez-vous sont récupérés
    serializer_class = AppointmentSerializer  # Utilisation du sérialiseur AppointmentSerializer

# Vue pour les votes
class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()  # Tous les votes sont récupérés
    serializer_class = VoteSerializer  # Utilisation du sérialiseur VoteSerializer

    # Méthode pour créer un vote
    def perform_create(self, serializer):
        appointment_dates = self.request.data.get('appointment_dates', [])  # Récupération des dates de rendez-vous
        for appointment_date in appointment_dates:
            # Vérification si l'utilisateur a déjà voté pour cette date de rendez-vous
            if Vote.objects.filter(user=self.request.user, appointment_date=appointment_date).exists():
                # Si oui, une erreur est levée
                raise serializers.ValidationError(f"Vous avez déjà voté pour le rendez-vous {appointment_date}.")
        # Si non, le vote est enregistré
        serializer.save(user=self.request.user)
