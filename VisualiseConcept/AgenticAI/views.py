from django.shortcuts import render

def agenticai_dashboard(request):
    return render(request, 'AgenticAI/dashboard.html')

def foundations(request):
    return render(request, 'AgenticAI/foundations.html')

def python_builders(request):
    return render(request, 'AgenticAI/python_builders.html')

def prompt_engineering(request):
    return render(request, 'AgenticAI/prompt_engineering.html')

def genai_ecosystem(request):
    return render(request, 'AgenticAI/genai_ecosystem.html')

def rag(request):
    return render(request, 'AgenticAI/rag.html')

def fundamentals(request):
    return render(request, 'AgenticAI/fundamentals.html')

def building_agents(request):
    return render(request, 'AgenticAI/building_agents.html')

def mcp_tools(request):
    return render(request, 'AgenticAI/mcp_tools.html')

def system_design(request):
    return render(request, 'AgenticAI/system_design.html')

def capstone(request):
    return render(request, 'AgenticAI/capstone.html')
