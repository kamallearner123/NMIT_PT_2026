class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

function cloneTree(node) {
    if (!node) return null;
    const newNode = new TreeNode(node.val);
    newNode.left = cloneTree(node.left);
    newNode.right = cloneTree(node.right);
    return newNode;
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
    bst_delete: {
        title: "BST Deletion",
        desc: "Removes a node while maintaining BST properties. Handles cases: no child, one child, or two children.",
        code: [
            "def deleteNode(root, key):",
            "    if not root: return root",
            "    if key < root.val: root.left = deleteNode(root.left, key)",
            "    elif key > root.val: root.right = deleteNode(root.right, key)",
            "    else:",
            "        if not root.left: return root.right",
            "        elif not root.right: return root.left",
            "        temp = minValueNode(root.right)",
            "        root.val = temp.val",
            "        root.right = deleteNode(root.right, temp.val)",
            "    return root"
        ]
    },
    bst_inorder: {
        title: "In-order Traversal",
        desc: "Visits nodes in Left-Root-Right order. For BST, this visits nodes in sorted ascending order.",
        code: [
            "def inorder(root):",
            "    if root:",
            "        inorder(root.left)",
            "        print(root.val)",
            "        inorder(root.right)"
        ]
    },
    bst_preorder: {
        title: "Pre-order Traversal",
        desc: "Visits nodes in Root-Left-Right order.",
        code: [
            "def preorder(root):",
            "    if root:",
            "        print(root.val)",
            "        preorder(root.left)",
            "        preorder(root.right)"
        ]
    },
    bst_postorder: {
        title: "Post-order Traversal",
        desc: "Visits nodes in Left-Right-Root order.",
        code: [
            "def postorder(root):",
            "    if root:",
            "        postorder(root.left)",
            "        postorder(root.right)",
            "        print(root.val)"
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
    
    // Clear traversal display
    const display = document.getElementById('traversalDisplay');
    const path = document.getElementById('traversalPath');
    if (display) display.style.display = 'none';
    if (path) path.innerHTML = '';
    
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
    } else if (algo === 'bst_delete') {
        let currentTree = cloneTree(root);
        
        const getMin = (node) => {
            let curr = node;
            while (curr && curr.left) {
                steps.push({ line: 7, active: curr.val, vars: { "finding_min": "go left" } });
                curr = curr.left;
            }
            steps.push({ line: 7, highlight: curr.val, vars: { "min_found": curr.val } });
            return curr;
        }

        const del = (node, key, parent, isLeft) => {
            if (!node) {
                steps.push({ line: 1, vars: { status: "Not Found" } });
                return null;
            }
            steps.push({ line: 2, active: node.val, vars: { current: node.val, key: key } });
            if (key < node.val) {
                steps.push({ line: 2, active: node.val, vars: { direction: "Left" } });
                let newLeft = del(node.left, key, node, true);
                if (node.left !== newLeft) {
                    node.left = newLeft;
                    steps.push({ action: 'set_tree', newRoot: cloneTree(currentTree) });
                }
            } else if (key > node.val) {
                steps.push({ line: 3, active: node.val, vars: { direction: "Right" } });
                let newRight = del(node.right, key, node, false);
                if (node.right !== newRight) {
                    node.right = newRight;
                    steps.push({ action: 'set_tree', newRoot: cloneTree(currentTree) });
                }
            } else {
                steps.push({ line: 4, highlight: node.val, vars: { status: "Found" } });
                if (!node.left) {
                    steps.push({ line: 5, highlight: node.val, vars: { case: "No left child" } });
                    return node.right;
                } else if (!node.right) {
                    steps.push({ line: 6, highlight: node.val, vars: { case: "No right child" } });
                    return node.left;
                }
                steps.push({ line: 7, highlight: node.val, vars: { case: "Two children" } });
                let minNode = getMin(node.right);
                node.val = minNode.val;
                steps.push({ line: 8, active: node.val, vars: { "replace_val": minNode.val }, action: 'set_tree', newRoot: cloneTree(currentTree) });
                node.right = del(node.right, minNode.val, node, false);
                steps.push({ line: 9, active: node.val, action: 'set_tree', newRoot: cloneTree(currentTree) });
            }
            return node;
        };
        
        currentTree = del(currentTree, val, null, false);
        steps.push({ line: 10, action: 'set_tree', newRoot: cloneTree(currentTree), vars: { status: "Done" } });
    } else if (algo === 'bst_inorder') {
        const traverse = (node) => {
            if (!node) return;
            steps.push({ line: 1, active: node.val, vars: { "current": node.val } });
            steps.push({ line: 2, active: node.val, vars: { "action": "visit left" } });
            traverse(node.left);
            steps.push({ line: 3, highlight: node.val, vars: { "visited": node.val } });
            steps.push({ line: 4, active: node.val, vars: { "action": "visit right" } });
            traverse(node.right);
        };
        traverse(root);
    } else if (algo === 'bst_preorder') {
        const traverse = (node) => {
            if (!node) return;
            steps.push({ line: 1, active: node.val, vars: { "current": node.val } });
            steps.push({ line: 2, highlight: node.val, vars: { "visited": node.val } });
            steps.push({ line: 3, active: node.val, vars: { "action": "visit left" } });
            traverse(node.left);
            steps.push({ line: 4, active: node.val, vars: { "action": "visit right" } });
            traverse(node.right);
        };
        traverse(root);
    } else if (algo === 'bst_postorder') {
        const traverse = (node) => {
            if (!node) return;
            steps.push({ line: 1, active: node.val, vars: { "current": node.val } });
            steps.push({ line: 2, active: node.val, vars: { "action": "visit left" } });
            traverse(node.left);
            steps.push({ line: 3, active: node.val, vars: { "action": "visit right" } });
            traverse(node.right);
            steps.push({ line: 4, highlight: node.val, vars: { "visited": node.val } });
        };
        traverse(root);
    } else if (algo === 'heap_insert') {
        let tempQ = [root];
        let heapArr = [];
        while (tempQ.length > 0) {
            let n = tempQ.shift();
            if (!n) break;
            heapArr.push(n.val);
            tempQ.push(n.left);
            tempQ.push(n.right);
        }
        
        const buildTreeFromArray = (arr) => {
            const createN = (idx) => {
                if (idx >= arr.length) return null;
                let node = new TreeNode(arr[idx]);
                node.left = createN(2 * idx + 1);
                node.right = createN(2 * idx + 2);
                return node;
            }
            return createN(0);
        };
        
        steps.push({ line: 0, vars: { val: val } });
        heapArr.push(val);
        steps.push({ line: 1, action: 'set_tree', newRoot: buildTreeFromArray([...heapArr]), highlight: val, vars: { action: "Appended to end" }});
        
        let i = heapArr.length - 1;
        steps.push({ line: 2, vars: { i: i } });
        
        while (i > 0) {
            steps.push({ line: 3, vars: { i: i } });
            let p = Math.floor((i - 1) / 2);
            steps.push({ line: 4, active: heapArr[p], highlight: heapArr[i], vars: { i: i, p: p }});
            
            steps.push({ line: 5, active: heapArr[p], highlight: heapArr[i], vars: { condition: `${heapArr[p]} < ${heapArr[i]}` }});
            if (heapArr[p] < heapArr[i]) {
                steps.push({ line: 6, vars: { action: "Swap" }});
                let temp = heapArr[p];
                heapArr[p] = heapArr[i];
                heapArr[i] = temp;
                steps.push({ action: 'set_tree', newRoot: buildTreeFromArray([...heapArr]), active: heapArr[p], highlight: heapArr[i], vars: { action: "Swapped" }});
                
                steps.push({ line: 7, vars: { i: p }});
                i = p;
            } else {
                steps.push({ line: 8, vars: { action: "Break" }});
                break;
            }
        }
        steps.push({ line: 8, vars: { status: "Done" }});
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
    if (step.action === 'set_tree') root = cloneTree(step.newRoot);

    renderTree(step.active, step.highlight);
    updateCode(step.line);
    renderVariables(step.vars);

    // Update traversal path display
    if (step.highlight !== undefined && step.highlight !== null) {
        const display = document.getElementById('traversalDisplay');
        const path = document.getElementById('traversalPath');
        if (display && path && (algorithmSelect.value.includes('traverse') || algorithmSelect.value.includes('order'))) {
            display.style.display = 'block';
            // Avoid duplicates in path for the same step
            const existingNodes = path.querySelectorAll('.tree-node-path');
            let isAlreadyAdded = false;
            existingNodes.forEach(n => {
                if (n.dataset.step === currentStep.toString()) isAlreadyAdded = true;
            });

            if (!isAlreadyAdded) {
                const nodeDiv = document.createElement('div');
                nodeDiv.className = 'tree-node-path';
                nodeDiv.innerText = step.highlight;
                nodeDiv.dataset.step = currentStep.toString();
                nodeDiv.style.cssText = "width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
                path.appendChild(nodeDiv);
            }
        }
    }

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
    
    const display = document.getElementById('traversalDisplay');
    const path = document.getElementById('traversalPath');
    if (display) display.style.display = 'none';
    if (path) path.innerHTML = '';
}

function generateLargeBST() {
    resetVisualization();
    root = null;
    
    // Helper to insert into BST without visualization steps
    const insertNode = (node, val) => {
        if (!node) return new TreeNode(val);
        if (val < node.val) {
            node.left = insertNode(node.left, val);
        } else if (val > node.val) {
            node.right = insertNode(node.right, val);
        }
        return node;
    };
    
    // Generate 15-20 unique random numbers
    let values = new Set();
    const count = 15 + Math.floor(Math.random() * 6);
    while (values.size < count) {
        values.add(Math.floor(Math.random() * 150) + 10);
    }
    
    let valArray = Array.from(values);
    // Shuffle to create a random tree structure
    for (let i = valArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [valArray[i], valArray[j]] = [valArray[j], valArray[i]];
    }
    
    // Sort slightly to make it more balanced (optional, but shuffling is fine for random)
    // valArray.sort((a, b) => a - b); // Too balanced if we do this simply
    
    for (let val of valArray) {
        root = insertNode(root, val);
    }
    
    renderTree();
    updateCode();
}

function heapifyDown(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapifyDown(arr, n, largest);
    }
}

function generateRandomHeap() {
    resetVisualization();
    root = null;
    
    let values = new Set();
    const count = 15 + Math.floor(Math.random() * 6);
    while (values.size < count) {
        values.add(Math.floor(Math.random() * 150) + 10);
    }
    
    let heap = Array.from(values);
    
    // Build Max Heap
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        heapifyDown(heap, heap.length, i);
    }
    
    // Create TreeNodes from heap array
    const createNode = (index) => {
        if (index >= heap.length) return null;
        let node = new TreeNode(heap[index]);
        node.left = createNode(2 * index + 1);
        node.right = createNode(2 * index + 2);
        return node;
    };
    
    root = createNode(0);
    
    // Automatically select Max Heap Insert in the dropdown
    algorithmSelect.value = 'heap_insert';
    
    renderTree();
    updateCode();
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
