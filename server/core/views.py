import json
from django.shortcuts import render
from django.http import JsonResponse
import requests
import os

should_use_fake_api_data = (
    True if os.environ.get("USE_FAKE_API_DATA") == "TRUE" else False
)


def my_test_api(request):
    # response = requests.get('https://api.example.com/data/')
    response = {"status": 200, "message": "miraculously, this is working"}
    # data = response.json()
    return JsonResponse(response)


def maps_place_top_result(request):
    status = 200
    message = "success"
    data = {}
    try:
        # VALIDATE DATA
        # data = json.loads(request.body.decode("utf-8"))
        data = json.loads(request.body)
        if "homeAddress" not in data or data["homeAddress"] == "":
            status = 400
            message = "Missing key: homeAddress"
            raise Exception("Missing key: homeAddress")
        if "placesOfInterest" not in data:
            status = 400
            message = "Missing key: placesOfInterest"
            raise Exception("Missing key: placesOfInterest")
        place_data, overall_score = get_data(
            data["placesOfInterest"], data["homeAddress"]
        )
        response = {
            "status": status,
            "message": message,
            "data": {"score": overall_score, "place_data": place_data},
        }
    except:
        if status == 200:
            status = 500
            message = "Ranking failed"
            response = {
                "status": status,
                "message": message,
            }
        else:
            response = {
                "status": status,
                "message": message,
            }

    return JsonResponse(response, status=status, safe=False)


def get_data(places_of_interest, home_address):
    place_data = []
    for place_of_interest in places_of_interest:
        query = place_of_interest["searchTerm"]
        home_address = home_address
        url = format_url_findplacefromtext(query, home_address, 3000)
        if should_use_fake_api_data:
            response_json = fake_google_api_data_findplacefromtext()
        else:
            response = requests.request("GET", url, headers={}, data={})
            response_json = response.json()
        place_found = False
        if (
            (should_use_fake_api_data or response.status_code == 200)
            and response_json["candidates"]
            and response_json["candidates"][0]["business_status"] == "OPERATIONAL"
        ):
            place_found = True
            target_place = response_json["candidates"][0]
        # distance data
        distance = get_distance(
            target_place, home_address, place_of_interest["transportMode"]
        )
        if distance["status"] == "INVALID_REQUEST":
            raise Exception("Distance calculation failed:", distance["error_message"])
        # calculate score

        distance_objects_only = list(
            map(lambda route: route["legs"][0]["distance"], distance["routes"])
        )
        shortest_distance = min(distance_objects_only, key=lambda obj: obj["value"])
        score, route_distance = calculate_score(
            shortest_distance["value"],
            place_of_interest["distance"],
            place_of_interest["inMiles"],
        )
        place_data.append(
            {
                "is_place_found": place_found,
                "search_term": place_of_interest["searchTerm"],
                "name": target_place["name"] or "",
                "address": target_place["formatted_address"],
                "mode": place_of_interest["transportMode"],
                "score": score,
                "distance": route_distance,
            }
        )
    overall_score = calc_overall_score(list(map(new_func, place_data)))
    return place_data, overall_score


def new_func(place):
    return place["score"]


def calc_overall_score(scores):
    return sum(list(scores)) / len(list(scores)) or 0


def get_distance(target_place, home_address, transport_mode):
    url = format_url_getdirections(target_place, home_address, transport_mode)
    if should_use_fake_api_data:
        response_json = fake_google_api_data_getdirections()
    else:
        response = requests.request("GET", url, headers={}, data={})
        response_json = response.json()
    if response_json["status"] != "OK":
        raise Exception("Distance calculation failed:", response_json["status"])
    return response_json


def calculate_score(place_of_interest_desired_distance, distance, inMiles):
    route_distance = (
        place_of_interest_desired_distance / 1609
        if inMiles
        else place_of_interest_desired_distance / 1000
    )
    # get a score out of 100. Simplistic for now
    if distance < route_distance:
        return 0, route_distance
    if (0.5 * distance) < route_distance:
        return (
            50 + (50 * ((distance - route_distance)(route_distance * 0.5))),
            route_distance,
        )
    return 100, route_distance


def format_url_findplacefromtext(query, home_address, distance):
    base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"
    input = "input=" + query
    location_bias = (
        "&locationbias=circle%3A{distance}%".format(distance=distance) + home_address
    )
    fields = "&fields=formatted_address%2Cname%2Ctype%2Cbusiness_status"
    api_key = "&key=" + os.environ["GOOGLE_API_KEY"]
    return base_url + input + "&inputtype=textquery" + location_bias + fields + api_key


