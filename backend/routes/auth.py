from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from utils.database import db

auth_bp = Blueprint('auth', __name__)
user_model = User(db)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        username = data['username']
        email = data['email']
        password = data['password']
        full_name = data.get('full_name', '')
        
        # Create user
        user_id = user_model.create_user(username, email, password, full_name)
        
        if not user_id:
            return jsonify({'error': 'User with this email or username already exists'}), 400
        
        # Create access token
        access_token = create_access_token(identity=user_id)
        
        return jsonify({
            'message': 'User created successfully',
            'access_token': access_token,
            'user_id': user_id
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        email = data['email']
        password = data['password']
        
        # Authenticate user
        user = user_model.authenticate_user(email, password)
        
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Create access token
        access_token = create_access_token(identity=user['_id'])
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = user_model.get_user_by_id(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'user': user}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Remove sensitive fields that shouldn't be updated via this endpoint
        sensitive_fields = ['password', '_id', 'email', 'created_at']
        for field in sensitive_fields:
            data.pop(field, None)
        
        success = user_model.update_user_profile(user_id, data)
        
        if not success:
            return jsonify({'error': 'Failed to update profile'}), 400
        
        # Return updated user
        user = user_model.get_user_by_id(user_id)
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
