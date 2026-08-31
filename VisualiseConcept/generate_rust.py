import os

TOPICS = [
    {"id": "variables", "slug": "rust_variables", "title": "1. Variables & Mutability", "desc": "Immutability by default, let vs mut, and shadowing."},
    {"id": "data_types", "slug": "rust_data_types", "title": "2. Data Types", "desc": "Scalar and Compound types in statically typed Rust."},
    {"id": "functions", "slug": "rust_functions", "title": "3. Functions & Control Flow", "desc": "fn, if/else, loop, while, for, and expressions."},
    {"id": "ownership", "slug": "rust_ownership", "title": "4. Ownership", "desc": "Rust's most unique feature for memory safety."},
    {"id": "borrowing", "slug": "rust_borrowing", "title": "5. References & Borrowing", "desc": "&T, &mut T, and the rules of borrowing."},
    {"id": "structs", "slug": "rust_structs", "title": "6. Structs", "desc": "Custom data types to group related values."},
    {"id": "enums", "slug": "rust_enums", "title": "7. Enums & Pattern Matching", "desc": "Algebraic data types and the match control flow."},
    {"id": "option_result", "slug": "rust_option_result", "title": "8. Option & Result", "desc": "Handling absence of values and recoverable errors."},
    {"id": "collections", "slug": "rust_collections", "title": "9. Collections", "desc": "Vectors, Strings, and Hash Maps."},
    {"id": "modules", "slug": "rust_modules", "title": "10. Modules & Crates", "desc": "Managing growing projects with packages and crates."},
    {"id": "generics", "slug": "rust_generics", "title": "11. Generics", "desc": "Abstracting types to reduce code duplication."},
    {"id": "traits", "slug": "rust_traits", "title": "12. Traits", "desc": "Defining shared behavior across types."},
    {"id": "lifetimes", "slug": "rust_lifetimes", "title": "13. Lifetimes", "desc": "Validating references to prevent dangling pointers."},
    {"id": "closures", "slug": "rust_closures", "title": "14. Closures", "desc": "Anonymous functions that capture their environment."},
    {"id": "iterators", "slug": "rust_iterators", "title": "15. Iterators", "desc": "Processing sequences of elements functionally."},
    {"id": "smart_pointers", "slug": "rust_smart_pointers", "title": "16. Smart Pointers", "desc": "Box, Rc, RefCell, and the Deref/Drop traits."},
    {"id": "concurrency", "slug": "rust_concurrency", "title": "17. Concurrency", "desc": "Fearless concurrency with threads, channels, and Mutexes."},
    {"id": "oop", "slug": "rust_oop", "title": "18. OOP Features", "desc": "How Rust implements Object-Oriented patterns."},
    {"id": "macros", "slug": "rust_macros", "title": "19. Macros", "desc": "Metaprogramming in Rust (macro_rules! and procedural)."},
    {"id": "unsafe", "slug": "rust_unsafe", "title": "20. Unsafe Rust", "desc": "Bypassing safety checks for low-level control."}
]

VIEWS_PATH = "RustProgramming/views.py"
URLS_PATH = "RustProgramming/urls.py"
DASHBOARD_PATH = "templates/rust_dashboard.html"
TEMPLATES_DIR = "templates"

def generate_views():
    with open(VIEWS_PATH, "w") as f:
        f.write("from django.shortcuts import render\n\n")
        f.write("def get_chapters():\n")
        f.write("    return [\n")
        for t in TOPICS:
            f.write(f'        {{"id": "{t["id"]}", "title": "{t["title"]}", "description": "{t["desc"]}", "slug": "{t["slug"]}"}},\n')
        f.write("    ]\n\n")
        
        f.write("def dashboard(request):\n")
        f.write("    return render(request, 'rust_dashboard.html', {'chapters': get_chapters()})\n\n")
        
        for t in TOPICS:
            f.write(f"def {t['slug']}(request):\n")
            f.write(f"    return render(request, '{t['slug']}.html', {{'chapters': get_chapters()}})\n\n")

def generate_urls():
    with open(URLS_PATH, "w") as f:
        f.write("from django.urls import path\n")
        f.write("from . import views\n\n")
        f.write("app_name = 'RustProgramming'\n\n")
        f.write("urlpatterns = [\n")
        f.write("    path('', views.dashboard, name='dashboard'),\n")
        for t in TOPICS:
            f.write(f"    path('{t['slug']}/', views.{t['slug']}, name='{t['slug']}'),\n")
        f.write("]\n")

