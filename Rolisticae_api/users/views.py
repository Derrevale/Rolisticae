from django.contrib.auth import get_user_model
from rest_framework.response import Response  # Change this line
from rest_framework import viewsets, generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import UserSerializer

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.username = request.data.get("username")
        instance.email = request.data.get("email")
        # Update other fields as needed
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]  # permettre à n'importe qui de s'inscrire
    serializer_class = UserSerializer

class LoginView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer
