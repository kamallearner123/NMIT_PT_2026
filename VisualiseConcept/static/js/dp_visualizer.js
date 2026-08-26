let currentStep = 0;
let dpStates = [];
let algorithm = 'fibonacci';
let isAutoPlaying = false;
let autoPlayInterval;

const dpDict = {
    fibonacci: { title: "1. Fibonacci Sequence", desc: "Calculate Nth Fibonacci number using 1D Tabulation.", type: "fibonacci" },
    climbingStairs: { title: "2. Climbing Stairs", desc: "Find distinct ways to climb n stairs. Similar to Fibonacci.", code: `def climbStairs(n):\n    if n <= 2: return n\n    dp = [0] * (n + 1)\n    dp[1], dp[2] = 1, 2\n    for i in range(3, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]`, type: "placeholder" },
    houseRobber: { title: "3. House Robber", desc: "Max money without robbing adjacent houses.", code: `def rob(nums):\n    if not nums: return 0\n    if len(nums) <= 2: return max(nums)\n    dp = [0] * len(nums)\n    dp[0], dp[1] = nums[0], max(nums[0], nums[1])\n    for i in range(2, len(nums)):\n        dp[i] = max(dp[i-1], dp[i-2] + nums[i])\n    return dp[-1]`, type: "placeholder" },
    maxSubarray: { title: "4. Maximum Subarray (Kadane)", desc: "Find contiguous subarray with max sum.", code: `def maxSubArray(nums):\n    dp = [0] * len(nums)\n    dp[0] = nums[0]\n    for i in range(1, len(nums)):\n        dp[i] = max(nums[i], dp[i-1] + nums[i])\n    return max(dp)`, type: "placeholder" },
    coinChange: { title: "5. Coin Change (Min Coins)", desc: "Min coins to make amount.", type: "coinChange" },
    coinChange2: { title: "6. Coin Change 2 (Total Ways)", desc: "Total combinations that make up the amount.", code: `def change(amount, coins):\n    dp = [0] * (amount + 1)\n    dp[0] = 1\n    for coin in coins:\n        for i in range(coin, amount + 1):\n            dp[i] += dp[i - coin]\n    return dp[amount]`, type: "placeholder" },
    lis: { title: "7. Longest Increasing Subsequence", desc: "Length of the longest strictly increasing subsequence.", code: `def lengthOfLIS(nums):\n    if not nums: return 0\n    dp = [1] * len(nums)\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)`, type: "placeholder" },
    wordBreak: { title: "8. Word Break", desc: "Can string be segmented into dictionary words.", code: `def wordBreak(s, wordDict):\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(1, len(s) + 1):\n        for word in wordDict:\n            if dp[i - len(word)] and s[i-len(word):i] == word:\n                dp[i] = True\n                break\n    return dp[-1]`, type: "placeholder" },
    lcs: { title: "9. Longest Common Subsequence", desc: "Finding length of LCS between two strings. 2D DP Table.", type: "lcs" },
    editDistance: { title: "10. Edit Distance", desc: "Min operations to convert word1 to word2.", code: `def minDistance(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = i\n    for j in range(n + 1): dp[0][j] = j\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i-1] == word2[j-1]:\n                dp[i][j] = dp[i-1][j-1]\n            else:\n                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    return dp[m][n]`, type: "placeholder" },
    minPathSum: { title: "11. Minimum Path Sum", desc: "Min sum path from top-left to bottom-right in grid.", code: `def minPathSum(grid):\n    m, n = len(grid), len(grid[0])\n    dp = [[0] * n for _ in range(m)]\n    dp[0][0] = grid[0][0]\n    for i in range(1, m): dp[i][0] = dp[i-1][0] + grid[i][0]\n    for j in range(1, n): dp[0][j] = dp[0][j-1] + grid[0][j]\n    for i in range(1, m):\n        for j in range(1, n):\n            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])\n    return dp[-1][-1]`, type: "placeholder" },
    knapsack: { title: "12. 0/1 Knapsack Problem", desc: "Max value without exceeding weight capacity.", code: `def knapsack(W, wt, val, n):\n    dp = [[0 for x in range(W + 1)] for x in range(n + 1)]\n    for i in range(n + 1):\n        for w in range(W + 1):\n            if i == 0 or w == 0:\n                dp[i][w] = 0\n            elif wt[i-1] <= w:\n                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])\n            else:\n                dp[i][w] = dp[i-1][w]\n    return dp[n][W]`, type: "placeholder" },
    unboundedKnapsack: { title: "13. Unbounded Knapsack", desc: "Max value, multiple instances of items allowed.", code: `def unboundedKnapsack(W, wt, val, n):\n    dp = [0 for i in range(W + 1)]\n    for i in range(W + 1):\n        for j in range(n):\n            if (wt[j] <= i):\n                dp[i] = max(dp[i], dp[i - wt[j]] + val[j])\n    return dp[W]`, type: "placeholder" },
    partitionEqual: { title: "14. Partition Equal Subset Sum", desc: "Can array be partitioned into two equal sum subsets.", code: `def canPartition(nums):\n    total = sum(nums)\n    if total % 2 != 0: return False\n    target = total // 2\n    dp = [False] * (target + 1)\n    dp[0] = True\n    for num in nums:\n        for i in range(target, num - 1, -1):\n            dp[i] = dp[i] or dp[i - num]\n    return dp[target]`, type: "placeholder" },
    targetSum: { title: "15. Target Sum", desc: "Ways to assign +/- to make specific target.", code: `def findTargetSumWays(nums, target):\n    total = sum(nums)\n    if total < abs(target) or (total + target) % 2 != 0: return 0\n    subset_sum = (total + target) // 2\n    dp = [0] * (subset_sum + 1)\n    dp[0] = 1\n    for num in nums:\n        for i in range(subset_sum, num - 1, -1):\n            dp[i] += dp[i - num]\n    return dp[subset_sum]`, type: "placeholder" },
    distinctSubsequences: { title: "16. Distinct Subsequences", desc: "Ways string s's subsequence equals string t.", code: `def numDistinct(s, t):\n    m, n = len(s), len(t)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = 1\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if s[i-1] == t[j-1]:\n                dp[i][j] = dp[i-1][j-1] + dp[i-1][j]\n            else:\n                dp[i][j] = dp[i-1][j]\n    return dp[m][n]`, type: "placeholder" },
    interleavingString: { title: "17. Interleaving String", desc: "Is s3 formed by interleaving s1 and s2.", code: `def isInterleave(s1, s2, s3):\n    if len(s1) + len(s2) != len(s3): return False\n    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]\n    dp[0][0] = True\n    for i in range(1, len(s1) + 1):\n        dp[i][0] = dp[i-1][0] and s1[i-1] == s3[i-1]\n    for j in range(1, len(s2) + 1):\n        dp[0][j] = dp[0][j-1] and s2[j-1] == s3[j-1]\n    for i in range(1, len(s1) + 1):\n        for j in range(1, len(s2) + 1):\n            dp[i][j] = (dp[i-1][j] and s1[i-1] == s3[i+j-1]) or (dp[i][j-1] and s2[j-1] == s3[i+j-1])\n    return dp[-1][-1]`, type: "placeholder" },
    longestPalindromicSubsequence: { title: "18. Longest Palindromic Subsequence", desc: "Length of longest palindromic subsequence.", code: `def longestPalindromeSubseq(s):\n    n = len(s)\n    dp = [[0] * n for _ in range(n)]\n    for i in range(n): dp[i][i] = 1\n    for l in range(2, n + 1):\n        for i in range(n - l + 1):\n            j = i + l - 1\n            if s[i] == s[j]:\n                dp[i][j] = 2 + dp[i+1][j-1]\n            else:\n                dp[i][j] = max(dp[i+1][j], dp[i][j-1])\n    return dp[0][n-1]`, type: "placeholder" },
    palindromicSubstrings: { title: "19. Palindromic Substrings", desc: "Count total palindromic substrings.", code: `def countSubstrings(s):\n    n = len(s)\n    dp = [[False] * n for _ in range(n)]\n    count = 0\n    for i in range(n):\n        dp[i][i] = True\n        count += 1\n    for i in range(n - 1):\n        if s[i] == s[i+1]:\n            dp[i][i+1] = True\n            count += 1\n    for l in range(3, n + 1):\n        for i in range(n - l + 1):\n            j = i + l - 1\n            if s[i] == s[j] and dp[i+1][j-1]:\n                dp[i][j] = True\n                count += 1\n    return count`, type: "placeholder" },
    matrixChain: { title: "20. Matrix Chain Multiplication", desc: "Min scalar multiplications to multiply matrices.", code: `def matrixChainOrder(p, n):\n    dp = [[0 for x in range(n)] for x in range(n)]\n    for L in range(2, n):\n        for i in range(1, n-L+1):\n            j = i + L - 1\n            dp[i][j] = float('inf')\n            for k in range(i, j):\n                q = dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j]\n                if q < dp[i][j]:\n                    dp[i][j] = q\n    return dp[1][n-1]`, type: "placeholder" }
};

