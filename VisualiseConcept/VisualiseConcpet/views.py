from django.shortcuts import render

def main_dashboard(request):
    quotes = [
        "The best way to predict the future is to invent it. – Alan Kay",
        "Talk is cheap. Show me the code. – Linus Torvalds",
        "Data structures are the architecture of your logic. – Unknown",
        "Linux is only free if your time has no value. – Jamie Zawinski (Just kidding, it's powerful!)"
    ]
    
    challenges = [
        {
            "topic": "DSA",
            "question": "Can you reverse a linked list in O(n) time and O(1) space?",
            "difficulty": "Medium"
        },
        {
            "topic": "Linux",
            "question": "How do you find all files modified in the last 24 hours that are larger than 100MB?",
            "difficulty": "Hard"
        }
    ]
    
    context = {
        'quotes': quotes,
        'challenges': challenges,
    }
    return render(request, 'main_dashboard.html', context)

def challenges_view(request):
    return render(request, 'challenges.html')
