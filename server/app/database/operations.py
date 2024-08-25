from datetime import datetime, timedelta
from .models import Activity, FoodOption
from sqlalchemy.orm import Session
from app.database.db import engine
from functools import cmp_to_key
from datetime import datetime, time, timedelta
from sqlalchemy import desc, or_, case, insert, select
from app.database.models import Activity, ActivityAvailability, FoodOption, FoodOptionAvailability, Itinerary, ItineraryActivity, ItineraryFood
from sqlalchemy.orm import Session

def generate_itinerary(params, current_user):
    
    with Session(engine) as session:
        start_date, end_date, city, activity_budget, activity_categories, food_budget, food_cuisines, is_veg, accessibility_needed = extract_params(params)
        
        itinerary = create_new_itinerary(session, start_date, end_date, current_user)
        
        food_options = query_food_options(session, city, food_budget, is_veg, accessibility_needed, food_cuisines)
        
        no_of_days = calculate_trip_duration(start_date, end_date)
        
        meal_plans = create_meal_plans(food_options, start_date, no_of_days)
        
        activity_options = query_activity_options(session, city, activity_budget, accessibility_needed, activity_categories)
        
        full_itinerary = assign_activities(meal_plans, activity_options, start_date, no_of_days)
        
        save_itinerary_to_db(engine, itinerary.id, full_itinerary)
        
        return {**params, "itinerary": full_itinerary}

def extract_params(params):
    return (
        params.get("duration").get("startDate"),
        params.get("duration").get("endDate"),
        params.get("city"),
        params.get("activityPreferences").get("budget"),
        params.get("activityPreferences").get("categories"),
        params.get("foodPreferences").get("budget"),
        params.get("foodPreferences").get("cuisines"),
        params.get("foodPreferences").get("isVeg"),
        params.get("accessibility_need")
    )

def create_new_itinerary(session, start_date, end_date, current_user):
    itinerary = Itinerary(
        name="", 
        created_at=datetime.now(), 
        start_date=datetime.strptime(start_date, "%Y-%m-%d"), 
        end_date=datetime.strptime(end_date, "%Y-%m-%d"), 
        user_id=current_user
    )
    session.add(itinerary)
    session.commit()
    return itinerary

def calculate_trip_duration(start_date, end_date):
    return (datetime.strptime(end_date, "%Y-%m-%d") - datetime.strptime(start_date, "%Y-%m-%d")).days + 1

def query_food_options(session, city, food_budget, is_veg, accessibility_needed, food_cuisines):
    foodOptions = []
    for day in range(7):
        statement = select(
            FoodOption, FoodOptionAvailability
        ).join(
            FoodOption.availabilities
        ).where(
            (FoodOptionAvailability.day_of_week == day) & 
            (FoodOption.city_id == city) &
            (FoodOptionAvailability.close_time > FoodOptionAvailability.open_time) &
            (FoodOption.budget_category <= food_budget) &
            (or_(is_veg == False, FoodOption.is_vegetarian == True)) &
            (or_(accessibility_needed == False, FoodOption.wheelchair_accessibility == True))
        ).order_by(
            desc(
                case(
                    (FoodOption.cuisine_id.in_(food_cuisines), FoodOption.popularity + 3),
                    else_ = FoodOption.popularity
                )
            )
        )

        optThatDay = []
        for obj in session.execute(statement):
            opt = obj.FoodOption.to_dict()
            opt2 = obj.FoodOptionAvailability.to_dict()
            opt2.update(opt)
            optThatDay.append(opt2)
        
        foodOptions.append(optThatDay)
    return foodOptions

def create_meal_plans(food_options, start_date, no_of_days):
    allForThisTripUnsorted = []
    foodSelectsId = {}
    for i in range(no_of_days):
        delta = timedelta(days=i)
        currDate = datetime.strptime(start_date, "%Y-%m-%d") + delta

        b, l, d = None, None, None

        for option in food_options[int(currDate.strftime("%w"))]:
            if b and l and d:
                break
            if not foodSelectsId.get(option.get('id')):
                if not b and option.get('has_breakfast') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 540 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 600:
                    b = option
                    foodSelectsId[option.get('id')] = True
                elif not l and option.get('has_lunch') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 780 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 840:
                    l = option
                    foodSelectsId[option.get('id')] = True
                elif not d and option.get('has_dinner') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 1260 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 1320:
                    d = option
                    foodSelectsId[option.get('id')] = True
        
        if not b or not l or not d:
            foodSelectsId.clear()
            for option in food_options[int(currDate.strftime("%w"))]:
                if b and l and d:
                    break
                if not foodSelectsId.get(option.get('id')):
                    if not b and option.get('has_breakfast') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 540 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 600:
                        b = option
                        foodSelectsId[option.get('id')] = True
                    elif not l and option.get('has_lunch') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 780 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 840:
                        l = option
                        foodSelectsId[option.get('id')] = True
                    elif not d and option.get('has_dinner') and time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= 1260 and time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute >= 1320:
                        d = option
                        foodSelectsId[option.get('id')] = True

        allForThisTripUnsorted.append([
            {**b, "startTime": time(hour=9).strftime("%H:%M"), "endTime": time(hour=10).strftime("%H:%M"), "expense": b.get("average_price"), "type": "food"},
            {**l, "startTime": time(hour=13).strftime("%H:%M"), "endTime": time(hour=14).strftime("%H:%M"), "expense": l.get("average_price"), "type": "food"},
            {**d, "startTime": time(hour=21).strftime("%H:%M"), "endTime": time(hour=22).strftime("%H:%M"), "expense": d.get("average_price"), "type": "food"},
        ])

    return allForThisTripUnsorted

