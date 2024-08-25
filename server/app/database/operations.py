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


## NEW ALGO TO BE FIXED -

# from functools import cmp_to_key
# from datetime import datetime, time, timedelta
# import os
# import csv
# from sqlalchemy import create_engine, desc, and_, or_, case

# from flask import g, current_app

# from werkzeug.local import LocalProxy

# from app.database.models import Base, User, City, Category, Cuisine, Activity, ActivityAvailability, FoodOption, FoodOptionAvailability, Itinerary, ItineraryActivity, ItineraryFood


# from sqlalchemy.orm import Session
# from sqlalchemy import select

# def generate_itinerary(params):
#     with Session(engine) as session:
#         start_date = params.get("duration").get("startDate")
#         end_date = params.get("duration").get("endDate")
#         city = params.get("city")
#         activity_budget = params.get("activityPreferences").get("budget")
#         activity_categories = params.get("activityPreferences").get("categories")
#         food_budget = params.get("foodPreferences").get("budget")
#         food_cuisines = params.get("foodPreferences").get("cuisines")
#         is_veg = params.get("foodPreferences").get("isVeg")
#         accessibility_needed = params.get("accessibility_need")

#         foodOptions = []
#         for day in range(7):
#             statement = select(
#                 FoodOption, FoodOptionAvailability
#             ).join(
#                 FoodOption.availabilities
#             ).where(
#                 (FoodOptionAvailability.day_of_week == day) & 
#                 (FoodOption.city_id == city) &
#                 (FoodOptionAvailability.close_time > FoodOptionAvailability.open_time) &
#                 (FoodOption.budget_category <= food_budget) &
#                 (or_(is_veg == False, FoodOption.is_vegetarian == True)) &
#                 (or_(accessibility_needed == False, FoodOption.wheelchair_accessibility == True))
#             ).order_by(
#                 desc(
#                     case(
#                         (FoodOption.cuisine_id.in_(food_cuisines), FoodOption.popularity + 3),
#                         else_ = FoodOption.popularity
#                     )
#                 )
#             )

#             optThatDay = []
#             for obj in session.execute(statement):
#                 opt = obj.FoodOption.to_dict()
#                 opt2 = obj.FoodOptionAvailability.to_dict()

#                 opt2.update(opt)
#                 optThatDay.append(opt2)
            
#             foodOptions.append(optThatDay)

#         no_of_days = (datetime.strptime(end_date, "%Y-%m-%d") - datetime.strptime(start_date, "%Y-%m-%d")).days

#         allForThisTripUnsorted = []
#         foodSelectsId = {}
#         for i in range(no_of_days):
#             delta = timedelta(days=i)
#             currDate = datetime.strptime(start_date, "%Y-%m-%d") + delta

#             b, l, d = None, None, None

#             for option in foodOptions[int(currDate.strftime("%w"))]:
#                 if b and l and d:
#                     break
#                 if not foodSelectsId.get(option.get('id')):
#                     if not b and option.get('has_breakfast') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 540 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 600:
#                         b = option
#                         foodSelectsId[option.get('id')] = True
#                     elif not l and option.get('has_lunch') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 780 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 840:
#                         l = option
#                         foodSelectsId[option.get('id')] = True
#                     elif not d and option.get('has_dinner') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 1260 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 1320:
#                         d = option
#                         foodSelectsId[option.get('id')] = True
            
#             if not b or not l or not d:
#                 foodSelectsId.clear()
#                 for option in foodOptions[int(currDate.strftime("%w"))]:
#                     if b and l and d:
#                         break
#                     if not foodSelectsId.get(option.get('id')):
#                         if not b and option.get('has_breakfast') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 540 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 600:
#                             b = option
#                             foodSelectsId[option.get('id')] = True
#                         elif not l and option.get('has_lunch') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 780 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 840:
#                             l = option
#                             foodSelectsId[option.get('id')] = True
#                         elif not d and option.get('has_dinner') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 1260 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 1320:
#                             d = option
#                             foodSelectsId[option.get('id')] = True

