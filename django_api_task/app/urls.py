from . import views
from django.conf import settings
from django.urls import path

react_routes = getattr(settings, 'REACT_ROUTES', [])
urlpatterns = []
for route in react_routes:
    urlpatterns += [
        path('{}'.format(route), views.index)
    ]
