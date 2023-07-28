# Importation des modules nécessaires
from django.contrib import admin
from .models import Category_Galerie, Image_Galerie

# Définition de l'interface d'administration pour le modèle Image_Galerie
class ImageInline(admin.TabularInline):
    model = Image_Galerie

# Définition de l'interface d'administration pour le modèle Category_Galerie
class Category_GalerieAdmin(admin.ModelAdmin):
    # Ajout de l'interface d'administration pour le modèle Image_Galerie en tant qu'élément imbriqué
    inlines = [
        ImageInline,
    ]

    # Méthode pour afficher le nom de la catégorie parente
    def parent_category_name(self, obj):
        return obj.parent_category.name if obj.parent_category else 'N/A'
    parent_category_name.short_description = 'Catégorie parente'

    # Configuration de l'affichage de la liste des objets Category_Galerie
    list_display = ('name', 'parent_category_name', 'image', 'illustration_image')
    # Configuration de la barre de recherche
    search_fields = ('name',)
    # Configuration des filtres
    list_filter = ('parent_category',)

# Définition de l'interface d'administration pour le modèle Image_Galerie
class Image_GalerieAdmin(admin.ModelAdmin):
    # Configuration de l'affichage de la liste des objets Image_Galerie
    list_display = ('name', 'category', 'image')
    # Configuration de la barre de recherche
    search_fields = ('name', 'category__name',)
    # Configuration des filtres
    list_filter = ('category',)
    # Configuration des champs en lecture seule
    readonly_fields = ('name',)

# Enregistrement des interfaces d'administration
admin.site.register(Category_Galerie, Category_GalerieAdmin)
admin.site.register(Image_Galerie, Image_GalerieAdmin)
