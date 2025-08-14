export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function saveFavorite(recipe) {
  const favorites = getFavorites();
  const exists = favorites.find(r => r.id === recipe.id);
  if (!exists) {
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(id) {
  let favorites = getFavorites();
  favorites = favorites.filter(r => r.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(r => r.id === id);
}