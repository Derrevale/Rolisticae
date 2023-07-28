# Importation des modules nécessaires
from rest_framework import generics, viewsets
from .models import Category_Galerie, Image_Galerie
from .serializers import Category_GalerieSerializer, Image_GalerieSerializer

# Définition de la vue pour lister et créer des catégories
class Category_Galerie_ListView(generics.ListCreateAPIView):
    queryset = Category_Galerie.objects.all()  # Définition de la source de données
    serializer_class = Category_GalerieSerializer  # Définition du serializer
    tags = ['Galerie - Category']  # Tags pour la documentation de l'API

# Définition de la vue pour récupérer, mettre à jour et supprimer une catégorie
class Category_Galerie_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category_Galerie.objects.all()  # Définition de la source de données
    serializer_class = Category_GalerieSerializer  # Définition du serializer
    tags = ['Galerie - Category']  # Tags pour la documentation de l'API

# Définition de la vue pour lister et créer des images
class Image_Galerie_ListView(generics.ListCreateAPIView):
    queryset = Image_Galerie.objects.all()  # Définition de la source de données
    serializer_class = Image_GalerieSerializer  # Définition du serializer
    tags = ['Galerie - Image']  # Tags pour la documentation de l'API

# Définition de la vue pour récupérer, mettre à jour et supprimer une image
class Image_Galerie_DetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image_Galerie.objects.all()  # Définition de la source de données
    serializer_class = Image_GalerieSerializer  # Définition du serializer
    tags = ['Galerie - Image']  # Tags pour la documentation de l'API

# Définition de la vue pour les opérations CRUD sur les catégories
class Category_Galerie_ViewSet(viewsets.ModelViewSet):
    queryset = Category_Galerie.objects.all()  # Définition de la source de données
    serializer_class = Category_GalerieSerializer  # Définition du serializer
    tags = ['Galerie - Category']  # Tags pour la documentation de l'API

# Définition de la vue pour les opérations CRUD sur les images
class Image_Galerie_ViewSet(viewsets.ModelViewSet):
    queryset = Image_Galerie.objects.all()  # Définition de la source de données
    serializer_class = Image_GalerieSerializer  # Définition du serializer
    tags = ['Galerie - Image']  # Tags pour la documentation de l'API
