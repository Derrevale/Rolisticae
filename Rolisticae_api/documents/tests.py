# Importation des modules nécessaires
from django.test import TestCase
from .models import Category_FileManager, Document

# Définition de la classe de tests pour le modèle Category_FileManager
class Category_FileManagerModelTests(TestCase):

    def test_category_creation(self):
        # Test de la création d'une catégorie
        category = Category_FileManager.objects.create(name="Test Category")
        self.assertEqual(category.name, "Test Category")

    def test_category_parent(self):
        # Test de l'attribution d'une catégorie parente
        parent_category = Category_FileManager.objects.create(name="Parent Category")
        child_category = Category_FileManager.objects.create(name="Child Category", parent=parent_category)

        self.assertEqual(child_category.parent, parent_category)
        self.assertIn(child_category, parent_category.children.all())

# Définition de la classe de tests pour le modèle Document
class DocumentModelTests(TestCase):

    def test_document_creation(self):
        # Test de la création d'un document
        document = Document.objects.create(name="Test Document", description="Test Description")
        self.assertEqual(document.name, "Test Document")
        self.assertEqual(document.description, "Test Description")

    def test_document_categories(self):
        # Test de l'attribution d'une catégorie à un document
        category = Category_FileManager.objects.create(name="Test Category")
        document = Document.objects.create(name="Test Document", description="Test Description")
        document.categories.add(category)

        self.assertIn(document, category.documents.all())
