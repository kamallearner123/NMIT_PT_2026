let array = [];
let steps = [];
let currentStep = -1;
const container = document.getElementById('arrayContainer');
const nextBtn = document.getElementById('nextBtn');
const startBtn = document.getElementById('startBtn');
const algorithmSelect = document.getElementById('algorithm');
const codeBlock = document.getElementById('codeBlock');
const algoTitle = document.getElementById('algoTitle');
const algoDesc = document.getElementById('algoDesc');

const ALGO_DATA = {
    bubbleSort: {
        title: "Bubble Sort",
        desc: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        code: [
            "def bubble_sort(arr):",
            "    n = len(arr)",
            "    for i in range(n):",
            "        for j in range(0, n-i-1):",
            "            if arr[j] > arr[j+1]:",
            "                arr[j], arr[j+1] = arr[j+1], arr[j]"
        ]
    },
    selectionSort: {
        title: "Selection Sort",
        desc: "Divides the input list into a sorted and an unsorted sublist, and repeatedly picks the smallest element from the unsorted sublist.",
        code: [
            "def selection_sort(arr):",
            "    n = len(arr)",
            "    for i in range(n):",
            "        min_idx = i",
            "        for j in range(i+1, n):",
            "            if arr[j] < arr[min_idx]:",
            "                min_idx = j",
            "        arr[i], arr[min_idx] = arr[min_idx], arr[i]"
        ]
    },
    insertionSort: {
        title: "Insertion Sort",
        desc: "Builds the final sorted array one item at a time, much like sorting playing cards in your hands.",
        code: [
            "def insertion_sort(arr):",
            "    for i in range(1, len(arr)):",
            "        key = arr[i]",
            "        j = i - 1",
            "        while j >= 0 and key < arr[j]:",
            "            arr[j + 1] = arr[j]",
            "            j -= 1",
            "        arr[j + 1] = key"
        ]
    },
    quickSort: {
        title: "Quick Sort",
        desc: "A Divide and Conquer algorithm that picks an element as pivot and partitions the given array around the picked pivot.",
        code: [
            "def partition(arr, low, high):",
            "    pivot = arr[high]",
            "    i = low - 1",
            "    for j in range(low, high):",
            "        if arr[j] <= pivot:",
            "            i += 1",
            "            arr[i], arr[j] = arr[j], arr[i]",
            "    arr[i+1], arr[high] = arr[high], arr[i+1]",
            "    return i + 1"
        ]
    },
    mergeSort: {
        title: "Merge Sort",
        desc: "A Divide and Conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
        code: [
            "def merge_sort(arr):",
            "    if len(arr) > 1:",
            "        mid = len(arr) // 2",
            "        L = arr[:mid]",
            "        R = arr[mid:]",
            "        merge_sort(L)",
            "        merge_sort(R)",
            "        # Merge logic follows..."
        ]
    },
    linearSearch: {
        title: "Linear Search",
        desc: "Checks every element in the list sequentially until a match is found or the whole list has been searched.",
        code: [
            "def linear_search(arr, target):",
            "    for i in range(len(arr)):",
            "        if arr[i] == target:",
            "            return i",
            "    return -1"
        ]
    },
    binarySearch: {
        title: "Binary Search",
        desc: "Finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
        code: [
            "def binary_search(arr, target):",
            "    low = 0",
            "    high = len(arr) - 1",
            "    while low <= high:",
            "        mid = (low + high) // 2",
            "        if arr[mid] == target:",
            "            return mid",
            "        elif arr[mid] < target:",
            "            low = mid + 1",
            "        else:",
            "            high = mid - 1",
            "    return -1"
        ]
    },
    reverseString: {
        title: "Reverse String",
        desc: "Reverses the order of characters in a string using two pointers.",
        code: [
            "def reverse_string(s):",
            "    s = list(s)",
            "    left, right = 0, len(s) - 1",
            "    while left < right:",
            "        s[left], s[right] = s[right], s[left]",
            "        left += 1",
            "        right -= 1",
            "    return ''.join(s)"
        ]
    },
    palindromeCheck: {
        title: "Palindrome Check",
        desc: "Checks if a string reads the same forwards and backwards.",
        code: [
            "def is_palindrome(s):",
            "    left, right = 0, len(s) - 1",
            "    while left < right:",
            "        if s[left] != s[right]:",
            "            return False",
            "        left += 1",
            "        right -= 1",
            "    return True"
        ]
    }
};

