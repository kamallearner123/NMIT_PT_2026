from django.shortcuts import render

def get_chapters():
    return [
        {"id": "history", "title": "1. Linux History", "description": "From Unix to the modern world."},
        {"id": "architecture", "title": "2. Architecture & File System", "description": "Kernel, Shell, and the Directory Tree."},
        {"id": "system_calls", "title": "3. System Calls", "description": "The interface between applications and the kernel."},
        {"id": "permissions", "title": "4. Permissions & Security", "description": "Mastering chmod, chown, and octal values."},
        {"id": "processes", "title": "5. Process Management", "description": "PIDs, Jobs, and the System Monitor."},
        {"id": "scripting", "title": "6. Shell & Scripting", "description": "Pipes, Redirection, and Automation."},
        {"id": "memory", "title": "7. Memory Management", "description": "Virtual memory, Paging, and Malloc internals."},
        {"id": "scheduling", "title": "8. CPU Scheduling & Context Switching", "description": "How the OS decides who runs next."},
        {"id": "resources", "title": "📚 Standard Resources", "description": "Recommended books and documentation."},
    ]

def linux_dashboard(request):
    return render(request, 'linux_dashboard.html', {'chapters': get_chapters()})

def linux_architecture(request):
    return render(request, 'linux_architecture.html', {'chapters': get_chapters()})

