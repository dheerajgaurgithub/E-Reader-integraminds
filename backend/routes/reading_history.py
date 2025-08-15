from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.reading_history import ReadingHistory
from utils.database import db

history_bp = Blueprint('history', __name__)
reading_history_model = ReadingHistory(db)

@history_bp.route('/history', methods=['GET'])
@jwt_required()
def get_reading_history():
    try:
        user_id = get_jwt_identity()
        
        # Get query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        
        # Get reading history
        result = reading_history_model.get_user_reading_history(user_id, page, limit)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@history_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_reading_stats():
    try:
        user_id = get_jwt_identity()
        
        # Get reading statistics
        stats = reading_history_model.get_reading_stats(user_id)
        
        return jsonify({'stats': stats}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
