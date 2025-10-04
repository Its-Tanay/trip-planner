from app.utils.factory import create_app
from flask import g
from app.utils.config import load_config

if __name__ == "__main__":

    app = create_app()
    
    app.config.update(load_config())

    with app.app_context():
        app.run(port=3000)

else:
    gunicorn_app = create_app()
    gunicorn_app.config.update(load_config())