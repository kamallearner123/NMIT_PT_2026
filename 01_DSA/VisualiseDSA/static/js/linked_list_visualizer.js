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

    currentStep++;
}

// Initial List
currentList = [
    {value: 12, next: null},
    {value: 8, next: null},
    {value: 24, next: null}
];

algorithmSelect.addEventListener('change', resetVisualization);
resetVisualization();
