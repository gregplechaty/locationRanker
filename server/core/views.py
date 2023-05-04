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
    query = "restaurant"
    home_address = "43.094543-87.876833"
    payload = {}
    headers = {}

    url = format_url(query, home_address, 3000)

    response = requests.request("GET", url, headers=headers, data=payload)
    return JsonResponse(response.text, safe=False)


def format_url(query, home_address, distance):
    base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"
    input = "input=" + query
    location_bias = (
        "&locationbias=circle%3A{distance}%".format(distance=distance) + home_address
    )
    fields = "&fields=formatted_address%2Cname%2Ctype%2Cbusiness_status"
    apikey = "&key=" + os.environ["GOOGLE_API_KEY"]

    return base_url + input + "&inputtype=textquery" + location_bias + fields + apikey
