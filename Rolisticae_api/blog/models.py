# Importation des modules nécessaires
from ckeditor.fields import RichTextField  # Pour les champs de texte enrichi
from django.db import models  # Pour les modèles de base de données
from django.db.models.signals import pre_delete  # Pour les signaux avant suppression
from django.dispatch import receiver  # Pour recevoir les signaux
from django.conf import settings  # Pour accéder aux paramètres de configuration de Django
import os  # Pour les opérations sur les fichiers

# Modèle pour les catégories de blog
class Category_Blog(models.Model):
    name = models.CharField(max_length=50, null=True, blank=False, verbose_name='Name')  # Nom de la catégorie
    slug = models.SlugField(null=False, blank=False, unique=True, verbose_name='Slug')  # Slug de la catégorie

    # Méthode pour convertir l'objet en chaîne de caractères
    def __str__(self):
        return self.name  # Retourne le nom de la catégorie

    class Meta:
        verbose_name = 'Category'  # Nom singulier de la catégorie
        verbose_name_plural = 'Categories'  # Nom pluriel de la catégorie

# Modèle pour les articles de blog
class Article_Blog(models.Model):
    title = models.CharField(max_length=150, null=False, blank=False, verbose_name='Title')  # Titre de l'article
    header_image = models.ImageField(null=True, blank=True, upload_to="images/blog/")  # Image d'en-tête de l'article
    category = models.ForeignKey(Category_Blog, null=True, blank=False, on_delete=models.SET_NULL)  # Catégorie de l'article
    intro = RichTextField(null=True)  # Introduction de l'article
    content = RichTextField(null=True)  # Contenu de l'article
    publication_time = models.DateTimeField(null=False)  # Date de publication de l'article
    campaigns = models.ManyToManyField('campaigns.Campaign', related_name='articles')  # Relation many-to-many avec le modèle Campaign

    # Méthode pour convertir l'objet en chaîne de caractères
    def __str__(self):
        return self.title  # Retourne le titre de l'article

    class Meta:
        verbose_name = 'Article'  # Nom singulier de l'article
        verbose_name_plural = 'Articles'  # Nom pluriel de l'article

# Récepteur pour le signal avant suppression d'un article de blog
@receiver(pre_delete, sender=Article_Blog)
def article_blog_delete(sender, instance, **kwargs):
    if instance.header_image:  # Si l'article a une image d'en-tête
        file_path = os.path.join(settings.MEDIA_ROOT, instance.header_image.path)  # Chemin du fichier de l'image
        if os.path.isfile(file_path):  # Si le fichier existe
            os.remove(file_path)  # Suppression du fichier
