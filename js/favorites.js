import { getFavorites, saveFavorite } from './favorites.mjs';
import { displayRecipes } from './displayRecipe.mjs';

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

      displayRecipes(favorites, results);
    });
  }
});

// const favBtn = document.getElementById('favorites-recipes');
// if (favBtn) {
//   favBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     const favorites = getFavorites();

//     if (favorites.length === 0) {
//       results.innerHTML = '<p>No favorites saved yet.</p>';
//       return;
//     }

//     displayRecipes(favorites, results);
//   });
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const results = document.getElementById('results');
//   const favorites = getFavorites();

//   if (favorites.length === 0) {
//     results.innerHTML = '<p>No favorites saved yet.</p>';
//     return;
//   }

//   displayRecipes(favorites, results);
// });



// document.getElementById('favorites-recipes').addEventListener('click', (e) => {
//   e.preventDefault();
//   const favorites = getFavorites();

//   if (favorites.length === 0) {
//     results.innerHTML = '<p>No favorites saved yet.</p>';
//     return;
//   }

//   displayRecipes(favorites, results);
// });