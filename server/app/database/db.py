from sqlalchemy import create_engine
from flask import g, current_app
from werkzeug.local import LocalProxy
from app.database.models import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask import g, current_app
from werkzeug.local import LocalProxy
from .models import Base

def get_engine():
    if 'engine' not in g:
        g.engine = create_engine(current_app.config['DB_URL'], echo=True)
        Base.metadata.create_all(g.engine)
    return g.engine

engine = LocalProxy(get_engine)

def get_session():
    if 'session' not in g:
        g.session = sessionmaker(bind=engine)()
    return g.session

session = LocalProxy(get_session)