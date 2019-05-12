
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('api/', include('usuario.urls')),
    path('api/', include('tablero.urls')),
    path('api/', include('idea.urls')),

    path('', include('app.urls'))
]
