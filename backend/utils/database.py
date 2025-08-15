from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    _instance = None
    _client = None
    _db = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
        return cls._instance
    
    def connect(self):
        if self._client is None:
            mongodb_uri = os.getenv('MONGODB_URI')
            if not mongodb_uri:
                raise ValueError('MONGODB_URI environment variable is not set')
                
            print(f"Connecting to MongoDB at: {mongodb_uri.split('@')[-1]}")  # Log the server for debugging
            
            try:
                self._client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=5000)
                # Test the connection
                self._client.server_info()
                print("Successfully connected to MongoDB")
                
                # Extract database name from URI or use default
                db_name = mongodb_uri.split('/')[-1].split('?')[0]  # Remove query parameters
                if not db_name or db_name == '?':
                    db_name = 'ereader_platform'
                    
                self._db = self._client[db_name]
                print(f"Using database: {db_name}")
                
            except Exception as e:
                print(f"Failed to connect to MongoDB: {str(e)}")
                raise
            
            # Create indexes for better performance
            self._create_indexes()
        
        return self._db
    
    def _create_indexes(self):
        # User indexes
        self._db.users.create_index("email", unique=True)
        self._db.users.create_index("username", unique=True)
        
        # Book indexes
        self._db.books.create_index([("title", "text"), ("description", "text"), ("author", "text")])
        self._db.books.create_index("author")
        self._db.books.create_index("updated_at")
        self._db.books.create_index("created_at")
        
        # Reading history indexes
        self._db.reading_history.create_index([("user_id", 1), ("book_id", 1)], unique=True)
        self._db.reading_history.create_index("user_id")
        self._db.reading_history.create_index("last_read")
    
    def close(self):
        if self._client:
            self._client.close()
            self._client = None
            self._db = None

# Global database instance
db_instance = Database()
db = db_instance.connect()
