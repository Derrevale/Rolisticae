# Importation des modules nécessaires
from django.db import models  # Pour les modèles
from blog.models import Category_Blog  # Importation du modèle Category_Blog
from calendrier.models import Calendar  # Importation du modèle Calendar
from documents.models import Category_FileManager  # Importation du modèle Category_FileManager
from galerie.models import Category_Galerie  # Importation du modèle Category_Galerie

# Modèle pour les campagnes
class Campaign(models.Model):
    name = models.CharField(max_length=255)  # Nom de la campagne
    image = models.ImageField(upload_to='images/campaigns/')  # Image de la campagne
    description = models.TextField()  # Description de la campagne
    blog_category = models.ForeignKey(Category_Blog, null=True, blank=True, on_delete=models.SET_NULL)  # Catégorie de blog associée
    calendar = models.ForeignKey(Calendar, null=True, blank=True, on_delete=models.SET_NULL)  # Calendrier associé
    documents_category = models.ForeignKey(Category_FileManager, null=True, blank=True, on_delete=models.SET_NULL)  # Catégorie de documents associée
    galerie_category = models.ForeignKey(Category_Galerie, null=True, blank=True, on_delete=models.SET_NULL)  # Catégorie de galerie associée

    def __str__(self):
        return self.name  # Représentation sous forme de chaîne de caractères de la campagne

    def save(self, *args, **kwargs):
        # Création d'une nouvelle catégorie dans le module "blog" si nécessaire
        if not self.blog_category:
            self.blog_category = Category_Blog.objects.create(name=self.name, slug=self.name.lower())

        # Création d'un nouveau calendrier dans le module "calendrier" si nécessaire
        if not self.calendar:
            self.calendar = Calendar.objects.create(name=self.name, description=self.description,
                                                    slug=self.name.lower())

        # Création d'une nouvelle catégorie dans le module "documents" si nécessaire
        if not self.documents_category:
            self.documents_category = Category_FileManager.objects.create(name=self.name, parent=None)

        # Création d'une nouvelle catégorie dans le module "galerie" si nécessaire
        if not self.galerie_category:
            self.galerie_category = Category_Galerie.objects.create(name=self.name, parent_category=None)

        super().save(*args, **kwargs)  # Enregistrement de l'instance de la campagne
