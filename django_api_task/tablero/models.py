from django.db import models
from usuario.models import Usuario


class Tablero(models.Model):
    nombre = models.CharField(max_length=100)
    usuario_fk = models.ForeignKey(
        Usuario, related_name='tableros', on_delete=models.CASCADE)
    state = models.BooleanField()
