### #1. Traffic Congestion Analyzer
- **Pattern(s):** Sliding Window
- **Problem Statement:** Find the continuous time window of size K with the highest average traffic density from an array of minute-by-minute sensor readings.
- **Case Study:**
  - **Domain:** Smart City
  - **Scenario:** A traffic control system processes vehicle counts to identify the most congested 15-minute window on a highway to dynamically redirect autonomous vehicles.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A bar chart array where height = density. A highlighted rectangle overlays the current window of size K.
  - **Animation & Interactions:** The rectangle slides right one bar per step. The current sum is shown above the window. User can auto-play or step.
  - **Case Study Visualization:** Below the chart, a top-down view of a road segment shows cars; as the window slides, the road segment turns red/green based on the sum.

### #2. Autonomous Convoy Synchronizer
- **Pattern(s):** Two Pointers
- **Problem Statement:** Given a sorted array of vehicle speeds and a target speed difference, find pairs of vehicles that can safely form a convoy.
- **Case Study:**
  - **Domain:** Automotive
  - **Scenario:** Self-driving trucks need to pair up for aerodynamic drafting. The system finds two trucks whose speeds match a strict differential delta.
- **Graphical Simulation Plan:**
  - **Visual Elements:** An array of sorted numbers. Two pointers (arrows) at the start and end of the array.
  - **Animation & Interactions:** Pointers move inwards. Swapping colors (red for invalid, green for match). User can adjust the target delta.
  - **Case Study Visualization:** Two animated 2D trucks drive on parallel lanes; when a pair matches, they merge into one lane with a drafting wind effect.

### #3. Real-Time Packet Dropper
- **Pattern(s):** Fast & Slow Pointers
- **Problem Statement:** Detect a cycle in a continuous stream of network packets (represented as a linked list of packet references).
- **Case Study:**
  - **Domain:** Networking
  - **Scenario:** A router detects a routing loop where packets are infinitely forwarded between the same nodes, causing network congestion.
- **Graphical Simulation Plan:**
  - **Visual Elements:** Nodes representing routers, connected by directed edges. Two distinct packet icons (one slow, one fast).
  - **Animation & Interactions:** Slow packet moves 1 step, fast packet moves 2 steps. The moment they land on the same node, a "Loop Detected" alert flashes.
  - **Case Study Visualization:** Routers flash data lines. If a loop is found, a firewall shield appears on the loop edge to drop the packet.

### #4. Hospital ER Triage
- **Pattern(s):** Priority Queue (Heap)
- **Problem Statement:** Design a system that efficiently inserts patient records and continually extracts the patient with the highest severity score.
- **Case Study:**
  - **Domain:** Healthcare
  - **Scenario:** An Emergency Room receives patients with varying severity. The doctor must always treat the most critical patient next.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A complete binary tree representing a Max-Heap. Nodes contain patient severity numbers.
  - **Animation & Interactions:** "Insert" adds a node at the bottom and bubbles up. "Extract" removes root, moves the last node to root, and bubbles down.
  - **Case Study Visualization:** A waiting room queue. Patients (icons) are color-coded (red=critical, yellow=stable). As heap updates, the patient at the front door changes.

### #5. Stock Market Peak Finder
- **Pattern(s):** Monotonic Stack
- **Problem Statement:** For each day's stock price, find the next day that has a strictly greater price.
- **Case Study:**
  - **Domain:** Finance
  - **Scenario:** An algorithmic trading bot needs to know the next profitable sell opportunity for every historical data point to train its model.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A line graph of stock prices and a stack visualization (a vertical box) holding unresolved indices.
  - **Animation & Interactions:** A scanner sweeps across the graph. If the current price is higher than the stack top, it pops the stack and draws a green dotted line connecting the two points.
  - **Case Study Visualization:** A trading dashboard. "Buy" and "Sell" badges pop up on the chart as the monotonic stack resolves the next greater elements.

### #6. Social Network Influencer Search
- **Pattern(s):** Breadth-First Search (BFS)
- **Problem Statement:** Find the shortest path between a user and a target influencer in an unweighted social graph.
- **Case Study:**
  - **Domain:** Social Media
  - **Scenario:** A marketing platform calculates the degrees of separation between a brand's new follower and a major celebrity to suggest friends.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A node-link diagram. Start node is blue, target is gold.
  - **Animation & Interactions:** Expanding concentric circles. Nodes turn gray when visited. A queue panel shows pending nodes.
  - **Case Study Visualization:** User avatars in a web. As BFS expands, connecting lines glow like fiber optics, ultimately tracing the shortest connection path.

