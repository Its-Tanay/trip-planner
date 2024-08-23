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
    total_expense = 0

    while current_date <= end_date:
        day_schedule = []
        day_of_week = current_date.weekday()

        breakfast = get_available_food(session, food_options, food_index, day_of_week, current_date.replace(hour=9), True)
        if breakfast:
            day_schedule.append({
                "type": "food",
                "name": breakfast.name,
                "description": breakfast.description,
                "latitude": breakfast.latitude,
                "longitude": breakfast.longitude,
                "expense": breakfast.average_price,
                "startTime": "09:00",
                "endTime": "10:00"
            })
            food_index = (food_index + 1) % len(food_options)
            total_expense += breakfast.average_price

        morning_activity = get_available_activity(session, activities, activity_index, day_of_week, current_date.replace(hour=10))
        if morning_activity:
            end_time = (current_date.replace(hour=10) + timedelta(minutes=morning_activity.average_duration)).strftime("%H:%M")
            day_schedule.append({
                "type": "activity",
                "name": morning_activity.name,
                "description": morning_activity.description,
                "image_url": morning_activity.image_url,
                "latitude": morning_activity.latitude,
                "longitude": morning_activity.longitude,
                "expense": morning_activity.average_price,
                "startTime": "10:00",
                "endTime": end_time
            })
            activity_index = (activity_index + 1) % len(activities)
            total_expense += morning_activity.average_price

        lunch = get_available_food(session, food_options, food_index, day_of_week, current_date.replace(hour=13), False)
        if lunch:
            day_schedule.append({
                "type": "food",
                "name": lunch.name,
                "description": lunch.description,
                "latitude": lunch.latitude,
                "longitude": lunch.longitude,
                "expense": lunch.average_price,
                "startTime": "13:00",
                "endTime": "14:00"
            })
            food_index = (food_index + 1) % len(food_options)
            total_expense += lunch.average_price

        afternoon_activity = get_available_activity(session, activities, activity_index, day_of_week, current_date.replace(hour=14))
        if afternoon_activity:
            end_time = (current_date.replace(hour=14) + timedelta(minutes=afternoon_activity.average_duration)).strftime("%H:%M")
            day_schedule.append({
                "type": "activity",
                "name": afternoon_activity.name,
                "description": afternoon_activity.description,
                "image_url": afternoon_activity.image_url,
                "latitude": afternoon_activity.latitude,
                "longitude": afternoon_activity.longitude,
                "expense": afternoon_activity.average_price,
                "startTime": "14:00",
                "endTime": end_time
            })
            activity_index = (activity_index + 1) % len(activities)
            total_expense += afternoon_activity.average_price

        dinner = get_available_food(session, food_options, food_index, day_of_week, current_date.replace(hour=20), False)
        if dinner:
            day_schedule.append({
                "type": "food",
                "name": dinner.name,
                "description": dinner.description,
                "latitude": dinner.latitude,
                "longitude": dinner.longitude,
                "expense": dinner.average_price,
                "startTime": "20:00",
                "endTime": "21:00"
            })
            food_index = (food_index + 1) % len(food_options)
            total_expense += dinner.average_price

        itinerary[current_date.strftime("%Y-%m-%d")] = day_schedule
        current_date += timedelta(days=1)

    return {
        "itinerary": itinerary,
        "total_expense": total_expense
    }