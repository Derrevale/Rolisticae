# Importation des modules nécessaires
from django.shortcuts import render  # Pour le rendu des vues
from .models import Category_Blog, Article_Blog  # Importation des modèles
from .serializers import CategorySerializer, ArticleSerializer  # Importation des sérialiseurs
from rest_framework import viewsets  # Pour les vues

# Vue pour les catégories de blog
class CategorysViewset(viewsets.ModelViewSet):
    serializer_class = CategorySerializer  # Utilisation du sérialiseur CategorySerializer
    queryset = Category_Blog.objects.all()  # Toutes les catégories de blog sont récupérées
    tags = ['Blog - Category']  # Tags pour la vue

# Vue pour les articles de blog
class ArticlesViewset(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer  # Utilisation du sérialiseur ArticleSerializer
    queryset = Article_Blog.objects.all()  # Tous les articles de blog sont récupérés
    tags = ['Blog - Article']  # Tags pour la vue
