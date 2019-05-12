from rest_framework import serializers
from django.db.models import Q
from .models import Usuario
import json

# Usuario Serializer


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


# Login Validate API REST
class UsuarioLoginSerializer(serializers.ModelSerializer):

    nick = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Usuario
        fields = [
            'id',
            'nick',
            'password'
        ]

    def validate(self, data):
        user_obj = None
        nick = data["nick"]
        password = data["password"]

        if not nick and not password:
            raise serializers.ValidationError(
                "User and Password is required to login.")
        user = Usuario.objects.filter(nick=nick, password=password).first()

        if user is None:
            raise serializers.ValidationError(
                "Incorrect credentials please try again.")

        return user
