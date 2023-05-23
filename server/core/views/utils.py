import os


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
