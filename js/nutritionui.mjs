import { fetchNutrition } from './nutritionapi.mjs';
import { renderLoader } from './utils.mjs';

export function renderNutritionCard(container) {
  container.innerHTML = `
    <div class="nutrition-intro-card">
      <h2>🍏 Nutrition Analyzer</h2>
      <p>Enter a meal or list of ingredients (e.g. <em>"2 eggs and toast"</em>) to get a full nutrition breakdown.</p>
      <form id="nutrition-form">
        <input type="text" id="nutrition-input" placeholder="e.g. 1 banana and 1 cup of milk" required />
        <button type="submit">Analyze</button>
      </form>
      <div id="nutrition-results"></div>
    </div>
  `;

  const form = container.querySelector('#nutrition-form');
  const input = container.querySelector('#nutrition-input');
  const output = container.querySelector('#nutrition-results');

  const analyze = async (query, target = output) => {
    target.innerHTML = renderLoader();

    const nutritionData = await fetchNutrition(query);

    if (!nutritionData || nutritionData.length === 0) {
      target.innerHTML = '<p>No nutrition data found.</p>';
      return;
    }

    saveQuery(query);

    target.innerHTML = nutritionData.map(item => `
      <div class="nutrition-card">
        <h3>${item.name}</h3>
        <ul>
          <li><strong>Fat:</strong> ${item.fat_total_g}g</li>
          <li><strong>Carbs:</strong> ${item.carbohydrates_total_g}g</li>
          <li><strong>Sugar:</strong> ${item.sugar_g}g</li>
        </ul>
      </div>
    `).join('');

    return nutritionData;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    analyze(query);
  });

  renderHistory(container, analyze);
}

function saveQuery(query) {
  let history = JSON.parse(localStorage.getItem('nutritionHistory')) || [];
  if (!history.includes(query)) {
    history.unshift(query); 
    if (history.length > 10) history.pop(); 
    localStorage.setItem('nutritionHistory', JSON.stringify(history));
  }
}

function renderHistory(container, callback) {
  const history = JSON.parse(localStorage.getItem('nutritionHistory')) || [];
  if (history.length === 0) return;

  const historySection = document.createElement('div');
  historySection.className = 'nutrition-history';
  historySection.innerHTML = `
    <h4>Recent Queries</h4>
    <ul></ul>
    <button id="clear-history-btn">Clear History</button>
  `;

  const list = historySection.querySelector('ul');

  history.forEach(query => {
    const li = document.createElement('li');
    li.textContent = query;
    li.className = 'accordion-trigger';

    const resultContainer = document.createElement('div');
    resultContainer.className = 'nutrition-result hidden';

    li.addEventListener('click', async () => {
      const isVisible = !resultContainer.classList.contains('hidden');

      if (isVisible) {
        resultContainer.classList.add('hidden');
        resultContainer.innerHTML = '';
        return;
      }

      resultContainer.classList.remove('hidden');
      resultContainer.innerHTML = '<p>Loading...</p>';
      const data = await callback(query, resultContainer);

      if (!data || data.length === 0) {
        resultContainer.innerHTML = '<p>No nutrition data found.</p>';
        return;
      }

      resultContainer.innerHTML = data.map(item => `
        <div class="nutrition-card">
          <h3>${item.name}</h3>
          <ul>
            <li><strong>Fat:</strong> ${item.fat_total_g}g</li>
            <li><strong>Carbs:</strong> ${item.carbohydrates_total_g}g</li>
            <li><strong>Sugar:</strong> ${item.sugar_g}g</li>
          </ul>
        </div>
      `).join('');
    });

    list.appendChild(li);
    list.appendChild(resultContainer);
  });

  const clearBtn = historySection.querySelector('#clear-history-btn');
  clearBtn.addEventListener('click', () => {
    const confirmClear = confirm('Are you sure you want to clear your nutrition history?');
    if (confirmClear) {
      localStorage.removeItem('nutritionHistory');
      historySection.remove();
    }
  });

  container.appendChild(historySection);
}
