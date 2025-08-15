from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

class Book:
    def __init__(self, db):
        self.collection = db.books
    
    def add_book(self, title, author, description, content, cover_image="", genre="", publication_date=None):
        book_data = {
            "title": title,
            "author": author,
            "description": description,
            "content": content,
            "cover_image": cover_image,
            "genre": genre,
            "publication_date": publication_date or datetime.utcnow(),
            "total_pages": len(content.split('\n\n')) if content else 1,  # Simple page calculation
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = self.collection.insert_one(book_data)
        return str(result.inserted_id)
    
    def get_all_books(self, page=1, limit=10, search="", author_filter="", sort_by="updated_at"):
        skip = (page - 1) * limit
        
        # Build query
        query = {}
        if search:
            query["$or"] = [
                {"title": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}}
            ]
        
        if author_filter:
            query["author"] = {"$regex": author_filter, "$options": "i"}
        
        # Build sort
        sort_options = {
            "updated_at": [("updated_at", -1)],
            "created_at": [("created_at", -1)],
            "title": [("title", 1)],
            "author": [("author", 1)],
            "publication_date": [("publication_date", -1)]
        }
        
        sort_criteria = sort_options.get(sort_by, [("updated_at", -1)])
        
        books = list(self.collection.find(query).sort(sort_criteria).skip(skip).limit(limit))
        total = self.collection.count_documents(query)
        
        # Convert ObjectId to string
        for book in books:
            book['_id'] = str(book['_id'])
        
        return {
            "books": books,
            "total": total,
            "page": page,
            "pages": (total + limit - 1) // limit
        }
    
    def get_book_by_id(self, book_id):
        try:
            book = self.collection.find_one({"_id": ObjectId(book_id)})
            if book:
                book['_id'] = str(book['_id'])
                return book
        except:
            pass
        return None
    
    def update_book(self, book_id, update_data):
        try:
            update_data['updated_at'] = datetime.utcnow()
            result = self.collection.update_one(
                {"_id": ObjectId(book_id)},
                {"$set": update_data}
            )
            return result.modified_count > 0
        except:
            return False
    
    def delete_book(self, book_id):
        try:
            result = self.collection.delete_one({"_id": ObjectId(book_id)})
            return result.deleted_count > 0
        except:
            return False
