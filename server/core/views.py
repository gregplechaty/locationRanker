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
        place_data = get_data(data["placesOfInterest"], data["homeAddress"])
        response = {
            "status": status,
            "message": message,
            "data": {"place_data": place_data},
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


def get_data(places, home_address):
    place_data = []
    for place in places:
        query = place["searchTerm"]
        home_address = home_address
        url = format_url(query, home_address, 3000)
        if should_use_fake_api_data:
            response_json = fake_google_api_data()
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
            candidate_place = response_json["candidates"][0]
        place_data.append(
            {
                "category": place["searchTerm"],
                "place_found": place_found,
                "name": candidate_place["name"] or "",
            }
        )
    return place_data


def format_url(query, home_address, distance):
    base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"
    input = "input=" + query
    location_bias = (
        "&locationbias=circle%3A{distance}%".format(distance=distance) + home_address
    )
    fields = "&fields=formatted_address%2Cname%2Ctype%2Cbusiness_status"
    apikey = "&key=" + os.environ["GOOGLE_API_KEY"]

    return base_url + input + "&inputtype=textquery" + location_bias + fields + apikey


def fake_google_api_data():
    return {
        "candidates": [
            {
                "business_status": "OPERATIONAL",
                "formatted_address": "3549 N Oakland Ave, Milwaukee, WI 53211, United States",
                "name": "Harry's Bar and Grill",
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
