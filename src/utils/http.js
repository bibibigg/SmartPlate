export async function fetchData(params, searchTerm) {
  let url = "http://localhost:5000/api/" + params;
  if (searchTerm) {
    url += "?search=" + searchTerm;
  }
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("Failed to body data");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const data = await response.json();
  return data;
}
