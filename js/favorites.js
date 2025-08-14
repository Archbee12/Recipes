import { getFavorites } from './favorites.mjs';
import { displayRecipes } from './displayRecipe.mjs';
import { attachRecipeListeners } from './utils.mjs';

// const results = document.getElementById('results');

document.addEventListener('DOMContentLoaded', () => {
  const favBtn = document.getElementById('favorites-recipes');
  if (favBtn) {
    favBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const favorites = getFavorites();

      const results = document.getElementById('results');
      if (favorites.length === 0) {
        results.innerHTML = '<p>No favorites saved yet.</p>';
        return;
      }

      displayRecipes(favorites, results, 'Saved Favorites');
      attachRecipeListeners();
    });
  }
});
