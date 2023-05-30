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


def fake_google_api_data_getgeocde():
    return {"lat": 43.08292100000001, "lng": -87.88792099999999}


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
