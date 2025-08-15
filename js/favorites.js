import { getFavorites } from './favorites.mjs';
import { displayRecipes } from './displayRecipe.mjs';
import { attachRecipeListeners } from './utils.mjs';

// const results = document.getElementById('results');

document.addEventListener('DOMContentLoaded', () => {
  const favoritesSection = document.getElementById('favorites-recipes');
  const results = document.getElementById('results');

  if (favoritesSection && results) {
    const favorites = getFavorites();

    if (favorites.length === 0) {
      results.innerHTML = '<p>No favorites saved yet.</p>';
    } else {
      displayRecipes(favorites, results, 'Saved Favorites');
      attachRecipeListeners(); // So buttons like "Unsave" work
    }
  }
});
