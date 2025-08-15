# Backup the current repository
Write-Host "Creating backup..."
$backupPath = "$PWD\..\E-Rreader-backup-$(Get-Date -Format 'yyyyMMddHHmmss')"
Copy-Item -Path $PWD -Destination $backupPath -Recurse -Force
Write-Host "Backup created at: $backupPath"

# Remove .git directory if it exists
if (Test-Path .git) {
    Write-Host "Removing existing .git directory..."
    Remove-Item -Recurse -Force .git
}

# Initialize new git repository
Write-Host "Initializing new Git repository..."
git init

# Add remote repository
git remote add origin https://github.com/dheerajgaurgithub/E-Reader-integraminds.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit with proper .gitignore"

# Push to remote with force
git push -f origin main

Write-Host "Cleanup and repository reset complete!"
Write-Host "Your backup is available at: $backupPath"
