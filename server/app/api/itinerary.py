from flask import Blueprint, request, jsonify, g
from app.database.operations import generate_itinerary
from flask_cors import CORS

itinerary_v1 = Blueprint('itinerary_v1', 'itinerary_v1', url_prefix='/api')
CORS(itinerary_v1)

@itinerary_v1.route('generate', methods=["POST"])
def api_post_create_itinerary():
    try:
        request_data = request.get_json()
        if not request_data:
            return jsonify({"error": "No JSON payload provided or JSON is invalid."}), 400
        
        itinerary = generate_itinerary(request_data)
        return jsonify(itinerary), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400

    except KeyError as ke:
        return jsonify({"error": f"Missing key: {str(ke)}"}), 400

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500