import json
import subprocess
import os
import tempfile
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def get_chapters():
    return [
        {"id": "history", "title": "1. Linux History", "description": "From Unix to the modern world."},
        {"id": "architecture", "title": "2. Architecture & File System", "description": "Kernel, Shell, Inodes, and the FHS."},
        {"id": "system_calls", "title": "3. System Calls", "description": "The interface between applications and the kernel."},
        {"id": "permissions", "title": "4. Permissions & Security", "description": "Mastering chmod, chown, and octal values."},
        {"id": "processes", "title": "5. Process Management", "description": "PIDs, Lifecycles, and State Machines."},
        {"id": "threads", "title": "6. Threads & Concurrency", "description": "Multi-threading, Shared Memory, and Deadlocks."},
        {"id": "scripting", "title": "7. Shell & Scripting", "description": "Pipes, Redirection, and Automation."},
        {"id": "memory", "title": "8. Memory Management", "description": "Virtual memory, Paging, and Malloc internals."},
        {"id": "scheduling", "title": "9. CPU Scheduling & Context Switching", "description": "How the OS decides who runs next."},
        {"id": "ipc", "title": "10. Inter-Process Communication (IPC)", "description": "Pipes, Shared Memory, and Message Queues."},
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

def linux_threads(request):
    thread_examples = {
        "creation": {
            "title": "Thread Creation (Pthreads)",
            "description": "How to spawn a new thread and pass arguments.",
            "code": """#include <pthread.h>
#include <stdio.h>

void* print_hello(void* arg) {
    int id = *(int*)arg;
    printf("Hello from Thread %d!\\n", id);
    return NULL;
}

int main() {
    pthread_t thread;
    int id = 1;
    
    // 1. Create thread
    pthread_create(&thread, NULL, print_hello, &id);
    
    // 2. Wait for thread to finish
    pthread_join(thread, NULL);
    
    printf("Thread execution finished.\\n");
    return 0;
}"""
        },
        "mutex": {
            "title": "Mutual Exclusion (Mutex)",
            "description": "Protecting a shared counter from race conditions.",
            "code": """#include <pthread.h>
#include <stdio.h>

int counter = 0;
pthread_mutex_t lock;

void* increment(void* arg) {
    pthread_mutex_lock(&lock);
    for(int i=0; i<100000; i++) counter++;
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_mutex_init(&lock, NULL);

    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Final Counter: %d\\n", counter);
    pthread_mutex_destroy(&lock);
    return 0;
}"""
        },
        "deadlock": {
            "title": "The Deadlock Pattern",
            "description": "Code that triggers a circular wait between two mutexes.",
            "code": """#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

pthread_mutex_t L1, L2;

void* threadA(void* arg) {
    pthread_mutex_lock(&L1);
    sleep(1); // Wait for threadB to lock L2
    pthread_mutex_lock(&L2); // WAITING FOREVER
    
    pthread_mutex_unlock(&L2);
    pthread_mutex_unlock(&L1);
    return NULL;
}

void* threadB(void* arg) {
    pthread_mutex_lock(&L2);
    sleep(1); // Wait for threadA to lock L1
    pthread_mutex_lock(&L1); // WAITING FOREVER
    
    pthread_mutex_unlock(&L1);
    pthread_mutex_unlock(&L2);
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_mutex_init(&L1, NULL);
    pthread_mutex_init(&L2, NULL);

    pthread_create(&t1, NULL, threadA, NULL);
    pthread_create(&t2, NULL, threadB, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    return 0;
}"""
        }
    }
    return render(request, 'linux_threads.html', {
        'chapters': get_chapters(),
        'thread_examples': thread_examples
    })

def linux_scripting(request):
    return render(request, 'linux_scripting.html', {'chapters': get_chapters()})

def linux_memory(request):
    return render(request, 'linux_memory.html', {'chapters': get_chapters()})

def linux_scheduling(request):
    return render(request, 'linux_scheduling.html', {'chapters': get_chapters()})

def linux_resources(request):
    return render(request, 'linux_resources.html', {'chapters': get_chapters()})

def linux_ipc(request):
    ipc_methods = [
        {
            "name": "Shared Memory (shm)",
            "description": "The fastest form of IPC. Processes share a common memory segment. Ideal for high-performance graphics where large buffers (pixel data) need to be accessed by both the producer and consumer.",
            "icon": "🧠",
            "commands": ["ipcs -m", "ipcrm -m <id>"]
        },
        {
            "name": "Message Queues (msg)",
            "description": "Asynchronous communication where processes send/receive messages. Useful for control signals and non-blocking event handling in graphics engines.",
            "icon": "📨",
            "commands": ["ipcs -q", "ipcrm -q <id>"]
        },
        {
            "name": "Semaphores (sem)",
            "description": "Synchronization primitives used to prevent race conditions when multiple processes access shared graphics resources (like the framebuffer).",
            "icon": "🚦",
            "commands": ["ipcs -s", "ipcrm -s <id>"]
        },
        {
            "name": "Unix Domain Sockets",
            "description": "Bidirectional byte stream communication. Often used by X11 or Wayland display servers to communicate with client applications.",
            "icon": "🔌",
            "commands": ["ss -x", "netstat -u"]
        }
    ]
    
    code_examples = {
        "pipes": {
            "title": "Unidirectional Pipes",
            "code": """#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main() {
    int pipefd[2];
    char buffer[30];
    pipe(pipefd); // pipefd[0] is read, pipefd[1] is write

    if (fork() == 0) {
        close(pipefd[0]); // Close unused read end
        char *msg = "Message from Child!";
        write(pipefd[1], msg, strlen(msg) + 1);
        close(pipefd[1]);
    } else {
        close(pipefd[1]); // Close unused write end
        read(pipefd[0], buffer, sizeof(buffer));
        printf("Parent received: %s\\n", buffer);
        close(pipefd[0]);
    }
    return 0;
}"""
        },
        "msg_queue": {
            "title": "System V Message Queues",
            "code": """#include <stdio.h>
#include <sys/ipc.h>
#include <sys/msg.h>

struct msg_buffer {
    long msg_type;
    char msg_text[100];
} message;

int main() {
    key_t key = ftok("progfile", 65);
    int msgid = msgget(key, 0666 | IPC_CREAT);
    
    // Sender part
    message.msg_type = 1;
    sprintf(message.msg_text, "Hello via Queue!");
    msgsnd(msgid, &message, sizeof(message), 0);
    
    // Receiver part
    msgrcv(msgid, &message, sizeof(message), 1, 0);
    printf("Data Received: %s\\n", message.msg_text);
    
    msgctl(msgid, IPC_RMID, NULL); // Destroy queue
    return 0;
}"""
        },
        "shm": {
            "title": "Shared Memory (POSIX)",
            "code": """#include <stdio.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main() {
    key_t key = ftok("shmfile", 65);
    int shmid = shmget(key, 1024, 0666 | IPC_CREAT);
    char *str = (char*) shmat(shmid, (void*)0, 0);

    // Write to memory
    sprintf(str, "Shared Data Content");
    printf("Data written: %s\\n", str);

    // Read would happen here or in another process...
    
    shmdt(str);
    return 0;
}"""
        },
        "signals": {
            "title": "Signal Handling",
            "code": """#include <stdio.h>
#include <signal.h>
#include <unistd.h>

void handle_sig(int sig) {
    printf("Caught signal %d (SIGINT)\\n", sig);
}

int main() {
    signal(SIGINT, handle_sig);
    printf("Press Ctrl+C to trigger signal...\\n");
    while(1) {
        sleep(1);
    }
    return 0;
}"""
        }
    }

    return render(request, 'linux_ipc.html', {
        'ipc_methods': ipc_methods,
        'code_examples': code_examples,
        'chapters': get_chapters()
    })

@csrf_exempt
def run_c_code(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            code = data.get('code', '')
            
            # Create a temporary directory for compilation
            with tempfile.TemporaryDirectory() as tmpdir:
                c_file = os.path.join(tmpdir, 'temp.c')
                exec_file = os.path.join(tmpdir, 'temp.out')
                
                with open(c_file, 'w') as f:
                    f.write(code)
                
                # Compile with pthreads support
                compile_res = subprocess.run(
                    ['gcc', c_file, '-o', exec_file, '-pthread'],
                    capture_output=True, text=True
                )
                
                if compile_res.returncode != 0:
                    return JsonResponse({
                        'success': False,
                        'error': f"Compilation Error:\n{compile_res.stderr}"
                    })
                
                # Run the binary
                try:
                    run_res = subprocess.run(
                        [exec_file],
                        capture_output=True, text=True, timeout=5
                    )
                    return JsonResponse({
                        'success': True,
                        'output': run_res.stdout + run_res.stderr
                    })
                except subprocess.TimeoutExpired:
                    return JsonResponse({
                        'success': False,
                        'error': "Execution Timeout: The program took too long to run (Infinite loop?)"
                    })
                except Exception as e:
                    return JsonResponse({
                        'success': False,
                        'error': f"Runtime Error: {str(e)}"
                    })
                    
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
            
    return JsonResponse({'success': False, 'error': 'Invalid request method'})

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
