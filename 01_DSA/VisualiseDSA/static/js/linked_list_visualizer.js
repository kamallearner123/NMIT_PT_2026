let head = null;
let steps = [];
let currentStep = -1;
let currentList = []; // Array of {value, next} for easy rendering

const listContainer = document.getElementById('listContainer');
const nodeValueInput = document.getElementById('nodeValue');
const algoTitle = document.getElementById('algoTitle');
const algoDesc = document.getElementById('algoDesc');
const nextBtn = document.getElementById('nextBtn');
const startBtn = document.getElementById('startBtn');
const algorithmSelect = document.getElementById('algorithm');

const LL_DATA = {
    append: {
        title: "Append Node",
        desc: "Adds a new node to the end of the Linked List. If the list is empty, the new node becomes the head.",
        code: [
            "class Node:",
            "    def __init__(self, data):",
            "        self.data = data",
            "        self.next = None",
            "",
            "def append(head, data):",
            "    new_node = Node(data)",
            "    if not head:",
            "        return new_node",
            "    curr = head",
            "    while curr.next:",
            "        curr = curr.next",
            "    curr.next = new_node",
            "    return head"
        ]
    },
    insert: {
        title: "Insert at Index",
        desc: "Inserts a new node at a specific position by updating the next pointer of the previous node.",
        code: [
            "def insert(head, data, index):",
            "    new_node = Node(data)",
            "    if index == 0:",
            "        new_node.next = head",
            "        return new_node",
            "    curr = head",
            "    for i in range(index - 1):",
            "        if curr: curr = curr.next",
            "    if curr:",
            "        new_node.next = curr.next",
            "        curr.next = new_node",
            "    return head"
        ]
    },
    find: {
        title: "Find Value",
        desc: "Traverses the list starting from the head until the value is found or the end is reached.",
        code: [
            "def find(head, target):",
            "    curr = head",
            "    while curr:",
            "        if curr.data == target:",
            "            return True",
            "        curr = curr.next",
            "    return False"
        ]
    },
    delete: {
        title: "Delete Node",
        desc: "Removes a node by making the previous node point to the next of the target node.",
        code: [
            "def delete(head, target):",
            "    if head and head.data == target:",
            "        return head.next",
            "    curr = head",
            "    while curr and curr.next:",
            "        if curr.next.data == target:",
            "            curr.next = curr.next.next",
            "            return head",
            "        curr = curr.next",
            "    return head"
        ]
    },
    reverse: {
        title: "Reverse Linked List",
        desc: "Reverses the list by changing the next pointer of each node to point to its predecessor.",
        code: [
            "def reverse(head):",
            "    prev = None",
            "    curr = head",
            "    while curr:",
            "        next_node = curr.next",
            "        curr.next = prev",
            "        prev = curr",
            "        curr = next_node",
            "    return prev"
        ]
    },
    detect_loop: {
        title: "Detect Loop (Floyd's Cycle)",
        desc: "Uses two pointers, 'slow' and 'fast'. If they meet, a loop exists. Slow moves one step, fast moves two.",
        code: [
            "def detectLoop(head):",
            "    slow = head",
            "    fast = head",
            "    while fast and fast.next:",
            "        slow = slow.next",
            "        fast = fast.next.next",
            "        if slow == fast:",
            "            return True",
            "    return False"
        ]
    }
};

