from django.urls import path
from . import views

app_name = 'DSA'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('chapter/<str:chapter_id>/', views.chapter_detail, name='chapter_detail'),
]
