# BitChat Setup Script
# Quick setup for Windows

Write-Host "🔧 Setting up BitChat..." -ForegroundColor Cyan

# Check Python
Write-Host "`n📦 Checking Python..." -ForegroundColor Yellow
python --version

# Check PostgreSQL
Write-Host "`n🐘 Checking PostgreSQL..." -ForegroundColor Yellow
psql --version

# Setup backend
Write-Host "`n🚀 Setting up Django backend..." -ForegroundColor Green
Set-Location backend

# Create migrations
Write-Host "Creating database migrations..."
.\venv\Scripts\python.exe manage.py makemigrations api
.\venv\Scripts\python.exe manage.py migrate

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Configure PostgreSQL database"
Write-Host "2. Update .env file with your credentials"
Write-Host "3. Run: python manage.py runserver"
Write-Host "4. In another terminal, run Flask gateway: python gateway/app.py"
