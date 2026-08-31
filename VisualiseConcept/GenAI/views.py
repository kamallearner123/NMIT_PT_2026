from django.shortcuts import render

def genai_dashboard(request):
    return render(request, 'GenAI/dashboard.html')

def transformers_intro(request):
    return render(request, 'GenAI/transformers_intro.html')

def self_attention(request):
    return render(request, 'GenAI/self_attention.html')

def encoder_decoder(request):
    return render(request, 'GenAI/encoder_decoder.html')

def llm_generation(request):
    return render(request, 'GenAI/llm_generation.html')

