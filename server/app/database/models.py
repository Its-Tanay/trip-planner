from datetime import datetime, time
from typing import List
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import ForeignKey
from sqlalchemy import Integer, DateTime, Table, Column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str] = mapped_column()

    itineraries: Mapped[List['Itinerary']] = relationship(back_populates='user')

class City(Base):
    __tablename__ = 'city'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    country: Mapped[str] = mapped_column()

    activities: Mapped[List['Activity']] = relationship(back_populates='city')
    food_options: Mapped[List['FoodOption']] = relationship(back_populates='city')
    # itineraries: Mapped[List['Itinerary']] = relationship(back_populates='city')

class Category(Base):
    __tablename__ = 'category'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()

    activities: Mapped[List['Activity']] = relationship(back_populates='category')

class Cuisine(Base):
    __tablename__ = 'cuisine'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()

    food_options: Mapped[List['FoodOption']] = relationship(back_populates='cuisine')

class Activity(Base):
    __tablename__ = 'activity'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    average_price: Mapped[float] = mapped_column()
    popularity: Mapped[int] = mapped_column()
    wheelchair_accessibility: Mapped[bool] = mapped_column()
    average_duration: Mapped[int] = mapped_column()
    budget_category: Mapped[int] = mapped_column()
    image_url: Mapped[str] = mapped_column(nullable=True)
    latitude: Mapped[float] = mapped_column(nullable=True)
    longitude: Mapped[float] = mapped_column(nullable=True)

    city_id: Mapped[int] = mapped_column(ForeignKey('city.id'))
    category_id: Mapped[int] = mapped_column(ForeignKey('category.id'))

    city: Mapped[City] = relationship(back_populates='activities')
    category: Mapped[Category] = relationship(back_populates='activities')
    availabilities: Mapped['ActivityAvailability'] = relationship()

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'average_price': self.average_price,
            'popularity': self.popularity,
            'wheelchair_accessibility': self.wheelchair_accessibility,
            'average_duration': self.average_duration,
            'budget_category': self.budget_category,
            'image_url': self.image_url,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'city_id': self.city_id,
            'category_id': self.category_id
        }

class ActivityAvailability(Base):
    __tablename__ = 'activity_availability'

    id: Mapped[int] = mapped_column(primary_key=True)
    activity_id: Mapped[int] = mapped_column(ForeignKey('activity.id'))

    day_of_week: Mapped[int] = mapped_column()
    open_time: Mapped[time] = mapped_column()
    close_time: Mapped[time] = mapped_column()

    def to_dict(self):
        return {
            'id': self.id,
            'activity_id': self.activity_id,
            'day_of_week': self.day_of_week,
            'open_time': self.open_time.isoformat() if self.open_time else None,
            'close_time': self.close_time.isoformat() if self.close_time else None
        }

class FoodOption(Base):
    __tablename__ = 'food_option'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    average_price: Mapped[float] = mapped_column()
    popularity: Mapped[int] = mapped_column()
    wheelchair_accessibility: Mapped[bool] = mapped_column()
    budget_category: Mapped[int] = mapped_column()
    is_vegetarian: Mapped[bool] = mapped_column()
    latitude: Mapped[float] = mapped_column(nullable=True)
    longitude: Mapped[float] = mapped_column(nullable=True)

    city_id: Mapped[int] = mapped_column(ForeignKey('city.id'))
    cuisine_id: Mapped[int] = mapped_column(ForeignKey('cuisine.id'))

    city: Mapped[City] = relationship(back_populates='food_options')
    cuisine: Mapped[Cuisine] = relationship(back_populates='food_options')
    availabilities: Mapped['FoodOptionAvailability'] = relationship()

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'average_price': self.average_price,
            'popularity': self.popularity,
            'wheelchair_accessibility': self.wheelchair_accessibility,
            'budget_category': self.budget_category,
            'is_vegetarian': self.is_vegetarian,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'city_id': self.city_id,
            'cuisine_id': self.cuisine_id
        }


class FoodOptionAvailability(Base):
    __tablename__ = 'food_option_availability'

    id: Mapped[int] = mapped_column(primary_key=True)
    food_option_id: Mapped[int] = mapped_column(ForeignKey('food_option.id'))

    day_of_week: Mapped[int] = mapped_column()
    open_time: Mapped[time] = mapped_column()
    close_time: Mapped[time] = mapped_column()
    has_breakfast: Mapped[bool] = mapped_column()
    has_lunch: Mapped[bool] = mapped_column()
    has_dinner: Mapped[bool] = mapped_column()

    def to_dict(self):
        return {
            'id': self.id,
            'food_option_id': self.food_option_id,
            'day_of_week': self.day_of_week,
            'open_time': self.open_time.isoformat() if self.open_time else None,
            'close_time': self.close_time.isoformat() if self.close_time else None,
            'has_breakfast': self.has_breakfast,
            'has_lunch': self.has_lunch,
            'has_dinner': self.has_dinner
        }

class Itinerary(Base):
    __tablename__ = 'itinerary'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    created_at: Mapped[datetime] = mapped_column()
    start_date: Mapped[datetime] = mapped_column()
    end_date: Mapped[datetime] = mapped_column()
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    city_id: Mapped[int] = mapped_column(ForeignKey('city.id'))

    user: Mapped[User] = relationship(back_populates='itineraries')
    city: Mapped[City] = relationship()
    activities: Mapped[List[Activity]] = relationship(secondary='itinerary_activity')
    food_options: Mapped[List[FoodOption]] = relationship(secondary='itinerary_food')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "user_id": self.user_id,
            "city_id": self.city_id
        }

ItineraryActivity = Table(
    'itinerary_activity',
    Base.metadata,
    Column('itinerary_id', Integer, ForeignKey('itinerary.id'), primary_key=True),
    Column('activity_id', Integer, ForeignKey('activity.id'), primary_key=True),
    Column('day', Integer, primary_key=True),
    Column('start_time', DateTime, primary_key=True),
    Column('duration', Integer)
)

ItineraryFood = Table(
    'itinerary_food',
    Base.metadata,
    Column('itinerary_id', Integer, ForeignKey('itinerary.id'), primary_key=True),
    Column('food_option_id', Integer, ForeignKey('food_option.id'), primary_key=True),
    Column('day', Integer, primary_key=True),
    Column('start_time', DateTime, primary_key=True),
    Column('duration', Integer)
)