def format_url_getdirections(target_place, home_address, transport_mode):
    base_url = "https://maps.googleapis.com/maps/api/directions/json?"
    origin = "origin=" + home_address
    destination = "&destination=" + target_place["formatted_address"]
    mode = "&mode=" + transport_mode
    api_key = "&key=" + os.environ["GOOGLE_API_KEY"]
    return base_url + origin + destination + mode + api_key


def fake_google_api_data_findplacefromtext():
    return {
        "candidates": [
            {
                "business_status": "OPERATIONAL",
                "formatted_address": "3549 N Oakland Ave, Milwaukee, WI 53211, United States",
                "name": "Harry POTTER's Bar and Grill",
                "types": [
                    "bar",
                    "restaurant",
                    "food",
                    "point_of_interest",
                    "establishment",
                ],
            }
        ],
        "status": "OK",
    }


def fake_google_api_data_getdirections():
    return {
        "geocoded_waypoints": [
            {
                "geocoder_status": "OK",
                "place_id": "ChIJjUpU2yUfBYgRW-qa_72I1lo",
                "types": ["street_address"],
            },
            {
                "geocoder_status": "OK",
                "place_id": "ChIJ2Ro8UyUfBYgR_DFYByRhFT8",
                "types": ["street_address"],
            },
        ],
        "routes": [
            {
                "bounds": {
                    "northeast": {"lat": 43.0891969, "lng": -87.8837578},
                    "southwest": {"lat": 43.0879388, "lng": -87.8882599},
                },
                "copyrights": "Map data ©2023 Google",
                "legs": [
                    {
                        "distance": {"text": "0.3 mi", "value": 545},
                        "duration": {"text": "2 mins", "value": 115},
                        "end_address": "3920 N Murray Ave, Shorewood, WI 53211, USA",
                        "end_location": {"lat": 43.0879388, "lng": -87.8842556},
                        "start_address": "1701 E Capitol Dr, Shorewood, WI 53211, USA",
                        "start_location": {"lat": 43.0890856, "lng": -87.8882599},
                        "steps": [
                            {
                                "distance": {"text": "0.2 mi", "value": 367},
                                "duration": {"text": "1 min", "value": 57},
                                "end_location": {"lat": 43.0891969, "lng": -87.8837578},
                                "html_instructions": "Head <b>east</b> on <b>E Capitol Dr</b> toward <b>N Oakland Ave</b>",
                                "polyline": {
                                    "points": "yy~eGrtlwO?a@G}BCi@A[Ai@CE?w@?_AAcG?qF"
                                },
                                "start_location": {
                                    "lat": 43.0890856,
                                    "lng": -87.8882599,
                                },
                                "travel_mode": "DRIVING",
                            },
                            {
                                "distance": {"text": "226 ft", "value": 69},
                                "duration": {"text": "1 min", "value": 21},
                                "end_location": {
                                    "lat": 43.0885782,
                                    "lng": -87.88377369999999,
                                },
                                "html_instructions": "Turn <b>right</b> onto <b>N Frederick Ave</b>",
                                "maneuver": "turn-right",
                                "polyline": {"points": "oz~eGnxkwOzB@"},
                                "start_location": {
                                    "lat": 43.0891969,
                                    "lng": -87.8837578,
                                },
                                "travel_mode": "DRIVING",
                            },
                            {
                                "distance": {"text": "358 ft", "value": 109},
                                "duration": {"text": "1 min", "value": 37},
                                "end_location": {"lat": 43.0879388, "lng": -87.8842556},
                                "html_instructions": 'Turn <b>right</b><div style="font-size:0.9em">Destination will be on the right</div>',
                                "maneuver": "turn-right",
                                "polyline": {"points": "sv~eGpxkwO?t@?^BJpA@h@A"},
                                "start_location": {
                                    "lat": 43.0885782,
                                    "lng": -87.88377369999999,
                                },
                                "travel_mode": "DRIVING",
                            },
                        ],
                        "traffic_speed_entry": [],
                        "via_waypoint": [],
                    }
                ],
                "overview_polyline": {
                    "points": "yy~eGrtlwOMeFAi@CE?wBAuNzB@?t@?^BJpA@h@A"
                },
                "summary": "E Capitol Dr",
                "warnings": [],
                "waypoint_order": [],
            }
        ],
        "status": "OK",
    }
