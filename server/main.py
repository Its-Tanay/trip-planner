from app.utils.factory import create_app
from flask import g

import os
import configparser

config = configparser.ConfigParser()
config_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'config.ini'))
config.read(config_path)

if __name__ == "__main__":
    app = create_app()
    app.config['DEBUG'] = True
    app.config['DB_URL'] = config['LOCAL'].get("DB_URL")

    with app.app_context():
        g.db_url = app.config['DB_URL']
        app.run()