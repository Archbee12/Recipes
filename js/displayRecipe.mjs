import { attachRecipeListeners } from './utils.mjs';

// export function displayRecipes(recipes, resultsContainer) {
//   if (recipes.length === 0) {
//     resultsContainer.innerHTML = '<p>No recipes found. Try another keyword.</p>';
//     return;
//   }

//   // Filter out incomplete recipes
//   recipes = recipes.filter(r => r.id && r.title && r.image);

//   resultsContainer.innerHTML = recipes.map(recipe => `
//     <div class="recipe-card">
//       <img src="${recipe.image}" alt="${recipe.title}" />
//       <div class="recipe-content">
//         <h3>${recipe.title}</h3>
//         <p>${(recipe.summary ?? 'No summary available.').replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
//         <button class="ingredients-btn" data-id="${recipe.id}" data-title="${recipe.title}">View Ingredients</button>
//         <button 
//           class="save-btn" 
//           data-id="${recipe.id}" 
//           data-title="${recipe.title}" 
//           data-image="${recipe.image}" 
//           data-summary="${recipe.summary?.replace(/<[^>]*>/g, '') ?? ''}"
//         >
//           ❤️ Save
//         </button>
//       </div>
//     </div>
//   `).join('');

//   attachRecipeListeners();
// }

export function displayRecipes(recipes, resultsContainer, heading = 'Search Results') {
  // Show loader first
  resultsContainer.innerHTML = `
    <div class="loader-wrapper" style="display: flex; justify-content: center; align-items: center; height: 200px;">
      <div class="loader"></div>
    </div>
  `;

  setTimeout(() => {
    if (recipes.length === 0) {
      resultsContainer.innerHTML = `<p>No recipes found. Try another keyword.</p>`;
      return;
    }

    // Filter out incomplete recipes
    recipes = recipes.filter(r => r.id && r.title && r.image);

    resultsContainer.innerHTML = `
      <h2 class="results-heading">${heading}</h2>
      <div class="card-grid">
        ${recipes.map(recipe => `
          <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}" />
            <div class="recipe-content">
              <h3>${recipe.title}</h3>
              <p>${(recipe.summary ?? 'No summary available.').replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
              <button class="ingredients-btn" data-id="${recipe.id}" data-title="${recipe.title}">View Ingredients</button>
              <button 
                class="save-btn" 
                data-id="${recipe.id}" 
                data-title="${recipe.title}" 
                data-image="${recipe.image}" 
                data-summary="${recipe.summary?.replace(/<[^>]*>/g, '') ?? ''}"
              >
                ❤️ Save
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    attachRecipeListeners();
    resultsContainer.classList.add('loaded');
  }, 500);
}