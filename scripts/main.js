// DOM 元素
const testContainer = document.querySelector('.test-container');

// 创建测试卡片
function createTestCard(test) {
    const card = document.createElement('div');
    card.className = 'test-card';
    
    // 为每个测试创建一个独特的图标
    const icon = test.options[0].result.title.split(' ')[0];
    
    card.innerHTML = `
        <div class="test-icon">${icon}</div>
        <h2>${test.title}</h2>
        <p>${test.description}</p>
        <button onclick="startTest(${test.id})" class="start-btn">开始测试</button>
    `;
    return card;
}

// 渲染所有测试卡片
function renderTests() {
    PERSONALITY_TESTS.forEach(test => {
        testContainer.appendChild(createTestCard(test));
    });
}

// 开始测试
function startTest(testId) {
    const test = PERSONALITY_TESTS.find(t => t.id === testId);
    if (!test) return;

    // 创建测试界面
    const testPage = document.createElement('div');
    testPage.className = 'test-page';
    testPage.innerHTML = `
        <div class="test-content">
            <h2>${test.title}</h2>
            <p class="question">${test.question}</p>
            <div class="options">
                ${test.options.map((option, index) => `
                    <button onclick="showResult(${testId}, ${index})" class="option-btn">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // 替换主容器内容
    testContainer.innerHTML = '';
    testContainer.appendChild(testPage);

    // 添加返回按钮
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = '返回首页';
    backBtn.onclick = () => {
        testContainer.innerHTML = '';
        renderTests();
    };
    testContainer.appendChild(backBtn);
}

// 显示测试结果
function showResult(testId, optionIndex) {
    const test = PERSONALITY_TESTS.find(t => t.id === testId);
    if (!test) return;

    const result = test.options[optionIndex].result;
    const resultPage = document.createElement('div');
    resultPage.className = 'result-page';
    
    // 创建评分指标HTML
    const ratingsHTML = Object.entries(result.ratings || {})
        .map(([key, value]) => `
            <div class="rating-item">
                <span class="rating-label">${key}</span>
                <div class="rating-bar">
                    <div class="rating-fill" style="width: ${value}"></div>
                </div>
                <span class="rating-value">${value}</span>
            </div>
        `).join('');

    // 创建特质列表HTML
    const traitsHTML = result.traits
        ? `<div class="traits-list">
            ${result.traits.map(trait => `<div class="trait-item">${trait}</div>`).join('')}
           </div>`
        : '';

    // 创建日常表现HTML
    const dailyLifeHTML = result.dailyLife
        ? `<div class="daily-life-list">
            ${result.dailyLife.map(item => `<div class="daily-life-item">${item}</div>`).join('')}
           </div>`
        : '';

    // 创建优势列表HTML
    const advantagesHTML = result.advantages
        ? `<div class="advantages-list">
            ${result.advantages.map(adv => `<div class="advantage-item">${adv}</div>`).join('')}
           </div>`
        : '';

    // 创建建议列表HTML
    const suggestionsHTML = result.suggestions
        ? `<div class="suggestions-list">
            ${result.suggestions.map(sug => `<div class="suggestion-item">${sug}</div>`).join('')}
           </div>`
        : '';

    // 创建最佳搭档HTML
    const partnersHTML = result.bestPartners
        ? `<div class="partners-list">
            ${result.bestPartners.map(partner => `<div class="partner-item">${partner}</div>`).join('')}
           </div>`
        : '';

    resultPage.innerHTML = `
        <div class="result-content">
            <h2 class="result-title">${result.title}</h2>
            <div class="result-summary">
                <p class="summary-text">${result.summary}</p>
                <p class="personality-text">${result.personality}</p>
            </div>

            <section class="result-section">
                <h3>🌈 性格特征</h3>
                ${traitsHTML}
            </section>

            <section class="result-section">
                <h3>🌟 日常表现</h3>
                ${dailyLifeHTML}
            </section>

            <section class="result-section">
                <h3>📖 你的故事</h3>
                <p class="story-text">${result.story}</p>
            </section>

            <section class="result-section">
                <h3>💫 你的优势</h3>
                ${advantagesHTML}
            </section>

            <section class="result-section">
                <h3>💝 温馨建议</h3>
                ${suggestionsHTML}
            </section>

            <section class="result-section">
                <h3>🤝 最佳搭档</h3>
                ${partnersHTML}
            </section>

            <section class="result-section">
                <h3>📊 能力指数</h3>
                <div class="ratings-container">
                    ${ratingsHTML}
                </div>
            </section>

            <div class="result-actions">
                <button onclick="shareResult('${test.title}', '${result.title}', '${result.summary}')" class="share-btn">
                    分享结果
                </button>
                <button onclick="location.reload()" class="restart-btn">
                    重新测试
                </button>
            </div>
        </div>
    `;

    testContainer.innerHTML = '';
    testContainer.appendChild(resultPage);
}

