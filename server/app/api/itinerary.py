from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.database.operations import generate_itinerary, get_itineraries_by_user, get_itinerary_by_id, delete_itinerary_by_id
from flask_cors import CORS

# Create a Blueprint for itinerary-related routes
itinerary_v1 = Blueprint('itinerary_v1', 'itinerary_v1', url_prefix='/api')
CORS(itinerary_v1)  # Enable CORS for this blueprint

@itinerary_v1.route('generate', methods=["POST"])
@jwt_required() # Require JWT authentication
def api_post_create_itinerary():
    try:
        current_user = get_jwt_identity()  # Get the user ID from the JWT token
        request_data = request.get_json()  # Get the JSON data from the request
        if not request_data:
            return jsonify({"error": "No JSON payload provided or JSON is invalid."}), 400
        
        # Generate the itinerary using the request data and user ID
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
    Get all itineraries for the authenticated user.
    """
    try:
        current_user = get_jwt_identity()
        data = get_itineraries_by_user(current_user)
        return jsonify(data)
    except Exception as e:
        raise e
    
@itinerary_v1.route('get/<int:id>', methods=["GET"])
@jwt_required() 
def get_an_itinerary(id):
    """
    Get a specific itinerary by ID for the authenticated user.
    """
    try:
        current_user = get_jwt_identity()
        data = get_itinerary_by_id(current_user, id)

        if not data:
            return jsonify("not your itinerary"), 403

        return jsonify(data)
    except Exception as e:
        raise e
    
@itinerary_v1.route('delete/<int:id>', methods=["DELETE"])
@jwt_required() 
def delete_an_itinerary(id):
    """
    Delete a specific itinerary by ID for the authenticated user.
    """
    try:
        current_user = get_jwt_identity()
        data = delete_itinerary_by_id(current_user, id)

        if not data:
            return jsonify("not your itinerary"), 403

        return jsonify(data)
    except Exception as e:
        raise e