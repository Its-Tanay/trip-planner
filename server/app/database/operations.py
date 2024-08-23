from datetime import datetime, timedelta
from typing import List, Dict, Any
from .models import Activity, FoodOption
from .queries import get_activities, get_food_options, get_available_food, get_available_activity
from sqlalchemy.orm import Session
from app.database.queries import get_available_activity, get_activities, get_available_food, get_food_options
from app.database.db import engine

def generate_itinerary(request_data: Dict[str, Any]) -> Dict[str, Any]:
    city_id = request_data['city']
    accessibility_need = request_data['accessibility_need']
    activity_preferences = request_data['activityPreferences']
    food_preferences = request_data['foodPreferences']
    start_date = datetime.strptime(request_data['duration']['startDate'], '%Y-%m-%d')
    end_date = datetime.strptime(request_data['duration']['endDate'], '%Y-%m-%d')

    with Session(engine) as session:
        activities = get_activities(session, city_id, accessibility_need, activity_preferences)
        food_options = get_food_options(session, city_id, accessibility_need, food_preferences)
        itinerary = create_itinerary(session, activities, food_options, start_date, end_date)

    return itinerary

def create_itinerary(session: Session, activities: List[Activity], food_options: List[FoodOption], start_date: datetime, end_date: datetime) -> Dict[str, Any]:
    itinerary = {}
    current_date = start_date
    food_index = 0
    activity_index = 0

    while current_date <= end_date:
        day_schedule = []
        day_of_week = current_date.weekday()

        breakfast = get_available_food(session, food_options, food_index, day_of_week, current_date.replace(hour=9), True)
        if breakfast:
            day_schedule.append({
                "type": "food",
                "name": breakfast.name,
                "startTime": "09:00",
                "endTime": "10:00"
            })
            food_index = (food_index + 1) % len(food_options)

        morning_activity = get_available_activity(session, activities, activity_index, day_of_week, current_date.replace(hour=10))
        if morning_activity:
            day_schedule.append({
                "type": "activity",
                "name": morning_activity.name,
                "startTime": "10:00",
                "endTime": (current_date.replace(hour=10) + timedelta(minutes=morning_activity.average_duration)).strftime("%H:%M")
            })
            activity_index = (activity_index + 1) % len(activities)

        lunch = get_available_food(session, food_options, food_index, day_of_week, current_date.replace(hour=13), False)
        if lunch:
            day_schedule.append({
                "type": "food",
                "name": lunch.name,
                "startTime": "13:00",
                "endTime": "14:00"
            })
            food_index = (food_index + 1) % len(food_options)

        afternoon_activity = get_available_activity(session, activities, activity_index, day_of_week, current_date.replace(hour=14))
        if afternoon_activity:
            day_schedule.append({
                "type": "activity",
                "name": afternoon_activity.name,
                "startTime": "14:00",
                "endTime": (current_date.replace(hour=14) + timedelta(minutes=afternoon_activity.average_duration)).strftime("%H:%M")
            })
            activity_index = (activity_index + 1) % len(activities)

        dinner = get_available_food(session, food_options, food_index, day_of_week, current_date.replace(hour=20), False)
        if dinner:
            day_schedule.append({
                "type": "food",
                "name": dinner.name,
                "startTime": "20:00",
                "endTime": "21:00"
            })
            food_index = (food_index + 1) % len(food_options)

        itinerary[current_date.strftime("%Y-%m-%d")] = day_schedule
        current_date += timedelta(days=1)

    return itinerary