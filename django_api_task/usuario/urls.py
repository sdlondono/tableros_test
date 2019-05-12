from rest_framework import routers
from django.conf.urls import url
from .api import UsuarioViewSet, UsuarioLoginApiView


router = routers.DefaultRouter()
router.register('usuario', UsuarioViewSet, 'usuario')


urlpatterns = [
    url(r'^login/$', UsuarioLoginApiView.as_view(), name="login"),

]

urlpatterns += router.urls
