import { fetchRecipes } from './api.mjs';
import { displayRecipes } from './displayRecipe.mjs';
import { introRecipes } from './introRecipes.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const results = document.getElementById('results');

  // ✅ Search Form Handler
  if (form && input && results) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;

      // Reset animation state
      results.classList.remove('loaded');

      // Show loading message
      results.innerHTML = '<p>Loading recipes...</p>';

      // Scroll to results section
      results.scrollIntoView({ behavior: 'smooth' });

      // Fetch and display recipes
      const recipes = await fetchRecipes(query);
      displayRecipes(recipes, results, 'Searched Results');

      // Trigger fade-in animation
      setTimeout(() => {
        results.classList.add('loaded');
      }, 100); // slight delay for smoother effect
    });
  }

  // ✅ Intro Cards
  const introContainer = document.getElementById('intro-cards');
  displayIntroCards(introContainer);
});

function displayIntroCards(container) {
  container.innerHTML = introRecipes.map(recipe => `
    <div class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="recipe-content">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
      </div>
    </div>
  `).join('');
}