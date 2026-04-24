let chart;
const nSlider = document.getElementById('nSlider');
const raceContainer = document.getElementById('raceContainer');

const complexities = [
    { label: 'O(1)', color: '#10b981', func: (n) => 1 },
    { label: 'O(log n)', color: '#3b82f6', func: (n) => Math.log2(n) },
    { label: 'O(n)', color: '#fbbf24', func: (n) => n },
    { label: 'O(n log n)', color: '#6366f1', func: (n) => n * Math.log2(n) },
    { label: 'O(n^2)', color: '#ef4444', func: (n) => n * n }
];

function initChart() {
    const ctx = document.getElementById('complexityChart').getContext('2d');
    const n = parseInt(nSlider.value);
    const labels = Array.from({length: n}, (_, i) => i + 1);

    const datasets = complexities.map(c => ({
        label: c.label,
        data: labels.map(i => c.func(i)),
        borderColor: c.color,
        fill: false,
        tension: 0.1
    }));

    chart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: n * n,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                }
            },
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            }
        }
    });
}

function updateChart() {
    const n = parseInt(nSlider.value);
    const labels = Array.from({length: n}, (_, i) => i + 1);
    chart.data.labels = labels;
    chart.data.datasets.forEach((ds, idx) => {
        ds.data = labels.map(i => complexities[idx].func(i));
    });
    chart.options.scales.y.max = n * n;
    chart.update();
}

function initRace() {
    raceContainer.innerHTML = '';
    complexities.forEach(c => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="race-label">${c.label}</div>
            <div class="race-track">
                <div class="runner" id="runner-${c.label.replace('(', '').replace(')', '').replace('^', '')}" style="background: ${c.color}">0</div>
            </div>
        `;
        raceContainer.appendChild(div);
    });
}

async function startRace() {
    const n = parseInt(nSlider.value);
    const maxOps = n * n;
    
    for (let i = 1; i <= n; i++) {
        complexities.forEach(c => {
            const ops = c.func(i);
            const progress = (ops / maxOps) * 100;
            const runner = document.getElementById(`runner-${c.label.replace('(', '').replace(')', '').replace('^', '')}`);
            runner.style.left = `${Math.min(progress, 95)}%`;
            runner.innerText = Math.round(ops);
        });
        await new Promise(r => setTimeout(r, 100));
    }
}

nSlider.addEventListener('input', updateChart);
initChart();
initRace();
