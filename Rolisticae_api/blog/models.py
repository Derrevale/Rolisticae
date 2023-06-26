from ckeditor.fields import RichTextField
from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.conf import settings
import os

class Category_Blog(models.Model):
    name = models.CharField(max_length=50, null=True, blank=False, verbose_name='Name')
    slug = models.SlugField(null=False, blank=False, unique=True, verbose_name='Slug')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

class Article_Blog(models.Model):
    title = models.CharField(max_length=150, null=False, blank=False, verbose_name='Title')
    header_image = models.ImageField(null=True, blank=True, upload_to="images/blog/")
    category = models.ForeignKey(Category_Blog, null=True, blank=False, on_delete=models.SET_NULL)
    intro = RichTextField(null=True)
    content = RichTextField(null=True)
    publication_time = models.DateTimeField(null=False)
    campaigns = models.ManyToManyField('campaigns.Campaign', related_name='articles')  # Relation many-to-many avec le modèle Campaign

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'

@receiver(pre_delete, sender=Article_Blog)
def article_blog_delete(sender, instance, **kwargs):
    if instance.header_image:
        file_path = os.path.join(settings.MEDIA_ROOT, instance.header_image.path)
        if os.path.isfile(file_path):
            os.remove(file_path)