function resetVisualization() {
    clearInterval(autoPlayInterval);
    isAutoPlaying = false;
    document.getElementById('playBtn').innerText = "Play";
    document.getElementById('playBtn').disabled = true;
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('dpContainer').innerHTML = '';
    document.getElementById('codeBlock').innerHTML = '';
    currentStep = 0;
    dpStates = [];
}

function startVisualization() {
    resetVisualization();
    algorithm = document.getElementById('algorithm').value;
    
    const info = dpDict[algorithm];
    document.getElementById('algoTitle').innerText = info.title;
    document.getElementById('algoDesc').innerText = info.desc;
    
    if (info.type === 'placeholder') {
        document.getElementById('dpContainer').innerHTML = `<div style="text-align:center; padding: 3rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🚧</div>
            <h3 style="color: var(--primary);">Interactive Animation Coming Soon</h3>
            <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">The dynamic graphical simulation for this algorithm is currently under development. In the meantime, please review the exact Python DP tabulation logic below.</p>
        </div>`;
        document.getElementById('codeBlock').innerHTML = `<pre><code class="language-python">${info.code}</code></pre>`;
        if (window.Prism) Prism.highlightAll();
        return;
    }
    
    document.getElementById('playBtn').disabled = false;
    document.getElementById('nextBtn').disabled = false;
    
    if (info.type === 'fibonacci') initFibonacci();
    else if (info.type === 'coinChange') initCoinChange();
    else if (info.type === 'lcs') initLCS();
    
    renderState();
}

