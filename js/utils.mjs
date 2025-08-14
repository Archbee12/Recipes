import { fetchIngredients } from './api.mjs';
import { displayRecipes } from './displayRecipe.mjs';
import { saveFavorite, removeFavorite, isFavorite, getFavorites } from './favorites.mjs';
import { showAlert } from './showAlert.mjs';

export function attachRecipeListeners() {
  document.querySelectorAll('.ingredients-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const recipeId = button.dataset.id;
      const title = button.dataset.title;
      const modal = document.getElementById('modal');
      modal.innerHTML = `<div class="modal-content"><div class="loader" style="margin: 40px auto;"></div></div>`;
      modal.classList.remove('hidden');
      const { ingredients, instructions } = await fetchIngredients(recipeId);
      showModal(title, ingredients, instructions);
    });
  });

  document.querySelectorAll('.save-btn').forEach(button => {
    const recipe = {
      id: button.dataset.id,
      title: button.dataset.title,
      image: button.dataset.image,
      summary: button.dataset.summary
    };

    if (isFavorite(recipe.id)) {
      button.textContent = '💔 Unsave';
    }

    button.addEventListener('click', () => {
      const isInFavorites = document.getElementById("favorites-link");

      if (isFavorite(recipe.id)) {
        removeFavorite(recipe.id);
        button.textContent = '❤️ Save';
        showAlert("Removed from favorites", "error");

        if (isInFavorites) {
          const updatedFavorites = getFavorites();
          const results = document.getElementById("results");
          displayRecipes(updatedFavorites, results);
        }
      } else {
        saveFavorite(recipe);
        button.textContent = '💔 Unsave';
        showAlert("Saved to favorites", "success");
      }
    });
  });
}

export function showModal(title, ingredients, instructions) {
  const modal = document.getElementById('modal');
  modal.innerHTML = '';

  const content = document.createElement('div');
  content.className = 'modal-content';

  // Close button
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '15px';
  closeBtn.style.fontSize = '1.5rem';
  closeBtn.onclick = () => modal.classList.add('hidden');

  // Title
  const modalTitle = document.createElement('h2');
  modalTitle.textContent = title;

  // Tabs
  const tabContainer = document.createElement('div');
  tabContainer.className = 'tab-container';

  const ingredientsTab = document.createElement('button');
  ingredientsTab.textContent = 'Ingredients';
  ingredientsTab.className = 'tab active';

  const instructionsTab = document.createElement('button');
  instructionsTab.textContent = 'Instructions';
  instructionsTab.className = 'tab';

  tabContainer.appendChild(ingredientsTab);
  tabContainer.appendChild(instructionsTab);

  // Content sections
  const ingredientsSection = document.createElement('ul');
  ingredientsSection.className = 'tab-content';
  ingredients.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ingredientsSection.appendChild(li);
  });

  const instructionsSection = document.createElement('ol');
  instructionsSection.className = 'tab-content hidden';
  instructions.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    instructionsSection.appendChild(li);
  });

  // Tab switching logic
  ingredientsTab.addEventListener('click', () => {
    ingredientsTab.classList.add('active');
    instructionsTab.classList.remove('active');
    ingredientsSection.classList.remove('hidden');
    instructionsSection.classList.add('hidden');
  });

  instructionsTab.addEventListener('click', () => {
    instructionsTab.classList.add('active');
    ingredientsTab.classList.remove('active');
    instructionsSection.classList.remove('hidden');
    ingredientsSection.classList.add('hidden');
  });

  // Assemble modal
  content.appendChild(closeBtn);
  content.appendChild(modalTitle);
  content.appendChild(tabContainer);
  content.appendChild(ingredientsSection);
  content.appendChild(instructionsSection);
  modal.appendChild(content);
  modal.classList.remove('hidden');

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

