# BitChat - Privacy-First Bluetooth Mesh Chat

A lightweight, anonymous messaging app using Bluetooth Mesh networking with optional backend sync.

## 🔒 Privacy Features

- **Zero-Knowledge Backend**: Server can't read your messages
- **Anonymous Users**: No phone numbers, emails, or real identities
- **End-to-End Encryption**: All messages encrypted client-side
- **Offline-First**: Works 100% offline via Bluetooth mesh
- **Auto-Expiring Messages**: Messages auto-delete after 24 hours

## 📁 Project Structure

```
bitchat/
├── backend/          # Django REST API (PostgreSQL)
│   ├── api/          # Message storage API
│   ├── bitchat/      # Django project settings
│   └── manage.py
├── gateway/          # Flask microservice
│   ├── app.py        # Lightweight message relay
│   └── requirements.txt
├── mobile/           # React Native app (TODO)
└── .env.example      # Environment variables template
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL 12+
- Node.js 16+ (for mobile app)

### 1. Setup PostgreSQL

```bash
# Create database
psql -U postgres
CREATE DATABASE bitchat_db;
\q
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Setup Django Backend

```bash
cd backend

# Activate virtual environment
.\venv\Scripts\Activate.ps1  # Windows PowerShell
# or
source venv/bin/activate  # Linux/Mac

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Django backend will run on `http://localhost:8000`

### 4. Setup Flask Gateway

```bash
cd gateway

# Create virtual environment
python -m venv venv

# Activate
.\venv\Scripts\Activate.ps1  # Windows

# Install dependencies
pip install -r requirements.txt

# Run gateway
python app.py
```

Flask gateway will run on `http://localhost:5001`

## 📡 API Endpoints

### Django Backend (Port 8000)

#### Send Message
```http
POST /api/messages/send/
Content-Type: application/json

{
  "encrypted_content": "<base64_encrypted_data>",
  "recipient_mailbox": "<uuid>"
}
```

#### Receive Messages
```http
GET /api/messages/receive/<mailbox_id>/
```

#### Create Mailbox
```http
POST /api/mailbox/create/
Content-Type: application/json

{
  "public_key_hash": "<sha256_hash>"
}
```

### Flask Gateway (Port 5001)

#### Relay Message
```http
POST /relay/send
Content-Type: application/json

{
  "recipient_id": "<uuid>",
  "encrypted_payload": "<encrypted_data>"
}
```

#### Receive Relayed Messages
```http
GET /relay/receive/<recipient_id>
```

## 🛠️ Tech Stack

- **Backend**: Django 5.0 + Django REST Framework
- **Database**: PostgreSQL 12+
- **Gateway**: Flask 3.0 (lightweight relay)
- **Encryption**: cryptography library (Fernet)
- **Mobile**: React Native + Expo (planned)

## 🔐 Privacy Architecture

### How It Works

1. **Client-Side Encryption**: All messages encrypted before leaving device
2. **Anonymous IDs**: Users identified by public key hashes only
3. **No Metadata**: Server can't see who talks to whom
4. **Rotating Mailboxes**: Mailbox IDs change periodically
5. **Auto-Expiry**: Messages deleted after 24 hours automatically

### Data Flow

```
[Device A] -> Encrypt -> [Bluetooth Mesh] -> [Device B]
                              |
                              v
                    [Optional: Flask Gateway]
                              |
                              v
                    [Django Backend Storage]
                    (Only encrypted blobs)
```

## 📝 Development Notes

### Database Models

- **AnonymousUser**: Public key hash only, no real identity
- **EncryptedMessage**: Binary encrypted blobs with expiry
- **Mailbox**: Rotating anonymous mailboxes

### Security Features

- All message content encrypted client-side
- Server stores only encrypted binary blobs
- No user relationships or social graph
- Messages automatically expire
- Optional Tor/I2P integration (planned)

## 🧪 Testing

```bash
# Test Django API
cd backend
python manage.py test

# Test Flask gateway
cd gateway
python -m pytest  # (after adding tests)
```

## 🗺️ Roadmap

- [x] Django backend with PostgreSQL
- [x] Flask lightweight gateway
- [x] Privacy-preserving database schema
- [ ] React Native mobile app
- [ ] Bluetooth Mesh networking layer
- [ ] End-to-end encryption implementation
- [ ] Message routing algorithm
- [ ] Offline message queue
- [ ] UI/UX design
- [ ] Multi-device testing

## 📄 License

MIT License - Build freely, stay private!

## 🤝 Contributing

This is a learning project for Django, Flask, PostgreSQL, and Bluetooth Mesh networking.
Contributions welcome!

## ⚠️ Security Notice

**This is a development version.** Do not use for production without:
- Changing SECRET_KEY
- Setting DEBUG = False
- Configuring proper CORS
- Setting up HTTPS/TLS
- Implementing rate limiting
- Adding proper authentication
- Security audit

## 📧 Contact

Built with privacy in mind. No tracking, no data collection.