function initFibonacci() {
    const n = 8;
    const dp = Array(n+1).fill(0);
    dpStates.push({ dp: [...dp], i: 0, msg: "Initialize DP array with 0s" });
    dp[0] = 0;
    dpStates.push({ dp: [...dp], i: 0, highlightIdx: [0], readIdx: [], msg: "Base case: DP[0] = 0" });
    dp[1] = 1;
    dpStates.push({ dp: [...dp], i: 1, highlightIdx: [1], readIdx: [], msg: "Base case: DP[1] = 1" });
    
    for(let i=2; i<=n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
        dpStates.push({ dp: [...dp], i: i, highlightIdx: [i], readIdx: [i-1, i-2], 
            msg: `Calculate DP[${i}] = DP[${i-1}] (${dp[i-1]}) + DP[${i-2}] (${dp[i-2]}) = ${dp[i]}` 
        });
    }
    
    document.getElementById('codeBlock').innerHTML = `<pre><code class="language-python">def fibonacci(n):\n    if n <= 1: return n\n    dp = [0] * (n + 1)\n    dp[0], dp[1] = 0, 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]</code></pre>`;
    if (window.Prism) Prism.highlightAll();
}

function initCoinChange() {
    const coins = [1, 3, 4];
    const amount = 6;
    const dp = Array(amount+1).fill("∞");
    dpStates.push({ dp: [...dp], i: -1, highlightIdx: [], readIdx: [], msg: "Initialize DP array with Infinity" });
    dp[0] = 0;
    dpStates.push({ dp: [...dp], i: 0, highlightIdx: [0], readIdx: [], msg: "Base case: DP[0] = 0 (0 coins for amount 0)" });
    
    for(let i=1; i<=amount; i++) {
        for(let coin of coins) {
            if (i - coin >= 0) {
                let prev = dp[i];
                let dp_val_prev = prev === "∞" ? Infinity : prev;
                let dp_val_coin = dp[i - coin] === "∞" ? Infinity : dp[i - coin];
                let newVal = Math.min(dp_val_prev, dp_val_coin + 1);
                
                if (newVal !== dp_val_prev) {
                    dp[i] = newVal;
                    dpStates.push({ 
                        dp: [...dp], i: i, highlightIdx: [i], readIdx: [i-coin], coin: coin,
                        msg: `Amount ${i}: Using coin ${coin}. DP[${i}] = min(DP[${i}], DP[${i-coin}] + 1) = ${dp[i]}`
                    });
                }
            }
        }
    }
    
    document.getElementById('codeBlock').innerHTML = `<pre><code class="language-python">def coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for coin in coins:\n            if i - coin >= 0:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1</code></pre>`;
    if (window.Prism) Prism.highlightAll();
}

function initLCS() {
    const s1 = "ABC";
    const s2 = "AC";
    const m = s1.length;
    const n = s2.length;
    let dp = Array(m+1).fill(0).map(() => Array(n+1).fill(0));
    dpStates.push({ dp: JSON.parse(JSON.stringify(dp)), r: 0, c: 0, match: null, msg: "Initialize DP grid with 0s", s1, s2 });
    
    for(let i=1; i<=m; i++) {
        for(let j=1; j<=n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                dpStates.push({ dp: JSON.parse(JSON.stringify(dp)), r: i, c: j, readR: i-1, readC: j-1, match: true, 
                    msg: `Match '${s1[i-1]}' == '${s2[j-1]}'! DP[${i}][${j}] = DP[${i-1}][${j-1}] + 1 = ${dp[i][j]}`, s1, s2});
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                dpStates.push({ dp: JSON.parse(JSON.stringify(dp)), r: i, c: j, readR1: i-1, readC1: j, readR2: i, readC2: j-1, match: false, 
                    msg: `Mismatch '${s1[i-1]}' != '${s2[j-1]}'. DP[${i}][${j}] = max(DP[${i-1}][${j}], DP[${i}][${j-1}]) = ${dp[i][j]}`, s1, s2});
            }
        }
    }
    
    document.getElementById('codeBlock').innerHTML = `<pre><code class="language-python">def longest_common_subsequence(text1, text2):\n    m, n = len(text1), len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i-1] == text2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]</code></pre>`;
    if (window.Prism) Prism.highlightAll();
}

