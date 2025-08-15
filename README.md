# E-Reader Platform

A complete e-reader platform built with React.js, Flask, and MongoDB.

## Features

- User authentication (login/signup)
- Material UI with full mobile and desktop responsiveness
- Book management (add, search, filter)
- Search by author name and date
- Reading history tracking
- Profile customization
- Responsive design

## Tech Stack

- **Frontend**: React.js with Material UI
- **Backend**: Flask with Flask-RESTful
- **Database**: MongoDB
- **Authentication**: JWT tokens

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory
2. Install dependencies: `pip install -r requirements.txt`
3. Set up MongoDB connection
4. Run: `python app.py`

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Run: `npm start`

## Project Structure

```
e-reader-platform/
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```
