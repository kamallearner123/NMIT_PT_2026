from django.shortcuts import render

CHAPTERS = [
    {"id": "01_Complexity_Analysis", "title": "01 Complexity Analysis"},
    {"id": "02_Arrays_and_Strings", "title": "02 Arrays and Strings"},
    {"id": "03_Linked_Lists", "title": "03 Linked Lists"},
    {"id": "04_Stacks_and_Queues", "title": "04 Stacks and Queues"},
    {"id": "05_Trees_and_Heaps", "title": "05 Trees and Heaps"},
    {"id": "06_Graphs", "title": "06 Graphs"},
    {"id": "07_Dynamic_Programming", "title": "07 Dynamic Programming"},
]

def dashboard(request):
    return render(request, 'dashboard.html', {'chapters': CHAPTERS})

def chapter_detail(request, chapter_id):
    chapter = next((c for c in CHAPTERS if c['id'] == chapter_id), None)
    return render(request, 'chapter_detail.html', {
        'chapter': chapter,
        'chapters': CHAPTERS,
        'is_arrays_strings': chapter_id == "02_Arrays_and_Strings"
    })