def query_activity_options(session, city, activity_budget, accessibility_needed, activity_categories):
    activityOptions = []
    for day in range(7):
        statement = select(
            Activity, ActivityAvailability
        ).join(
            Activity.availabilities
        ).join(
            Activity.city
        ).where(
            (ActivityAvailability.day_of_week == day) & 
            (Activity.city_id == city) &
            (ActivityAvailability.close_time > ActivityAvailability.open_time) &
            (Activity.budget_category <= activity_budget) &
            (or_(accessibility_needed == False, Activity.wheelchair_accessibility == True))
        ).order_by(
            desc(
                case(
                    (Activity.category_id.in_(activity_categories), Activity.popularity + 3),
                    else_ = Activity.popularity
                )
            )
        )

        optThatDay = [] 
        for obj in session.execute(statement):
            opt = obj.Activity.to_dict()
            opt2 = obj.ActivityAvailability.to_dict()
            opt2.update(opt)
            optThatDay.append(opt2)
        
        activityOptions.append(optThatDay)
    return activityOptions

def assign_activities(meal_plans, activity_options, start_date, no_of_days):
    allForThisTrip = []
    activitySelectsId = {}

    for i in range(no_of_days):
        delta = timedelta(days=i)
        currDate = datetime.strptime(start_date, "%Y-%m-%d") + delta

        currEnd = 600  # Start after breakfast

        for option in activity_options[int(currDate.strftime("%w"))]:
            if not activitySelectsId.get(option.get('id')):
                if time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= currEnd and min(time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute, 780) >= currEnd + option.get("average_duration"):
                    meal_plans[i].append({
                        **option,
                        "startTime": time(hour=int(currEnd/60), minute=int(currEnd%60)).strftime("%H:%M"),
                        "endTime": time(hour=int((currEnd+option.get("average_duration"))/60), minute=int((currEnd+option.get("average_duration"))%60)).strftime("%H:%M"),
                        "expense": option.get("average_price"),
                        "type": "activity"
                    })
                    currEnd += option.get("average_duration")
                    activitySelectsId[option.get('id')] = True

        currEnd = 840  # Start after lunch 

        for option in activity_options[int(currDate.strftime("%w"))]:
            if not activitySelectsId.get(option.get('id')):
                if time.fromisoformat(option.get('open_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute <= currEnd and min(time.fromisoformat(option.get('close_time')).hour * 60 + time.fromisoformat(option.get('open_time')).minute, 1260) >= currEnd + option.get("average_duration"):
                    meal_plans[i].append({
                        **option,
                        "startTime": time(hour=int(currEnd/60), minute=int(currEnd%60)).strftime("%H:%M"),
                        "endTime": time(hour=int((currEnd+option.get("average_duration"))/60), minute=int((currEnd+option.get("average_duration"))%60)).strftime("%H:%M"),
                        "expense": option.get("average_price"),
                        "type": "activity"
                    })
                    currEnd += option.get("average_duration")
                    activitySelectsId[option.get('id')] = True

        allForThisTrip.append(sorted(meal_plans[i], key=cmp_to_key(lambda item1, item2: 
            (datetime.strptime(item1.get('startTime'), "%H:%M") - datetime.strptime(item2.get('startTime'), "%H:%M")).total_seconds()
        )))

    return allForThisTrip

def save_itinerary_to_db(engine, itinerary_id, full_itinerary):
    with engine.connect() as conn:
        for i, day_itinerary in enumerate(full_itinerary):
            for obj in day_itinerary:
                if obj.get('type') == 'activity':
                    statement = insert(ItineraryActivity).values(
                        itinerary_id=itinerary_id,
                        activity_id=obj.get('id'),
                        day=i,
                        start_time=datetime.strptime(obj.get('startTime'), "%H:%M"),
                        duration=obj.get('average_duration')
                    )
                    conn.execute(statement)
                elif obj.get('type') == 'food':
                    statement = insert(ItineraryFood).values(
                        itinerary_id=itinerary_id,
                        food_option_id=obj.get('id'),
                        day=i,
                        start_time=datetime.strptime(obj.get('startTime'), "%H:%M"),
                        duration=60
                    )
                    conn.execute(statement)
            conn.commit()

def get_itineraries_by_user(current_user):
    with Session(engine) as session:
        statement = select(Itinerary).where(Itinerary.user_id == current_user)

        results= []

        for obj in session.execute(statement):
            results.append(obj.Itinerary.to_dict())

        return results