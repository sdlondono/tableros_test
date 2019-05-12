from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    nick = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    num_iden = models.IntegerField()
    foto = models.CharField(max_length=255)
