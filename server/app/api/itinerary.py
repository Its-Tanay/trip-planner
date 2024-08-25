from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.database.operations import generate_itinerary, get_itineraries_by_user
from flask_cors import CORS

itinerary_v1 = Blueprint('itinerary_v1', 'itinerary_v1', url_prefix='/api')
CORS(itinerary_v1)

@itinerary_v1.route('generate', methods=["POST"])
@jwt_required() 
def api_post_create_itinerary():
    try:
        current_user = get_jwt_identity()
        request_data = request.get_json()
        if not request_data:
            return jsonify({"error": "No JSON payload provided or JSON is invalid."}), 400
        
        itinerary = generate_itinerary(request_data, current_user)
        return jsonify(itinerary), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400

    except KeyError as ke:
        return jsonify({"error": f"Missing key: {str(ke)}"}), 400

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500
    
@itinerary_v1.route('get', methods=["GET"])
@jwt_required() 
def get_all_itineraries():
    """
    get all itineraries
    """
    try:
        current_user = get_jwt_identity()
        data = get_itineraries_by_user(current_user)
        return jsonify(data)
    except Exception as e:
        raise e