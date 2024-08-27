import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from app.database.db import session
from app.database.models import User

# Create a Blueprint for authentication-related routes
auth_v1 = Blueprint('auth_v1', __name__, url_prefix='/api/auth')

@auth_v1.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not username or not email or not password:
        return jsonify({"msg": "Missing username, email or password"}), 400

    # Check if user already exists
    if session.query(User).filter((User.username == username) | (User.email == email)).first():
        return jsonify({"msg": "Username or email already exists"}), 400

    # Create new user
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    session.add(new_user)
    session.commit()

    return jsonify({"msg": "User created successfully"}), 201

@auth_v1.route('/login', methods=['POST'])
def login():
    """
    Handle user login and generate JWT token.

    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    user = session.query(User).filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        # Create access token with 60 minutes expiration
        access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(minutes=60))
        return jsonify(access_token=access_token, username=user.username, email=user.email), 200
    else:
        return jsonify({"msg": "Invalid username or password"}), 401

@auth_v1.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = session.query(User).get(current_user_id)
    return jsonify(logged_in_as=user.username), 200