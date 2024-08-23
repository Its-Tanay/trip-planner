from .models import Activity, FoodOption, ActivityAvailability, FoodOptionAvailability
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from datetime import datetime

def get_activities(session: Session, city_id: int, accessibility_need: bool, preferences: Dict[str, Any]) -> List[Activity]:
    query = session.query(Activity).filter(
        Activity.city_id == city_id,
        Activity.budget_category <= preferences['budget']
    )
    
    if accessibility_need:
        query = query.filter(Activity.wheelchair_accessibility == True)
    
    activities = query.all()
    return sorted(activities, key=lambda a: (
        a.popularity + 
        (10 if a.category_id in preferences['categories'] else 0)
    ), reverse=True)

def get_food_options(session: Session, city_id: int, accessibility_need: bool, preferences: Dict[str, Any]) -> List[FoodOption]:
    query = session.query(FoodOption).filter(
        FoodOption.city_id == city_id,
        FoodOption.budget_category <= preferences['budget']
    )
    
    if accessibility_need:
        query = query.filter(FoodOption.wheelchair_accessibility == True)
    
    if preferences['isVeg']:
        query = query.filter(FoodOption.is_vegetarian == True)
    
    food_options = query.all()
    return sorted(food_options, key=lambda f: (
        f.popularity + 
        (10 if f.cuisine_id in preferences['cuisines'] else 0)
    ), reverse=True)

def get_available_food(session: Session, food_options: List[FoodOption], index: int, day_of_week: int, current_time: datetime, is_breakfast: bool) -> FoodOption:
    for _ in range(len(food_options)):
        food = food_options[index]
        availability = session.query(FoodOptionAvailability).filter(
            FoodOptionAvailability.food_option_id == food.id,
            FoodOptionAvailability.day_of_week == day_of_week
        ).first()

        if availability and availability.open_time <= current_time.time() <= availability.close_time:
            if is_breakfast and availability.has_breakfast:
                return food
            elif not is_breakfast and (availability.has_lunch or availability.has_dinner):
                return food

        index = (index + 1) % len(food_options)

    return None

def get_available_activity(session: Session, activities: List[Activity], index: int, day_of_week: int, current_time: datetime) -> Activity:
    for _ in range(len(activities)):
        activity = activities[index]
        availability = session.query(ActivityAvailability).filter(
            ActivityAvailability.activity_id == activity.id,
            ActivityAvailability.day_of_week == day_of_week
        ).first()

        if availability and availability.open_time <= current_time.time() <= availability.close_time:
            return activity

        index = (index + 1) % len(activities)

    return None