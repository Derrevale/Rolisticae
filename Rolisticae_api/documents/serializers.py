# Importation du module serializers de Django Rest Framework
from rest_framework import serializers
# Importation des modèles Category_FileManager et Document
from .models import Category_FileManager, Document

# Définition du sérialiseur pour le modèle Category_FileManager
class CategoryDocumentSerializer(serializers.ModelSerializer):
    children = serializers.StringRelatedField(many=True)  # Les enfants de la catégorie
    files = serializers.SerializerMethodField()  # Les fichiers associés à la catégorie

    class Meta:
        model = Category_FileManager  # Le modèle à sérialiser
        fields = ('id', 'name', 'parent', 'children', 'files')  # Les champs à inclure dans la sérialisation
        depth = 1  # Profondeur de la sérialisation (combien de niveaux de relations à suivre)

    def get_files(self, category):
        """
        Retourne une liste de fichiers associés à cette catégorie
        """
        # Création d'un sérialiseur pour les documents
        document_serializer = DocumentSerializer(instance=category.documents.all(), many=True)
        # Retourne les données sérialisées
        return document_serializer.data

# Définition du sérialiseur pour le modèle Document
class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document  # Le modèle à sérialiser
        fields = ('id', 'name', 'description', 'fileUrl', 'categories')  # Les champs à inclure dans la sérialisation
