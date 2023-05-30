import json
from django.shortcuts import render
from django.http import JsonResponse
import requests
import os
from .utils import (
    calculate_score,
    format_url_findplacefromtext,
    format_url_getdirections,
    generate_geocode,
    handle_error,
)
from .fake_api_data import (
    fake_google_api_data_findplacefromtext,
    fake_google_api_data_getdirections,
    fake_google_api_data_getgeocde,
)

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
        place_data, overall_score, home_address_geocode = get_data(
            data["placesOfInterest"], data["homeAddress"]
        )
        response = {
            "status": status,
            "message": message,
            "data": {
                "score": overall_score,
                "home_address_geocode": home_address_geocode,
                "place_data": place_data,
            },
        }
    except Exception:
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
    try:
        home_address_geocode = generate_geocode(home_address)
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
                raise Exception(
                    "Distance calculation failed:", distance["error_message"]
                )

            distance_objects_only = list(
                map(lambda route: route["legs"][0]["distance"], distance["routes"])
            )
            shortest_distance = min(distance_objects_only, key=lambda obj: obj["value"])
            score, route_distance = calculate_score(
                shortest_distance["value"],
                place_of_interest["distance"],
                place_of_interest["inMiles"],
            )
            if should_use_fake_api_data:
                geocode = fake_google_api_data_getgeocde()
            else:
                geocode = generate_geocode(target_place["formatted_address"])

            place_data.append(
                {
                    "is_place_found": place_found,
                    "search_term": place_of_interest["searchTerm"],
                    "name": target_place["name"] or "",
                    "address": target_place["formatted_address"],
                    "mode": place_of_interest["transportMode"],
                    "score": score,
                    "distance": route_distance,
                    "distance_text": distance["routes"][0]["legs"][0]["distance"][
                        "text"
                    ],
                    "address_geocode": geocode,
                    "business_status": target_place["business_status"],
                    "types": target_place["types"],
                }
            )
        overall_score = calc_overall_score(list(map(get_place_score, place_data)))
    except Exception as err:
        handle_error()
        raise err
    return place_data, overall_score, home_address_geocode


def get_place_score(place):
    try:
        return place["score"]
    except Exception as err:
        handle_error()
        raise err


def calc_overall_score(scores):
    try:
        return sum(list(scores)) / len(list(scores)) or 0
    except Exception as err:
        handle_error()
        raise err


def get_distance(target_place, home_address, transport_mode):
    try:
        url = format_url_getdirections(target_place, home_address, transport_mode)
        if should_use_fake_api_data:
            response_json = fake_google_api_data_getdirections()
        else:
            response = requests.request("GET", url, headers={}, data={})
            response_json = response.json()
        if response_json["status"] != "OK":
            raise Exception("Distance calculation failed:", response_json["status"])
    except Exception as err:
        handle_error()
        raise err
    return response_json
