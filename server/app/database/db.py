from sqlalchemy import create_engine
from flask import g
from werkzeug.local import LocalProxy
from app.database.models import Base

def get_engine():
    if 'engine' not in g:
        g.engine = create_engine(g.db_url, echo=True)
        Base.metadata.create_all(g.engine)

    return g.engine


engine = LocalProxy(get_engine)