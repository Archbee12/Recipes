import { attachRecipeListeners } from './utils.mjs';

export function displayRecipes(recipes, resultsContainer) {
  if (recipes.length === 0) {
    resultsContainer.innerHTML = '<p>No recipes found. Try another keyword.</p>';
    return;
  }

  resultsContainer.innerHTML = recipes.map(recipe => `
    <div class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="recipe-content">
        <h3>${recipe.title}</h3>
        <p>${recipe.summary.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
        <button class="ingredients-btn" data-id="${recipe.id}" data-title="${recipe.title}">View Ingredients</button>
        <button class="save-btn" data-id="${recipe.id}">❤️ Save</button>
      </div>
    </div>
  `).join('');

  attachRecipeListeners();
}