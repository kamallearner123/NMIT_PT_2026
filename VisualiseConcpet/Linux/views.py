from django.shortcuts import render

def get_chapters():
    return [
        {"id": "history", "title": "1. Linux History", "description": "From Unix to the modern world."},
        {"id": "architecture", "title": "2. Architecture & File System", "description": "Kernel, Shell, and the Directory Tree."},
        {"id": "permissions", "title": "3. Permissions & Security", "description": "Mastering chmod, chown, and octal values."},
        {"id": "processes", "title": "4. Process Management", "description": "PIDs, Jobs, and the System Monitor."},
        {"id": "scripting", "title": "5. Shell & Scripting", "description": "Pipes, Redirection, and Automation."},
        {"id": "memory", "title": "6. Memory Management", "description": "Virtual memory, Paging, and Malloc internals."},
        {"id": "scheduling", "title": "7. CPU Scheduling & Context Switching", "description": "How the OS decides who runs next."},
        {"id": "resources", "title": "📚 Standard Resources", "description": "Recommended books and documentation."},
    ]

def linux_dashboard(request):
    return render(request, 'linux_dashboard.html', {'chapters': get_chapters()})

def linux_architecture(request):
    return render(request, 'linux_architecture.html', {'chapters': get_chapters()})

def linux_permissions(request):
    return render(request, 'linux_permissions.html', {'chapters': get_chapters()})

def linux_processes(request):
    return render(request, 'linux_processes.html', {'chapters': get_chapters()})

def linux_scripting(request):
    return render(request, 'linux_scripting.html', {'chapters': get_chapters()})

def linux_memory(request):
    return render(request, 'linux_memory.html', {'chapters': get_chapters()})

def linux_scheduling(request):
    return render(request, 'linux_scheduling.html', {'chapters': get_chapters()})

def linux_resources(request):
    return render(request, 'linux_resources.html', {'chapters': get_chapters()})

def linux_history(request):
    milestones = [
        {
            "year": "1969",
            "title": "The Birth of Unix",
            "author": "Ken Thompson & Dennis Ritchie",
            "description": "At AT&T Bell Labs, Ken Thompson and Dennis Ritchie create Unix, the spiritual ancestor of Linux. It introduced the concept of 'everything is a file'.",
            "icon": "📜"
        },
        {
            "year": "1983",
            "title": "The GNU Project",
            "author": "Richard Stallman",
            "description": "Richard Stallman launches the GNU Project with the goal of creating a completely free Unix-like operating system. He writes the GPL (General Public License).",
            "icon": "🐂"
        },
        {
            "year": "1991",
            "title": "The Linux Kernel",
            "author": "Linus Torvalds",
            "description": "A 21-year-old student from Finland, Linus Torvalds, announces a 'free operating system (just a hobby, won't be big and professional like gnu)'.",
            "icon": "🐧"
        },
        {
            "year": "1992",
            "title": "GNU + Linux",
            "author": "Collaboration",
            "description": "The Linux kernel is released under the GNU GPL. Combining the GNU tools with the Linux kernel creates the first complete free operating system.",
            "icon": "🤝"
        },
        {
            "year": "1996",
            "title": "Tux is Born",
            "author": "Larry Ewing",
            "description": "Tux the Penguin becomes the official mascot of Linux, selected by Linus Torvalds because he liked penguins.",
            "icon": "🎨"
        },
        {
            "year": "2000s",
            "title": "The Enterprise Boom",
            "author": "IBM, Red Hat, etc.",
            "description": "Linux moves into the enterprise. IBM announces a billion-dollar investment in Linux. Distributions like Red Hat and Debian gain massive popularity.",
            "icon": "🏢"
        },
        {
            "year": "2011",
            "title": "Linux is Everywhere",
            "author": "Android, Servers, etc.",
            "description": "Linux becomes the backbone of the internet, powering most servers, supercomputers, and eventually the Android mobile OS.",
            "icon": "🌍"
        }
    ]
    return render(request, 'linux_history.html', {
        'milestones': milestones,
        'chapters': get_chapters()
    })
