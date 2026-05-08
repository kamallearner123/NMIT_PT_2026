#include <stdio.h>
#include <signal.h>
#include <unistd.h>

void handle_sig(int sig) {
    printf("Caught signal %d (SIGINT)\n", sig);
}

int main() {
    signal(SIGINT, handle_sig);
    printf("Press Ctrl+C to trigger signal...\n");
    while(1) {
        sleep(1);
    }
    return 0;
}
