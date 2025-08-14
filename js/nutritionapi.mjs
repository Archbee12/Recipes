const API_KEY = 'Dy47h95D/wF3uwlw+Gqa2w==D6ibJHv1m1E7F1nw';

export async function fetchNutrition(query) {
  try {
    const res = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
      headers: { 'X-Api-Key': API_KEY }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    return [];
  }
}