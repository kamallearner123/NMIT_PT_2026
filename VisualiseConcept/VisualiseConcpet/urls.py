"""
URL configuration for VisualiseConcpet project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include

from .views import main_dashboard, challenges_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_dashboard, name='main_dashboard'),
    path('challenges/', challenges_view, name='challenges'),
    path('dsa/', include('DSA.urls')),
    path('linux/', include('Linux.urls')),
    path('rust/', include('RustProgramming.urls')),
    path('cpp/', include('Cpp.urls')),
    path('networking/', include('Networking.urls')),
    path('git/', include('Git.urls')),
    path('ml/', include('MachineLearning.urls')),
    path('genai/', include('GenAI.urls')),
    path('agenticai/', include('AgenticAI.urls')),
]