function nextStep() {
    if (currentStep < dpStates.length - 1) {
        currentStep++;
        renderState();
    } else {
        clearInterval(autoPlayInterval);
        isAutoPlaying = false;
        document.getElementById('playBtn').innerText = "Play";
    }
}

function toggleAutoPlay() {
    isAutoPlaying = !isAutoPlaying;
    if (isAutoPlaying) {
        document.getElementById('playBtn').innerText = "Pause";
        autoPlayInterval = setInterval(nextStep, 1000);
    } else {
        document.getElementById('playBtn').innerText = "Play";
        clearInterval(autoPlayInterval);
    }
}

function renderState() {
    if (dpStates.length === 0) return;
    const state = dpStates[currentStep];
    const container = document.getElementById('dpContainer');
    const info = dpDict[algorithm];
    
    if (info.type === 'fibonacci' || info.type === 'coinChange') {
        let html = '<div style="display:flex; gap:15px; flex-wrap:wrap; margin-top:20px; justify-content:center;">';
        for (let j=0; j<state.dp.length; j++) {
            const isHighlight = state.highlightIdx && state.highlightIdx.includes(j);
            const isRead = state.readIdx && state.readIdx.includes(j);
            
            let bg = 'rgba(255,255,255,0.05)';
            let border = '1px solid var(--glass-border)';
            if (isHighlight) { bg = 'rgba(16, 185, 129, 0.3)'; border = '2px solid #10b981'; }
            else if (isRead) { bg = 'rgba(99, 102, 241, 0.3)'; border = '2px solid #6366f1'; }
            
            html += `<div style="width:60px; height:60px; display:flex; align-items:center; justify-content:center; background:${bg}; border:${border}; border-radius:8px; font-weight:bold; font-size:1.2rem; position:relative; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                ${state.dp[j]}
                <div style="position:absolute; bottom:-25px; font-size:12px; color:var(--text-muted);">i=${j}</div>
            </div>`;
        }
        html += '</div>';
        html += `<div style="margin-top: 50px; color: var(--accent); font-weight: bold; font-size: 1.2rem; text-align:center; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px;">${state.msg}</div>`;
        
        container.innerHTML = html;
        
    } else if (info.type === 'lcs') {
        const m = state.s1.length;
        const n = state.s2.length;
        
        let html = '<table style="border-collapse: collapse; margin-top: 20px;">';
        html += '<tr><th></th><th>""</th>';
        for (let j=0; j<n; j++) html += `<th>${state.s2[j]}</th>`;
        html += '</tr>';
        
        for (let i=0; i<=m; i++) {
            html += '<tr>';
            if (i===0) html += '<th>""</th>';
            else html += `<th>${state.s1[i-1]}</th>`;
            
            for (let j=0; j<=n; j++) {
                const isHighlight = (state.r === i && state.c === j);
                const isReadMatch = (state.match === true && state.readR === i && state.readC === j);
                const isReadMismatch1 = (state.match === false && state.readR1 === i && state.readC1 === j);
                const isReadMismatch2 = (state.match === false && state.readR2 === i && state.readC2 === j);
                
                let bg = 'rgba(255,255,255,0.05)';
                let border = '1px solid var(--glass-border)';
                if (isHighlight) { bg = 'rgba(16, 185, 129, 0.4)'; border = '2px solid #10b981'; }
                else if (isReadMatch || isReadMismatch1 || isReadMismatch2) { bg = 'rgba(99, 102, 241, 0.4)'; border = '2px solid #6366f1'; }
                
                html += `<td style="width:50px; height:50px; text-align:center; vertical-align:middle; background:${bg}; border:${border}; font-weight:bold;">${state.dp[i][j]}</td>`;
            }
            html += '</tr>';
        }
        html += '</table>';
        html += `<div style="margin-top: 30px; color: var(--accent); font-weight: bold; font-size: 1.2rem; text-align:center; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px;">${state.msg}</div>`;
        container.innerHTML = html;
    }
}
