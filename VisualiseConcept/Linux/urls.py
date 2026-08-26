from django.urls import path
from . import views

app_name = 'Linux'

urlpatterns = [
    path('', views.linux_dashboard, name='linux_dashboard'),
    path('history/', views.linux_history, name='linux_history'),
    path('architecture/', views.linux_architecture, name='linux_architecture'),
    path('system-calls/', views.linux_system_calls, name='linux_system_calls'),
    path('permissions/', views.linux_permissions, name='linux_permissions'),
    path('processes/', views.linux_processes, name='linux_processes'),
    path('threads/', views.linux_threads, name='linux_threads'),
    path('scripting/', views.linux_scripting, name='linux_scripting'),
    path('memory/', views.linux_memory, name='linux_memory'),
    path('scheduling/', views.linux_scheduling, name='linux_scheduling'),
    path('ipc/', views.linux_ipc, name='linux_ipc'),
    path('resources/', views.linux_resources, name='linux_resources'),
    path('run-c-code/', views.run_c_code, name='run_c_code'),
]
