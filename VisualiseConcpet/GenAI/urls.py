from django.urls import path
from . import views

app_name = 'GenAI'

urlpatterns = [
    path('', views.genai_dashboard, name='genai_dashboard'),
    path('transformers/', views.transformers_intro, name='transformers_intro'),
    path('self-attention/', views.self_attention, name='self_attention'),
    path('encoder-decoder/', views.encoder_decoder, name='encoder_decoder'),
    path('llm-generation/', views.llm_generation, name='llm_generation'),
]
