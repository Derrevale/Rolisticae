from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import UserSerializer

User = get_user_model()

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RegisterView(generics.GenericAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]  # permettre à n'importe qui de s'inscrire
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })
