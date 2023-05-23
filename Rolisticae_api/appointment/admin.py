from django.contrib import admin
from .models import Appointment, AppointmentDate, Vote

class AppointmentDateInline(admin.TabularInline):
    model = AppointmentDate
    extra = 1
    fields = ('date', 'start_time', 'end_time')


class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    inlines = [AppointmentDateInline]

admin.site.register(Appointment, AppointmentAdmin)

class VoteAdmin(admin.ModelAdmin):
    list_display = ('user', 'appointment_dates_list')

    def appointment_dates_list(self, obj):
        return ", ".join([str(date) for date in obj.appointment_date.all()])
    appointment_dates_list.short_description = 'Appointment Dates'

admin.site.register(Vote, VoteAdmin)
