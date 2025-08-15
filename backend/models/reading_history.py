from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

class ReadingHistory:
    def __init__(self, db):
        self.collection = db.reading_history
    
    def update_reading_progress(self, user_id, book_id, current_page, total_pages):
        # Check if reading history exists for this user and book
        existing = self.collection.find_one({
            "user_id": ObjectId(user_id),
            "book_id": ObjectId(book_id)
        })
        
        if existing:
            # Update existing record
            self.collection.update_one(
                {"_id": existing["_id"]},
                {
                    "$set": {
                        "current_page": current_page,
                        "total_pages": total_pages,
                        "progress_percentage": (current_page / total_pages) * 100 if total_pages > 0 else 0,
                        "last_read": datetime.utcnow(),
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            return str(existing["_id"])
        else:
            # Create new record
            history_data = {
                "user_id": ObjectId(user_id),
                "book_id": ObjectId(book_id),
                "current_page": current_page,
                "total_pages": total_pages,
                "progress_percentage": (current_page / total_pages) * 100 if total_pages > 0 else 0,
                "started_reading": datetime.utcnow(),
                "last_read": datetime.utcnow(),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = self.collection.insert_one(history_data)
            return str(result.inserted_id)
    
    def get_user_reading_history(self, user_id, page=1, limit=10):
        skip = (page - 1) * limit
        
        pipeline = [
            {"$match": {"user_id": ObjectId(user_id)}},
            {"$lookup": {
                "from": "books",
                "localField": "book_id",
                "foreignField": "_id",
                "as": "book"
            }},
            {"$unwind": "$book"},
            {"$sort": {"last_read": -1}},
            {"$skip": skip},
            {"$limit": limit}
        ]
        
        history = list(self.collection.aggregate(pipeline))
        total = self.collection.count_documents({"user_id": ObjectId(user_id)})
        
        # Convert ObjectIds to strings
        for item in history:
            item['_id'] = str(item['_id'])
            item['user_id'] = str(item['user_id'])
            item['book_id'] = str(item['book_id'])
            item['book']['_id'] = str(item['book']['_id'])
        
        return {
            "history": history,
            "total": total,
            "page": page,
            "pages": (total + limit - 1) // limit
        }
    
    def get_book_progress(self, user_id, book_id):
        try:
            progress = self.collection.find_one({
                "user_id": ObjectId(user_id),
                "book_id": ObjectId(book_id)
            })
            
            if progress:
                progress['_id'] = str(progress['_id'])
                progress['user_id'] = str(progress['user_id'])
                progress['book_id'] = str(progress['book_id'])
                return progress
        except:
            pass
        return None
    
    def get_reading_stats(self, user_id):
        try:
            # Get basic reading stats
            pipeline = [
                {"$match": {"user_id": ObjectId(user_id)}},
                {"$lookup": {
                    "from": "books",
                    "localField": "book_id",
                    "foreignField": "_id",
                    "as": "book"
                }},
                {"$unwind": "$book"},
                {"$group": {
                    "_id": None,
                    "total_books_started": {"$sum": 1},
                    "books_completed": {
                        "$sum": {"$cond": [{"$gte": ["$progress_percentage", 99.9]}, 1, 0]}
                    },
                    "total_pages_read": {"$sum": "$current_page"},
                    "total_pages_in_progress_books": {
                        "$sum": {
                            "$cond": [
                                {"$lt": ["$progress_percentage", 99.9]},
                                "$current_page",
                                0
                            ]
                        }
                    },
                    "avg_pages_per_book": {"$avg": "$current_page"},
                    "avg_progress": {"$avg": "$progress_percentage"},
                    "recent_books": {
                        "$push": {
                            "book_id": "$book_id",
                            "title": "$book.title",
                            "current_page": "$current_page",
                            "total_pages": "$total_pages",
                            "progress": "$progress_percentage",
                            "last_read": "$last_read"
                        }
                    }
                }},
                {"$project": {
                    "total_books_started": 1,
                    "books_completed": 1,
                    "total_pages_read": 1,
                    "total_pages_in_progress_books": 1,
                    "avg_pages_per_book": {"$round": ["$avg_pages_per_book", 1]},
                    "avg_progress": {"$round": ["$avg_progress", 1]},
                    "recent_books": {
                        "$slice": [
                            {
                                "$sortArray": {
                                    "input": "$recent_books",
                                    "sortBy": {"last_read": -1}
                                }
                            },
                            5  # Limit to 5 most recent books
                        ]
                    }
                }}
            ]
            
            result = list(self.collection.aggregate(pipeline))
            
            if result:
                stats = result[0]
                del stats['_id']
                
                # Add additional calculated fields
                stats['books_in_progress'] = stats['total_books_started'] - stats['books_completed']
                stats['completion_rate'] = round(
                    (stats['books_completed'] / stats['total_books_started'] * 100) if stats['total_books_started'] > 0 else 0,
                    1
                )
                
                return stats
                
            return {
                "total_books_started": 0,
                "books_completed": 0,
                "books_in_progress": 0,
                "total_pages_read": 0,
                "total_pages_in_progress_books": 0,
                "avg_pages_per_book": 0,
                "avg_progress": 0,
                "completion_rate": 0,
                "recent_books": []
            }
            
        except Exception as e:
            print(f"Error getting reading stats: {str(e)}")
            return {
                "total_books_started": 0,
                "books_completed": 0,
                "books_in_progress": 0,
                "total_pages_read": 0,
                "total_pages_in_progress_books": 0,
                "avg_pages_per_book": 0,
                "avg_progress": 0,
                "completion_rate": 0,
                "recent_books": []
            }
