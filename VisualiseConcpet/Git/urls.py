from django.urls import path
from . import views

app_name = 'Git'

urlpatterns = [
    path('', views.git_dashboard, name='git_dashboard'),
    path('basics/', views.git_basics, name='git_basics'),
    path('branching/', views.git_branching, name='git_branching'),
    path('github/', views.github_collaboration, name='github_collaboration'),
]
