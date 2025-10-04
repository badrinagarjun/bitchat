# BitChat Command Cheat Sheet

Quick reference for common commands while developing BitChat.

---

## 🚀 Getting Started

```powershell
# Clone and setup
cd Desktop\anon

# Copy environment file
copy .env.example .env

# Edit .env with your settings
notepad .env
```

---

## 🐘 PostgreSQL Commands

```powershell
# Start PostgreSQL (if not running as service)
# Check Services or use:
psql --version

# Connect to PostgreSQL
psql -U postgres

# Inside psql:
CREATE DATABASE bitchat_db;
\l                           # List databases
\c bitchat_db                # Connect to database
\dt                          # List tables
\q                           # Quit
```

---

## 🐍 Django Backend Commands

```powershell
# Navigate to backend
cd backend

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Run migrations
python manage.py makemigrations
python manage.py makemigrations api
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
python manage.py runserver 8001  # Custom port

# Open Django shell
python manage.py shell

# Collect static files
python manage.py collectstatic

# Run tests
python manage.py test

# Check for issues
python manage.py check

# Show migrations
python manage.py showmigrations

# Create new app
python manage.py startapp <app_name>
```

---

## ⚡ Flask Gateway Commands

```powershell
# Navigate to gateway
cd gateway

# Create virtual environment (first time)
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run Flask gateway
python app.py

# Run on custom port
$env:FLASK_PORT=5002; python app.py
```

---

## 📦 Python Package Management

```powershell
# Install package
pip install <package_name>

# Install from requirements
pip install -r requirements.txt

# Update requirements file
pip freeze > requirements.txt

# List installed packages
pip list

# Uninstall package
pip uninstall <package_name>

# Upgrade pip
python -m pip install --upgrade pip
```

---

## 🧪 Testing

```powershell
# Test Django API
cd backend
python manage.py test

# Test with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report

# Run API test script
python test_api.py

# Test specific app
python manage.py test api
```

---

## 🗄️ Database Management

```powershell
# Backup database
pg_dump -U postgres bitchat_db > backup.sql

# Restore database
psql -U postgres bitchat_db < backup.sql

# Reset database
python manage.py flush

# Drop and recreate
# In psql:
DROP DATABASE bitchat_db;
CREATE DATABASE bitchat_db;
# Then run migrations again
```

---

## 🔍 Debugging

```powershell
# Django debug shell
python manage.py shell

# Check database connection
python manage.py dbshell

# View SQL queries
# In settings.py, add:
# LOGGING = { ... }

# Check migrations
python manage.py showmigrations

# Validate models
python manage.py check

# Test database connectivity
python manage.py inspectdb
```

---

## 🌐 API Testing with curl

```powershell
# Health check (Flask)
curl http://localhost:5001/health

# Create mailbox
curl -X POST http://localhost:8000/api/mailbox/create/ `
  -H "Content-Type: application/json" `
  -d '{\"public_key_hash\": \"test123\"}'

# Send message
curl -X POST http://localhost:8000/api/messages/send/ `
  -H "Content-Type: application/json" `
  -d '{\"encrypted_content\": \"dGVzdA==\", \"recipient_mailbox\": \"uuid-here\"}'

# Receive messages
curl http://localhost:8000/api/messages/receive/<mailbox_id>/

# Relay message (Flask)
curl -X POST http://localhost:5001/relay/send `
  -H "Content-Type: application/json" `
  -d '{\"recipient_id\": \"uuid\", \"encrypted_payload\": \"data\"}'
```

---

## 📝 Git Commands

```powershell
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create .gitignore
echo "venv/" >> .gitignore
echo "*.pyc" >> .gitignore

# Check status
git status

# View changes
git diff

# Create branch
git branch feature-name
git checkout feature-name
# or
git checkout -b feature-name
```

---

## 🧹 Cleanup Commands

```powershell
# Remove Python cache
Get-ChildItem -Recurse -Filter "__pycache__" | Remove-Item -Recurse -Force
Get-ChildItem -Recurse -Filter "*.pyc" | Remove-Item -Force

# Remove migrations (careful!)
Remove-Item backend\api\migrations\* -Exclude __init__.py

# Clear Django sessions
python manage.py clearsessions

# Clean expired messages (custom command)
# You could create: python manage.py cleanup_expired
```

---

## 🐛 Troubleshooting

```powershell
# Port already in use
# Find process using port
netstat -ano | findstr :8000

# Kill process by PID
taskkill /PID <pid> /F

# PostgreSQL connection issues
# Check if service is running
Get-Service postgresql*

# Virtual environment issues
# Deactivate and recreate
deactivate
Remove-Item venv -Recurse -Force
python -m venv venv

# Permission errors
# Run PowerShell as Administrator
Start-Process powershell -Verb RunAs
```

---

## 📊 Monitoring

```powershell
# Watch Django logs
python manage.py runserver --verbosity 2

# Check system resources
Get-Process python
Get-Process postgres

# Monitor database size
# In psql:
SELECT pg_size_pretty(pg_database_size('bitchat_db'));
```

---

## 🚀 Production Prep

```powershell
# Collect static files
python manage.py collectstatic --noinput

# Check for deployment issues
python manage.py check --deploy

# Create secret key
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# Test with production settings
$env:DJANGO_SETTINGS_MODULE='bitchat.production_settings'
python manage.py check
```

---

## 📱 React Native (Future)

```powershell
# Create Expo app
npx create-expo-app BitChatMobile

# Start Expo
cd mobile
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Install dependencies
npm install

# Add package
npm install <package-name>
```

---

## 🔧 Environment Variables

```powershell
# Set temporarily (PowerShell)
$env:DEBUG='True'
$env:FLASK_PORT='5001'

# View environment variable
$env:PATH

# Set permanently (use Control Panel > System > Environment Variables)
```

---

## 💡 Quick Tips

```powershell
# Run both servers at once (open 2 terminals)
# Terminal 1:
cd backend; .\venv\Scripts\Activate.ps1; python manage.py runserver

# Terminal 2:
cd gateway; .\venv\Scripts\Activate.ps1; python app.py

# Create alias (in PowerShell profile)
function Start-BitChat {
    Start-Process powershell -ArgumentList "cd $pwd\backend; .\venv\Scripts\Activate.ps1; python manage.py runserver"
    Start-Process powershell -ArgumentList "cd $pwd\gateway; .\venv\Scripts\Activate.ps1; python app.py"
}

# View PowerShell profile
notepad $PROFILE
```

---

## 📚 Useful Links

- Django Admin: http://localhost:8000/admin/
- API Root: http://localhost:8000/api/
- Flask Health: http://localhost:5001/health
- PostgreSQL GUI: pgAdmin or DBeaver

---

**Bookmark this file for quick reference!** 📌