### #7. Logistics Delivery Routing
- **Pattern(s):** Dijkstra's Algorithm
- **Problem Statement:** Find the shortest path from a warehouse to a delivery destination on a weighted graph.
- **Case Study:**
  - **Domain:** Logistics
  - **Scenario:** A delivery drone calculates the most energy-efficient route across a city grid, avoiding high-wind zones (high weights).
- **Graphical Simulation Plan:**
  - **Visual Elements:** A weighted graph with edge costs. A priority queue array showing current tentative distances.
  - **Animation & Interactions:** Edges are relaxed step-by-step. Shortest path tree grows from the source. User can click edges to change weights.
  - **Case Study Visualization:** A city map with a drone flying the final path. High-weight edges look like storm clouds.

### #8. E-commerce Recommendations
- **Pattern(s):** Trie (Prefix Tree)
- **Problem Statement:** Implement an autocomplete system that efficiently stores search terms and returns all words matching a given prefix.
- **Case Study:**
  - **Domain:** E-Commerce
  - **Scenario:** A user types "lap" in the search bar, and the system instantly suggests "laptop", "lapel pin", and "lap desk" from millions of products.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A tree structure where edges are characters. Nodes are states.
  - **Animation & Interactions:** As the user types in an input box, the path in the Trie lights up. A DFS then retrieves all leaf nodes under that prefix.
  - **Case Study Visualization:** A simulated search bar with a dropdown that populates in real-time as the Trie traversal animation occurs below it.

### #9. Embedded Memory Allocator
- **Pattern(s):** Merge Intervals
- **Problem Statement:** Given an array of memory blocks (start and end addresses), merge all overlapping blocks to find contiguous free space.
- **Case Study:**
  - **Domain:** Embedded Systems
  - **Scenario:** A microcontroller with limited RAM needs to defragment memory by combining overlapping freed memory chunks.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A horizontal timeline showing blocks (rectangles).
  - **Animation & Interactions:** Blocks are sorted by start address. A scanner moves right. Overlapping blocks visually melt together into one larger block.
  - **Case Study Visualization:** A RAM chip schematic. Fragmented red blocks turn into large continuous green blocks as they merge.

### #10. Fraud Ring Detection
- **Pattern(s):** Disjoint Set / Union Find
- **Problem Statement:** Given a list of transactions between accounts, group accounts into disconnected components to find isolated rings.
- **Case Study:**
  - **Domain:** Cybersecurity
  - **Scenario:** A bank analyzes money transfers. If a group of accounts only trades among themselves, they are flagged as a potential money-laundering ring.
- **Graphical Simulation Plan:**
  - **Visual Elements:** Nodes scattered on screen. An array representing the parent pointers.
  - **Animation & Interactions:** When a transaction occurs, the `Union` operation draws a directed edge to the root parent. Path compression visually flattens the tree.
  - **Case Study Visualization:** Bank accounts (icons). Once grouped, the distinct sets are colored differently. A closed ring gets a red "Alert" boundary.

### #11. Genome Sequence Alignment
- **Pattern(s):** Dynamic Programming (2D Grid)
- **Problem Statement:** Find the Longest Common Subsequence (LCS) between two strings.
- **Case Study:**
  - **Domain:** Bioinformatics
  - **Scenario:** A researcher compares a newly discovered virus DNA strand with a known database strand to measure mutation similarities.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A 2D grid with string A on the top and string B on the left.
  - **Animation & Interactions:** Cells fill row by row. Arrows show the dependency (diagonal, left, or top). Finally, the optimal path is backtracked in bold.
  - **Case Study Visualization:** Two DNA helixes unzipping. The matching base pairs (A-T, C-G) light up as the LCS is identified.

### #12. Server Load Balancer
- **Pattern(s):** Greedy Algorithm
- **Problem Statement:** Given an array of tasks with processing times and a number of servers, assign tasks to minimize the maximum load on any server.
- **Case Study:**
  - **Domain:** Cloud Computing
  - **Scenario:** A cloud orchestrator distributes incoming heavy rendering jobs to available virtual machines to minimize total processing time.
- **Graphical Simulation Plan:**
  - **Visual Elements:** Vertical bins (servers) and blocks of varying heights (tasks).
  - **Animation & Interactions:** Tasks are sorted descending. Each task drops into the currently shortest bin.
  - **Case Study Visualization:** Server racks with CPU load meters. As blocks drop in, the load meters spike, balancing out across the data center.

