# Importation des modules nécessaires
from rest_framework import serializers
from .models import Category_Galerie, Image_Galerie

# Définition du sérialiseur pour le modèle Category_Galerie
class Category_GalerieSerializer(serializers.ModelSerializer):
    subcategories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)  # Champ pour les sous-catégories
    images = serializers.PrimaryKeyRelatedField(many=True, read_only=True)  # Champ pour les images

    class Meta:
        model = Category_Galerie  # Spécifie le modèle à sérialiser
        fields = ['id', 'name', 'parent_category', 'image', 'illustration_image', 'subcategories', 'images']  # Spécifie les champs à inclure dans la sérialisation


# Définition du sérialiseur pour le modèle Image_Galerie
class Image_GalerieSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category_Galerie.objects.all())  # Champ pour la catégorie

    class Meta:
        model = Image_Galerie  # Spécifie le modèle à sérialiser
        fields = ['id', 'category', 'image']  # Spécifie les champs à inclure dans la sérialisation
