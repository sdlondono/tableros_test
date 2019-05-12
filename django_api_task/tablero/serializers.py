from rest_framework import serializers
from .models import Tablero

# Lead Serializer


class TableroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tablero
        fields = '__all__'

        # Login Validate API REST


class TableroUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tablero
        fields = "__all__"

    def validate(self, data):
        print(data)
        return data
