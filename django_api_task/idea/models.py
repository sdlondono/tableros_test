from django.db import models
from tablero.models import Tablero
from usuario.models import Usuario


class Idea(models.Model):
    comment = models.CharField(max_length=255)
    usuario_fk = models.ForeignKey(
        Usuario, related_name='usuario_fk', on_delete=models.CASCADE)
    tablero_fk = models.ForeignKey(
        Tablero, related_name='tablero_fk', on_delete=models.CASCADE
    )
    state = models.BooleanField()


# Create your models here.
