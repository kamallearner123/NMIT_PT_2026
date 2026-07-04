from django.shortcuts import render

def ml_dashboard(request):
    return render(request, 'MachineLearning/dashboard.html')

def ml_basics(request):
    return render(request, 'MachineLearning/basics.html')

def linear_regression(request):
    return render(request, 'MachineLearning/regression.html')

def classification(request):
    return render(request, 'MachineLearning/classification.html')

def neural_networks(request):
    return render(request, 'MachineLearning/neural_networks.html')

