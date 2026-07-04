from django.urls import path
from . import views

app_name = 'MachineLearning'

urlpatterns = [
    path('', views.ml_dashboard, name='ml_dashboard'),
    path('basics/', views.ml_basics, name='ml_basics'),
    path('regression/', views.linear_regression, name='linear_regression'),
    path('classification/', views.classification, name='classification'),
    path('neural-networks/', views.neural_networks, name='neural_networks'),
]
