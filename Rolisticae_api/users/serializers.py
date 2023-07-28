# Importation des modules nécessaires
from rest_framework import serializers
from .models import User

# Définition du sérialiseur UserSerializer qui hérite de ModelSerializer
class UserSerializer(serializers.ModelSerializer):
    # Configuration du sérialiseur
    class Meta:
        # Spécification du modèle à utiliser
        model = User
        # Spécification des champs à inclure dans la représentation sérialisée
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'campaigns', 'character_sheets', 'password']
        # Spécification des options supplémentaires pour certains champs
        extra_kwargs = {'password': {'write_only': True}}

    # Redéfinition de la méthode create pour utiliser la méthode create_user du modèle User
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
