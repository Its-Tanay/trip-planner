from app.utils.factory import create_app
from flask import g
from app.utils.config import load_config

if __name__ == "__main__":
    app = create_app()
    
    app.config.update(load_config())

    with app.app_context():
        g.db_url = app.config['DB_URL']
        app.run()