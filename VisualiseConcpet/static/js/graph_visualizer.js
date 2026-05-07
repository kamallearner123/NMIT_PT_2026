class GraphNode {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.neighbors = [];
    }
}

let nodes = [];
let adjacencyList = {};
let steps = [];
let currentStep = -1;
let isPlaying = false;
let playInterval = null;

const container = document.getElementById('graphContainer');
const svg = document.getElementById('graphSvg');
const algoTitle = document.getElementById('algoTitle');
const algoDesc = document.getElementById('algoDesc');
const nextBtn = document.getElementById('nextBtn');
const playBtn = document.getElementById('playBtn');
const startBtn = document.getElementById('startBtn');
const algorithmSelect = document.getElementById('algorithm');

const GRAPH_DATA = {
    bfs: {
        title: "Breadth First Search (BFS)",
        desc: "BFS explores nodes level-by-level using a queue. It is ideal for finding the shortest path in unweighted graphs.",
        code: [
            "def bfs(graph, start):",
            "    visited = {start}",
            "    queue = collections.deque([start])",
            "    while queue:",
            "        node = queue.popleft()",
            "        for neighbor in graph[node]:",
            "            if neighbor not in visited:",
            "                visited.add(neighbor)",
            "                queue.append(neighbor)"
        ]
    },
    dfs: {
        title: "Depth First Search (DFS)",
        desc: "DFS explores as far as possible along a branch before backtracking. It uses a stack or recursion.",
        code: [
            "def dfs(graph, start, visited=None):",
            "    if visited is None: visited = set()",
            "    visited.add(start)",
            "    for neighbor in graph[start]:",
            "        if neighbor not in visited:",
            "            dfs(graph, neighbor, visited)"
        ]
    },
    dijkstra: {
        title: "Dijkstra's Algorithm",
        desc: "Dijkstra's finds the shortest path from a source to all other nodes. It uses a priority queue and works only with non-negative weights.",
        code: [
            "def dijkstra(graph, start):",
            "    dist = {n: inf for n in graph}",
            "    dist[start] = 0",
            "    pq = [(0, start)]",
            "    while pq:",
            "        d, u = heapq.heappop(pq)",
            "        if d > dist[u]: continue",
            "        for v, w in graph[u]:",
            "            if dist[u] + w < dist[v]:",
            "                dist[v] = dist[u] + w",
            "                heapq.heappush(pq, (dist[v], v))"
        ]
    },
    bellmanFord: {
        title: "Bellman-Ford Algorithm",
        desc: "Bellman-Ford computes shortest paths and can handle negative weights. It also detects negative cycles by relaxing all edges V-1 times.",
        code: [
            "def bellman_ford(graph, start, V):",
            "    dist = [inf] * V",
            "    dist[start] = 0",
            "    for _ in range(V - 1):",
            "        for u, v, w in edges:",
            "            if dist[u] + w < dist[v]:",
            "                dist[v] = dist[u] + w",
            "    for u, v, w in edges:",
            "        if dist[u] + w < dist[v]:",
            "            raise Error('Negative cycle')"
        ]
    },
    prim: {
        title: "Prim's Algorithm",
        desc: "Prim's builds a Minimum Spanning Tree (MST) by greedily adding the cheapest edge from the current tree to a new vertex.",
        code: [
            "def prim(graph, start=0):",
            "    mst_weight = 0",
            "    pq = [(0, start, -1)] # weight, to, from",
            "    visited = set()",
            "    while pq:",
            "        w, u, prev = heappop(pq)",
            "        if u in visited: continue",
            "        visited.add(u)",
            "        if prev != -1: mst.append((prev, u))",
            "        for v, weight in graph[u]:",
            "            if v not in visited:",
            "                heappush(pq, (weight, v, u))"
        ]
    },
    kruskal: {
        title: "Kruskal's Algorithm",
        desc: "Kruskal's finds the MST by sorting all edges and adding them if they don't create a cycle (using Disjoint Set Union).",
        code: [
            "def kruskal(edges, V):",
            "    edges.sort(key=lambda x: x[2])",
            "    dsu = DSU(V)",
            "    mst = []",
            "    for u, v, w in edges:",
            "        if dsu.find(u) != dsu.find(v):",
            "            dsu.union(u, v)",
            "            mst.append((u, v))",
            "    return mst"
        ]
    }
};

