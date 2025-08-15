@echo off
echo ========================================
echo E-Reader Platform Setup Script
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To start the application:
echo 1. Make sure MongoDB is running on localhost:27017
echo 2. Run: python backend/start.py (in one terminal)
echo 3. Run: npm start (in frontend directory, in another terminal)
echo.
echo The application will be available at:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5000
echo.
pause
