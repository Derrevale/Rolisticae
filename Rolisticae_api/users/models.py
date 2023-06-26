from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    campaigns = models.TextField(blank=True)  # Vous pouvez modifier ce champ en fonction de la structure de vos campagnes
    character_sheets = models.TextField(blank=True)  # Vous pouvez modifier ce champ en fonction de la structure de vos fiches de personnage
