# BitChat - Bluetooth Mesh Chat Application

This is a privacy-first messaging application with a Django backend, Flask gateway, and React Native mobile app (planned).

## Project Structure
- **Backend (Django)**: REST API with PostgreSQL for encrypted message storage
- **Gateway (Flask)**: Lightweight message relay microservice
- **Mobile (React Native)**: Cross-platform app with Bluetooth mesh (TODO)

## Tech Stack
- Django 5.0 + Django REST Framework + PostgreSQL
- Flask 3.0 (lightweight gateway)
- React Native with Expo (planned)
- Bluetooth Low Energy (BLE) mesh networking (planned)
- End-to-end encryption with cryptography library

## Development Guidelines
- **Privacy First**: Zero-knowledge backend, no plaintext messages
- **Lightweight**: Minimal dependencies, simple architecture
- **Offline-First**: Bluetooth mesh primary, backend optional
- **Anonymous**: No real identities, rotating mailbox IDs

## Key Features Implemented
✅ Django REST API with encrypted message storage
✅ PostgreSQL database with privacy-preserving schema
✅ Flask gateway for lightweight message relay
✅ Anonymous user system (no phone/email required)
✅ Auto-expiring messages (24-hour TTL)
✅ CORS-enabled for mobile app integration

## TODO
- [ ] React Native mobile app
- [ ] Bluetooth Mesh networking layer
- [ ] End-to-end encryption implementation
- [ ] Message routing algorithm
- [ ] Offline message queue
- [ ] Chat UI/UX

## Architecture
```
Mobile App (Bluetooth Mesh)
    ↓
Flask Gateway (Optional Relay)
    ↓
Django Backend (Encrypted Storage)
    ↓
PostgreSQL Database
```

## API Endpoints
- `POST /api/messages/send/` - Send encrypted message
- `GET /api/messages/receive/<mailbox_id>/` - Receive messages
- `POST /api/mailbox/create/` - Create anonymous mailbox
- `POST /relay/send` - Relay message through gateway
- `GET /relay/receive/<id>` - Get relayed messages

## Running the Project
1. Setup PostgreSQL database
2. Run Django: `cd backend && python manage.py runserver`
3. Run Flask: `cd gateway && python app.py`
4. Test API: `python test_api.py`