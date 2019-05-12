from .models import Idea
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import json
from .serializers import IdeaSerializer, IdeaUsuarioSerializer

# All CRUD of Ideas


class IdeaViewSet(viewsets.ModelViewSet):
    queryset = Idea.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = IdeaSerializer

# Ideas for id of the create


class IdeaUsuarioViewSet(APIView):

    permissions_classes = [permissions.AllowAny]
    serializer_class = IdeaUsuarioSerializer

    def get(self, request, usuarioid, tableroid):
        queryset = Idea.objects.select_related(
            "usuario_fk", "tablero_fk").filter(usuario_fk=usuarioid, tablero_fk=tableroid).all()
        jsonIdea = []

        for e in queryset:
            jsonIdea.insert(0, {
                "id": e.id,
                "comment": e.comment,
                "nick": e.usuario_fk.nick,
                "tablero": e.tablero_fk.nombre,
                "id_tablero": e.tablero_fk.id
            })

        return Response(jsonIdea)
