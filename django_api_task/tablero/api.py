from .models import Tablero
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import json
from .serializers import TableroSerializer, TableroUsuarioSerializer

# All CRUD of Tableros


class TableroViewSet(viewsets.ModelViewSet):
    queryset = Tablero.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = TableroSerializer

# Tableros for id of the create


class TableroUsuarioViewSet(APIView):

    permissions_classes = [permissions.AllowAny]
    serializer_class = TableroUsuarioSerializer

    def get(self, request, usuarioid):
        queryset = Tablero.objects.select_related(
            "usuario_fk").filter(usuario_fk=usuarioid).all()
        jsonTablero = []

        for e in queryset:
            jsonTablero.insert(0, {
                "id": e.id,
                "nombre": e.nombre,
                "nick": e.usuario_fk.nick
            })

        return Response(jsonTablero)
