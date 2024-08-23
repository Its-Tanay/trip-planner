import os
from flask import Flask, jsonify
from flask_cors import CORS
from app.database.add_dummy_data import fill_dummy_data
from app.api.itinerary import itinerary_v1

def create_app():
    APP_DIR = os.path.abspath(os.path.dirname(__file__))
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(itinerary_v1)

    @app.route('/dummy', methods=["GET"])
    def fill_data():
        fill_dummy_data()
        return jsonify({'success': 'Dummy data added'})

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        return jsonify({'error': 'Not found lol'}), 404

    return app