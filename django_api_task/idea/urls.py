from rest_framework import routers
# from django.conf.urls import url
from django.urls import path, include
from .api import IdeaViewSet, IdeaUsuarioViewSet


router = routers.SimpleRouter()
router.register('idea', IdeaViewSet, 'idea')

urlpatterns = [
    # url(r'^tableusuario/<int:pk>$', IdeaUsuarioViewSet.as_view(), name="tableusuerio"),
    path('idea/<usuarioid>/<tableroid>', IdeaUsuarioViewSet.as_view()),

]


urlpatterns += router.urls
