from flask import Blueprint, request, jsonify, g
from app.database.db import generate_itinerary
from flask_cors import CORS


itinerary_v1 = Blueprint('itinerary_v1', 'itinerary_v1', url_prefix='/api')
CORS(itinerary_v1)

@itinerary_v1.route('create', methods=["GET", "POST"])
def api_post_create_itinerary():
    """
    generate itinerary
    """
    
    try:
        generate_itinerary()
        return jsonify({"message": "Itinerary created"})
    except Exception as e:
        raise e