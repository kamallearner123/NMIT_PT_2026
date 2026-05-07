from django.urls import path
from . import views

app_name = 'RustProgramming'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
]