function generateRandomGraph() {
    resetVisualization();
    nodes = [];
    adjacencyList = {};
    
    const numNodes = 7;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) - 80;

    for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        nodes.push(new GraphNode(i, x, y));
        adjacencyList[i] = [];
    }

    // Density-based random edges
    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            if (Math.random() > 0.65) {
                const weight = Math.floor(Math.random() * 12) + 1;
                adjacencyList[i].push({to: j, weight: weight});
                adjacencyList[j].push({to: i, weight: weight});
            }
        }
    }
    
    // Ensure connectivity (Simple ring)
    for (let i = 0; i < numNodes; i++) {
        const j = (i + 1) % numNodes;
        if (!adjacencyList[i].some(e => e.to === j)) {
            const weight = Math.floor(Math.random() * 10) + 1;
            adjacencyList[i].push({to: j, weight: weight});
            adjacencyList[j].push({to: i, weight: weight});
        }
    }

    renderGraph();
    updateCode();
}

function renderGraph(activeNodeId = null, visitedNodes = [], queue = [], distances = {}, activeEdges = []) {
    container.querySelectorAll('.graph-node').forEach(n => n.remove());
    container.querySelectorAll('.edge-weight').forEach(n => n.remove());
    svg.innerHTML = '';

    // Draw Edges
    for (let u = 0; u < nodes.length; u++) {
        adjacencyList[u].forEach(edge => {
            if (u < edge.to) { // Draw undirected edges once
                const v = edge.to;
                const nodeU = nodes[u];
                const nodeV = nodes[v];
                
                const isActive = activeEdges.some(ae => 
                    (ae.from === u && ae.to === v) || (ae.from === v && ae.to === u)
                );

                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", nodeU.x);
                line.setAttribute("y1", nodeU.y);
                line.setAttribute("x2", nodeV.x);
                line.setAttribute("y2", nodeV.y);
                line.setAttribute("stroke", isActive ? "#fbbf24" : "var(--glass-border)");
                line.setAttribute("stroke-width", isActive ? "4" : "2");
                svg.appendChild(line);

                const weightDiv = document.createElement('div');
                weightDiv.className = 'edge-weight';
                weightDiv.innerText = edge.weight;
                weightDiv.style.cssText = `
                    position: absolute;
                    left: ${(nodeU.x + nodeV.x) / 2}px;
                    top: ${(nodeU.y + nodeV.y) / 2}px;
                    background: ${isActive ? '#fbbf24' : 'rgba(15, 23, 42, 0.8)'};
                    color: ${isActive ? '#0f172a' : 'var(--accent)'};
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 3;
                    border: 1px solid var(--glass-border);
                `;
                container.appendChild(weightDiv);
            }
        });
    }

    // Draw Nodes
    nodes.forEach(node => {
        const div = document.createElement('div');
        div.className = 'graph-node';
        const isVisited = visitedNodes.includes(node.id);
        const isInQueue = queue.includes(node.id);
        const isActive = node.id === activeNodeId;
        
        div.style.left = `${node.x - 20}px`;
        div.style.top = `${node.y - 20}px`;
        div.style.cssText += `
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${isActive ? '#fbbf24' : (isVisited ? 'var(--primary)' : (isInQueue ? 'rgba(56, 189, 248, 0.3)' : 'var(--card-bg)'))};
            border: 2px solid ${isActive ? '#fff' : 'var(--primary)'};
            color: ${isActive ? '#0f172a' : 'white'};
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 5;
            transition: all 0.3s ease;
            box-shadow: ${isActive ? '0 0 20px #fbbf24' : 'none'};
        `;
        div.innerText = node.id;
        
        if (distances[node.id] !== undefined && distances[node.id] !== null) {
            const distDiv = document.createElement('div');
            distDiv.style.cssText = "position: absolute; bottom: -25px; font-size: 0.8rem; color: #fbbf24; width: 60px; text-align: center; left: -10px; font-weight: bold;";
            distDiv.innerText = distances[node.id] === Infinity ? "∞" : "d=" + distances[node.id];
            div.appendChild(distDiv);
        }
        
        container.appendChild(div);
    });
}

