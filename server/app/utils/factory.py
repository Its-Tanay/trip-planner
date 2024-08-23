import os
from flask import Flask, jsonify
from flask_cors import CORS
from server.app.database.add_data import fill_dummy_data
from app.api.itinerary import itinerary_v1
from app.api.add_data import add_data_v1

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(itinerary_v1)
    app.register_blueprint(add_data_v1)

    @app.route('/', defaults={'path': ''})

    @app.route('/<path:path>')
    def serve(path):
        return jsonify({'error': 'Request Not Found'}), 404

    return app