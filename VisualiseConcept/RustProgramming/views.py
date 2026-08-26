from django.shortcuts import render

def dashboard(request):
    return render(request, 'rust_dashboard.html')