#             allForThisTripUnsorted.append([
#                 {
#                     **b, 
#                     "startTime": time(hour=9).strftime("%H:%M"),
#                     "endTime": time(hour=10).strftime("%H:%M"),
#                     "expense": b.get("average_price"),
#                     "type": "food"
#                 },
#                 {
#                     **l, 
#                     "startTime": time(hour=13).strftime("%H:%M"),
#                     "endTime": time(hour=14).strftime("%H:%M"),
#                     "expense": l.get("average_price"),
#                     "type": "food"
#                 },
#                 {
#                     **d, 
#                     "startTime": time(hour=21).strftime("%H:%M"),
#                     "endTime": time(hour=22).strftime("%H:%M"),
#                     "expense": d.get("average_price"),
#                     "type": "food"
#                 },
#             ])

#         activityOptions = []
#         for day in range(7):
#             statement = select(
#                 Activity, ActivityAvailability
#             ).join(
#                 Activity.availabilities
#             ).join(
#                 Activity.city
#             ).where(
#                 (ActivityAvailability.day_of_week == day) & 
#                 (Activity.city_id == city) &
#                 (ActivityAvailability.close_time > ActivityAvailability.open_time) &
#                 (Activity.budget_category <= activity_budget) &
#                 (or_(accessibility_needed == False, Activity.wheelchair_accessibility == True))
#             ).order_by(
#                 desc(
#                     case(
#                         (Activity.category_id.in_(activity_categories), Activity.popularity + 3),
#                         else_ = Activity.popularity
#                     )
#                 )
#             )

#             optThatDay = []
#             for obj in session.execute(statement):
#                 opt = obj.Activity.to_dict()
#                 opt2 = obj.ActivityAvailability.to_dict()

#                 opt2.update(opt)
#                 optThatDay.append(opt2)
            
#             activityOptions.append(optThatDay)

#         allForThisTrip = []
#         activitySelectsId = {}

#         for i in range(no_of_days):
#             delta = timedelta(days=i)
#             currDate = datetime.strptime(start_date, "%Y-%m-%d") + delta

#             currEnd = 600
#             for option in activityOptions[int(currDate.strftime("%w"))]:
#                 if not activitySelectsId.get(option.get('id')):
#                     if time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= currEnd and min(time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute, 780) >= currEnd + option.get("average_duration"):
#                         allForThisTripUnsorted[i].append({
#                             **option,
#                             "startTime": time(hour=int(currEnd/60), minute=int(currEnd%60)).strftime("%H:%M"),
#                             "endTime": time(hour=int((currEnd+option.get("average_duration"))/60), minute=int((currEnd+option.get("average_duration"))%60)).strftime("%H:%M"),
#                             "expense": option.get("average_price"),
#                             "type": "activity"
#                         })
#                         currEnd += option.get("average_duration")
#                         activitySelectsId[option.get('id')] = True

#             currEnd = 840
#             for option in activityOptions[int(currDate.strftime("%w"))]:
#                 if not activitySelectsId.get(option.get('id')):
#                     if time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= currEnd and min(time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute, 1260) >= currEnd + option.get("average_duration"):
#                         allForThisTripUnsorted[i].append({
#                             **option,
#                             "startTime": time(hour=int(currEnd/60), minute=int(currEnd%60)).strftime("%H:%M"),
#                             "endTime": time(hour=int((currEnd+option.get("average_duration"))/60), minute=int((currEnd+option.get("average_duration"))%60)).strftime("%H:%M"),
#                             "expense": option.get("average_price"),
#                             "type": "activity"
#                         })
#                         currEnd += option.get("average_duration")
#                         activitySelectsId[option.get('id')] = True

#             allForThisTrip.append(sorted(allForThisTripUnsorted[i], key=cmp_to_key(lambda item1, item2: 
#                 (datetime.strptime(item1.get('startTime'), "%H:%M") - datetime.strptime(item2.get('startTime'), "%H:%M")).total_seconds()
#             )))

#         return {
#             **params,
#             "itinerary": allForThisTrip
#         }