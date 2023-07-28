# Importation des modules nécessaires
from .models import Category_Blog, Article_Blog  # Importation des modèles
from rest_framework import serializers  # Pour les sérialiseurs

# Sérialiseur pour les catégories de blog
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category_Blog  # Utilisation du modèle Category_Blog
        fields = '__all__'  # Sérialisation de tous les champs

# Sérialiseur pour les articles de blog
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article_Blog  # Utilisation du modèle Article_Blog
        fields = '__all__'  # Sérialisation de tous les champs
