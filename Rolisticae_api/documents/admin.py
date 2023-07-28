# Importation des modules nécessaires
from django.contrib import admin  # Pour l'administration de Django
from .models import Category_FileManager, Document  # Importation des modèles Category_FileManager et Document

# Classe pour l'administration du modèle Category_FileManager
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent',)  # Afficher le nom et le parent dans la liste des catégories
    list_filter = ('parent',)  # Ajouter un filtre pour rechercher par parent de catégorie
    search_fields = ('name', 'parent__name',)  # Ajouter une barre de recherche pour le nom et le nom du parent de la catégorie

# Classe pour l'administration du modèle Document
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'processed', 'get_filename')  # Afficher le nom, la description, l'état de traitement et le nom du fichier dans la liste des documents
    list_filter = ('processed', 'categories')  # Ajouter des filtres pour rechercher par état de traitement et catégories
    search_fields = ('name', 'description',)  # Ajouter une barre de recherche pour le nom et la description du document

# Enregistrement des modèles dans l'administration de Django
admin.site.register(Category_FileManager, CategoryAdmin)
admin.site.register(Document, DocumentAdmin)
