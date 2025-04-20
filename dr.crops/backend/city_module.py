def get_weather_by_city(city):
    # Mock different weather for demonstration
    city_weather = {
        "Mumbai": {"temp": 32, "humidity": 80, "state": "Maharashtra"},
        "Kolkata": {"temp": 28, "humidity": 65, "state": "West Bengal"},
        "Delhi": {"temp": 35, "humidity": 40, "state": "Delhi"},
        "Chennai": {"temp": 30, "humidity": 75, "state": "Tamil Nadu"},
        "Pune": {"temp": 27, "humidity": 60, "state": "Maharashtra"},
        "Hyderabad": {"temp": 33, "humidity": 55, "state": "Telangana"},
        "Bangalore": {"temp": 25, "humidity": 70, "state": "Karnataka"},
        "Ahmedabad": {"temp": 36, "humidity": 35, "state": "Gujarat"},
        "Jaipur": {"temp": 38, "humidity": 30, "state": "Rajasthan"},
        "Lucknow": {"temp": 29, "humidity": 50, "state": "Uttar Pradesh"},
        # Add more cities as needed
    }
    default_weather = {"temp": 26, "humidity": 50, "state": "Unknown"}
    normalized_city = city.strip().title()
    weather_info = city_weather.get(normalized_city, default_weather)
    weather = {"temp": weather_info["temp"], "humidity": weather_info["humidity"]}
    state = weather_info["state"]
    country = "India"
    return weather, normalized_city, country, state