from utils.database import Database

def test_connection():
    print("Testing MongoDB connection...")
    try:
        db = Database().connect()
        print("✅ Successfully connected to MongoDB!")
        print(f"Available collections: {db.list_collection_names()}")
        return True
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {str(e)}")
        return False

if __name__ == "__main__":
    test_connection()
