from pymongo import MongoClient
from bson import ObjectId
import bcrypt
from datetime import datetime
import os

class User:
    def __init__(self, db):
        self.collection = db.users
    
    def create_user(self, username, email, password, full_name=""):
        # Check if user already exists
        if self.collection.find_one({"$or": [{"email": email}, {"username": username}]}):
            return None
        
        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        user_data = {
            "username": username,
            "email": email,
            "password": hashed_password,
            "full_name": full_name,
            "profile_picture": "",
            "reading_preferences": {
                "font_size": "medium",
                "theme": "light",
                "reading_speed": "normal"
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = self.collection.insert_one(user_data)
        return str(result.inserted_id)
    
    def authenticate_user(self, email, password):
        user = self.collection.find_one({"email": email})
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            user['_id'] = str(user['_id'])
            del user['password']  # Don't return password
            return user
        return None
    
    def get_user_by_id(self, user_id):
        try:
            user = self.collection.find_one({"_id": ObjectId(user_id)})
            if user:
                user['_id'] = str(user['_id'])
                del user['password']  # Don't return password
                return user
        except:
            pass
        return None
    
    def update_user_profile(self, user_id, update_data):
        try:
            update_data['updated_at'] = datetime.utcnow()
            result = self.collection.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": update_data}
            )
            return result.modified_count > 0
        except:
            return False
    
    def get_user_by_email(self, email):
        user = self.collection.find_one({"email": email})
        if user:
            user['_id'] = str(user['_id'])
            del user['password']
            return user
        return None
