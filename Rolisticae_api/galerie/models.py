# Importation des modules nécessaires
from django.db import models
from django.dispatch import receiver
import os

# Définition du modèle Category_Galerie
class Category_Galerie(models.Model):
    name = models.CharField(max_length=255)  # Champ pour le nom de la catégorie
    parent_category = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True,
                                        related_name='subcategories')  # Champ pour la catégorie parente
    image = models.ImageField(upload_to='images/galerie/', null=True, blank=True)  # Champ pour l'image de la catégorie
    illustration_image = models.OneToOneField('Image_Galerie', on_delete=models.SET_NULL, null=True, blank=True,
                                              related_name='illustration_for_category')  # Champ pour l'image d'illustration de la catégorie

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Catégorie'
        verbose_name_plural = 'Catégories'


# Définition du modèle Image_Galerie
class Image_Galerie(models.Model):

    category = models.ForeignKey(Category_Galerie, on_delete=models.CASCADE, related_name='images')  # Champ pour la catégorie de l'image
    image = models.ImageField(upload_to='images/galerie/')  # Champ pour l'image
    name = models.CharField(max_length=255, blank=True, editable=False)  # Champ pour le nom de l'image

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = os.path.basename(self.image.name)
        super(Image_Galerie, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Image'
        verbose_name_plural = 'Images'


# Signal pour supprimer les fichiers d'image lors de la suppression d'une instance de Category_Galerie
@receiver(models.signals.pre_delete, sender=Category_Galerie)
def delete_category_files(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(False)

    if instance.illustration_image:
        instance.illustration_image.delete(False)


# Signal pour supprimer le fichier d'image d'illustration lors de la mise à jour d'une instance de Category_Galerie
@receiver(models.signals.pre_save, sender=Category_Galerie)
def delete_category_illustration_file(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_category = Category_Galerie.objects.get(pk=instance.pk)
        except Category_Galerie.DoesNotExist:
            return

        if old_category.illustration_image and old_category.illustration_image != instance.illustration_image:
            old_category.illustration_image.delete(False)

# Signal pour supprimer les fichiers d'image lors de la suppression d'une instance de Image_Galerie
@receiver(models.signals.pre_delete, sender=Image_Galerie)
def delete_image_files(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(False)