function updateCode(activeLine = -1) {
    const algo = algorithmSelect.value;
    const config = GRAPH_DATA[algo];
    if (!config) return;

    algoTitle.innerText = config.title;
    algoDesc.innerText = config.desc;

    const codeBlock = document.getElementById('codeBlock');
    if (!codeBlock) return;
    codeBlock.innerHTML = '';
    config.code.forEach((line, idx) => {
        const div = document.createElement('div');
        div.className = 'code-line' + (idx === activeLine ? ' line-active' : '');
        div.innerHTML = Prism.highlight(line, Prism.languages.python, 'python');
        codeBlock.appendChild(div);
        if (idx === activeLine) div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

function startVisualization() {
    stopAutoPlay();
    const algo = algorithmSelect.value;
    steps = [];
    
    // Clear displays
    const display = document.getElementById('traversalDisplay');
    const path = document.getElementById('traversalPath');
    if (display) display.style.display = 'none';
    if (path) path.innerHTML = '';

    if (algo === 'bfs') {
        let visited = [0];
        let queue = [0];
        steps.push({ line: 2, active: 0, visited: [...visited], queue: [...queue], vars: { visited: "[0]", queue: "[0]" } });
        
        while (queue.length > 0) {
            let u = queue.shift();
            steps.push({ line: 4, active: u, visited: [...visited], queue: [...queue], vars: { node: u, queue: JSON.stringify(queue) } });
            
            for (let edge of adjacencyList[u]) {
                const v = edge.to;
                if (!visited.includes(v)) {
                    visited.push(v);
                    queue.push(v);
                    steps.push({ line: 8, active: v, visited: [...visited], queue: [...queue], vars: { neighbor: v, visited: JSON.stringify(visited) }, highlight: v });
                }
            }
        }
    } else if (algo === 'dfs') {
        let visited = [];
        const dfsRec = (u) => {
            visited.push(u);
            steps.push({ line: 2, active: u, visited: [...visited], vars: { node: u, visited: JSON.stringify(visited) }, highlight: u });
            
            for (let edge of adjacencyList[u]) {
                const v = edge.to;
                if (!visited.includes(v)) {
                    dfsRec(v);
                }
            }
        };
        dfsRec(0);
    } else if (algo === 'dijkstra') {
        let distances = {};
        nodes.forEach(n => distances[n.id] = Infinity);
        distances[0] = 0;
        let pq = [{dist: 0, id: 0}];
        let visited = [];
        
        steps.push({ line: 2, active: 0, distances: {...distances}, vars: { status: "Initialize distances" } });
        
        while (pq.length > 0) {
            pq.sort((a, b) => a.dist - b.dist);
            let {dist, id: u} = pq.shift();
            
            if (visited.includes(u)) continue;
            visited.push(u);
            
            steps.push({ line: 5, active: u, visited: [...visited], distances: {...distances}, vars: { node: u, currentDist: dist } });
            
            for (let edge of adjacencyList[u]) {
                const v = edge.to;
                const weight = edge.weight;
                if (distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    pq.push({dist: distances[v], id: v});
                    steps.push({ line: 10, active: v, visited: [...visited], distances: {...distances}, vars: { neighbor: v, newDist: distances[v] }, highlight: v });
                }
            }
        }
    } else if (algo === 'bellmanFord') {
        let distances = {};
        nodes.forEach(n => distances[n.id] = Infinity);
        distances[0] = 0;
        steps.push({ line: 2, active: 0, distances: {...distances}, vars: { status: "Start node distance = 0" } });

        for (let i = 0; i < nodes.length - 1; i++) {
            let changed = false;
            for (let u = 0; u < nodes.length; u++) {
                for (let edge of adjacencyList[u]) {
                    const v = edge.to;
                    const w = edge.weight;
                    if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
                        distances[v] = distances[u] + w;
                        changed = true;
                        steps.push({ line: 6, active: v, distances: {...distances}, vars: { iteration: i+1, edge: `${u}->${v}`, dist: distances[v] }, highlight: v });
                    }
                }
            }
            if (!changed) break;
        }
    } else if (algo === 'prim') {
        let visited = [];
        let mstEdges = [];
        let pq = [{w: 0, to: 0, from: -1}];
        
        steps.push({ line: 2, active: 0, visited: [], activeEdges: [], vars: { status: "Start with node 0" } });

        while (pq.length > 0 && visited.length < nodes.length) {
            pq.sort((a, b) => a.w - b.w);
            let edge = pq.shift();
            
            if (visited.includes(edge.to)) continue;
            
            visited.push(edge.to);
            if (edge.from !== -1) {
                mstEdges.push({from: edge.from, to: edge.to});
            }
            
            steps.push({ line: 8, active: edge.to, visited: [...visited], activeEdges: [...mstEdges], vars: { node: edge.to, addedEdge: edge.from !== -1 ? `${edge.from}-${edge.to}` : 'None' }, highlight: edge.from !== -1 ? `${edge.from}-${edge.to}` : edge.to });
            
            adjacencyList[edge.to].forEach(e => {
                if (!visited.includes(e.to)) {
                    pq.push({w: e.weight, to: e.to, from: edge.to});
                }
            });
        }
    } else if (algo === 'kruskal') {
        let allEdges = [];
        for (let u = 0; u < nodes.length; u++) {
            adjacencyList[u].forEach(e => {
                if (u < e.to) allEdges.push({from: u, to: e.to, w: e.weight});
            });
        }
        allEdges.sort((a, b) => a.w - b.w);
        
        let parent = nodes.map((_, i) => i);
        const find = (i) => {
            while (parent[i] !== i) i = parent[i];
            return i;
        };
        const union = (i, j) => {
            let rootI = find(i);
            let rootJ = find(j);
            if (rootI !== rootJ) {
                parent[rootI] = rootJ;
                return true;
            }
            return false;
        };

        let mstEdges = [];
        steps.push({ line: 1, active: null, activeEdges: [], vars: { status: "Sorted edges by weight" } });

        for (let edge of allEdges) {
            if (union(edge.from, edge.to)) {
                mstEdges.push({from: edge.from, to: edge.to});
                steps.push({ line: 7, active: edge.to, activeEdges: [...mstEdges], vars: { edge: `${edge.from}-${edge.to}`, weight: edge.w }, highlight: `${edge.from}-${edge.to}` });
            } else {
                steps.push({ line: 4, active: null, activeEdges: [...mstEdges], vars: { skip: `${edge.from}-${edge.to}`, reason: "Forms cycle" } });
            }
        }
    }

    currentStep = 0;
    nextBtn.disabled = false;
    playBtn.disabled = false;
    startBtn.innerText = "Re-Initialize";
    nextStep();
}

function toggleAutoPlay() {
    if (isPlaying) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
}

function startAutoPlay() {
    isPlaying = true;
    playBtn.innerText = "Pause";
    playInterval = setInterval(() => {
        if (currentStep >= steps.length) {
            stopAutoPlay();
        } else {
            nextStep();
        }
    }, 800);
}

function stopAutoPlay() {
    isPlaying = false;
    playBtn.innerText = "Play";
    if (playInterval) clearInterval(playInterval);
}

function nextStep() {
    if (currentStep >= steps.length) {
        nextBtn.disabled = true;
        stopAutoPlay();
        return;
    }

    const step = steps[currentStep];
    renderGraph(step.active, step.visited || [], step.queue || [], step.distances || {}, step.activeEdges || []);
    updateCode(step.line);
    renderVariables(step.vars);

    if (step.highlight !== undefined && step.highlight !== null) {
        const display = document.getElementById('traversalDisplay');
        const path = document.getElementById('traversalPath');
        if (display && path) {
            display.style.display = 'block';
            const nodeDiv = document.createElement('div');
            nodeDiv.innerText = step.highlight;
            nodeDiv.style.cssText = "padding: 5px 10px; border-radius: 4px; background: var(--primary); color: white; font-weight: bold; font-size: 0.8rem; animation: popIn 0.3s ease;";
            path.appendChild(nodeDiv);
        }
    }

    currentStep++;
}

function renderVariables(vars = {}) {
    const panel = document.getElementById('variablePanel');
    const list = document.getElementById('variableList');
    if (!panel || !list) return;
    if (!vars || Object.keys(vars).length === 0) {
        panel.style.display = 'none';
        return;
    }
    panel.style.display = 'block';
    list.innerHTML = '';
    for (const [key, val] of Object.entries(vars)) {
        const item = document.createElement('div');
        item.className = 'variable-item';
        item.innerHTML = `<span class="variable-name">${key}</span>: <span class="variable-value">${val}</span>`;
        list.appendChild(item);
    }
}

function resetVisualization() {
    stopAutoPlay();
    steps = [];
    currentStep = -1;
    if (nextBtn) nextBtn.disabled = true;
    if (playBtn) playBtn.disabled = true;
    if (startBtn) startBtn.innerText = "Initialize";
    renderGraph();
    updateCode();
    renderVariables({});
    
    const display = document.getElementById('traversalDisplay');
    const path = document.getElementById('traversalPath');
    if (display) display.style.display = 'none';
    if (path) path.innerHTML = '';
}

// Initialize
window.addEventListener('load', () => {
    generateRandomGraph();
});

algorithmSelect.addEventListener('change', () => {
    resetVisualization();
});


