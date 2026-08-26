from django.urls import path
from . import views

app_name = 'Cpp'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
]