function generateArray() {
    const algo = algorithmSelect.value;
    if (algo.includes('String') || algo === 'palindromeCheck') {
        const words = ["HELLO", "LEVEL", "RADAR", "WORLD", "PYTHON", "DSA"];
        const word = words[Math.floor(Math.random() * words.length)];
        array = word.split('');
    } else {
        array = [];
        for (let i = 0; i < 10; i++) {
            array.push(Math.floor(Math.random() * 90) + 10);
        }
        if (algo === 'binarySearch') {
            array.sort((a, b) => a - b);
        }
    }
    renderArray();
    resetVisualization();
}

function renderArray(activeIndices = [], compareIndices = [], sortedIndices = []) {
    container.innerHTML = '';
    array.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        if (typeof val === 'number') {
            bar.style.height = `${val * 2}px`;
        } else {
            bar.style.height = '60px';
            bar.style.width = '60px';
            bar.style.alignItems = 'center';
            bar.style.paddingTop = '0';
        }
        bar.innerText = val;
        
        if (compareIndices.includes(idx)) bar.classList.add('comparing');
        if (activeIndices.includes(idx)) bar.classList.add('swapping');
        if (sortedIndices.includes(idx)) bar.classList.add('sorted');
        
        container.appendChild(bar);
    });
}

function updateCodeDisplay(activeLine = -1) {
    const data = ALGO_DATA[algorithmSelect.value];
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

function resetVisualization() {
    const data = ALGO_DATA[algorithmSelect.value];
    algoTitle.innerText = data.title;
    algoDesc.innerText = data.desc;
    
    // Handle diagram visibility for Merge Sort and Quick Sort
    const diagramContainer = document.getElementById('diagramContainer');
    const algoDiagram = document.getElementById('algoDiagram');
    
    if (algorithmSelect.value === 'mergeSort') {
        diagramContainer.style.display = 'block';
        algoDiagram.src = '/static/img/merge_sort_diagram.png';
    } else if (algorithmSelect.value === 'quickSort') {
        diagramContainer.style.display = 'block';
        algoDiagram.src = '/static/img/quick_sort_diagram.png'; // User can add this image
    } else {
        diagramContainer.style.display = 'none';
    }

    steps = [];
    currentStep = -1;
    nextBtn.disabled = true;
    startBtn.disabled = false;
    updateCodeDisplay();
    renderArray();
}

function startVisualization() {
    const algo = algorithmSelect.value;
    steps = [];
    
    if (algo === 'bubbleSort') {
        const arr = [...array];
        const n = arr.length;
        steps.push({ line: 1, array: [...arr] });
        for (let i = 0; i < n; i++) {
            steps.push({ line: 2, array: [...arr] });
            for (let j = 0; j < n - i - 1; j++) {
                steps.push({ line: 3, array: [...arr], compare: [j, j+1] });
                steps.push({ line: 4, array: [...arr], compare: [j, j+1] });
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    steps.push({ line: 5, array: [...arr], swap: [j, j+1] });
                }
            }
            steps.push({ line: 3, array: [...arr], sorted: Array.from({length: i+1}, (_, k) => n-1-k) });
        }
    } else if (algo === 'selectionSort') {
        const arr = [...array];
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let min_idx = i;
            steps.push({ line: 2, array: [...arr], sorted: Array.from({length: i}, (_, k) => k) });
            steps.push({ line: 3, array: [...arr], compare: [i] });
            for (let j = i + 1; j < n; j++) {
                steps.push({ line: 4, array: [...arr], compare: [j, min_idx] });
                steps.push({ line: 5, array: [...arr], compare: [j, min_idx] });
                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                    steps.push({ line: 6, array: [...arr], compare: [min_idx] });
                }
            }
            [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
            steps.push({ line: 7, array: [...arr], swap: [i, min_idx] });
        }
    } else if (algo === 'insertionSort') {
        const arr = [...array];
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            steps.push({ line: 1, array: [...arr], compare: [i] });
            steps.push({ line: 2, array: [...arr], compare: [i] });
            while (j >= 0 && arr[j] > key) {
                steps.push({ line: 4, array: [...arr], compare: [j, j + 1] });
                arr[j + 1] = arr[j];
                steps.push({ line: 5, array: [...arr], swap: [j, j + 1] });
                j = j - 1;
                steps.push({ line: 6, array: [...arr] });
            }
            arr[j + 1] = key;
            steps.push({ line: 7, array: [...arr], sorted: [j + 1] });
        }
    } else if (algo === 'linearSearch') {
        const target = array[Math.floor(Math.random() * array.length)];
        const arr = [...array];
        algoDesc.innerText += ` (Searching for: ${target})`;
        for (let i = 0; i < arr.length; i++) {
            steps.push({ line: 1, array: [...arr], compare: [i] });
            steps.push({ line: 2, array: [...arr], compare: [i] });
            if (arr[i] === target) {
                steps.push({ line: 3, array: [...arr], sorted: [i] });
                break;
            }
        }
    } else if (algo === 'binarySearch') {
        const target = array[Math.floor(Math.random() * array.length)];
        const arr = [...array];
        algoDesc.innerText += ` (Searching for: ${target})`;
        let low = 0, high = arr.length - 1;
        while (low <= high) {
            steps.push({ line: 3, array: [...arr], compare: Array.from({length: high-low+1}, (_, k) => low+k) });
            let mid = Math.floor((low + high) / 2);
            steps.push({ line: 4, array: [...arr], compare: [mid] });
            steps.push({ line: 5, array: [...arr], compare: [mid] });
            if (arr[mid] === target) {
                steps.push({ line: 6, array: [...arr], sorted: [mid] });
                break;
            } else if (arr[mid] < target) {
                steps.push({ line: 7, array: [...arr], compare: [mid] });
                low = mid + 1;
                steps.push({ line: 8, array: [...arr] });
            } else {
                steps.push({ line: 9, array: [...arr], compare: [mid] });
                high = mid - 1;
                steps.push({ line: 10, array: [...arr] });
            }
        }
    } else if (algo === 'mergeSort') {
        const arr = [...array];
        
        function mergeSortHelper(tempArr, startIdx) {
            if (tempArr.length <= 1) return tempArr;
            
            const mid = Math.floor(tempArr.length / 2);
            const left = tempArr.slice(0, mid);
            const right = tempArr.slice(mid);
            
            steps.push({ line: 2, array: [...array], compare: Array.from({length: tempArr.length}, (_, i) => startIdx + i) });
            
            const sortedLeft = mergeSortHelper(left, startIdx);
            const sortedRight = mergeSortHelper(right, startIdx + mid);
            
            let i = 0, j = 0, merged = [];
            while (i < sortedLeft.length && j < sortedRight.length) {
                if (sortedLeft[i] <= sortedRight[j]) {
                    merged.push(sortedLeft[i++]);
                } else {
                    merged.push(sortedRight[j++]);
                }
            }
            merged = [...merged, ...sortedLeft.slice(i), ...sortedRight.slice(j)];
            
            for (let k = 0; k < merged.length; k++) {
                array[startIdx + k] = merged[k];
                steps.push({ line: 7, array: [...array], swap: [startIdx + k] });
            }
            return merged;
        }
        mergeSortHelper(arr, 0);
    } else if (algo === 'quickSort') {
        const arr = [...array];
        
        function partition(low, high) {
            steps.push({ line: 0, array: [...array], compare: [high] }); // pivot selection
            let pivot = array[high];
            let i = low - 1;
            steps.push({ line: 2, array: [...array] });

            for (let j = low; j < high; j++) {
                steps.push({ line: 4, array: [...array], compare: [j, high] });
                if (array[j] <= pivot) {
                    i++;
                    [array[i], array[j]] = [array[j], array[i]];
                    steps.push({ line: 6, array: [...array], swap: [i, j] });
                }
            }
            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            steps.push({ line: 7, array: [...array], swap: [i + 1, high] });
            steps.push({ line: 8, array: [...array], sorted: [i + 1] });
            return i + 1;
        }

        function quickSortHelper(low, high) {
            if (low < high) {
                let pi = partition(low, high);
                quickSortHelper(low, pi - 1);
                quickSortHelper(pi + 1, high);
            } else if (low === high) {
                steps.push({ array: [...array], sorted: [low] });
            }
        }
        
        quickSortHelper(0, arr.length - 1);
    } else if (algo === 'palindromeCheck') {
        const arr = [...array];
        let left = 0, right = arr.length - 1;
        while (left < right) {
            steps.push({ line: 2, array: [...arr], compare: [left, right] });
            steps.push({ line: 3, array: [...arr], compare: [left, right] });
            if (arr[left] !== arr[right]) {
                steps.push({ line: 4, array: [...arr], swap: [left, right] });
                break;
            }
            steps.push({ line: 5, array: [...arr], sorted: [left, right] });
            left++;
            right--;
        }
        if (left >= right) steps.push({ line: 8, array: [...arr], sorted: Array.from({length: arr.length}, (_, k) => k) });
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
    array = step.array;
    
    renderArray(step.swap || [], step.compare || [], step.sorted || []);
    updateCodeDisplay(step.line);

    currentStep++;
}

// Initialize
algorithmSelect.addEventListener('change', () => {
    generateArray();
});

generateArray();