def linux_system_calls(request):
    examples = [
        {
            "title": "1. Process Creation (fork)",
            "description": "The fork() system call creates a new process by duplicating the calling process. The new process is called the child process.",
            "code": """#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
    pid_t p = fork();
    if (p < 0) {
        printf("Fork Failed\\n");
    } else if (p == 0) {
        printf("Child Process: My PID is %d\\n", getpid());
    } else {
        printf("Parent Process: My Child's PID is %d\\n", p);
    }
    return 0;
}""",
            "output": "Parent Process: My Child's PID is 1234\\nChild Process: My PID is 1234"
        },
        {
            "title": "2. File Operations (open, read, write, close)",
            "description": "These system calls are used for basic file I/O operations in Linux.",
            "code": """#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

int main() {
    int fd = open("test.txt", O_CREAT | O_WRONLY, 0644);
    if (fd != -1) {
        write(fd, "Hello Linux!", 12);
        close(fd);
    }
    
    char buffer[20];
    fd = open("test.txt", O_RDONLY);
    read(fd, buffer, 12);
    buffer[12] = '\\0';
    printf("Read from file: %s\\n", buffer);
    close(fd);
    return 0;
}""",
            "output": "Read from file: Hello Linux!"
        },
        {
            "title": "3. Process Termination (exit, wait)",
            "description": "The wait() system call makes the parent process wait for the child process to complete.",
            "code": """#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
    if (fork() == 0) {
        printf("Child performing task...\\n");
        exit(0);
    } else {
        wait(NULL);
        printf("Parent: Child has finished.\\n");
    }
    return 0;
}""",
            "output": "Child performing task...\\nParent: Child has finished."
        },
        {
            "title": "4. Getting Process Info (getpid, getppid)",
            "description": "Retrieve the process ID of the calling process and its parent.",
            "code": """#include <stdio.h>
#include <unistd.h>

int main() {
    printf("My PID: %d\\n", getpid());
    printf("Parent PID: %d\\n", getppid());
    return 0;
}""",
            "output": "My PID: 4567\\nParent PID: 4566"
        },
        {
            "title": "5. Directory Operations (mkdir, rmdir)",
            "description": "System calls to create and remove directories from the file system.",
            "code": """#include <sys/stat.h>
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int main() {
    if (mkdir("my_folder", 0777) == 0) {
        printf("Directory created successfully\\n");
    }
    // rmdir("my_folder"); // Uncomment to remove
    return 0;
}""",
            "output": "Directory created successfully"
        },
        {
            "title": "6. File Metadata (stat)",
            "description": "Retrieve information about a file, such as size, permissions, and timestamps.",
            "code": """#include <stdio.h>
#include <sys/stat.h>

int main() {
    struct stat st;
    stat("test.txt", &st);
    printf("File Size: %ld bytes\\n", st.st_size);
    printf("Permissions: %o\\n", st.st_mode & 0777);
    return 0;
}""",
            "output": "File Size: 12 bytes\\nPermissions: 644"
        },
        {
            "title": "7. Inter-Process Communication (pipe)",
            "description": "Creates a unidirectional data channel that can be used for communication between processes.",
            "code": """#include <stdio.h>
#include <unistd.h>

int main() {
    int pipefd[2];
    char buffer[10];
    pipe(pipefd);
    
    if (fork() == 0) {
        write(pipefd[1], "Hi Dad", 6);
    } else {
        read(pipefd[0], buffer, 6);
        buffer[6] = '\\0';
        printf("Parent received: %s\\n", buffer);
    }
    return 0;
}""",
            "output": "Parent received: Hi Dad"
        },
        {
            "title": "8. Memory Mapping (mmap)",
            "description": "Maps files or devices into memory, allowing efficient file access.",
            "code": """#include <stdio.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>

int main() {
    int fd = open("test.txt", O_RDONLY);
    char *map = mmap(0, 12, PROT_READ, MAP_PRIVATE, fd, 0);
    printf("Mapped data: %s\\n", map);
    munmap(map, 12);
    close(fd);
    return 0;
}""",
            "output": "Mapped data: Hello Linux!"
        },
        {
            "title": "9. Signal Handling (kill, signal)",
            "description": "Signals are software interrupts sent to a process to notify it of an event.",
            "code": """#include <stdio.h>
#include <signal.h>
#include <unistd.h>

void handle_sigint(int sig) {
    printf("\\nCaught signal %d. Exiting clean.\\n", sig);
}

int main() {
    signal(SIGINT, handle_sigint);
    printf("Press Ctrl+C to send SIGINT...\\n");
    while(1) sleep(1);
    return 0;
}""",
            "output": "Press Ctrl+C to send SIGINT...\\nCaught signal 2. Exiting clean."
        },
        {
            "title": "10. Changing Permissions (chmod)",
            "description": "The chmod() system call changes the access permissions of a file.",
            "code": """#include <sys/stat.h>
#include <stdio.h>

int main() {
    if (chmod("test.txt", S_IRUSR | S_IRGRP | S_IROTH) == 0) {
        printf("Permissions changed to Read-Only for all\\n");
    }
    return 0;
}""",
            "output": "Permissions changed to Read-Only for all"
        }
    ]
    return render(request, 'linux_system_calls.html', {
        'examples': examples,
        'chapters': get_chapters()
    })

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
    os_evolution = [
        {
            "phase": "Serial Processing",
            "era": "1940s-1950s",
            "feature": "Direct Hardware Access",
            "description": "No OS. Users had full control of the machine. One job at a time.",
            "icon": "📟",
            "tech": ["Vacuum Tubes", "Plugboards"]
        },
        {
            "phase": "Simple Batch Systems",
            "era": "1950s-1960s",
            "feature": "The 'Monitor'",
            "description": "Jobs were batched together. A resident monitor automated job transitions.",
            "icon": "📦",
            "tech": ["Punch Cards", "Magnetic Tapes"]
        },
        {
            "phase": "Multiprogramming",
            "era": "1960s-1970s",
            "feature": "CPU Efficiency",
            "description": "Multiple jobs in memory. CPU switches if a job waits for I/O.",
            "icon": "🔀",
            "tech": ["I/O Interrupts", "Memory Protection"]
        },
        {
            "phase": "Time-Sharing",
            "era": "1970s-1980s",
            "feature": "User Interactivity",
            "description": "Multiple users interact with the system simultaneously. Unix was born here.",
            "icon": "👥",
            "tech": ["Virtual Memory", "File Systems"]
        },
        {
            "phase": "Distributed Systems",
            "era": "1990s-2000s",
            "feature": "Networking",
            "description": "Operating systems spanning multiple machines across a network.",
            "icon": "🌐",
            "tech": ["TCP/IP", "Client-Server"]
        },
        {
            "phase": "Modern & Cloud",
            "era": "2010s-Present",
            "feature": "Scalability & Mobility",
            "description": "Virtualization, Containers, and Mobile OS like Android/iOS.",
            "icon": "☁️",
            "tech": ["Docker/K8s", "Real-time Kernels"]
        }
    ]
    return render(request, 'linux_history.html', {
        'milestones': milestones,
        'os_evolution': os_evolution,
        'chapters': get_chapters()
    })
