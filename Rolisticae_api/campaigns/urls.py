from django.urls import path
from .views import campaign_list

app_name = 'campaigns'

urlpatterns = [
    path('list/', campaign_list, name='campaign_list'),
]
