from django.shortcuts import render

def git_dashboard(request):
    return render(request, 'Git/dashboard.html')

def git_basics(request):
    return render(request, 'Git/basics.html')

def git_branching(request):
    return render(request, 'Git/branching.html')

def github_collaboration(request):
    return render(request, 'Git/github.html')

