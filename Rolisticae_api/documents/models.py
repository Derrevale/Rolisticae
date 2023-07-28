# Importation du module os pour interagir avec le système d'exploitation
import os

# Importation des modèles Django
from django.db import models
# Importation du récepteur de signal Django, utilisé pour exécuter du code en réponse à certains signaux Django
from django.dispatch import receiver

# Importation du module de configuration de rolisticae_core
from rolisticae_core.settings import logger

# Fonction pour déterminer le chemin d'upload des fichiers
def get_upload_path(instance, filename):
    # os.path.join est utilisé pour combiner les chemins de manière sûre
    return os.path.join('images', 'documents', filename)

# Modèle pour les catégories de documents
class Category_FileManager(models.Model):
    name = models.CharField(max_length=100)  # Nom de la catégorie
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)  # Catégorie parente

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        if self.parent:
            return f'{self.parent} > {self.name}'
        return self.name

    def documents(self):
        """
        Retourne un queryset des documents associés à cette catégorie
        """
        return self.documents.all()

# Modèle pour les documents
class Document(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)  # Nom du document
    description = models.TextField(null=True, blank=True)  # Description du document
    fileUrl = models.FileField(upload_to=get_upload_path)  # URL du fichier
    categories = models.ManyToManyField(Category_FileManager, related_name='documents')  # Catégories associées
    processed = models.BooleanField(default=False)  # Indique si le document a été traité

    def __str__(self):
        if self.name:
            return self.name
        else:
            return f"Document {self.id}"

    def save(self, *args, **kwargs):
        """
        Sauvegarde le document et lance le traitement si nécessaire.
        """

        # Effectue la sauvegarde
        super().save(*args, **kwargs)

        # Vérifie si le document doit être traité
        if not self.processed:
            try:
                import documents.services as services
                # Si c'est le cas, le traite
                services.rolisticae_search_service.process(self)
                # Le marque comme traité
                self.processed = True
                # Le sauvegarde
                super().save(*args, **kwargs)
            except Exception as e:
                logger.error(f'Erreur lors du traitement du document {self.name} dans model.py: {e}')

    def get_filename(self):
        """
        Retourne le nom du fichier du document.
        :return: le nom du fichier du document.
        """
        return os.path.basename(self.fileUrl.name)

# Supprime le fichier du système de fichiers lorsque l'objet `Document` correspondant est supprimé.
@receiver(models.signals.pre_delete, sender=Document)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.fileUrl:
        if os.path.isfile(instance.fileUrl.path):
            os.remove(instance.fileUrl.path)

# Supprime l'ancien fichier du système de fichiers lorsque l'objet `Document` correspondant est mis à jour avec un nouveau fichier.
@receiver(models.signals.pre_save, sender=Document)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_file = Document.objects.get(pk=instance.pk).fileUrl
    except Document.DoesNotExist:
        return False

    new_file = instance.fileUrl
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