// 分享结果
function shareResult(testTitle, resultTitle, summary) {
    const shareText = `我在"趣味性格测试"中测试了"${testTitle}"，结果是：${resultTitle}！${summary} 快来测测你的结果吧！`;
    
    // 创建临时输入框
    const input = document.createElement('input');
    input.value = shareText;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    
    alert('结果已复制到剪贴板，快去分享给朋友吧！');
}

// 添加样式
const style = document.createElement('style');
style.textContent = `
    .test-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .test-content {
        background: white;
        border-radius: var(--border-radius);
        padding: 2rem;
        box-shadow: var(--card-shadow);
        text-align: center;
    }

    .test-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: bounce 2s ease infinite;
    }

    .question {
        font-size: 1.2rem;
        margin: 2rem 0;
        color: var(--text-color);
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .option-btn, .start-btn, .back-btn, .share-btn, .restart-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        font-size: 1rem;
        transition: transform 0.2s ease;
    }

    .option-btn:hover, .start-btn:hover, .back-btn:hover, .share-btn:hover, .restart-btn:hover {
        transform: scale(1.05);
    }

    .back-btn {
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        background: var(--secondary-color);
    }

    .result-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .result-content {
        background: white;
        border-radius: var(--border-radius);
        padding: 2rem;
        box-shadow: var(--card-shadow);
    }

    .result-title {
        font-size: 2rem;
        color: var(--primary-color);
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .result-summary {
        text-align: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background: var(--background-color);
        border-radius: var(--border-radius);
    }

    .summary-text {
        font-size: 1.2rem;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }

    .personality-text {
        color: var(--text-color);
    }

    .result-section {
        margin: 2rem 0;
        padding: 1.5rem;
        background: var(--background-color);
        border-radius: var(--border-radius);
    }

    .result-section h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }

    .traits-list, .daily-life-list, .advantages-list, .suggestions-list, .partners-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .trait-item, .daily-life-item, .advantage-item, .suggestion-item, .partner-item {
        padding: 0.8rem;
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--card-shadow);
    }

    .story-text {
        line-height: 1.8;
        padding: 1rem;
        background: white;
        border-radius: var(--border-radius);
    }

    .ratings-container {
        display: grid;
        gap: 1rem;
    }

    .rating-item {
        display: grid;
        grid-template-columns: 100px 1fr 50px;
        align-items: center;
        gap: 1rem;
    }

    .rating-bar {
        height: 10px;
        background: #eee;
        border-radius: 5px;
        overflow: hidden;
    }

    .rating-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        border-radius: 5px;
    }

    .result-actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
    }

    .share-btn {
        background: var(--secondary-color);
    }

    .restart-btn {
        background: var(--primary-color);
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    @media (max-width: 768px) {
        .result-section {
            padding: 1rem;
        }

        .traits-list, .daily-life-list, .advantages-list, .suggestions-list, .partners-list {
            grid-template-columns: 1fr;
        }

        .rating-item {
            grid-template-columns: 80px 1fr 40px;
        }
    }
`;
document.head.appendChild(style);

// 初始化页面
document.addEventListener('DOMContentLoaded', renderTests); 