function renderList(activeIndex = -1, targetIndex = -1) {
    listContainer.innerHTML = '';
    currentList.forEach((node, idx) => {
        const container = document.createElement('div');
        container.className = 'node-container';
        
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node' + (idx === activeIndex ? ' active' : '') + (idx === targetIndex ? ' target' : '');
        nodeDiv.innerHTML = `
            <div class="node-data">${node.value}</div>
            <div class="node-next">${idx === currentList.length - 1 ? 'NULL' : '•'}</div>
        `;
        
        if (idx === 0) {
            const label = document.createElement('div');
            label.className = 'node-label';
            label.innerText = 'HEAD';
            nodeDiv.appendChild(label);
        }

        container.appendChild(nodeDiv);

        if (idx < currentList.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            container.appendChild(arrow);
        }

        // Handle Loop rendering
        if (node.loopTo !== undefined && node.loopTo !== null) {
            const loopArrow = document.createElement('div');
            loopArrow.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: ${(idx - node.loopTo) * 150}px;
                height: 60px;
                border: 2px solid #ef4444;
                border-top: none;
                border-radius: 0 0 50% 50%;
                transform: translate(-100%, 0);
                z-index: 0;
                pointer-events: none;
            `;
            // Add a small arrow head
            const head = document.createElement('div');
            head.style.cssText = "position: absolute; left: 0; top: 0; border-right: 8px solid #ef4444; border-top: 5px solid transparent; border-bottom: 5px solid transparent;";
            loopArrow.appendChild(head);
            container.appendChild(loopArrow);
        }

        listContainer.appendChild(container);
    });
}

function resetVisualization() {
    const data = LL_DATA[algorithmSelect.value];
    algoTitle.innerText = data.title;
    algoDesc.innerText = data.desc;
    updateCodeDisplay();
    steps = [];
    currentStep = -1;
    nextBtn.disabled = true;
    startBtn.disabled = false;
    
    // Reset loops unless we are in detect_loop
    if (algorithmSelect.value !== 'detect_loop') {
        currentList.forEach(n => delete n.loopTo);
        document.getElementById('withLoopBtn').style.display = 'none';
        document.getElementById('withoutLoopBtn').style.display = 'none';
    } else {
        document.getElementById('withLoopBtn').style.display = 'block';
        document.getElementById('withoutLoopBtn').style.display = 'block';
    }
    
    renderList();
}

function generateRandomList(count) {
    // Note: Don't call resetVisualization here to avoid recursion if called from other generate funcs
    // But we need to reset steps and buttons
    steps = [];
    currentStep = -1;
    nextBtn.disabled = true;
    startBtn.disabled = false;
    
    currentList = [];
    const n = count || (10 + Math.floor(Math.random() * 6));
    for (let i = 0; i < n; i++) {
        currentList.push({
            value: Math.floor(Math.random() * 90) + 10,
            next: null
        });
    }
    renderList();
}

function generateListWithLoop() {
    generateRandomList(12);
    const fromIdx = currentList.length - 1;
    const toIdx = Math.floor(Math.random() * (currentList.length - 2)) + 1; // Loop to somewhere in middle
    currentList[fromIdx].loopTo = toIdx;
    renderList();
}

function generateListWithoutLoop() {
    generateRandomList(12);
    renderList();
}

function updateCodeDisplay(activeLine = -1) {
    const data = LL_DATA[algorithmSelect.value];
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.innerHTML = '';
    data.code.forEach((line, idx) => {
        const div = document.createElement('div');
        div.className = 'code-line' + (idx === activeLine ? ' line-active' : '');
        // Apply Prism highlighting to the line
        const highlighted = Prism.highlight(line, Prism.languages.python, 'python');
        div.innerHTML = highlighted;
        codeBlock.appendChild(div);
    });
}

function startVisualization() {
    const algo = algorithmSelect.value;
    const val = parseInt(nodeValueInput.value) || Math.floor(Math.random() * 90) + 10;
    steps = [];
    
    if (algo === 'append') {
        steps.push({ line: 6, active: -1 }); // Start func
        steps.push({ line: 7, active: -1 }); // New node
        if (currentList.length === 0) {
            steps.push({ line: 8, active: -1 });
            steps.push({ line: 9, active: -1, newList: [{value: val, next: null}] });
        } else {
            steps.push({ line: 10, active: 0 }); // curr = head
            for (let i = 0; i < currentList.length - 1; i++) {
                steps.push({ line: 11, active: i });
                steps.push({ line: 12, active: i + 1 });
            }
            steps.push({ line: 13, active: currentList.length - 1, newList: [...currentList, {value: val, next: null}] });
        }
    } else if (algo === 'insert') {
        const index = parseInt(prompt("Enter index (0 to " + currentList.length + "):")) || 0;
        steps.push({ line: 0, active: -1 }); // def insert
        steps.push({ line: 1, active: -1 }); // new node
        if (index === 0) {
            steps.push({ line: 2, active: -1 });
            steps.push({ line: 3, active: -1 });
            steps.push({ line: 4, active: -1, newList: [{value: val, next: null}, ...currentList] });
        } else {
            steps.push({ line: 5, active: 0 }); // curr = head
            for (let i = 0; i < index - 1; i++) {
                steps.push({ line: 6, active: i });
                steps.push({ line: 7, active: i + 1 });
            }
            const newList = [...currentList];
            newList.splice(index, 0, {value: val, next: null});
            steps.push({ line: 8, active: index - 1 });
            steps.push({ line: 9, active: index - 1 });
            steps.push({ line: 10, active: index - 1, newList: newList });
        }
    } else if (algo === 'find') {
        steps.push({ line: 1, active: 0 }); // curr = head
        let found = false;
        for (let i = 0; i < currentList.length; i++) {
            steps.push({ line: 2, active: i });
            steps.push({ line: 3, active: i });
            if (currentList[i].value === val) {
                steps.push({ line: 4, target: i });
                found = true;
                break;
            }
            steps.push({ line: 5, active: i + 1 });
        }
        if (!found) steps.push({ line: 6, active: -1 });
    } else if (algo === 'delete') {
        if (currentList.length > 0 && currentList[0].value === val) {
            steps.push({ line: 1, active: 0 });
            steps.push({ line: 2, active: 0, newList: currentList.slice(1) });
        } else {
            steps.push({ line: 3, active: 0 });
            let deleted = false;
            for (let i = 0; i < currentList.length - 1; i++) {
                steps.push({ line: 4, active: i });
                steps.push({ line: 5, active: i + 1 });
                if (currentList[i+1].value === val) {
                    const newList = [...currentList];
                    newList.splice(i+1, 1);
                    steps.push({ line: 6, active: i, target: i+1 });
                    steps.push({ line: 7, active: i, newList: newList });
                    deleted = true;
                    break;
                }
                steps.push({ line: 8, active: i + 1 });
            }
        }
    } else if (algo === 'reverse') {
        let prev = -1;
        let curr = 0;
        let tempList = JSON.parse(JSON.stringify(currentList));
        
        steps.push({ line: 1, active: -1, vars: { prev: "None" } });
        steps.push({ line: 2, active: 0, vars: { curr: 0 } });
        
        while (curr < currentList.length) {
            steps.push({ line: 4, active: curr, vars: { next: curr + 1 } });
            steps.push({ line: 5, active: curr, vars: { "curr.next": prev } });
            
            // Note: In reality, it reverses, but for visualization we show steps
            steps.push({ line: 6, active: curr, vars: { prev: curr } });
            prev = curr;
            steps.push({ line: 7, active: curr + 1, vars: { curr: curr + 1 } });
            curr++;
        }
        
        // Final reversed list
        const reversed = [...currentList].reverse();
        steps.push({ line: 8, active: -1, newList: reversed });

    } else if (algo === 'detect_loop') {
        let slow = 0;
        let fast = 0;
        let hasLoop = currentList.some(n => n.loopTo !== undefined);
        let loopTo = -1;
        currentList.forEach((n, i) => { if (n.loopTo !== undefined) loopTo = n.loopTo; });

        steps.push({ line: 1, active: 0, vars: { slow: 0 } });
        steps.push({ line: 2, active: 0, vars: { fast: 0 } });
        
        while (true) {
            steps.push({ line: 3, active: slow, target: fast, vars: { slow: slow, fast: fast } });
            
            // Move slow
            slow = (slow + 1);
            if (slow >= currentList.length && !hasLoop) break;
            if (hasLoop && slow >= currentList.length) {
                // Should not happen in logical loop but for sim:
                // Actually slow will eventually enter loop
            }
            // For simplicity in sim, let's just use indices and check bounds
            
            steps.push({ line: 4, active: slow, target: fast });
            
            // Move fast
            let fastOld = fast;
            fast = (fast + 2);
            
            // If loop exists, wrap fast
            if (hasLoop) {
                // Logic: if fast > last index, it jumps to loopTo
                if (fast >= currentList.length) {
                     fast = loopTo + (fast - currentList.length);
                }
                if (slow >= currentList.length) {
                     slow = loopTo + (slow - currentList.length);
                }
            } else {
                if (fast >= currentList.length) {
                    steps.push({ line: 3, vars: { fast: "NULL", status: "No Loop" } });
                    break;
                }
            }
            
            steps.push({ line: 5, active: slow, target: fast });
            
            if (slow === fast) {
                steps.push({ line: 6, active: slow, target: fast, vars: { status: "Loop Detected!" } });
                steps.push({ line: 7, active: slow, target: fast });
                break;
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
    if (step.newList) {
        currentList = step.newList;
    }
    
    renderList(step.active, step.target);
    updateCodeDisplay(step.line);
    if (step.vars) renderVariables(step.vars);

    currentStep++;
}

function renderVariables(vars = {}) {
    const panel = document.getElementById('variablePanel');
    const list = document.getElementById('variableList');
    if (!panel || !list) return;
    
    panel.style.display = 'block';
    list.innerHTML = '';
    for (const [key, val] of Object.entries(vars)) {
        const item = document.createElement('div');
        item.className = 'variable-item';
        item.innerHTML = `<span class="variable-name">${key}</span>: <span class="variable-value">${val}</span>`;
        list.appendChild(item);
    }
}

// Initial List
currentList = [
    {value: 12, next: null},
    {value: 8, next: null},
    {value: 24, next: null}
];

algorithmSelect.addEventListener('change', resetVisualization);
resetVisualization();
