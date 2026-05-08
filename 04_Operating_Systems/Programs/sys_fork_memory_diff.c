#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>

// Global initialized variable -> Data Segment
int global_data = 100;

// Global uninitialized variable -> BSS Segment
int global_bss;

int main() {

    // Stack variable
    int stack_var = 300;

    // Heap variable
    int *heap_var = (int*)malloc(sizeof(int));
    *heap_var = 400;

    printf("\n===== Before fork() =====\n");
    printf("PID = %d\n", getpid());

    printf("Data Segment : Address=%p Value=%d\n",
           &global_data, global_data);

    printf("BSS Segment  : Address=%p Value=%d\n",
           &global_bss, global_bss);

    printf("Heap Segment : Address=%p Value=%d\n",
           heap_var, *heap_var);

    printf("Stack Segment: Address=%p Value=%d\n",
           &stack_var, stack_var);

    pid_t p = fork();

    if (p < 0) {
        perror("fork failed");
        return 1;
    }

    else if (p == 0) {
        // Child Process modifies values
        global_data = 111;
        global_bss = 222;
        *heap_var = 333;
        stack_var = 444;

        printf("\n===== Child Process =====\n");
        printf("PID = %d, Parent PID = %d\n",
               getpid(), getppid());

        printf("Data Segment : Address=%p Value=%d\n",
               &global_data, global_data);

        printf("BSS Segment  : Address=%p Value=%d\n",
               &global_bss, global_bss);

        printf("Heap Segment : Address=%p Value=%d\n",
               heap_var, *heap_var);

        printf("Stack Segment: Address=%p Value=%d\n",
               &stack_var, stack_var);
    }

    else {
        sleep(1); // Let child run first

        printf("\n===== Parent Process =====\n");
        printf("PID = %d, Child PID = %d\n",
               getpid(), p);

        printf("Data Segment : Address=%p Value=%d\n",
               &global_data, global_data);

        printf("BSS Segment  : Address=%p Value=%d\n",
               &global_bss, global_bss);

        printf("Heap Segment : Address=%p Value=%d\n",
               heap_var, *heap_var);

        printf("Stack Segment: Address=%p Value=%d\n",
               &stack_var, stack_var);
    }

    free(heap_var);

    return 0;
}
