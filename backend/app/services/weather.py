import requests
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "")
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"


class WeatherService:
    @staticmethod
    def get_weather(latitude: float = None, longitude: float = None, date: datetime = None):
        """
        Get weather information for a given location and date.
        
        Note: Free tier of OpenWeatherMap only provides current weather.
        For historical/forecast weather, you would need a paid plan.
        """
        if not WEATHER_API_KEY or WEATHER_API_KEY == "":
            return {
                "available": False,
                "message": "Weather API key not configured",
                "status": "unknown"
            }
        
        if not latitude or not longitude:
            # Return a generic weather message based on due date
            if date:
                days_from = (date - datetime.utcnow()).days
                if days_from < 0:
                    status = "⏰ Deadline has passed"
                elif days_from == 0:
                    status = "📅 Due today"
                elif days_from == 1:
                    status = "📅 Due tomorrow"
                else:
                    status = f"📅 Due in {days_from} days"
            else:
                status = "🌤️ No date specified"
            
            return {
                "available": False,
                "status": status,
                "location": "Unknown"
            }
        
        try:
            params = {
                "lat": latitude,
                "lon": longitude,
                "appid": WEATHER_API_KEY,
                "units": "metric"
            }
            
            response = requests.get(WEATHER_API_URL, params=params, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "available": True,
                    "temperature": data["main"]["temp"],
                    "description": data["weather"][0]["description"],
                    "location": data["name"],
                    "humidity": data["main"]["humidity"],
                    "wind_speed": data["wind"]["speed"],
                }
            else:
                return {
                    "available": False,
                    "message": "Failed to fetch weather",
                    "status": "error"
                }
        except Exception as e:
            return {
                "available": False,
                "message": str(e),
                "status": "error"
            }

    @staticmethod
    def get_due_date_status(due_date: datetime) -> str:
        """Get human-readable status of task due date"""
        if not due_date:
            return "No due date set"
        
        days_from = (due_date - datetime.utcnow()).days
        
        if days_from < 0:
            return f"⏰ {abs(days_from)} day{'s' if abs(days_from) != 1 else ''} overdue"
        elif days_from == 0:
            return "📅 Due today"
        elif days_from == 1:
            return "📅 Due tomorrow"
        else:
            return f"📅 Due in {days_from} days"
