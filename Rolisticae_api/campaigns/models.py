from django.db import models
from blog.models import Category_Blog
from calendrier.models import Calendar
from documents.models import Category_FileManager
from galerie.models import Category_Galerie


class Campaign(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/campaigns/')
    description = models.TextField()
    blog_category = models.ForeignKey(Category_Blog, null=True, blank=True, on_delete=models.SET_NULL)
    calendar = models.ForeignKey(Calendar, null=True, blank=True, on_delete=models.SET_NULL)
    documents_category = models.ForeignKey(Category_FileManager, null=True, blank=True, on_delete=models.SET_NULL)
    galerie_category = models.ForeignKey(Category_Galerie, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

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

        super().save(*args, **kwargs)
