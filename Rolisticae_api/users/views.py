# Importation des modules nécessaires
from django.contrib.auth import get_user_model  # Pour obtenir le modèle utilisateur actuel
from rest_framework.response import Response  # Pour créer des réponses HTTP
from rest_framework import viewsets, generics, permissions  # Pour les vues, les génériques et les permissions
from rest_framework_simplejwt.views import TokenObtainPairView  # Pour la vue d'obtention de token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer  # Pour le sérialiseur de token
from .serializers import UserSerializer  # Importation du sérialiseur utilisateur

# Obtention du modèle utilisateur actuel
User = get_user_model()

# Vue pour le modèle utilisateur
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer  # Utilisation du sérialiseur utilisateur
    permission_classes = [permissions.IsAuthenticated]  # Seuls les utilisateurs authentifiés peuvent accéder à cette vue

    # Définition de la requête pour obtenir les utilisateurs
    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)  # Renvoie uniquement l'utilisateur actuellement connecté

    # Méthode pour mettre à jour un utilisateur
    def update(self, request, *args, **kwargs):
        instance = self.get_object()  # Obtention de l'instance de l'utilisateur
        instance.username = request.data.get("username")  # Mise à jour du nom d'utilisateur
        instance.email = request.data.get("email")  # Mise à jour de l'email
        # Mettez à jour d'autres champs au besoin
        instance.save()  # Enregistrement de l'instance

        serializer = self.get_serializer(instance)  # Sérialisation de l'instance
        return Response(serializer.data)  # Renvoie une réponse avec les données sérialisées

# Vue pour l'enregistrement des utilisateurs
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()  # Tous les utilisateurs peuvent être créés
    permission_classes = [permissions.AllowAny]  # Permet à n'importe qui de s'inscrire
    serializer_class = UserSerializer  # Utilisation du sérialiseur utilisateur

# Vue pour la connexion des utilisateurs
class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer  # Utilisation du sérialiseur de token