### #13. Flight Route Optimizer
- **Pattern(s):** Bellman-Ford Algorithm
- **Problem Statement:** Find the shortest path from a source to all other nodes in a graph that may contain negative weight edges.
- **Case Study:**
  - **Domain:** Aerospace
  - **Scenario:** An airline calculates routes where some "edges" have negative costs due to extreme tailwinds that save more fuel than the distance implies.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A graph with nodes and directed edges. A distance array.
  - **Animation & Interactions:** The algorithm loops V-1 times, relaxing all edges. A wave effect washes over the graph per iteration.
  - **Case Study Visualization:** An interactive globe. Edges with tailwinds are colored blue (negative cost). The optimal flight path glows.

### #14. Malware Sandbox Escape
- **Pattern(s):** Depth-First Search (DFS)
- **Problem Statement:** Explore all possible execution paths of a binary to see if any path leads to a restricted system call.
- **Case Study:**
  - **Domain:** Cybersecurity
  - **Scenario:** An antivirus engine uses static analysis (represented as a control flow graph) to check if a program can reach the `delete_system32` state.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A complex tree/graph representing execution states.
  - **Animation & Interactions:** DFS dives deep along one branch. Backtracking is shown as a retreating dashed line.
  - **Case Study Visualization:** A hacker terminal. Safe paths print green logs; reaching the restricted node triggers a red "THREAT DETECTED" overlay.

### #15. Warehouse Robot Grid
- **Pattern(s):** Backtracking
- **Problem Statement:** Find all valid paths from top-left to bottom-right in a grid with obstacles.
- **Case Study:**
  - **Domain:** Robotics & Logistics
  - **Scenario:** An Amazon Kiva robot must navigate around fallen boxes to deliver a shelf to the packing station.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A 2D grid. Obstacles are solid squares.
  - **Animation & Interactions:** The robot leaves a trail. When stuck, it rewinds (backtracks) and tries a new adjacent cell. Speed slider for recursion speed.
  - **Case Study Visualization:** An isometric warehouse floor. The robot dynamically reroutes around forklift icons (obstacles).

### #16. Network Packet Scheduler
- **Pattern(s):** Topological Sort
- **Problem Statement:** Given a list of tasks and dependencies (directed acyclic graph), find a valid execution order.
- **Case Study:**
  - **Domain:** Networking
  - **Scenario:** A build server must compile network protocol modules in the correct order so that core IP modules are built before TCP modules.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A DAG of nodes. An array representing in-degrees. A queue for nodes with 0 in-degree.
  - **Animation & Interactions:** Nodes with 0 in-degree turn green, pop off, and remove outgoing edges, decrementing neighbors' in-degrees.
  - **Case Study Visualization:** Code compilation logs. Modules jump from the graph into an execution pipeline conveyor belt.

### #17. IoT Sensor Data Median
- **Pattern(s):** Two Heaps (Min/Max Heap)
- **Problem Statement:** Find the median of a continuous stream of numbers.
- **Case Study:**
  - **Domain:** Internet of Things (IoT)
  - **Scenario:** A smart thermostat needs the rolling median of temperature readings every second to filter out anomalous sensor spikes.
- **Graphical Simulation Plan:**
  - **Visual Elements:** Two binary trees side-by-side (Max-Heap for left half, Min-Heap for right half).
  - **Animation & Interactions:** A number arrives, drops into one heap, balances (swaps to other heap if needed). The median is calculated from the roots.
  - **Case Study Visualization:** A digital thermometer display. Raw data spikes wildly, but the calculated median line stays smooth.

