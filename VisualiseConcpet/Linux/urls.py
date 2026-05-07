from django.urls import path
from . import views

app_name = 'Linux'

urlpatterns = [
    path('', views.linux_dashboard, name='linux_dashboard'),
    path('history/', views.linux_history, name='linux_history'),
    path('architecture/', views.linux_architecture, name='linux_architecture'),
    path('permissions/', views.linux_permissions, name='linux_permissions'),
    path('processes/', views.linux_processes, name='linux_processes'),
    path('scripting/', views.linux_scripting, name='linux_scripting'),
    path('memory/', views.linux_memory, name='linux_memory'),
    path('scheduling/', views.linux_scheduling, name='linux_scheduling'),
    path('resources/', views.linux_resources, name='linux_resources'),
]
