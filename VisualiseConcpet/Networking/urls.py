from django.urls import path
from . import views

app_name = 'Networking'

urlpatterns = [
    path('', views.networking_dashboard, name='dashboard'),
    path('layers/', views.networking_layers, name='networking_layers'),
    path('datalink/', views.networking_datalink, name='networking_datalink'),
    path('ip/', views.networking_ip, name='networking_ip'),
    path('tcp/', views.networking_tcp, name='networking_tcp'),
    path('application/', views.networking_application, name='networking_application'),
]