### #18. Supply Chain Network
- **Pattern(s):** Minimum Spanning Tree (Kruskal's)
- **Problem Statement:** Connect all nodes in a graph with the minimum total edge weight without forming cycles.
- **Case Study:**
  - **Domain:** Logistics
  - **Scenario:** A shipping company wants to lay down new delivery routes connecting 10 distribution centers with the minimum amount of asphalt.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A graph with all edges visible but faded. A sorted list of edges by weight.
  - **Animation & Interactions:** Edges are tested from lowest to highest weight. Union-Find checks for cycles. Accepted edges turn solid black.
  - **Case Study Visualization:** A country map. Roads are built between cities one by one until all cities are connected by a single network.

### #19. Game State Hashing
- **Pattern(s):** Hash Map / Set
- **Problem Statement:** Find if there are two elements in an array that sum to a specific target (Two Sum).
- **Case Study:**
  - **Domain:** Gaming
  - **Scenario:** A game engine checks if two colliding rigid bodies have a combined mass exactly equal to a trigger threshold to open a secret door.
- **Graphical Simulation Plan:**
  - **Visual Elements:** An array of masses. A visual hash table (array of buckets).
  - **Animation & Interactions:** For each element, the engine looks up `Target - Current` in the hash table. If missing, it inserts `Current`.
  - **Case Study Visualization:** Boulders rolling into a pit. If two boulders hit the scale and equal 100kg, a stone door slides open.

### #20. Substring Virus Signature
- **Pattern(s):** Sliding Window (Variable Size)
- **Problem Statement:** Find the longest substring with at most K distinct characters.
- **Case Study:**
  - **Domain:** Cybersecurity
  - **Scenario:** An IDS scans an incoming payload for a highly polymorphic virus signature that contains at most 3 distinct hex bytes in a long sequence.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A long string of characters. A highlighted window (left and right pointers). A frequency map counter.
  - **Animation & Interactions:** Right pointer expands window. If distinct characters > K, left pointer shrinks window until valid.
  - **Case Study Visualization:** A hex editor view. The window scans the hex. The max length found so far is saved in a quarantine buffer.

### #21. Blockchain Merkle Tree
- **Pattern(s):** Divide and Conquer / Binary Tree
- **Problem Statement:** Construct a Merkle tree from an array of transaction hashes.
- **Case Study:**
  - **Domain:** Cryptography / Finance
  - **Scenario:** A cryptocurrency node verifies the integrity of a block of 8 transactions by hashing pairs recursively to a single root hash.
- **Graphical Simulation Plan:**
  - **Visual Elements:** 8 leaf nodes at the bottom.
  - **Animation & Interactions:** Adjacent pairs merge upward, generating a parent node with a combined hash animation.
  - **Case Study Visualization:** A blockchain block. If a user maliciously changes one leaf, the animation shows the hash change rippling up to the root, invalidating the block.

### #22. Ticket Scalper Prevention
- **Pattern(s):** Binary Search (on Answer)
- **Problem Statement:** Allocate N tickets to K users such that the maximum number of tickets any one user gets is minimized.
- **Case Study:**
  - **Domain:** E-Commerce
  - **Scenario:** A concert ticketing system throttles requests by finding the optimal maximum rate limit per IP address to ensure fair distribution.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A number line representing possible rate limits.
  - **Animation & Interactions:** Binary search narrows the range. For each mid-point, a simulation checks if it's a valid distribution.
  - **Case Study Visualization:** Server queues. Too low a limit = unused tickets. Too high = scalper bots get them all. The optimal limit balances the load.

### #23. Image Object Counting
- **Pattern(s):** Depth-First Search (DFS on Grid)
- **Problem Statement:** Count the number of islands (connected 1s) in a 2D binary matrix.
- **Case Study:**
  - **Domain:** Computer Vision / Healthcare
  - **Scenario:** An MRI scan algorithm counts the number of distinct tumors (clusters of bright pixels) in a cross-section of a brain.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A 2D grid of black and white pixels.
  - **Animation & Interactions:** A scanner finds the first white pixel, then DFS expands radially, turning the connected pixels into a distinct color (e.g., blue).
  - **Case Study Visualization:** An MRI image. The algorithm highlights distinct anomalies, incrementing a "Tumor Count" display.

### #24. Video Streaming Buffer
- **Pattern(s):** Circular Queue
- **Problem Statement:** Implement a queue with a fixed size where the last position connects back to the first.
- **Case Study:**
  - **Domain:** Multimedia
  - **Scenario:** A video player uses a circular buffer to load 10 seconds of upcoming video frames. When a frame is played, its slot is reused for a new frame.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A ring of squares. Two pointers (Head and Tail) rotating around the ring.
  - **Animation & Interactions:** "Enqueue" advances Tail and fills a square. "Dequeue" advances Head and empties it. Overflows show an error.
  - **Case Study Visualization:** A video player. If Tail catches up to Head (buffer full), download pauses. If Head catches Tail (buffer empty), the video stutters.

### #25. Cache Eviction Policy
- **Pattern(s):** Doubly Linked List + Hash Map (LRU Cache)
- **Problem Statement:** Design a data structure that supports get and put in O(1) time, evicting the Least Recently Used item when at capacity.
- **Case Study:**
  - **Domain:** Web Infrastructure
  - **Scenario:** A Redis cache server stores the latest queried user profiles. When memory is full, the profile that hasn't been accessed the longest is deleted.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A horizontal doubly linked list (most recent on right, least on left) and a hash map pointing to nodes.
  - **Animation & Interactions:** When a node is accessed, it plucks out of the list and flies to the rightmost end. When full, the leftmost node vanishes.
  - **Case Study Visualization:** Database server rack. Highly accessed profiles glow bright hot, while untouched profiles fade to cold blue before being deleted.

### #26. Power Grid Blackout Prevention
- **Pattern(s):** Articulation Points / Tarjan's Algorithm
- **Problem Statement:** Find all critical nodes in a graph that, if removed, would disconnect the graph into multiple components.
- **Case Study:**
  - **Domain:** Energy / Smart Grid
  - **Scenario:** A national power grid analyzes its substations to identify single points of failure that could cause a cascading blackout.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A graph of substations connected by transmission lines.
  - **Animation & Interactions:** DFS runs, calculating discovery times and low values. When `low[v] >= disc[u]`, node `u` turns red and pulses.
  - **Case Study Visualization:** A map of a country at night. Removing a red node makes half the map go dark, demonstrating the blackout.

### #27. Compiler Syntax Checker
- **Pattern(s):** Stack
- **Problem Statement:** Check if an expression with various brackets is balanced.
- **Case Study:**
  - **Domain:** Software Engineering
  - **Scenario:** An IDE's real-time linter verifies if a developer has closed all opened braces, brackets, and parentheses before compiling.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A string of code and a vertical stack.
  - **Animation & Interactions:** Opening brackets push onto the stack. Closing brackets pop the top and check for a match. A mismatch highlights the bracket in red.
  - **Case Study Visualization:** A code editor window. A green checkmark appears on success; a red squiggly line underlines the syntax error on failure.

### #28. DNA Palindrome Finder
- **Pattern(s):** Expand Around Center
- **Problem Statement:** Find the longest palindromic substring in a given string.
- **Case Study:**
  - **Domain:** Bioinformatics
  - **Scenario:** A biologist searches for restriction enzyme cut sites in a DNA sequence, which are often palindromic (e.g., GAATTC).
- **Graphical Simulation Plan:**
  - **Visual Elements:** An array of characters. Two pointers expanding outwards from a center.
  - **Animation & Interactions:** For each center, pointers move left and right as long as characters match. The longest found is highlighted permanently.
  - **Case Study Visualization:** A DNA strand where palindromic sections glow brightly and a pair of molecular scissors appears over the longest sequence.

### #29. Ride-Share Fare Estimator
- **Pattern(s):** Dynamic Programming (Knapsack variant)
- **Problem Statement:** Given coin denominations, find the minimum number of coins to make up a specific amount.
- **Case Study:**
  - **Domain:** Transportation / Fintech
  - **Scenario:** A ride-sharing app optimizes the distribution of promotional ride credits (denominations) to equal exactly a user's loyalty reward total with the fewest coupons.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A 1D DP array of size `Amount + 1`. Available coins.
  - **Animation & Interactions:** Iterates through each amount, picking the minimum between `dp[i]` and `dp[i - coin] + 1`.
  - **Case Study Visualization:** A digital wallet. Coupons slide into the wallet, replacing a larger pile of smaller coupons when a better combination is found.

### #30. Social Distance Seating
- **Pattern(s):** Greedy Algorithm
- **Problem Statement:** Place N people in M seats to maximize the minimum distance between any two people.
- **Case Study:**
  - **Domain:** Event Management / Healthcare
  - **Scenario:** A stadium seating algorithm assigns seats to groups to ensure maximum possible social distancing during a pandemic.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A row of seats (dots on a line).
  - **Animation & Interactions:** Binary search guesses a minimum distance. A greedy algorithm places people sequentially. Invalid attempts turn red.
  - **Case Study Visualization:** Stadium seating chart. Avatars pop into seats. If they are too close, a red warning radius appears, and the algorithm resets.

### #31. Real-Time Leaderboard
- **Pattern(s):** Binary Search Tree / Skip List
- **Problem Statement:** Maintain a sorted stream of scores and query the rank of any specific score efficiently.
- **Case Study:**
  - **Domain:** Gaming
  - **Scenario:** A global MMO game server continuously receives player XP updates and must instantly display the exact global rank of any player.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A self-balancing BST (like an AVL tree) where each node stores the size of its left subtree.
  - **Animation & Interactions:** As XP updates arrive, the tree rotates to maintain balance. Querying a rank traces the path, summing subtree sizes.
  - **Case Study Visualization:** A glittering gold leaderboard UI. Names shuffle up and down dynamically as the underlying tree updates.

### #32. Package Dependency Resolver
- **Pattern(s):** Depth-First Search (Cycle Detection)
- **Problem Statement:** Determine if a set of package dependencies contains a circular dependency (directed graph cycle).
- **Case Study:**
  - **Domain:** DevOps
  - **Scenario:** `npm install` fails before downloading because Package A depends on B, B depends on C, and C depends on A.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A directed graph. Node colors: White (unvisited), Gray (visiting), Black (visited).
  - **Animation & Interactions:** DFS traverses the graph. If it hits a Gray node, a red circular arrow appears, halting the process.
  - **Case Study Visualization:** Terminal output showing `npm resolving...`. When the cycle is hit, an explosion animation breaks the terminal text.

### #33. Word Processor Undo/Redo
- **Pattern(s):** Two Stacks
- **Problem Statement:** Implement a text editor with Undo and Redo capabilities.
- **Case Study:**
  - **Domain:** Software Engineering
  - **Scenario:** A user typing a document makes a mistake, hits Ctrl+Z multiple times, and then Ctrl+Y to restore some changes.
- **Graphical Simulation Plan:**
  - **Visual Elements:** Two stacks: "Undo" and "Redo", and a current text display.
  - **Animation & Interactions:** Typing pushes to Undo. "Undo" pops from Undo to Redo. "Redo" pops from Redo to Undo.
  - **Case Study Visualization:** A mock Microsoft Word interface. Text appears and disappears in the editor as the stacks push and pop blocks of text.

### #34. Airport Terminal Connectivity
- **Pattern(s):** Floyd-Warshall Algorithm
- **Problem Statement:** Find the shortest paths between all pairs of nodes in a weighted graph.
- **Case Study:**
  - **Domain:** Aviation
  - **Scenario:** An airport app calculates the walking time between every possible pair of gates in a massive international terminal.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A 2D distance matrix and a graph representation.
  - **Animation & Interactions:** Three nested loops ($k, i, j$). For each intermediate node $k$, the matrix cell $(i, j)$ updates if a shorter path is found.
  - **Case Study Visualization:** An airport floor plan. As the matrix updates, optimal walking routes flash on the map between various gate pairs.

### #35. Spam Keyword Filter
- **Pattern(s):** Aho-Corasick Algorithm
- **Problem Statement:** Search for multiple keywords simultaneously in a large block of text.
- **Case Study:**
  - **Domain:** Cybersecurity / Email
  - **Scenario:** A mail server scans incoming emails for thousands of known phishing keywords in a single pass to minimize latency.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A Trie with failure links (dotted arrows). A text stream passing underneath.
  - **Animation & Interactions:** The state machine traverses the Trie based on the text. If it fails, it follows the failure link without restarting.
  - **Case Study Visualization:** An email inbox. Suspicious words in the email body are highlighted in red in real-time as the text streams in.

### #36. Image Compression
- **Pattern(s):** Quadtree
- **Problem Statement:** Compress a 2D binary image by recursively dividing it into four quadrants until a quadrant is entirely one color.
- **Case Study:**
  - **Domain:** Computer Graphics
  - **Scenario:** A satellite imagery system compresses massive black-and-white map masks to save transmission bandwidth to Earth.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A 2D grid image and a tree structure beside it.
  - **Animation & Interactions:** The image is cut into four squares. If a square is uniform, it becomes a leaf node. Otherwise, it's cut again recursively.
  - **Case Study Visualization:** A high-res satellite photo. The quadtree grid overlays it, showing large squares over oceans and tiny squares over complex coastlines.

### #37. Subnet IP Allocator
- **Pattern(s):** Binary Trie
- **Problem Statement:** Manage a pool of IP addresses, allocating and freeing them efficiently.
- **Case Study:**
  - **Domain:** Networking / Cloud
  - **Scenario:** An AWS VPC dynamically assigns internal IP addresses to newly spinning-up EC2 instances and reclaims them when destroyed.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A binary tree where left is '0' and right is '1'. Leaf nodes represent full IP addresses.
  - **Animation & Interactions:** Allocating an IP traverses to a free leaf, marking the path as "full" if all children are taken.
  - **Case Study Visualization:** Server racks. When a server boots, a binary path lights up in the Trie, and the server receives its IP badge.

### #38. GPS Traffic Routing
- **Pattern(s):** A* Search
- **Problem Statement:** Find the shortest path from start to end using a heuristic to guide the search faster than standard Dijkstra.
- **Case Study:**
  - **Domain:** Navigation
  - **Scenario:** Google Maps routes a user home. It prioritizes highways heading in the general direction of the destination rather than exploring side streets in the wrong direction.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A grid/graph. Open set and closed set are colored distinctly.
  - **Animation & Interactions:** Nodes are explored based on $f(n) = g(n) + h(n)$. The search visually stretches specifically toward the target.
  - **Case Study Visualization:** A street map. A radar pulse shows the heuristic pull, exploring fewer streets compared to a uniform circular expansion.

### #39. Stock Buy/Sell Multi-Transaction
- **Pattern(s):** Dynamic Programming (State Machine)
- **Problem Statement:** Maximize profit by buying and selling stocks, with constraints like cooldowns or transaction fees.
- **Case Study:**
  - **Domain:** Finance
  - **Scenario:** A high-frequency trading algorithm maximizes daily profit but must wait a 1-minute cooldown period after every sell to comply with exchange rules.
- **Graphical Simulation Plan:**
  - **Visual Elements:** Three states (Hold, Sold, Rest) represented as circles. Arrows between them update with DP values.
  - **Animation & Interactions:** As the stock chart moves day-by-day, the values in the state machine update, highlighting the optimal path.
  - **Case Study Visualization:** A trader's P&L chart. The "Cooldown" state flashes an hourglass, showing why a specific trade was skipped for a better future outcome.

### #40. Genomic Data Compression
- **Pattern(s):** Huffman Coding
- **Problem Statement:** Create a prefix-free binary code for characters based on their frequency to compress data.
- **Case Study:**
  - **Domain:** Bioinformatics
  - **Scenario:** A research lab compresses a 3-billion-character DNA string (A, C, G, T) for storage by giving shorter binary codes to the most frequent bases.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A frequency table and a priority queue.
  - **Animation & Interactions:** The two lowest frequency nodes merge into a parent tree. This repeats until one root remains. The tree edges are labeled 0 and 1.
  - **Case Study Visualization:** A DNA sequence turning into a binary stream. The output file size shrinks visually on a progress bar.

### #41. Real-Time Chat Anagrams
- **Pattern(s):** Hash Map (Frequency counting)
- **Problem Statement:** Group an array of strings into lists of anagrams.
- **Case Study:**
  - **Domain:** Gaming / Social
  - **Scenario:** A Wordle-style multiplayer game groups players' submitted words to detect if they submitted anagrams of the same root word.
- **Graphical Simulation Plan:**
  - **Visual Elements:** Words floating in a pool. A hash map with sorted strings as keys and arrays as values.
  - **Animation & Interactions:** Each word is sorted alphabetically. It then flies into the bucket corresponding to its sorted string key.
  - **Case Study Visualization:** A multiplayer scoreboard. Players who submit anagrams are clustered together in the same scoring bracket with a neat animation.

### #42. Factory Assembly Line
- **Pattern(s):** Dynamic Programming (1D)
- **Problem Statement:** Find the longest increasing subsequence in an array.
- **Case Study:**
  - **Domain:** Manufacturing
  - **Scenario:** A robotic arm picks up boxes from a conveyor belt. It can only pick up a box if it is strictly heavier than the previous one to maintain balance. What's the max boxes it can stack?
- **Graphical Simulation Plan:**
  - **Visual Elements:** An array of boxes with weights. A DP array tracking max stack size ending at each box.
  - **Animation & Interactions:** Two pointers iterate. If `weight[j] < weight[i]`, `dp[i] = max(dp[i], dp[j] + 1)`.
  - **Case Study Visualization:** A robotic arm stacking physical boxes. A ghost image shows the best stack found so far.

### #43. Database Sharding Allocation
- **Pattern(s):** Binary Search (Capacity scaling)
- **Problem Statement:** Given an array of file sizes and M drives, find the minimum drive capacity required to store all files sequentially without splitting a file.
- **Case Study:**
  - **Domain:** Database Systems
  - **Scenario:** A DBA wants to migrate sequential database logs to 3 identical hard drives and needs to buy the smallest possible drives that will fit the load.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A number line for capacity. Bins representing hard drives.
  - **Animation & Interactions:** Binary search guesses a capacity. The animation attempts to pack the logs into the 3 drives. If it overflows, the guess is too small.
  - **Case Study Visualization:** Server racks. Logs (blocks) drop into hard drive slots. Red flashing occurs if a block doesn't fit, adjusting the capacity slider.

### #44. Ride-Share Matchmaking
- **Pattern(s):** Bipartite Matching (Max Flow)
- **Problem Statement:** Connect a set of riders to a set of drivers based on acceptable distance thresholds, maximizing the total number of rides.
- **Case Study:**
  - **Domain:** Transportation
  - **Scenario:** Uber needs to match 10 passengers with 10 nearby drivers simultaneously, ensuring no double-booking and maximizing fulfilled requests.
- **Graphical Simulation Plan:**
  - **Visual Elements:** Two columns of nodes (Riders and Drivers). Edges represent valid distances.
  - **Animation & Interactions:** Ford-Fulkerson or Hopcroft-Karp executes. Augmenting paths highlight in blue, establishing final matches in thick green lines.
  - **Case Study Visualization:** A city map with rider and car icons. Lines draw between them, shuffling as the algorithm finds the global optimum.

### #45. Continuous Integration Pipeline
- **Pattern(s):** Longest Path in DAG
- **Problem Statement:** Find the longest path in a directed acyclic graph.
- **Case Study:**
  - **Domain:** DevOps
  - **Scenario:** A CI/CD pipeline runs parallel build jobs with dependencies. The system must find the "critical path" which determines the absolute minimum total build time.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A DAG representing jobs and their durations.
  - **Animation & Interactions:** Topological sort runs first. Then, DP calculates the longest path to each node. The critical path glows brightly.
  - **Case Study Visualization:** A Jenkins/GitHub Actions dashboard. The longest sequence of jobs is highlighted to show developers where to optimize.

### #46. Fraudulent Subarray Sum
- **Pattern(s):** Prefix Sum + Hash Map
- **Problem Statement:** Find the number of continuous subarrays whose sum equals exactly K.
- **Case Study:**
  - **Domain:** Fintech
  - **Scenario:** An auditor scans a company's ledger to find any continuous sequence of transactions that exactly nets to $10,000, suspecting a specific embezzlement pattern.
- **Graphical Simulation Plan:**
  - **Visual Elements:** An array of transactions. A cumulative sum counter and a hash map tracking seen prefix sums.
  - **Animation & Interactions:** As the pointer moves right, the prefix sum is calculated. It looks up `CurrentSum - K` in the map. Matches draw a bracket over the subarray.
  - **Case Study Visualization:** An Excel ledger. The matching rows are highlighted in yellow, and an "Anomaly Detected" flag is thrown.

### #47. Smart Grid Voltage Drop
- **Pattern(s):** Lowest Common Ancestor (LCA)
- **Problem Statement:** Find the lowest common ancestor of two nodes in a tree.
- **Case Study:**
  - **Domain:** Energy
  - **Scenario:** A power grid detects voltage anomalies at two different houses. It traces back up the distribution tree to find the nearest shared transformer that might be failing.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A tree structure representing the power grid.
  - **Animation & Interactions:** Two paths trace upward from the leaf nodes. Where the paths intersect, the LCA node pulses.
  - **Case Study Visualization:** Houses and transformers. Lightning bolts travel up the power lines from the houses and explode at the faulty transformer.

### #48. Multiplayer Game Proximity
- **Pattern(s):** K-D Tree / Quadtree
- **Problem Statement:** Efficiently find the K nearest neighbors to a specific point in a 2D space.
- **Case Study:**
  - **Domain:** Gaming
  - **Scenario:** A Battle Royale game needs to render footstep sounds. It must quickly find the 5 closest enemy players to the user out of 100 players on a massive map.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A 2D plane with points. A tree representing spatial divisions.
  - **Animation & Interactions:** A circle expands from the player. The tree traversal selectively prunes branches (spatial sectors) that don't intersect the circle.
  - **Case Study Visualization:** A mini-map. Enemies outside the search radius remain hidden. The algorithm snaps lines to the 5 closest enemies, rendering audio waves.

### #49. Network Redundancy Check
- **Pattern(s):** Bridges in a Graph
- **Problem Statement:** Find all edges in a graph whose removal increases the number of disconnected components.
- **Case Study:**
  - **Domain:** Telecommunications
  - **Scenario:** An ISP analyzes its fiber-optic network to find "critical links" (bridges) where a single cable cut would isolate an entire city.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A graph of cities.
  - **Animation & Interactions:** DFS executes, tracking discovery and low times. If `low[v] > disc[u]`, the edge `(u, v)` is marked as a bridge.
  - **Case Study Visualization:** A map of internet backbones. The identified critical links are highlighted in warning tape, prompting physical backup installations.

### #50. Task Scheduling with Deadlines
- **Pattern(s):** Greedy + Disjoint Set
- **Problem Statement:** Maximize total profit by scheduling tasks, each taking 1 unit of time, such that each is completed before its deadline.
- **Case Study:**
  - **Domain:** Operating Systems / Cloud
  - **Scenario:** A server has a queue of premium micro-jobs, each paying a different fee and having a strict deadline. It schedules jobs to maximize revenue.
- **Graphical Simulation Plan:**
  - **Visual Elements:** A timeline of available time slots. An array of tasks sorted by profit.
  - **Animation & Interactions:** The highest paying task tries to slot into its deadline. If taken, it checks earlier slots (accelerated by Union-Find).
  - **Case Study Visualization:** A server calendar. High-paying jobs slot in perfectly. Jobs that miss deadlines disintegrate, and total revenue ticks up.