def generate_dashboard():
    dashboard_content = """{% extends 'base.html' %}
{% load static %}

{% block title %}Rust Programming{% endblock %}

{% block content %}
<div class="glass-card">
    <h1>Rust Programming Hub 🦀</h1>
    <p>Safety, Speed, and Concurrency. Learn how Rust is redefining modern systems programming.</p>
    
    <div style="margin-top: 3rem; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;">
        {% for chap in chapters %}
        <a href="{% url 'RustProgramming:'|add:chap.slug %}" style="text-decoration: none;">
            <div class="glass-card nav-card" style="padding: 2rem; transition: all 0.3s ease; height: 100%; border-left: 5px solid #E43716;">
                <h3 style="color: #E43716; margin-bottom: 1rem; font-size: 1.3rem;">{{ chap.title }}</h3>
                <p style="font-size: 0.95rem; color: var(--text-muted);">{{ chap.description }}</p>
                <div style="margin-top: 1.5rem; color: #E43716; font-weight: 600; font-size: 0.9rem;">Begin Journey →</div>
            </div>
        </a>
        {% endfor %}
    </div>
</div>

<style>
.nav-card:hover {
    transform: translateY(-5px);
    border-color: #E43716;
    box-shadow: 0 10px 20px rgba(228, 55, 22, 0.15);
}
</style>
{% endblock %}
"""
    with open(DASHBOARD_PATH, "w") as f:
        f.write(dashboard_content)

def generate_templates():
    template_base = """{{% extends 'base.html' %}}
{{% load static %}}

{{% block title %}}{title}{{% endblock %}}

{{% block content %}}
<div class="glass-card">
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
        <a href="{{% url 'RustProgramming:dashboard' %}}" class="btn btn-outline" style="padding: 0.5rem 1rem;">← Back</a>
        <h1 style="margin: 0; color: #E43716;">{title}</h1>
    </div>
    
    <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem;">
        {desc}
    </p>

    <div class="glass-card" style="background: rgba(0,0,0,0.2); border: 1px solid rgba(228, 55, 22, 0.2);">
        <h2 style="color: #E43716; margin-bottom: 1rem;">Concept Visualization</h2>
        <div id="visualization" style="min-height: 300px; display: flex; align-items: center; justify-content: center; background: #1e1e1e; border-radius: 8px; padding: 2rem;">
            <!-- Simple visualization placeholder, can be enhanced with JS -->
            <div style="text-align: center;">
                <div class="anim-box" style="font-size: 4rem; margin-bottom: 1rem;">⚙️</div>
                <h3 style="color: #61dafb;">Interactive Engine Loading...</h3>
                <p>This space visualizes the inner workings of <strong>{title}</strong>.</p>
            </div>
        </div>
    </div>

    <div style="margin-top: 3rem;">
        <h2 style="color: #E43716;">Code Example</h2>
        <div style="background: #1e1e1e; padding: 1.5rem; border-radius: 8px; overflow-x: auto; font-family: monospace; color: #d4d4d4; border-left: 4px solid #E43716;">
            <pre><code>// Example for {title}
fn main() {{
    println!("Exploring {{}}", "{title}");
    // Add specific example code here
}}</code></pre>
        </div>
    </div>
    
    <div style="margin-top: 3rem; padding: 2rem; background: rgba(228, 55, 22, 0.05); border-radius: 8px; border: 1px solid rgba(228, 55, 22, 0.1);">
        <h3 style="color: #E43716; margin-top: 0;">Key Takeaways</h3>
        <ul style="margin-bottom: 0;">
            <li>Rust ensures memory safety without a garbage collector.</li>
            <li>Zero-cost abstractions make your code fast and readable.</li>
            <li>The compiler is your best friend.</li>
        </ul>
    </div>
</div>

<style>
@keyframes spin {{
    0% {{ transform: rotate(0deg); }}
    100% {{ transform: rotate(360deg); }}
}}
.anim-box {{
    display: inline-block;
    animation: spin 4s linear infinite;
}}
</style>
{{% endblock %}}
"""
    for t in TOPICS:
        path = os.path.join(TEMPLATES_DIR, f"{t['slug']}.html")
        content = template_base.format(title=t['title'], desc=t['desc'])
        with open(path, "w") as f:
            f.write(content)

if __name__ == "__main__":
    generate_views()
    generate_urls()
    generate_dashboard()
    generate_templates()
    print("Generated all 20 Rust pages successfully!")
