from rest_framework import viewsets
from .models import Appointment, Vote
from .serializers import AppointmentSerializer, VoteSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

    def perform_create(self, serializer):
        appointment_dates = self.request.data.get('appointment_dates', [])
        for appointment_date in appointment_dates:
            if Vote.objects.filter(user=self.request.user, appointment_date=appointment_date).exists():
                raise serializers.ValidationError(f"Vous avez déjà voté pour le rendez-vous {appointment_date}.")
        serializer.save(user=self.request.user)
