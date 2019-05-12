from rest_framework import routers
# from django.conf.urls import url
from django.urls import path, include
from .api import TableroViewSet, TableroUsuarioViewSet


router = routers.SimpleRouter()
router.register('tablero', TableroViewSet, 'tablero')

urlpatterns = [
    # url(r'^tableusuario/<int:pk>$', TableroUsuarioViewSet.as_view(), name="tableusuerio"),
    path('tableusuario/<usuarioid>', TableroUsuarioViewSet.as_view()),

]


urlpatterns += router.urls
