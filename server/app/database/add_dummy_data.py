from app.database.models import Base, City, Category, Cuisine, Activity, ActivityAvailability, FoodOption, FoodOptionAvailability
from sqlalchemy.orm import Session
from app.database.db import engine
from datetime import time

def fill_dummy_data():

    session = Session(engine)

    city = City(id=1, name="Bhopal", country="India")

    session.add(city)

    categories = [
        Category(id=1, name="Historical"),
        Category(id=2, name="Nature"),
        Category(id=3, name="Religious"),
        Category(id=4, name="Cultural"),
        Category(id=5, name="Adventure"),
    ]

    session.add_all(categories)

    cuisines = [
        Cuisine(id=1, name="Indian"),
        Cuisine(id=2, name="Mughlai"),
        Cuisine(id=3, name="Street Food"),
        Cuisine(id=4, name="Continental"),
        Cuisine(id=5, name="Chinese"),
    ]

    session.add_all(cuisines)
        
    activities = [
        Activity(id=1, name="Upper Lake Boating", description="Enjoy a serene boat ride on Bhopal's Upper Lake, also known as Bhojtal. It's the largest man-made lake in Asia and offers beautiful views of the city.", category_id=2, average_price=200, popularity=9, city_id=1, wheelchair_accessibility=True, average_duration=120, budget_category=1, image_url="upper_lake.jpg", latitude=23.2599, longitude=77.3256),
        Activity(id=2, name="Taj-ul-Masajid Visit", description="Explore one of the largest mosques in India. Taj-ul-Masajid, meaning 'Crown of Mosques', is known for its stunning pink facade and spacious courtyard.", category_id=3, average_price=0, popularity=8, city_id=1, wheelchair_accessibility=True, average_duration=90, budget_category=1, image_url="taj_ul_masajid.jpg", latitude=23.2634, longitude=77.4029),
        Activity(id=3, name="Bharat Bhavan Tour", description="Visit this multi-art center showcasing the rich tapestry of Indian arts. It houses a museum of folk and tribal art, an art gallery, and theaters.", category_id=4, average_price=100, popularity=7, city_id=1, wheelchair_accessibility=True, average_duration=150, budget_category=1, image_url="bharat_bhavan.jpg", latitude=23.2505, longitude=77.3910),
        Activity(id=4, name="Van Vihar National Park Safari", description="Embark on a wildlife safari in this unique national park that's also a zoological space. Spot various animals including tigers, lions, and bears.", category_id=2, average_price=500, popularity=9, city_id=1, wheelchair_accessibility=False, average_duration=180, budget_category=2, image_url="van_vihar.jpg", latitude=23.2334, longitude=77.3647),
        Activity(id=5, name="Madhya Pradesh Tribal Museum Visit", description="Discover the rich tribal heritage of Madhya Pradesh through this museum's innovative displays and life-size recreations of tribal habitats.", category_id=4, average_price=150, popularity=6, city_id=1, wheelchair_accessibility=True, average_duration=120, budget_category=1, image_url="tribal_museum.jpg", latitude=23.2331, longitude=77.4343),
        Activity(id=6, name="Sanchi Stupa Excursion", description="Take a day trip to the UNESCO World Heritage site of Sanchi. Explore the ancient Buddhist monuments, including the Great Stupa built by Emperor Ashoka.", category_id=1, average_price=1000, popularity=8, city_id=1, wheelchair_accessibility=False, average_duration=300, budget_category=3, image_url="sanchi_stupa.jpg", latitude=23.4795, longitude=77.7388),
        Activity(id=7, name="Indira Gandhi Rashtriya Manav Sangrahalaya", description="Visit this national museum of humankind which presents an integrated story of the evolution of man and culture with a focus on Indian civilization.", category_id=4, average_price=100, popularity=7, city_id=1, wheelchair_accessibility=True, average_duration=180, budget_category=1, image_url="manav_sangrahalaya.jpg", latitude=23.2023, longitude=77.3764),
        Activity(id=8, name="Birla Temple Visit", description="Explore this modern Hindu temple dedicated to Laxminarayan. Known for its stunning architecture, it offers panoramic views of the city.", category_id=3, average_price=0, popularity=7, city_id=1, wheelchair_accessibility=True, average_duration=60, budget_category=1, image_url="birla_temple.jpg", latitude=23.2330, longitude=77.4043),
        Activity(id=9, name="DB City Mall Shopping", description="Indulge in some retail therapy at Bhopal's largest mall. With a mix of international and Indian brands, it's a shopper's paradise.", category_id=4, average_price=1000, popularity=8, city_id=1, wheelchair_accessibility=True, average_duration=180, budget_category=2, image_url="db_city_mall.jpg", latitude=23.2316, longitude=77.4339),
        Activity(id=10, name="Bhopal Lake Tour", description="Take a guided tour around Bhopal's famous lakes. Learn about the city's history and its intricate system of man-made lakes.", category_id=2, average_price=300, popularity=7, city_id=1, wheelchair_accessibility=True, average_duration=120, budget_category=1, image_url="bhopal_lake.jpg", latitude=23.2599, longitude=77.3256),
        Activity(id=11, name="Rock Climbing at Khanugaon", description="Challenge yourself with rock climbing at Khanugaon. Suitable for beginners and experienced climbers alike, with stunning views of the surrounding landscape.", category_id=5, average_price=800, popularity=6, city_id=1, wheelchair_accessibility=False, average_duration=240, budget_category=2, image_url="rock_climbing.jpg", latitude=23.2001, longitude=77.4034),
        Activity(id=12, name="State Museum of Madhya Pradesh", description="Explore the rich history and culture of Madhya Pradesh through a vast collection of sculptures, paintings, and artifacts dating back to prehistoric times.", category_id=1, average_price=50, popularity=6, city_id=1, wheelchair_accessibility=True, average_duration=120, budget_category=1, image_url="state_museum.jpg", latitude=23.2336, longitude=77.4027),
        Activity(id=13, name="Gohar Mahal Heritage Walk", description="Take a guided walk through Gohar Mahal, a beautiful palace built by the first woman ruler of Bhopal. Learn about the city's nawabi heritage.", category_id=1, average_price=200, popularity=7, city_id=1, wheelchair_accessibility=False, average_duration=90, budget_category=1, image_url="gohar_mahal.jpg", latitude=23.2497, longitude=77.4143),
        Activity(id=14, name="Sair Sapata Entertainment Zone", description="Enjoy a day of fun at this waterfront entertainment complex. With activities for all ages, it's perfect for families and groups.", category_id=4, average_price=500, popularity=8, city_id=1, wheelchair_accessibility=True, average_duration=180, budget_category=2, image_url="sair_sapata.jpg", latitude=23.2478, longitude=77.3922),
        Activity(id=15, name="Kerwa Dam Picnic", description="Escape the city bustle with a picnic at Kerwa Dam. Enjoy the serene surroundings, go for a nature walk, or try some water activities.", category_id=2, average_price=100, popularity=7, city_id=1, wheelchair_accessibility=False, average_duration=240, budget_category=1, image_url="kerwa_dam.jpg", latitude=23.1844, longitude=77.3190),
    ]

    session.add_all(activities)

    food_options = [
        FoodOption(id=1, name="Manohar Dairy", description="Famous for sweets and snacks", average_price=200, popularity=9, city_id=1, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=True, latitude=23.2537, longitude=77.4011),
        FoodOption(id=2, name="Bapu Ki Kutia", description="Traditional Madhya Pradesh thali", average_price=300, popularity=8, city_id=1, cuisine_id=1, wheelchair_accessibility=True, budget_category=2, is_vegetarian=True, latitude=23.2331, longitude=77.4311),
        FoodOption(id=3, name="Under The Mango Tree", description="Continental cuisine", average_price=800, popularity=7, city_id=1, cuisine_id=4, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=23.2336, longitude=77.4018),
        FoodOption(id=4, name="Zam Zam Fast Food", description="Popular street food joint", average_price=100, popularity=8, city_id=1, cuisine_id=3, wheelchair_accessibility=False, budget_category=1, is_vegetarian=False, latitude=23.2621, longitude=77.3873),
        FoodOption(id=5, name="Jehan Numa Palace Restaurant", description="Fine dining experience", average_price=1500, popularity=9, city_id=1, cuisine_id=2, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=23.2478, longitude=77.3922),
        FoodOption(id=6, name="New Yorker", description="American-style fast food", average_price=400, popularity=7, city_id=1, cuisine_id=4, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=23.2331, longitude=77.4343),
        FoodOption(id=7, name="Sharma Chat House", description="Famous for chaat and snacks", average_price=150, popularity=8, city_id=1, cuisine_id=3, wheelchair_accessibility=False, budget_category=1, is_vegetarian=True, latitude=23.2505, longitude=77.3910),
        FoodOption(id=8, name="Wind & Waves", description="Rooftop restaurant with lake view", average_price=600, popularity=8, city_id=1, cuisine_id=1, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=23.2599, longitude=77.3256),
        FoodOption(id=9, name="Bhopal Express", description="Railway-themed restaurant", average_price=500, popularity=7, city_id=1, cuisine_id=1, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=23.2330, longitude=77.4043),
        FoodOption(id=10, name="Lazeez Hakeem", description="Famous for Mughlai cuisine", average_price=400, popularity=8, city_id=1, cuisine_id=2, wheelchair_accessibility=False, budget_category=2, is_vegetarian=False, latitude=23.2634, longitude=77.4029),
        FoodOption(id=11, name="Filfora", description="Chinese and Thai cuisine", average_price=600, popularity=7, city_id=1, cuisine_id=5, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=23.2316, longitude=77.4339),
        FoodOption(id=12, name="Rajhans Restaurant", description="Traditional vegetarian thali", average_price=250, popularity=7, city_id=1, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=True, latitude=23.2336, longitude=77.4027),
        FoodOption(id=13, name="Cakes n Bakes", description="Popular bakery and cafe", average_price=300, popularity=8, city_id=1, cuisine_id=4, wheelchair_accessibility=True, budget_category=2, is_vegetarian=True, latitude=23.2331, longitude=77.4311),
        FoodOption(id=14, name="Dal Bafla Restaurant", description="Famous for MP's special Dal Bafla", average_price=200, popularity=9, city_id=1, cuisine_id=1, wheelchair_accessibility=False, budget_category=1, is_vegetarian=True, latitude=23.2497, longitude=77.4143),
        FoodOption(id=15, name="Sagar Gaire", description="South Indian cuisine", average_price=250, popularity=8, city_id=1, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=True, latitude=23.2331, longitude=77.4343),
    ]

    session.add_all(food_options)

    activity_availability = []
    activity_id = 1

    for _ in range(15): 
        for day in range(7): 
            if activity_id in [6, 11, 15]: 
                open_time = time(8, 0)
                close_time = time(17, 0)
            elif activity_id in [9, 14]:  
                open_time = time(10, 0)
                close_time = time(22, 0)
            else:
                open_time = time(9, 0)
                close_time = time(18, 0)
            
            activity_availability.append(
                ActivityAvailability(
                    id=len(activity_availability) + 1,
                    activity_id=activity_id,
                    day_of_week=day,
                    open_time=open_time,
                    close_time=close_time
                )
            )
        activity_id += 1

    session.add_all(activity_availability)

    food_option_availability = []
    food_option_id = 1

    for _ in range(15):  
        for day in range(7):  
            if food_option_id in [1, 2, 7, 12, 14, 15]:
                open_time = time(7, 0)
                close_time = time(22, 0)
                has_breakfast = True
                has_lunch = True
                has_dinner = True
            elif food_option_id in [3, 5, 8]:
                open_time = time(12, 0)
                close_time = time(23, 0)
                has_breakfast = False
                has_lunch = True
                has_dinner = True
            elif food_option_id in [4, 10]: 
                open_time = time(16, 0)
                close_time = time(1, 0)
                has_breakfast = False
                has_lunch = False
                has_dinner = True
            else:  
                open_time = time(11, 0)
                close_time = time(22, 30)
                has_breakfast = False
                has_lunch = True
                has_dinner = True
            
            food_option_availability.append(
                FoodOptionAvailability(
                    id=len(food_option_availability) + 1,
                    food_option_id=food_option_id,
                    day_of_week=day,
                    open_time=open_time,
                    close_time=close_time,
                    has_breakfast=has_breakfast,
                    has_lunch=has_lunch,
                    has_dinner=has_dinner
                )
            )
        food_option_id += 1

    session.add_all(food_option_availability)

    session.commit()
    session.close()