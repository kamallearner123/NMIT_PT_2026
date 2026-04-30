class GraphNode {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.neighbors = [];
    }
}

let nodes = [];
let adjacencyList = {}; // { nodeId: [ {to: id, weight: w}, ... ] }
let steps = [];
let currentStep = -1;

const container = document.getElementById('graphContainer');
const svg = document.getElementById('graphSvg');
const algoTitle = document.getElementById('algoTitle');
const algoDesc = document.getElementById('algoDesc');
const nextBtn = document.getElementById('nextBtn');
const startBtn = document.getElementById('startBtn');
const algorithmSelect = document.getElementById('algorithm');

const GRAPH_DATA = {
    bfs: {
        title: "Breadth First Search (BFS)",
        desc: "Explores neighbors level by level using a Queue (FIFO). Useful for finding the shortest path in unweighted graphs.",
        code: [
            "def bfs(graph, start):",
            "    visited = set([start])",
            "    queue = [start]",
            "    while queue:",
            "        node = queue.pop(0)",
            "        for neighbor in graph[node]:",
            "            if neighbor not in visited:",
            "                visited.add(neighbor)",
            "                queue.append(neighbor)"
        ]
    },
    dfs: {
        title: "Depth First Search (DFS)",
        desc: "Explores as far as possible along each branch before backtracking using a Stack (LIFO) or Recursion.",
        code: [
            "def dfs(graph, start, visited=None):",
            "    if visited is None: visited = set()",
            "    visited.add(start)",
            "    print(start)",
            "    for neighbor in graph[start]:",
            "        if neighbor not in visited:",
            "            dfs(graph, neighbor, visited)"
        ]
    },
    dijkstra: {
        title: "Dijkstra's Algorithm",
        desc: "Finds the shortest path from a starting node to all other nodes in a weighted graph using a priority queue.",
        code: [
            "def dijkstra(graph, start):",
            "    distances = {node: float('inf') for node in graph}",
            "    distances[start] = 0",
            "    pq = [(0, start)]",
            "    while pq:",
            "        curr_dist, u = heapq.heappop(pq)",
            "        for v, weight in graph[u].items():",
            "            if curr_dist + weight < distances[v]:",
            "                distances[v] = curr_dist + weight",
            "                heapq.heappush(pq, (distances[v], v))"
        ]
    }
};

function generateRandomGraph() {
    resetVisualization();
    nodes = [];
    adjacencyList = {};
    
    const numNodes = 6;
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) - 50;

    for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const node = new GraphNode(i, x, y);
        nodes.push(node);
        adjacencyList[i] = [];
    }

    // Add random edges with weights
    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
            if (Math.random() > 0.6) {
                const weight = Math.floor(Math.random() * 9) + 1;
                adjacencyList[i].push({to: j, weight: weight});
                adjacencyList[j].push({to: i, weight: weight});
            }
        }
    }
    
    // Ensure connectivity
    for (let i = 0; i < numNodes - 1; i++) {
        const hasEdge = adjacencyList[i].some(e => e.to === i+1);
        if (!hasEdge) {
            const weight = Math.floor(Math.random() * 9) + 1;
            adjacencyList[i].push({to: i+1, weight: weight});
            adjacencyList[i+1].push({to: i, weight: weight});
        }
    }

    renderGraph();
}

function renderGraph(activeNodeId = null, visitedNodes = [], queue = [], distances = {}) {
    container.querySelectorAll('.graph-node').forEach(n => n.remove());
    container.querySelectorAll('.edge-weight').forEach(n => n.remove());
    svg.innerHTML = '';

    // Define marker for directed arrows
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "arrowhead");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "7");
    marker.setAttribute("refX", "25"); // Offset to point at circle edge
    marker.setAttribute("refY", "3.5");
    marker.setAttribute("orient", "auto");
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
    polygon.setAttribute("fill", "var(--glass-border)");
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Draw Edges
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        adjacencyList[node.id].forEach(edge => {
            const neighbor = nodes[edge.to];
            
            // For undirected display, only draw once
            if (edge.to > node.id) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", node.x);
                line.setAttribute("y1", node.y);
                line.setAttribute("x2", neighbor.x);
                line.setAttribute("y2", neighbor.y);
                line.setAttribute("stroke", "var(--glass-border)");
                line.setAttribute("stroke-width", "2");
                // line.setAttribute("marker-end", "url(#arrowhead)"); // Uncomment for directed
                svg.appendChild(line);

                // Add Weight Label
                const weightDiv = document.createElement('div');
                weightDiv.className = 'edge-weight';
                weightDiv.innerText = edge.weight;
                weightDiv.style.cssText = `
                    position: absolute;
                    left: ${(node.x + neighbor.x) / 2}px;
                    top: ${(node.y + neighbor.y) / 2}px;
                    background: rgba(15, 23, 42, 0.8);
                    color: var(--accent);
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                `;
                container.appendChild(weightDiv);
            }
        });
    }

    // Draw Nodes
    nodes.forEach(node => {
        const div = document.createElement('div');
        let className = 'graph-node';
        if (node.id === activeNodeId) className += ' active';
        if (visitedNodes.includes(node.id)) className += ' visited';
        if (queue.includes(node.id)) className += ' in-queue';
        
        div.className = className;
        div.style.left = `${node.x - 20}px`;
        div.style.top = `${node.y - 20}px`;
        div.style.cssText += `
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: ${visitedNodes.includes(node.id) ? 'var(--primary)' : 'rgba(255,255,255,0.1)'};
            border: 2px solid ${node.id === activeNodeId ? '#fff' : 'var(--primary)'};
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 2;
            transition: all 0.3s ease;
            box-shadow: ${node.id === activeNodeId ? '0 0 20px var(--primary)' : 'none'};
        `;
        div.innerText = node.id;
        
        // Add Distance Label for Dijkstra
        if (distances[node.id] !== undefined) {
            const distDiv = document.createElement('div');
            distDiv.style.cssText = "position: absolute; bottom: -20px; font-size: 0.7rem; color: #fbbf24; width: 100%; text-align: center;";
            distDiv.innerText = distances[node.id] === Infinity ? "∞" : "d=" + distances[node.id];
            div.appendChild(distDiv);
        }
        
        container.appendChild(div);
    });
}

