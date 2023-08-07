# Importation des modules nécessaires
from django.contrib.auth.models import AbstractUser
from django.db import models

# Définition du modèle User qui hérite de AbstractUser
class User(AbstractUser):
    # Champ email qui doit être unique
    email = models.EmailField(unique=True)
    # Champ first_name pour le prénom de l'utilisateur
    first_name = models.CharField(max_length=100)
    # Champ last_name pour le nom de l'utilisateur
    last_name = models.CharField(max_length=100)


    # Définition du champ utilisé comme identifiant pour l'authentification
    USERNAME_FIELD = 'email'
    # Définition des champs requis lors de la création d'un utilisateur
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
