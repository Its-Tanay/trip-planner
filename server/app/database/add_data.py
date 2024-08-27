from app.database.models import Base, City, Category, Cuisine, Activity, ActivityAvailability, FoodOption, FoodOptionAvailability
from sqlalchemy.orm import Session
from app.database.db import engine
from datetime import time

def fill_dummy_data():
    session = Session(engine)

    mumbai = City(id=2, name="Mumbai", country="India")
    delhi = City(id=3, name="Delhi", country="India")

    session.add_all([mumbai, delhi])

    mumbai_activities = [
        Activity(id=16, name="Gateway of India Visit", description="Iconic monument overlooking the Arabian Sea", category_id=1, average_price=0, popularity=9, city_id=2, wheelchair_accessibility=True, average_duration=60, budget_category=1, image_url="gateway_of_india.jpg", latitude=18.9220, longitude=72.8347),
        Activity(id=17, name="Elephanta Caves Tour", description="UNESCO World Heritage Site with ancient cave temples", category_id=1, average_price=800, popularity=8, city_id=2, wheelchair_accessibility=False, average_duration=240, budget_category=2, image_url="elephanta_caves.jpg", latitude=18.9633, longitude=72.9315),
        Activity(id=18, name="Bollywood Studio Tour", description="Behind-the-scenes look at India's film industry", category_id=4, average_price=1500, popularity=7, city_id=2, wheelchair_accessibility=True, average_duration=180, budget_category=3, image_url="bollywood_tour.jpg", latitude=19.1542, longitude=72.8384),
        Activity(id=19, name="Marine Drive Stroll", description="Scenic promenade along the Arabian Sea", category_id=2, average_price=0, popularity=9, city_id=2, wheelchair_accessibility=True, average_duration=90, budget_category=1, image_url="marine_drive.jpg", latitude=18.9432, longitude=72.8237),
        Activity(id=20, name="Sanjay Gandhi National Park Safari", description="Wildlife sanctuary in the heart of Mumbai", category_id=2, average_price=600, popularity=7, city_id=2, wheelchair_accessibility=False, average_duration=180, budget_category=2, image_url="sgnp_safari.jpg", latitude=19.2147, longitude=72.9106),
        Activity(id=21, name="Chhatrapati Shivaji Terminus Visit", description="Historic railway station and UNESCO World Heritage Site", category_id=1, average_price=0, popularity=8, city_id=2, wheelchair_accessibility=True, average_duration=60, budget_category=1, image_url="cst.jpg", latitude=18.9403, longitude=72.8351),
        Activity(id=22, name="Juhu Beach Experience", description="Popular beach known for street food and entertainment", category_id=2, average_price=200, popularity=8, city_id=2, wheelchair_accessibility=True, average_duration=120, budget_category=1, image_url="juhu_beach.jpg", latitude=19.0948, longitude=72.8258),
        Activity(id=23, name="Dharavi Slum Tour", description="Insightful tour of Asia's largest slum", category_id=4, average_price=1000, popularity=7, city_id=2, wheelchair_accessibility=False, average_duration=180, budget_category=2, image_url="dharavi_tour.jpg", latitude=19.0433, longitude=72.8526),
        Activity(id=24, name="Haji Ali Dargah Visit", description="Iconic mosque and tomb on an islet", category_id=3, average_price=0, popularity=7, city_id=2, wheelchair_accessibility=False, average_duration=90, budget_category=1, image_url="haji_ali.jpg", latitude=18.9827, longitude=72.8090),
        Activity(id=25, name="Colaba Causeway Shopping", description="Bustling street market for shopping and food", category_id=4, average_price=500, popularity=8, city_id=2, wheelchair_accessibility=True, average_duration=120, budget_category=2, image_url="colaba_causeway.jpg", latitude=18.9201, longitude=72.8311),
        Activity(id=26, name="Siddhivinayak Temple Darshan", description="Famous Hindu temple dedicated to Lord Ganesha", category_id=3, average_price=0, popularity=8, city_id=2, wheelchair_accessibility=True, average_duration=60, budget_category=1, image_url="siddhivinayak.jpg", latitude=19.0168, longitude=72.8302),
        Activity(id=27, name="Bandra-Worli Sea Link Drive", description="Scenic drive on the iconic cable-stayed bridge", category_id=2, average_price=100, popularity=7, city_id=2, wheelchair_accessibility=True, average_duration=30, budget_category=1, image_url="sea_link.jpg", latitude=19.0282, longitude=72.8151),
        Activity(id=28, name="Kanheri Caves Exploration", description="Ancient Buddhist caves in Sanjay Gandhi National Park", category_id=1, average_price=400, popularity=6, city_id=2, wheelchair_accessibility=False, average_duration=180, budget_category=2, image_url="kanheri_caves.jpg", latitude=19.2089, longitude=72.9076),
        Activity(id=29, name="Mahalaxmi Dhobi Ghat Visit", description="Open-air laundromat, a unique Mumbai attraction", category_id=4, average_price=0, popularity=6, city_id=2, wheelchair_accessibility=False, average_duration=60, budget_category=1, image_url="dhobi_ghat.jpg", latitude=18.9863, longitude=72.8256),
        Activity(id=30, name="EsselWorld Amusement Park", description="Thrilling rides and entertainment for all ages", category_id=5, average_price=1200, popularity=7, city_id=2, wheelchair_accessibility=True, average_duration=300, budget_category=3, image_url="esselworld.jpg", latitude=19.2385, longitude=72.8021),
    ]

    delhi_activities = [
        Activity(id=31, name="Red Fort Tour", description="UNESCO World Heritage Site and symbol of India", category_id=1, average_price=500, popularity=9, city_id=3, wheelchair_accessibility=True, average_duration=150, budget_category=2, image_url="red_fort.jpg", latitude=28.6562, longitude=77.2410),
        Activity(id=32, name="Qutub Minar Visit", description="Tallest brick minaret in the world", category_id=1, average_price=300, popularity=8, city_id=3, wheelchair_accessibility=False, average_duration=90, budget_category=1, image_url="qutub_minar.jpg", latitude=28.5245, longitude=77.1855),
        Activity(id=33, name="Lotus Temple Meditation", description="Bahai House of Worship known for its flower-like shape", category_id=3, average_price=0, popularity=7, city_id=3, wheelchair_accessibility=True, average_duration=60, budget_category=1, image_url="lotus_temple.jpg", latitude=28.5535, longitude=77.2588),
        Activity(id=34, name="Chandni Chowk Food Walk", description="Culinary tour of Old Delhi's famous market", category_id=4, average_price=1000, popularity=8, city_id=3, wheelchair_accessibility=False, average_duration=180, budget_category=2, image_url="chandni_chowk.jpg", latitude=28.6506, longitude=77.2311),
        Activity(id=35, name="India Gate Visit", description="War memorial in the heart of New Delhi", category_id=1, average_price=0, popularity=9, city_id=3, wheelchair_accessibility=True, average_duration=60, budget_category=1, image_url="india_gate.jpg", latitude=28.6129, longitude=77.2295),
        Activity(id=36, name="Humayun's Tomb Exploration", description="UNESCO World Heritage Site, inspiration for Taj Mahal", category_id=1, average_price=500, popularity=8, city_id=3, wheelchair_accessibility=True, average_duration=120, budget_category=2, image_url="humayun_tomb.jpg", latitude=28.5933, longitude=77.2507),
        Activity(id=37, name="Akshardham Temple Visit", description="Sprawling Hindu temple complex with exhibitions", category_id=3, average_price=200, popularity=8, city_id=3, wheelchair_accessibility=True, average_duration=180, budget_category=1, image_url="akshardham.jpg", latitude=28.6127, longitude=77.2773),
        Activity(id=38, name="Lodhi Garden Walk", description="Historic park containing architectural works of Lodhi dynasty", category_id=2, average_price=0, popularity=7, city_id=3, wheelchair_accessibility=True, average_duration=90, budget_category=1, image_url="lodhi_garden.jpg", latitude=28.5933, longitude=77.2209),
        Activity(id=39, name="National Museum Tour", description="Largest museum in India with diverse collections", category_id=4, average_price=300, popularity=7, city_id=3, wheelchair_accessibility=True, average_duration=150, budget_category=1, image_url="national_museum.jpg", latitude=28.6117, longitude=77.2194),
        Activity(id=40, name="Jama Masjid Visit", description="One of the largest mosques in India", category_id=3, average_price=0, popularity=8, city_id=3, wheelchair_accessibility=False, average_duration=60, budget_category=1, image_url="jama_masjid.jpg", latitude=28.6507, longitude=77.2334),
        Activity(id=41, name="Hauz Khas Complex Exploration", description="Medieval Islamic complex with lake and deer park", category_id=1, average_price=0, popularity=7, city_id=3, wheelchair_accessibility=False, average_duration=120, budget_category=1, image_url="hauz_khas.jpg", latitude=28.5475, longitude=77.1920),
        Activity(id=42, name="Dilli Haat Shopping", description="Open-air food plaza and craft bazaar", category_id=4, average_price=500, popularity=8, city_id=3, wheelchair_accessibility=True, average_duration=150, budget_category=2, image_url="dilli_haat.jpg", latitude=28.5723, longitude=77.2080),
        Activity(id=43, name="Jantar Mantar Visit", description="18th-century astronomical observation site", category_id=1, average_price=200, popularity=6, city_id=3, wheelchair_accessibility=True, average_duration=60, budget_category=1, image_url="jantar_mantar.jpg", latitude=28.6270, longitude=77.2168),
        Activity(id=44, name="National Zoological Park Tour", description="Sprawling zoo with diverse wildlife", category_id=2, average_price=400, popularity=7, city_id=3, wheelchair_accessibility=True, average_duration=180, budget_category=2, image_url="delhi_zoo.jpg", latitude=28.6078, longitude=77.2461),
        Activity(id=45, name="Rashtrapati Bhavan Museum Complex", description="Museum complex in the President's Estate", category_id=4, average_price=600, popularity=6, city_id=3, wheelchair_accessibility=True, average_duration=120, budget_category=2, image_url="rashtrapati_bhavan.jpg", latitude=28.6144, longitude=77.1996),
    ]

    session.add_all(mumbai_activities + delhi_activities)

    mumbai_food_options = [
        FoodOption(id=16, name="Leopold Cafe", description="Historic cafe and restaurant", average_price=600, popularity=8, city_id=2, cuisine_id=4, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=18.9226, longitude=72.8317),
        FoodOption(id=17, name="Trishna", description="Famous for seafood", average_price=1000, popularity=9, city_id=2, cuisine_id=1, wheelchair_accessibility=False, budget_category=3, is_vegetarian=False, latitude=18.9321, longitude=72.8328),
        FoodOption(id=18, name="Bademiya", description="Iconic street food", average_price=200, popularity=8, city_id=2, cuisine_id=3, wheelchair_accessibility=False, budget_category=1, is_vegetarian=False, latitude=18.9252, longitude=72.8293),
        FoodOption(id=19, name="Cafe Mondegar", description="Popular cafe with quirky decor", average_price=500, popularity=7, city_id=2, cuisine_id=4, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=18.9224, longitude=72.8319),
        FoodOption(id=20, name="Swati Snacks", description="Traditional Gujarati and Mumbai street food", average_price=300, popularity=8, city_id=2, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=True, latitude=18.9603, longitude=72.8095),
        FoodOption(id=21, name="Britannia & Co.", description="Parsi cuisine restaurant", average_price=500, popularity=8, city_id=2, cuisine_id=1, wheelchair_accessibility=False, budget_category=2, is_vegetarian=False, latitude=18.9430, longitude=72.8361),
        FoodOption(id=22, name="Taj Mahal Palace Sea Lounge", description="High-end dining with sea view", average_price=2000, popularity=9, city_id=2, cuisine_id=4, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=18.9220, longitude=72.8332),
        FoodOption(id=23, name="Sardar Pav Bhaji", description="Famous for pav bhaji", average_price=150, popularity=8, city_id=2, cuisine_id=3, wheelchair_accessibility=False, budget_category=1, is_vegetarian=True, latitude=18.9438, longitude=72.8246),
        FoodOption(id=24, name="The Table", description="Modern European cuisine", average_price=1500, popularity=8, city_id=2, cuisine_id=4, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=18.9223, longitude=72.8314),
        FoodOption(id=25, name="Chowpatty Beach Food Stalls", description="Various street food options", average_price=100, popularity=7, city_id=2, cuisine_id=3, wheelchair_accessibility=False, budget_category=1, is_vegetarian=True, latitude=18.9548, longitude=72.8147),
        FoodOption(id=26, name="Masala Library", description="Modern Indian cuisine", average_price=1800, popularity=8, city_id=2, cuisine_id=1, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=19.0176, longitude=72.8561),
        FoodOption(id=27, name="Kyani & Co.", description="Iconic Irani cafe", average_price=250, popularity=7, city_id=2, cuisine_id=4, wheelchair_accessibility=False, budget_category=1, is_vegetarian=False, latitude=18.9434, longitude=72.8324),
        FoodOption(id=28, name="Shree Thaker Bhojanalay", description="Traditional Gujarati thali", average_price=400, popularity=8, city_id=2, cuisine_id=1, wheelchair_accessibility=True, budget_category=2, is_vegetarian=True, latitude=18.9561, longitude=72.8113),
        FoodOption(id=29, name="Wasabi by Morimoto", description="High-end Japanese cuisine", average_price=3000, popularity=9, city_id=2, cuisine_id=5, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=18.9219, longitude=72.8330),
        FoodOption(id=30, name="Aaswad", description="Authentic Maharashtrian cuisine", average_price=300, popularity=7, city_id=2, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=True, latitude=19.0167, longitude=72.8413),
    ]

    delhi_food_options = [
        FoodOption(id=31, name="Karim's", description="Famous for Mughlai cuisine", average_price=400, popularity=9, city_id=3, cuisine_id=2, wheelchair_accessibility=False, budget_category=2, is_vegetarian=False, latitude=28.6506, longitude=77.2337),
        FoodOption(id=32, name="Indian Accent", description="Modern Indian cuisine", average_price=2000, popularity=8, city_id=3, cuisine_id=1, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=28.5931, longitude=77.2217),
        FoodOption(id=33, name="Paranthe Wali Gali", description="Famous for variety of parathas", average_price=150, popularity=8, city_id=3, cuisine_id=3, wheelchair_accessibility=False, budget_category=1, is_vegetarian=True, latitude=28.6564, longitude=77.2297),
        FoodOption(id=34, name="Bukhara", description="North Indian and frontier cuisine", average_price=1500, popularity=9, city_id=3, cuisine_id=1, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=28.6014, longitude=77.2085),
        FoodOption(id=35, name="Saravana Bhavan", description="South Indian vegetarian cuisine", average_price=300, popularity=7, city_id=3, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=True, latitude=28.6329, longitude=77.2196),
        FoodOption(id=36, name="Moti Mahal", description="Birthplace of butter chicken", average_price=600, popularity=8, city_id=3, cuisine_id=1, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=28.6396, longitude=77.2150),
        FoodOption(id=37, name="Dilli Haat Food Court", description="Various regional cuisines", average_price=250, popularity=7, city_id=3, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=False, latitude=28.5723, longitude=77.2080),
        FoodOption(id=38, name="Nathu's Sweets", description="Famous for sweets and snacks", average_price=200, popularity=8, city_id=3, cuisine_id=3, wheelchair_accessibility=True, budget_category=1, is_vegetarian=True, latitude=28.5689, longitude=77.2274),
        FoodOption(id=39, name="The Big Chill Cafe", description="Popular for desserts and continental food", average_price=700, popularity=8, city_id=3, cuisine_id=4, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=28.5552, longitude=77.2058),
        FoodOption(id=40, name="Khan Chacha", description="Famous for kebabs and rolls", average_price=300, popularity=7, city_id=3, cuisine_id=2, wheelchair_accessibility=False, budget_category=1, is_vegetarian=False, latitude=28.6314, longitude=77.2252),
        FoodOption(id=41, name="Dum Pukht", description="Awadhi cuisine", average_price=2500, popularity=9, city_id=3, cuisine_id=1, wheelchair_accessibility=True, budget_category=3, is_vegetarian=False, latitude=28.6003, longitude=77.2142),
        FoodOption(id=42, name="Andhra Bhavan Canteen", description="Authentic Andhra cuisine", average_price=250, popularity=8, city_id=3, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=False, latitude=28.6205, longitude=77.2116),
        FoodOption(id=43, name="Haldiram's", description="Popular for Indian snacks and sweets", average_price=300, popularity=7, city_id=3, cuisine_id=1, wheelchair_accessibility=True, budget_category=1, is_vegetarian=True, latitude=28.6329, longitude=77.2195),
        FoodOption(id=44, name="Chungwa", description="Popular Chinese restaurant", average_price=800, popularity=7, city_id=3, cuisine_id=5, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=28.5672, longitude=77.2100),
        FoodOption(id=45, name="Diggin", description="Cozy cafe with Italian cuisine", average_price=600, popularity=8, city_id=3, cuisine_id=4, wheelchair_accessibility=True, budget_category=2, is_vegetarian=False, latitude=28.5552, longitude=77.2057),
    ]

    session.add_all(mumbai_food_options + delhi_food_options)

    activity_availability = []
    for activity_id in range(16, 46):
        for day in range(7):
            if activity_id in [17, 20, 28, 32, 37]:
                open_time = time(8, 0)
                close_time = time(17, 0)
            elif activity_id in [18, 23, 30, 34, 42]:
                open_time = time(10, 0)
                close_time = time(22, 0)
            else:
                open_time = time(9, 0)
                close_time = time(18, 0)
            
            activity_availability.append(
                ActivityAvailability(
                    id=len(activity_availability) + 1 + 105,
                    activity_id=activity_id,
                    day_of_week=day,
                    open_time=open_time,
                    close_time=close_time
                )
            )

    session.add_all(activity_availability)

    food_option_availability = []
    for food_option_id in range(16, 46):
        for day in range(7):
            if food_option_id in [18, 23, 25, 33, 37, 40]:
                open_time = time(11, 0)
                close_time = time(23, 59)
                has_breakfast = False
                has_lunch = True
                has_dinner = True
            elif food_option_id in [22, 24, 26, 29, 32, 34, 41]: 
                open_time = time(12, 0)
                close_time = time(23, 0)
                has_breakfast = False
                has_lunch = True
                has_dinner = True
            elif food_option_id in [16, 19, 27, 35, 38, 43]:
                open_time = time(8, 0)
                close_time = time(22, 0)
                has_breakfast = True
                has_lunch = True
                has_dinner = True
            else: 
                open_time = time(11, 0)
                close_time = time(22, 30)
                has_breakfast = False
                has_lunch = True
                has_dinner = True
            
            food_option_availability.append(
                FoodOptionAvailability(
                    id=len(food_option_availability) + 1 + 105,
                    food_option_id=food_option_id,
                    day_of_week=day,
                    open_time=open_time,
                    close_time=close_time,
                    has_breakfast=has_breakfast,
                    has_lunch=has_lunch,
                    has_dinner=has_dinner
                )
            )

    session.add_all(food_option_availability)

    session.commit()
    session.close()