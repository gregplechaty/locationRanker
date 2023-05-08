export const testAPI = async () => {
  const response = await fetch("http://localhost:8000/api/data/");
  const data = await response.json();
  console.log(data);
};

const getCookie = (name: string) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const findPlaces = async () => {
  try {
    const csrftoken = getCookie("csrftoken");
    if (!csrftoken) {
      throw new Error("unable to get csrf token");
    }
    const response = await fetch(
      "http://localhost:8000/api/googlemaps/place/",
      {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ query: "library" }),
      }
    );
    const data = await response.json();
    console.log(data);
  } catch {
    throw new Error("failed to successfully query the request");
  }
};
