from django.shortcuts import render

def dashboard(request):
    return render(request, 'cpp_dashboard.html')
