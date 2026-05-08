#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
    pid_t p = fork();
    if (p < 0) {
        printf("Fork Failed\n");
    } else if (p == 0) {
        printf("Child Process: My PID is %d\n", getpid());
    } else {
        printf("Parent Process: My Child's PID is %d\n", p);
    }
    return 0;
}
