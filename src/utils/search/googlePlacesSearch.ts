import { Loader } from "@googlemaps/js-api-loader";

export const findPlaces = async () => {
  const loader = new Loader({
    apiKey: "YOUR_API_KEY", //"YOUR_API_KEY",
    version: "weekly",
    libraries: ["places"],
  });
  await loader.load();

  const testLocation = new google.maps.LatLng(43.094543, -87.876833);
  let map: google.maps.Map;
  let service: google.maps.places.PlacesService;
  // let infowindow: google.maps.InfoWindow;

  // Creating invisible map so we can perform our queries
  map = new google.maps.Map(
    document.getElementById("invisibleMap") as HTMLElement,
    {
      center: testLocation,
      zoom: 15,
    }
  );
  const request = {
    query: "restaurant",
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);

  // OPTION 1: Search for one place to meet criteria
  // service.findPlaceFromQuery(
  //   request,
  //   (
  //     results: google.maps.places.PlaceResult[] | null,
  //     status: google.maps.places.PlacesServiceStatus
  //   ) => {
  //     if (status === google.maps.places.PlacesServiceStatus.OK && results) {
  //       for (let i = 0; i < results.length; i++) {
  //         // createMarker(results[i]);
  //         console.log("we got data?", results[i]);
  //       }

  //       // map.setCenter(results[0].geometry!.location!);
  //     }
  //   }
  // );

  // OPTION 2: Search for all places that meet criteria in the radius
  const requestText = {
    query: "restaurant",
    location: testLocation, //{ lat: 37.7749, lng: -122.4194 },
    radius: 50000,
  };

  service.textSearch(requestText, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results?.forEach((place) => {
        console.log("text search!", place);
      });
    }
  });
};
