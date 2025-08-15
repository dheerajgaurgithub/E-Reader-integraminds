# E-Reader Deployment Guide

## Prerequisites

1. A [Render](https://render.com) account
2. A GitHub account with access to this repository

## One-Click Deployment

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/dheerajgaurgithub/E-Reader-integraminds)

## Manual Deployment

### 1. Set up the Backend

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the backend service:
   - Name: `e-reader-backend`
   - Region: Choose the one closest to your users
   - Branch: `main` or your preferred branch
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn --worker-tmp-dir /dev/shm --workers 2 --threads 4 --worker-class gunicorn.workers.gthreading.ThreadedWorker --timeout 60 app:app`
   - Plan: Free

5. Add the following environment variables:
   - `PYTHON_VERSION`: 3.9.0
   - `FLASK_APP`: `app.py`
   - `FLASK_ENV`: `production`
   - `JWT_SECRET_KEY`: Generate a secure random string
   - `MONGODB_URI`: Your MongoDB connection string

6. Click "Create Web Service"

### 2. Set up the Frontend

1. In the Render Dashboard, click "New" and select "Static Site"
2. Connect your GitHub repository
3. Configure the frontend:
   - Name: `e-reader-frontend`
   - Branch: `main` or your preferred branch
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
   - Environment Variables:
     - `REACT_APP_API_URL`: The URL of your backend service (e.g., `https://e-reader-backend.onrender.com`)

4. Click "Create Static Site"

### 3. Set up MongoDB Database (if needed)

1. In the Render Dashboard, click "New" and select "MongoDB"
2. Configure the database:
   - Name: `e-reader-db`
   - Database Name: `e_reader`
   - Plan: Free

3. After creation, go to the database details and copy the connection string
4. Update the `MONGODB_URI` in your backend service with this connection string

## Environment Variables

### Backend

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET_KEY`: Secret key for JWT token signing
- `FLASK_APP`: Entry point of the Flask application (`app.py`)
- `FLASK_ENV`: Environment (`production` or `development`)
- `PYTHON_VERSION`: Python version (3.9.0 recommended)

### Frontend

- `REACT_APP_API_URL`: URL of your backend API

## Troubleshooting

- If the backend fails to start, check the logs in the Render dashboard
- Ensure all environment variables are correctly set
- Make sure the MongoDB connection string is correct and the database is accessible
- Check the browser's developer console for frontend errors

## Updating the Application

1. Push your changes to the connected GitHub repository
2. Render will automatically detect the changes and trigger a new deployment
3. Monitor the deployment status in the Render dashboard
