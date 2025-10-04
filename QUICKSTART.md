# BitChat - Quick Start Guide

## ⚡ Fast Setup (5 minutes)

### Step 1: Install PostgreSQL

**Windows:**
Download from: https://www.postgresql.org/download/windows/

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql
```

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE bitchat_db;

# Exit
\q
```

### Step 3: Configure Environment

```bash
# Copy example environment file
copy .env.example .env    # Windows
# or
cp .env.example .env      # Linux/Mac

# Edit .env and update:
DB_PASSWORD=your_postgres_password
```

### Step 4: Run Django Backend

```bash
cd backend

# Activate virtual environment
.\venv\Scripts\Activate.ps1  # Windows PowerShell

# Create database tables
python manage.py makemigrations api
python manage.py migrate

# Start server
python manage.py runserver
```

✅ Django running at: `http://localhost:8000`

### Step 5: Run Flask Gateway (New Terminal)

```bash
cd gateway

# Create virtual environment
python -m venv venv

# Activate
.\venv\Scripts\Activate.ps1  # Windows

# Install dependencies
pip install -r requirements.txt

# Start gateway
python app.py
```

✅ Flask gateway running at: `http://localhost:5001`

### Step 6: Test the API

```bash
# Install requests library
pip install requests

# Run tests
python test_api.py
```

## 🎯 What You've Built

✅ **Django Backend** - Secure message storage with PostgreSQL
✅ **Flask Gateway** - Lightweight message relay
✅ **Privacy-First** - Zero-knowledge backend architecture
✅ **REST API** - Ready for mobile app integration

## 📱 Next Steps

1. **Build Mobile App** - React Native with Bluetooth mesh
2. **Add Encryption** - Implement E2E encryption
3. **Test Offline** - Build Bluetooth mesh networking
4. **Design UI** - Create intuitive chat interface

## 🔍 API Examples

### Send a Message
```bash
curl -X POST http://localhost:8000/api/mailbox/create/ \
  -H "Content-Type: application/json" \
  -d '{"public_key_hash": "my_test_hash"}'
```

### Check Gateway Health
```bash
curl http://localhost:5001/health
```

## 🐛 Troubleshooting

**PostgreSQL connection error?**
- Check if PostgreSQL service is running
- Verify database name and credentials in `.env`

**Port already in use?**
- Django: Change port with `python manage.py runserver 8001`
- Flask: Update `FLASK_PORT` in `.env`

**Module not found?**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt`

## 📚 Learning Resources

- Django: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- Flask: https://flask.palletsprojects.com/
- PostgreSQL: https://www.postgresql.org/docs/

## 🎓 What You're Learning

- ✅ Django REST API development
- ✅ PostgreSQL database design
- ✅ Flask microservices
- ✅ Privacy-preserving architectures
- ✅ API design and testing
- 🔜 React Native mobile development
- 🔜 Bluetooth mesh networking
- 🔜 End-to-end encryption

Happy coding! 🚀
