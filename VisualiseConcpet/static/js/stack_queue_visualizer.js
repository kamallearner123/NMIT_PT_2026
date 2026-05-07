let data = [];
const container = document.getElementById('structureContainer');
const valueInput = document.getElementById('elementValue');
const algorithmSelect = document.getElementById('algorithm');
const algoTitle = document.getElementById('algoTitle');
const algoDesc = document.getElementById('algoDesc');
const codeBlock = document.getElementById('codeBlock');

const SQ_DATA = {
    stack: {
        title: "Stack (Last-In-First-Out)",
        desc: "Elements are added and removed from the same end (the top). Think of a stack of plates.",
        code: [
            "class Stack:",
            "    def __init__(self):",
            "        self.items = []",
            "",
            "    def push(self, item):",
            "        self.items.append(item)",
            "",
            "    def pop(self):",
            "        if not self.is_empty():",
            "            return self.items.pop()",
            "        return None"
        ]
    },
    queue: {
        title: "Queue (First-In-First-Out)",
        desc: "Elements are added at the rear and removed from the front. Think of a line of people.",
        code: [
            "class Queue:",
            "    def __init__(self):",
            "        self.items = []",
            "",
            "    def enqueue(self, item):",
            "        self.items.append(item)",
            "",
            "    def dequeue(self):",
            "        if not self.is_empty():",
            "            return self.items.pop(0)",
            "        return None"
        ]
    }
};

function render() {
    container.innerHTML = '';
    const isStack = algorithmSelect.value === 'stack';
    
    if (isStack) {
        container.style.flexDirection = 'column-reverse';
        container.style.justifyContent = 'flex-start';
        container.style.borderLeft = '4px solid var(--primary)';
        container.style.borderRight = '4px solid var(--primary)';
        container.style.borderBottom = '4px solid var(--primary)';
        container.style.width = '200px';
        container.style.margin = '0 auto';
    } else {
        container.style.flexDirection = 'row';
        container.style.justifyContent = 'center';
        container.style.border = 'none';
        container.style.width = '100%';
    }

    data.forEach((val, idx) => {
        const item = document.createElement('div');
        item.className = 'bar';
        item.style.height = '50px';
        item.style.width = isStack ? '180px' : '60px';
        item.style.margin = '5px';
        item.style.alignItems = 'center';
        item.style.paddingTop = '0';
        item.style.borderRadius = '8px';
        item.innerText = val;
        
        // Color coding
        if (idx === 0) item.style.background = '#ef4444'; // Front / Bottom
        if (idx === data.length - 1) item.style.background = '#10b981'; // Rear / Top
        
        container.appendChild(item);
    });
}

function updateCode(activeLine = -1) {
    const config = SQ_DATA[algorithmSelect.value];
    codeBlock.innerHTML = '';
    config.code.forEach((line, idx) => {
        const div = document.createElement('div');
        div.className = 'code-line' + (idx === activeLine ? ' line-active' : '');
        // Apply Prism highlighting to the line
        const highlighted = Prism.highlight(line, Prism.languages.python, 'python');
        div.innerHTML = highlighted;
        codeBlock.appendChild(div);
    });
}

function performOperation(op) {
    const isStack = algorithmSelect.value === 'stack';
    const val = valueInput.value || Math.floor(Math.random() * 90) + 10;

    if (op === 'push') {
        data.push(val);
        updateCode(isStack ? 5 : 5);
    } else {
        if (data.length > 0) {
            if (isStack) data.pop();
            else data.shift();
            updateCode(isStack ? 9 : 9);
        }
    }
    render();
}

function resetVisualization() {
    data = [];
    const config = SQ_DATA[algorithmSelect.value];
    algoTitle.innerText = config.title;
    algoDesc.innerText = config.desc;
    updateCode();
    render();
}

algorithmSelect.addEventListener('change', resetVisualization);
resetVisualization();