function updateCode(activeLine = -1) {
    const config = GRAPH_DATA[algorithmSelect.value];
    const codeBlock = document.getElementById('codeBlock');
    if (!codeBlock) return;
    codeBlock.innerHTML = '';
    config.code.forEach((line, idx) => {
        const div = document.createElement('div');
        div.className = 'code-line' + (idx === activeLine ? ' line-active' : '');
        div.innerHTML = Prism.highlight(line, Prism.languages.python, 'python');
        codeBlock.appendChild(div);
    });
}

function startVisualization() {
    const algo = algorithmSelect.value;
    steps = [];
    
    // Clear traversal display
    const display = document.getElementById('traversalDisplay');
    const path = document.getElementById('traversalPath');
    if (display) display.style.display = 'none';
    if (path) path.innerHTML = '';

    if (algo === 'bfs') {
        let visited = [0];
        let queue = [0];
        steps.push({ line: 1, active: 0, visited: [...visited], queue: [...queue], vars: { visited: "[0]", queue: "[0]" } });
        
        while (queue.length > 0) {
            let u = queue.shift();
            steps.push({ line: 4, active: u, visited: [...visited], queue: [...queue], vars: { node: u, queue: JSON.stringify(queue) } });
            
            for (let edge of adjacencyList[u]) {
                const v = edge.to;
                if (!visited.includes(v)) {
                    visited.push(v);
                    queue.push(v);
                    steps.push({ line: 7, active: v, visited: [...visited], queue: [...queue], vars: { neighbor: v, visited: JSON.stringify(visited) }, highlight: v });
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
        
        steps.push({ line: 1, active: 0, visited: [], distances: {...distances}, vars: { distances: JSON.stringify(distances) } });
        
        while (pq.length > 0) {
            pq.sort((a, b) => a.dist - b.dist);
            let {dist, id: u} = pq.shift();
            
            if (visited.includes(u)) continue;
            visited.push(u);
            
            steps.push({ line: 5, active: u, visited: [...visited], distances: {...distances}, vars: { node: u, dist: dist } });
            
            for (let edge of adjacencyList[u]) {
                const v = edge.to;
                const weight = edge.weight;
                if (distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                    pq.push({dist: distances[v], id: v});
                    steps.push({ line: 8, active: v, visited: [...visited], distances: {...distances}, vars: { neighbor: v, newDist: distances[v] }, highlight: v });
                }
            }
        }
    }

    currentStep = 0;
    nextBtn.disabled = false;
    startBtn.disabled = true;
    nextStep();
}

function nextStep() {
    if (currentStep >= steps.length) {
        nextBtn.disabled = true;
        return;
    }

    const step = steps[currentStep];
    renderGraph(step.active, step.visited, step.queue || [], step.distances || {});
    updateCode(step.line);
    renderVariables(step.vars);

    // Update traversal path display
    if (step.highlight !== undefined && step.highlight !== null) {
        const display = document.getElementById('traversalDisplay');
        const path = document.getElementById('traversalPath');
        if (display && path) {
            display.style.display = 'block';
            const nodeDiv = document.createElement('div');
            nodeDiv.innerText = step.highlight;
            nodeDiv.style.cssText = "width: 30px; height: 30px; border-radius: 4px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 5px; margin-bottom: 5px;";
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
    steps = [];
    currentStep = -1;
    if (nextBtn) nextBtn.disabled = true;
    if (startBtn) startBtn.disabled = false;
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
    updateCode();
});

algorithmSelect.addEventListener('change', () => {
    resetVisualization();
});
