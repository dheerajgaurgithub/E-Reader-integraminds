@echo off
title E-Reader Platform Launcher
echo ========================================
echo E-Reader Platform - Complete Launcher
echo ========================================
echo.

echo Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✓ MongoDB is running
) else (
    echo ✗ MongoDB is not running
    echo Please start MongoDB first:
    echo 1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
    echo 2. Install and start MongoDB service
    echo 3. Or run: mongod --dbpath "path/to/your/data/directory"
    echo.
    pause
    exit /b 1
)

echo.
echo Starting Backend Server...
cd backend
start "E-Reader Backend" cmd /k "python start.py"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend Development Server...
cd ..\frontend
start "E-Reader Frontend" cmd /k "npm start"

echo.
echo ========================================
echo E-Reader Platform is starting up!
echo ========================================
echo.
echo Backend API: http://localhost:5000
echo Frontend App: http://localhost:3000
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
echo Default login credentials:
echo Email: demo@example.com
echo Password: password123
echo.
pause
