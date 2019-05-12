from rest_framework import serializers
from .models import Idea

# Lead Serializer


class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = '__all__'

        # Login Validate API REST


class IdeaUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea
        fields = "__all__"

    def validate(self, data):
        print(data)
        return data
