from django.conf import settings
from django.db import models

class Appointment(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class AppointmentDate(models.Model):
    appointment = models.ForeignKey(Appointment, related_name='dates', on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f'{self.date} {self.start_time}-{self.end_time}'

class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    appointment_date = models.ManyToManyField(AppointmentDate, related_name='votes')

    def __str__(self):
        return f'{self.user} - {", ".join(str(date) for date in self.appointment_date.all())}'
