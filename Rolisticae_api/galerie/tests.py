# Importation des modules nécessaires
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from .models import Category_Galerie, Image_Galerie

# Définition de la classe de test pour le modèle Category_Galerie
class CategoryGalerieTestCase(TestCase):
    def setUp(self):
        # Création d'une catégorie et d'une sous-catégorie pour les tests
        self.category = Category_Galerie.objects.create(
            name="Nature",
        )
        self.subcategory = Category_Galerie.objects.create(
            name="Forêt",
            parent_category=self.category
        )

    def test_category_creation(self):
        # Test de la création de la catégorie
        self.assertEqual(self.category.name, "Nature")
        # Test de la création de la sous-catégorie
        self.assertEqual(self.subcategory.parent_category, self.category)

    def test_category_str(self):
        # Test de la méthode __str__ du modèle
        self.assertEqual(str(self.category), "Nature")
        self.assertEqual(str(self.subcategory), "Forêt")


# Définition de la classe de test pour le modèle Image_Galerie
class ImageGalerieTestCase(TestCase):
    def setUp(self):
        # Création d'une catégorie et d'une image pour les tests
        self.category = Category_Galerie.objects.create(
            name="Nature",
        )

        image_file = SimpleUploadedFile(
            name="test_image.png",
            content=open("images/test_file/test_image.png", "rb").read(),
            content_type="image/png"
        )

        self.image = Image_Galerie.objects.create(
            category=self.category,
            image=image_file
        )

    def test_image_creation(self):
        # Test de la création de l'image
        self.assertEqual(self.image.category, self.category)
        self.assertEqual(self.image.name, "test_image.png")

    def test_image_str(self):
        # Test de la méthode __str__ du modèle
        self.assertEqual(str(self.image), "test_image.png")
