import json
from django.shortcuts import render
from django.http import JsonResponse
import requests
import os


def my_test_api(request):
    # response = requests.get('https://api.example.com/data/')
    response = {"status": 200, "message": "miraculously, this is working"}
    # data = response.json()
    return JsonResponse(response)


def maps_place_top_result(request):
    status = 200
    data = {}
    try:
        # data = json.loads(request.body.decode("utf-8"))
        data = json.loads(request.body)
        place_data = get_data(data["placesOfInterest"])
        response = {
            "status": "success",
            "message": "no exception",
            "data": {"place_data": place_data},
        }
    except:
        status = 404
        response = {
            "status": "error",
            "message": "Ranking failed",
        }

    return JsonResponse(response, status=status, safe=False)


def get_data(places):
    place_data = []
    for place in places:
        query = "restaurant"
        home_address = "43.094543-87.876833"
        url = format_url(query, home_address, 3000)
        # response = requests.request("GET", url, headers=headers, data=payload)
        api_data = fake_google_api_data()
        place_found = False
        if (
            api_data["candidates"]
            and api_data["candidates"][0]["business_status"] == "OPERATIONAL"
        ):
            place_found = True
            candidate_place = api_data["candidates"][0]
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
