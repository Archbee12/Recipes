import { renderNutritionCard } from './nutritionui.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('nutrition-link');
  renderNutritionCard(container);
});