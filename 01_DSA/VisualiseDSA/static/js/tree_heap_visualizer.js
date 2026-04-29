class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

let root = null;
let steps = [];
let currentStep = -1;
let treeData = []; // Array representation for Heap

const container = document.getElementById('treeContainer');
const svg = document.getElementById('treeSvg');
const valInput = document.getElementById('treeValue');
const algoTitle = document.getElementById('algoTitle');
const algoDesc = document.getElementById('algoDesc');
const nextBtn = document.getElementById('nextBtn');
const startBtn = document.getElementById('startBtn');
const algorithmSelect = document.getElementById('algorithm');

const TREE_DATA = {
    bst_insert: {
        title: "BST Insertion",
        desc: "Inserts a value into the Binary Search Tree. Smaller values go left, larger values go right.",
        code: [
            "def insert(root, key):",
            "    if root is None:",
            "        return Node(key)",
            "    if key < root.val:",
            "        root.left = insert(root.left, key)",
            "    else:",
            "        root.right = insert(root.right, key)",
            "    return root"
        ]
    },
    bst_search: {
        title: "BST Search",
        desc: "Efficiently finds a value by eliminating half of the tree at each step.",
        code: [
            "def search(root, key):",
            "    if root is None or root.val == key:",
            "        return root",
            "    if root.val < key:",
            "        return search(root.right, key)",
            "    return search(root.left, key)"
        ]
    },
    heap_insert: {
        title: "Max Heap Insertion",
        desc: "Adds element to end, then 'bubbles up' to maintain heap property (parent >= child).",
        code: [
            "def insert(heap, val):",
            "    heap.append(val)",
            "    i = len(heap) - 1",
            "    while i > 0:",
            "        p = (i - 1) // 2",
            "        if heap[p] < heap[i]:",
            "            heap[p], heap[i] = heap[i], heap[p]",
            "            i = p",
            "        else: break"
        ]
    }
};

function calculatePositions(node, x, y, spacing) {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculatePositions(node.left, x - spacing, y + 80, spacing / 2);
    calculatePositions(node.right, x + spacing, y + 80, spacing / 2);
}

function renderTree(activeNodeVal = null, highlightNodeVal = null) {
    container.querySelectorAll('.tree-node').forEach(n => n.remove());
    svg.innerHTML = '';
    
    if (!root) return;
    
    calculatePositions(root, container.offsetWidth / 2, 50, container.offsetWidth / 4);
    
    const drawNodes = (node) => {
        if (!node) return;
        
        // Draw Edges
        if (node.left) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", node.x);
            line.setAttribute("y1", node.y);
            line.setAttribute("x2", node.left.x);
            line.setAttribute("y2", node.left.y);
            svg.appendChild(line);
            drawNodes(node.left);
        }
        if (node.right) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", node.x);
            line.setAttribute("y1", node.y);
            line.setAttribute("x2", node.right.x);
            line.setAttribute("y2", node.right.y);
            svg.appendChild(line);
            drawNodes(node.right);
        }
        
        // Draw Node
        const div = document.createElement('div');
        div.className = 'tree-node' + (node.val === activeNodeVal ? ' active' : '') + (node.val === highlightNodeVal ? ' highlight' : '');
        div.style.left = `${node.x - 25}px`;
        div.style.top = `${node.y - 25}px`;
        div.innerText = node.val;
        container.appendChild(div);
    };
    
    drawNodes(root);
}

function updateCode(activeLine = -1) {
    const config = TREE_DATA[algorithmSelect.value];
    const codeBlock = document.getElementById('codeBlock');
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
    const val = parseInt(valInput.value) || Math.floor(Math.random() * 90) + 10;
    steps = [];
    
    if (algo === 'bst_insert') {
        let curr = root;
        steps.push({ line: 0, vars: { key: val } });
        if (!root) {
            steps.push({ line: 1, vars: { root: "None" } });
            steps.push({ line: 2, vars: { root: "None" }, action: 'create_root' });
        } else {
            while (curr) {
                steps.push({ line: 3, active: curr.val, vars: { "curr.val": curr.val, key: val } });
                if (val < curr.val) {
                    steps.push({ line: 4, active: curr.val, vars: { direction: "Left" } });
                    if (!curr.left) {
                        steps.push({ action: 'add_left', parent: curr, val: val });
                        break;
                    }
                    curr = curr.left;
                } else {
                    steps.push({ line: 6, active: curr.val, vars: { direction: "Right" } });
                    if (!curr.right) {
                        steps.push({ action: 'add_right', parent: curr, val: val });
                        break;
                    }
                    curr = curr.right;
                }
            }
        }
    } else if (algo === 'bst_search') {
        let curr = root;
        let found = false;
        while (curr) {
            steps.push({ line: 1, active: curr.val, vars: { "curr.val": curr.val, target: val } });
            if (curr.val === val) {
                steps.push({ line: 2, highlight: curr.val, vars: { status: "Found!" } });
                found = true;
                break;
            }
            if (val > curr.val) {
                steps.push({ line: 3, active: curr.val });
                steps.push({ line: 4, active: curr.val, vars: { move: "Right" } });
                curr = curr.right;
            } else {
                steps.push({ line: 5, active: curr.val, vars: { move: "Left" } });
                curr = curr.left;
            }
        }
        if (!found) steps.push({ line: 1, vars: { status: "Not Found" } });
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
    
    if (step.action === 'create_root') root = new TreeNode(step.vars.key || parseInt(valInput.value));
    if (step.action === 'add_left') step.parent.left = new TreeNode(step.val);
    if (step.action === 'add_right') step.parent.right = new TreeNode(step.val);

    renderTree(step.active, step.highlight);
    updateCode(step.line);
    renderVariables(step.vars);

    currentStep++;
}

function renderVariables(vars = {}) {
    const panel = document.getElementById('variablePanel');
    const list = document.getElementById('variableList');
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
    root = null;
    steps = [];
    currentStep = -1;
    nextBtn.disabled = true;
    startBtn.disabled = false;
    renderTree();
    updateCode();
    renderVariables({});
}

// Initial Tree
root = new TreeNode(50);
root.left = new TreeNode(30);
root.right = new TreeNode(70);
root.left.left = new TreeNode(20);
root.left.right = new TreeNode(40);

algorithmSelect.addEventListener('change', () => {
    resetVisualization();
    // Re-add initial tree if BST
    if (algorithmSelect.value.startsWith('bst')) {
        root = new TreeNode(50);
        root.left = new TreeNode(30);
        root.right = new TreeNode(70);
        renderTree();
    }
});

renderTree();
updateCode();
