@echo off
echo Resetting Git repository...

REM Remove .git directory if it exists
if exist .git (
    echo Removing existing .git directory...
    rmdir /s /q .git
)

REM Initialize new git repository
echo Initializing new Git repository...
git init

echo Configuring Git...
git config --local user.email "user@example.com"
git config --local user.name "User"
git config --local core.autocrlf false

REM Add all files
echo Adding files to Git...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Initial commit with proper .gitignore"

echo.
echo Repository has been reset and is ready to push.
echo Run the following commands to push to GitHub:
echo.
echo git remote add origin https://github.com/dheerajgaurgithub/E-Reader-integraminds.git
echo git branch -M main
echo git push -f -u origin main
echo.
pause
