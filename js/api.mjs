const API_KEY = '703b62d986ed49188aacd9d714a2d1d8';

export async function fetchRecipes(query) {
  try {
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&addRecipeInformation=true&apiKey=${API_KEY}`);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }

  // return [
  //     {
  //       id: 123,
  //       title: 'Mock Sandwich',
  //       image: 'https://via.placeholder.com/150',
  //       summary: 'This is a mock recipe for testing.'
  //     }
  //   ]; 
}

export async function fetchIngredients(id) {
  try {
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    const data = await res.json();

    const ingredients = data.extendedIngredients.map(ing => ing.original);
    const instructions = data.analyzedInstructions[0]?.steps.map(step => step.step) || ['No instructions available.'];

    return { ingredients, instructions };
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return {
      ingredients: ['Unable to load ingredients.'],
      instructions: ['Unable to load instructions.']
    };
  }
}