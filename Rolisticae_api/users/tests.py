from django.test import TestCase
from .models import CustomUser

class CustomUserModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Créez un utilisateur pour les tests
        CustomUser.objects.create(username='testuser', email='test@example.com')

    def test_user_creation(self):
        user = CustomUser.objects.get(id=1)
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')
