import os
import requests
import sys


# get a score out of 100. Simplistic for now
def calculate_score(place_of_interest_desired_distance, distance, inMiles):
    try:
        route_distance = (
            place_of_interest_desired_distance / 1609
            if inMiles
            else place_of_interest_desired_distance / 1000
        )
        # location is further away than distance
        if distance < route_distance:
            return 0, route_distance
        # place_of_interest is less than the max distance, but more than half of the
        # max distance value
        if (0.5 * distance) < route_distance:
            score = 50 + (50 * ((distance - route_distance) * (route_distance * 0.5)))
            rounded_score = round(score, 2)
            return rounded_score, route_distance
        # route is within half the max distance
        return 100, route_distance
    except Exception as err:
        handle_error()
        raise err


def format_url_findplacefromtext(query, home_address, distance):
    try:
        base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?"
        input = "input=" + query
        location_bias = (
            "&locationbias=circle%3A{distance}%".format(distance=distance)
            + home_address
        )
        fields = "&fields=formatted_address%2Cname%2Ctype%2Cbusiness_status"
        api_key = "&key=" + os.environ["GOOGLE_API_KEY"]
        return (
            base_url + input + "&inputtype=textquery" + location_bias + fields + api_key
        )
    except Exception as err:
        handle_error()
        raise err


def format_url_getdirections(target_place, home_address, transport_mode):
    try:
        base_url = "https://maps.googleapis.com/maps/api/directions/json?"
        origin = "origin=" + home_address
        destination = "&destination=" + target_place["formatted_address"]
        mode = "&mode=" + transport_mode
        api_key = "&key=" + os.environ["GOOGLE_API_KEY"]
        return base_url + origin + destination + mode + api_key
    except Exception as err:
        handle_error()
        raise err


def generate_geocode(address):
    try:
        api_key = "&key=" + os.environ["GOOGLE_API_KEY"]
        url = (
            "https://maps.googleapis.com/maps/api/geocode/json?address="
            + address
            + api_key
        )

        response = requests.request("GET", url, headers={}, data={})
        response_json = response.json()
        return response_json["results"][0]["geometry"]["location"]
    except:
        status = 500
        message = "Ranking failed while generating geocode data for an address"
        response = {
            "status": status,
            "message": message,
        }

    return response_json


def handle_error():
    exc_type, exc_obj, exc_tb = sys.exc_info()
    fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    print("ERROR", exc_type, fname)
    print("File with error:", fname)
    print("Line error:", exc_tb.tb_lineno)
