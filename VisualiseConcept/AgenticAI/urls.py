from django.urls import path
from . import views

app_name = 'AgenticAI'

urlpatterns = [
    path('', views.agenticai_dashboard, name='agenticai_dashboard'),
    path('foundations/', views.foundations, name='foundations'),
    path('python-builders/', views.python_builders, name='python_builders'),
    path('prompt-engineering/', views.prompt_engineering, name='prompt_engineering'),
    path('genai-ecosystem/', views.genai_ecosystem, name='genai_ecosystem'),
    path('rag/', views.rag, name='rag'),
    path('fundamentals/', views.fundamentals, name='fundamentals'),
    path('building-agents/', views.building_agents, name='building_agents'),
    path('mcp-tools/', views.mcp_tools, name='mcp_tools'),
    path('system-design/', views.system_design, name='system_design'),
    path('capstone/', views.capstone, name='capstone'),
]
