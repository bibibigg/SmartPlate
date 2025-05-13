export async function fetchFoodData() {
  const response = await fetch("/food_data.json");
  if (!response.ok) {
    throw new Error("Failed to fetch food data");
  }
  const data = await response.json();
  return data;
}
