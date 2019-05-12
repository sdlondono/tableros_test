from .models import Usuario
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UsuarioSerializer, UsuarioLoginSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = UsuarioSerializer


class UsuarioLoginApiView(APIView):
    permissions_classes = [permissions.AllowAny]
    serializer_class = UsuarioLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data  # Request.post
        serializer = UsuarioLoginSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(new_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # print(data)
