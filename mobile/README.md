# BitChat Mobile App

React Native mobile application for BitChat - privacy-first Bluetooth mesh chat.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo Go app on your phone (for testing)
- Backend servers running (Django + Flask)

### Installation

```bash
cd mobile
npm install
```

### Running the App

```bash
# Start Expo dev server
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run on web
npm run web
```

### Scan QR code with Expo Go app to test on your phone!

## 📱 Features

### Implemented ✅
- Chat list interface
- Individual chat conversations
- New chat creation
- Dark mode UI
- API service layer for backend communication
- TypeScript for type safety

### Coming Soon 🔜
- Bluetooth Mesh networking
- End-to-end encryption
- Message persistence
- Push notifications
- QR code scanning
- Media sharing
- Group chats

## 🔧 Configuration

### Backend URLs

Edit `src/services/api.ts` to configure backend URLs:

```typescript
// For Android Emulator
const DJANGO_API_URL = 'http://10.0.2.2:8000/api';

// For iOS Simulator
const DJANGO_API_URL = 'http://localhost:8000/api';

// For Real Device (use your computer's IP)
const DJANGO_API_URL = 'http://192.168.1.100:8000/api';
```

### Finding Your Computer's IP

**Windows:**
```bash
ipconfig
# Look for IPv4 Address under your network adapter
```

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

## 📂 Project Structure

```
mobile/
├── src/
│   ├── screens/          # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   └── NewChatScreen.tsx
│   ├── services/         # API and services
│   │   └── api.ts
│   ├── components/       # Reusable components
│   └── types/            # TypeScript types
├── App.tsx               # Main app component
└── package.json
```

## 🎨 UI/UX

- **Dark Mode**: Modern dark theme for comfortable viewing
- **Privacy-Focused**: No personal info required
- **Minimalist**: Clean, simple interface
- **Encrypted Indicators**: 🔒 shows end-to-end encryption

## 🔌 API Integration

The app connects to:
- **Django Backend** (port 8000): Message storage, mailbox management
- **Flask Gateway** (port 5001): Message relay, health checks

### API Functions Available:

```typescript
import { createMailbox, sendMessage, receiveMessages } from './services/api';

// Create anonymous mailbox
const mailbox = await createMailbox('hash123');

// Send encrypted message
await sendMessage('encrypted_content', mailbox.id);

// Receive messages
const messages = await receiveMessages(mailbox.id);
```

## 🐛 Troubleshooting

### Can't connect to backend?

1. Make sure Django and Flask servers are running
2. Check your API URLs in `src/services/api.ts`
3. For real device, use your computer's IP address
4. Ensure backend CORS is enabled (already configured)

### App won't start?

```bash
# Clear cache
npm start --clear

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Expo Go not working?

- Make sure phone and computer are on same WiFi
- Try restarting Expo dev server
- Update Expo Go app to latest version

## 📚 Learn More

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Navigation](https://reactnavigation.org/)

## 🚧 Development Roadmap

### Phase 1: Basic UI ✅
- [x] Chat list
- [x] Chat conversation view
- [x] New chat creation
- [x] Navigation setup

### Phase 2: Backend Integration 🔜
- [ ] Connect to Django API
- [ ] Send/receive messages
- [ ] Mailbox management
- [ ] Error handling

### Phase 3: Bluetooth Mesh 🔜
- [ ] Device discovery
- [ ] Mesh network formation
- [ ] Message routing
- [ ] Offline mode

### Phase 4: Security 🔜
- [ ] End-to-end encryption
- [ ] Key management
- [ ] Secure storage

## 🎯 Testing

### Test with Backend

1. Start Django backend:
   ```bash
   cd ../backend
   python manage.py runserver
   ```

2. Start Flask gateway:
   ```bash
   cd ../gateway
   python app.py
   ```

3. Update API URL in mobile app
4. Test creating mailbox in "New Chat" screen

## 📞 Support

Check the main project documentation:
- `../README.md` - Full project docs
- `../QUICKSTART.md` - Setup guide
- `../COMMANDS.md` - Command reference

---

**Status**: ✅ UI Complete, 🔜 Backend integration next

Happy coding! 🚀
