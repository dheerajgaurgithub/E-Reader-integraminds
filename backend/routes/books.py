from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.book import Book
from models.reading_history import ReadingHistory
from utils.database import db

books_bp = Blueprint('books', __name__)
book_model = Book(db)
reading_history_model = ReadingHistory(db)

@books_bp.route('/books', methods=['GET'])
def get_books():
    try:
        # Get query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        search = request.args.get('search', '')
        author_filter = request.args.get('author', '')
        sort_by = request.args.get('sort', 'updated_at')
        
        # Get books
        result = book_model.get_all_books(page, limit, search, author_filter, sort_by)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@books_bp.route('/books/<book_id>', methods=['GET'])
def get_book(book_id):
    try:
        book = book_model.get_book_by_id(book_id)
        
        if not book:
            return jsonify({'error': 'Book not found'}), 404
        
        return jsonify({'book': book}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@books_bp.route('/books', methods=['POST'])
@jwt_required()
def add_book():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'author', 'content']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        title = data['title']
        author = data['author']
        description = data.get('description', '')
        content = data['content']
        cover_image = data.get('cover_image', '')
        genre = data.get('genre', '')
        publication_date = data.get('publication_date')
        
        # Add book
        book_id = book_model.add_book(
            title, author, description, content, 
            cover_image, genre, publication_date
        )
        
        return jsonify({
            'message': 'Book added successfully',
            'book_id': book_id
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@books_bp.route('/books/<book_id>', methods=['PUT'])
@jwt_required()
def update_book(book_id):
    try:
        data = request.get_json()
        
        # Remove fields that shouldn't be updated
        protected_fields = ['_id', 'created_at']
        for field in protected_fields:
            data.pop(field, None)
        
        success = book_model.update_book(book_id, data)
        
        if not success:
            return jsonify({'error': 'Failed to update book or book not found'}), 400
        
        return jsonify({'message': 'Book updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@books_bp.route('/books/<book_id>', methods=['DELETE'])
@jwt_required()
def delete_book(book_id):
    try:
        success = book_model.delete_book(book_id)
        
        if not success:
            return jsonify({'error': 'Failed to delete book or book not found'}), 400
        
        return jsonify({'message': 'Book deleted successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@books_bp.route('/books/<book_id>/progress', methods=['POST'])
@jwt_required()
def update_reading_progress():
    try:
        user_id = get_jwt_identity()
        book_id = request.view_args['book_id']
        data = request.get_json()
        
        current_page = data.get('current_page', 1)
        total_pages = data.get('total_pages', 1)
        
        # Update reading progress
        history_id = reading_history_model.update_reading_progress(
            user_id, book_id, current_page, total_pages
        )
        
        return jsonify({
            'message': 'Reading progress updated successfully',
            'history_id': history_id
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@books_bp.route('/books/<book_id>/progress', methods=['GET'])
@jwt_required()
def get_reading_progress(book_id):
    try:
        user_id = get_jwt_identity()
        
        progress = reading_history_model.get_book_progress(user_id, book_id)
        
        return jsonify({'progress': progress}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
