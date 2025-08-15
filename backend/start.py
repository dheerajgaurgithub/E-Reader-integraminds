#!/usr/bin/env python3
"""
Startup script for E-Reader Platform Backend
This script will:
1. Check if MongoDB is running
2. Install dependencies if needed
3. Seed sample data
4. Start the Flask server
"""

import subprocess
import sys
import os
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError

def check_mongodb():
    """Check if MongoDB is running"""
    try:
        client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=2000)
        client.server_info()
        print("✓ MongoDB is running")
        return True
    except ServerSelectionTimeoutError:
        print("✗ MongoDB is not running")
        print("Please start MongoDB before running the application")
        print("You can download MongoDB from: https://www.mongodb.com/try/download/community")
        return False

def install_dependencies():
    """Install Python dependencies"""
    print("Installing Python dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✓ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("✗ Failed to install dependencies")
        return False

def seed_data():
    """Seed sample data"""
    print("Seeding sample data...")
    try:
        from seed_data import seed_sample_data
        seed_sample_data()
        print("✓ Sample data seeded successfully")
    except Exception as e:
        print(f"Note: Sample data seeding skipped: {e}")

def start_server():
    """Start the Flask server"""
    print("Starting Flask server...")
    from app import create_app
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)

if __name__ == "__main__":
    print("🚀 Starting E-Reader Platform Backend...")
    print("=" * 50)
    
    # Check MongoDB
    if not check_mongodb():
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    # Seed data
    seed_data()
    
    # Start server
    print("\n🌟 Backend server starting on http://localhost:5000")
    print("API endpoints available at http://localhost:5000/api/")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    start_server()
