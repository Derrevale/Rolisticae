from rest_framework import serializers
from .models import Appointment, AppointmentDate, Vote

class AppointmentDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentDate
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    dates = AppointmentDateSerializer(many=True, read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'name', 'description', 'dates']

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'
