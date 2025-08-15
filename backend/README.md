# E-Reader Platform Backend

This is the backend for the E-Reader Platform, built with Flask and MongoDB.

## Deployment on Render

### Prerequisites
- A MongoDB Atlas account and database
- A Render account

### Deployment Steps

1. **Fork this repository** to your GitHub account

2. **Create a new Web Service** on Render:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" and select "Web Service"
   - Connect your GitHub account and select this repository

3. **Configure the Web Service**
   - Name: `e-reader-backend` (or your preferred name)
   - Region: Choose the one closest to your users
   - Branch: `main` (or your deployment branch)
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app -c gunicorn_config.py`

4. **Set Environment Variables**
   - Click on the "Environment" tab
   - Add the following environment variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET_KEY=your_secure_jwt_secret
     JWT_ACCESS_TOKEN_EXPIRES=3600
     ALLOWED_ORIGINS=https://your-frontend-domain.com
     FLASK_ENV=production
     ```

5. **Deploy**
   - Click "Save" to save the environment variables
   - The deployment will start automatically
   - Once deployed, you'll get a URL like `https://e-reader-backend.onrender.com`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET_KEY=your_secure_jwt_secret
JWT_ACCESS_TOKEN_EXPIRES=3600  # in seconds (1 hour)

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3002,https://your-frontend-domain.com

# Server Configuration
PORT=10000
FLASK_ENV=production
```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `GET /api/books/<book_id>` - Get a specific book
- `PUT /api/books/<book_id>` - Update a book
- `DELETE /api/books/<book_id>` - Delete a book
- `GET /api/history` - Get reading history
- `POST /api/history` - Add to reading history

## Development

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the development server:
   ```bash
   python app.py
   ```

The server will be available at `http://localhost:5000`
