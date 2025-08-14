// const form = document.getElementById('search-form');
// const input = document.getElementById('search-input');
// const results = document.getElementById('results');



// const API_KEY = '703b62d986ed49188aacd9d714a2d1d8';

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const query = input.value.trim();
//   if (!query) return;

//   results.innerHTML = '<p>Loading recipes...</p>';
//   const recipes = await fetchRecipes(query);
//   displayRecipes(recipes);
// });

// async function fetchRecipes(query) {
//   // try {
//   //   const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&addRecipeInformation=true&apiKey=${API_KEY}`);
//   //   const data = await res.json();
//   //   return data.results;
//   // } catch (error) {
//   //   console.error('Error fetching recipes:', error);
//   //   return [];
//   // }
//   return [
//       {
//         id: 123,
//         title: 'Mock Sandwich',
//         image: 'https://via.placeholder.com/150',
//         summary: 'This is a mock recipe for testing.'
//       }
//     ]; 
// }

// function attachRecipeListeners() {
//   document.querySelectorAll('.ingredients-btn').forEach(button => {
//     button.addEventListener('click', async () => {
//       const recipeId = button.dataset.id;
//       const title = button.dataset.title;
//       const modal = document.getElementById('modal');
//       modal.innerHTML = `<div class="modal-content"><div class="loader" style="margin: 40px auto;"></div></div>`;
//       modal.classList.remove('hidden');
//       const { ingredients, instructions } = await fetchIngredients(recipeId);
//       showModal(title, ingredients, instructions);
//     });
//   });

//   document.querySelectorAll('.save-btn').forEach(button => {
//     button.addEventListener('click', () => {
//       const recipe = {
//         id: button.dataset.id,
//         title: button.dataset.title,
//         image: button.dataset.image,
//         summary: button.dataset.summary
//       };

//       let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//       const exists = favorites.find(r => r.id === recipe.id);

//       if (exists) {
//         favorites = favorites.filter(r => r.id !== recipe.id);
//         button.textContent = '❤️ Save';
//       } else {
//         favorites.push(recipe);
//         button.textContent = '💔 Unsave';
//       }

//       localStorage.setItem('favorites', JSON.stringify(favorites));
//     });

//     // Set initial button state
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     const exists = favorites.find(r => r.id === button.dataset.id);
//     if (exists) button.textContent = '💔 Unsave';
//   });
// }

// function displayRecipes(recipes) {
//   if (recipes.length === 0) {
//     results.innerHTML = '<p>No recipes found. Try another keyword.</p>';
//     return;
//   }

//   results.innerHTML = recipes.map(recipe => `
//     <div class="recipe-card">
//       <img src="${recipe.image}" alt="${recipe.title}" />
//       <div class="recipe-content">
//         <h3>${recipe.title}</h3>
//         <p>${recipe.summary.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
//         <button class="ingredients-btn" data-id="${recipe.id}" data-title="${recipe.title}">View Ingredients</button>
//         <button class="save-btn" data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}" data-summary="${recipe.summary}">❤️ Save</button>
//       </div>
//     </div>
//   `).join('');

//   attachRecipeListeners();  
// }

// document.getElementById('favorites-link').addEventListener('click', (e) => {
//   e.preventDefault();
//   const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//   if (favorites.length === 0) {
//     results.innerHTML = '<p>No favorites saved yet.</p>';
//     return;
//   }

//   results.innerHTML = favorites.map(recipe => `
//     <div class="recipe-card">
//       <img src="${recipe.image}" alt="${recipe.title}" />
//       <div class="recipe-content">
//         <h3>${recipe.title}</h3>
//         <p>${recipe.summary.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
//         <button class="ingredients-btn" data-id="${recipe.id}" data-title="${recipe.title}">View Ingredients</button>
//         <button class="save-btn" data-id="${recipe.id}" data-title="${recipe.title}" data-image="${recipe.image}" data-summary="${recipe.summary}">💔 Unsave</button>
//       </div>
//     </div>
//   `).join('');

//   // Reattach listeners
//   attachRecipeListeners();
// });

// async function fetchIngredients(id) {
//   try {
//     const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
//     const data = await res.json();

//     const ingredients = data.extendedIngredients.map(ing => ing.original);
//     const instructions = data.analyzedInstructions[0]?.steps.map(step => step.step) || ['No instructions available.'];

//     return { ingredients, instructions };
//   } catch (error) {
//     console.error('Error fetching recipe details:', error);
//     return {
//       ingredients: ['Unable to load ingredients.'],
//       instructions: ['Unable to load instructions.']
//     };
//   }
// }

//   //   ingredientsSection.classList.remove('hidden');
//   //   instructionsSection.classList.add('hidden');
//   // });

//   // instructionsTab.addEventListener('click', () => {
//   //   instructionsTab.classList.add('active');
//   //   ingredientsTab.classList.remove('active');
//   //   instructionsSection.classList.remove('hidden');
//   //   ingredientsSection.classList.add('hidden');
//   // });

//   // // Assemble modal
//   // content.appendChild(closeBtn);
//   // content.appendChild(modalTitle);
//   // content.appendChild(tabContainer);
//   // content.appendChild(ingredientsSection);
//   // content.appendChild(instructionsSection);
//   // modal.appendChild(content);
//   // modal.classList.remove('hidden');

//   // window.addEventListener('click', (e) => {
//   //   if (e.target === modal) {
//   //     modal.classList.add('hidden');
//   //   }
//   // });


// // import { fetchRecipes } from './api.mjs';
// // // import { getFavorites } from './Favorites.mjs';
// // import { displayRecipes } from './displayRecipe.mjs';


// // document.getElementById('nutrition-link').addEventListener('click', (e) => {
// //   e.preventDefault();
// //   renderNutritionCard(document.getElementById('results'));
// // });

// // const form = document.getElementById('search-form');
// // const input = document.getElementById('search-input');
// // const results = document.getElementById('results');

// // form.addEventListener('submit', async (e) => {
// //   e.preventDefault();
// //   const query = input.value.trim();
// //   if (!query) return;

// //   console.log('Searching for:', query); // ✅ Debug line

// //   results.innerHTML = '<p>Loading recipes...</p>';
// //   const recipes = await fetchRecipes(query);
// //   console.log('Fetched recipes:', recipes); // ✅ Debug line

// //   displayRecipes(recipes, results);
// // });

// // document.getElementById('favorites-link').addEventListener('click', (e) => {
// //   e.preventDefault();
// //   const favorites = getFavorites();

// //   if (favorites.length === 0) {
// //     results.innerHTML = '<p>No favorites saved yet.</p>';
// //     return;
// //   }

// //   displayRecipes(favorites, results);
// // });

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

      results.innerHTML = '<p>Loading recipes...</p>';
      const recipes = await fetchRecipes(query);
      displayRecipes(recipes, results);
    });
  }

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

document.addEventListener('DOMContentLoaded', () => {
  const introContainer = document.getElementById('intro-cards');
  displayIntroCards(introContainer);
});
