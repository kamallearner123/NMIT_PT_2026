from django.shortcuts import render

def get_chapters():
    return [
        {
            "id": "layers",
            "title": "1. TCP/IP & OSI Layers",
            "description": "Understanding the layered architecture of the internet, from physical wires to application data.",
            "icon": "🥞"
        },
        {
            "id": "datalink",
            "title": "2. Data Link Layer (Ethernet/ARP)",
            "description": "How data moves across local wires. MAC addresses, Ethernet frames, and ARP resolution.",
            "icon": "🔗"
        },
        {
            "id": "ip",
            "title": "3. Network Layer (IP & Routing)",
            "description": "Global addressing, IP packets, Subnetting, and how Routing Tables work in Linux.",
            "icon": "🌐"
        },
        {
            "id": "tcp",
            "title": "4. Transport Layer (TCP/UDP)",
            "description": "Reliability vs. Speed. TCP Handshakes, Flags (SYN/ACK), and Port management.",
            "icon": "🚂"
        },
        {
            "id": "application",
            "title": "5. Application Layer (DNS/HTTP)",
            "description": "Human-readable protocols. How DNS translates names and how HTTP fetches web pages.",
            "icon": "📱"
        },
    ]

def networking_dashboard(request):
    return render(request, 'networking_dashboard.html', {'chapters': get_chapters()})

def networking_layers(request):
    return render(request, 'networking_layers.html', {'chapters': get_chapters()})

def networking_datalink(request):
    return render(request, 'networking_datalink.html', {'chapters': get_chapters()})

def networking_ip(request):
    return render(request, 'networking_ip.html', {'chapters': get_chapters()})

def networking_tcp(request):
    return render(request, 'networking_tcp.html', {'chapters': get_chapters()})

def networking_application(request):
    return render(request, 'networking_application.html', {'chapters': get_chapters()})
