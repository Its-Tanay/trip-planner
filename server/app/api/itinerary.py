from flask import Blueprint, request, jsonify, g
from app.database.operations import generate_itinerary
from flask_cors import CORS


itinerary_v1 = Blueprint('itinerary_v1', 'itinerary_v1', url_prefix='/api')
CORS(itinerary_v1)

@itinerary_v1.route('create', methods=["POST"])
def api_post_create_itinerary():
    try:
        request_data = request.get_json()
        itinerary = generate_itinerary(request_data)
        return jsonify(itinerary), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500