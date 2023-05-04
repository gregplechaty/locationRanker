export const testAPI = async () => {
  const response = await fetch("http://localhost:8000/api/data/");
  const data = await response.json();
  console.log(data);
};

export const findPlaces = async () => {
  const response = await fetch("http://localhost:8000/api/googlemaps/place/");
  const data = await response.json();
  console.log(data);
};
