# BitChat - Pure Peer-to-Peer Bluetooth Mesh Chat

> **🚀 NEW: 100% Pure Mesh Architecture!**  
> BitChat now works completely **without servers** - true P2P Bluetooth mesh networking!

A privacy-first, offline-capable messaging app using **direct Bluetooth mesh** communication. No internet, no servers, no tracking.

## ⚡ Pure Mesh Architecture

BitChat is now a **true peer-to-peer mesh network**:

```
Device A ←→ Device B ←→ Device C
    ↓           ↓           ↓
  Local      Local      Local
 Storage    Storage    Storage
```

**No backend required!** All communication happens directly between devices via Bluetooth.

## 🔒 Privacy Features

- **Zero Servers**: No data sent to any server ever
- **Direct P2P**: Messages go straight from device to device
- **Anonymous Users**: No phone numbers, emails, or real identities
- **Local Storage**: All data stored only on your device
- **Offline-First**: Works 100% without internet
- **No Tracking**: Zero analytics or telemetry

## 🎯 Key Features

### ✅ Implemented
- **Bluetooth Device Discovery**: Find nearby BitChat users
- **Direct P2P Messaging**: Send messages via Bluetooth
- **Local Storage**: Messages stored locally with AsyncStorage
- **Contact Management**: Save and manage contacts
- **Dark Theme UI**: Beautiful, minimal interface
- **Real-time Updates**: Instant message delivery

### 🔜 Coming Soon
- End-to-end encryption (ChaCha20-Poly1305)
- Multi-hop message routing
- Group chats
- File sharing
- QR code contact exchange

## 📁 Project Structure

```
bitchat/
├── mobile/                      # React Native app (main)
│   ├── src/
│   │   ├── services/
│   │   │   ├── bluetoothMesh.ts    # Bluetooth P2P service
│   │   │   └── localStorage.ts      # Local data storage
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx       # Chat list
│   │   │   ├── ChatScreen.tsx       # Individual chat
│   │   │   └── NewChatScreen.tsx    # Device discovery
│   │   └── types/                   # TypeScript types
│   └── app.json                     # App config + permissions
├── backend/                     # Django API (optional, not used)
├── gateway/                     # Flask relay (optional, not used)
└── docs/                        # Documentation
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

### Mobile App (Primary)

```bash
cd mobile

# Install dependencies
npm install

# Start development server
npx expo start

# Run on device (recommended for Bluetooth)
# - Scan QR code with Expo Go app
# - Or press 'a' for Android, 'i' for iOS

# Build APK (for testing on real devices)
eas build --platform android --profile preview
```

**Note**: Bluetooth doesn't work in emulators - you need **physical devices** to test!

### Backend (Optional - Not Required)

The Django/Flask backend is **optional** and not needed for core functionality. See `BACKEND_SETUP.md` if you want to set it up for cloud sync features.

## 📱 Testing on Real Devices

### Requirements
- 2 physical Android/iOS devices
- Bluetooth enabled on both
- Expo Go app installed (or build APK)

### Steps
1. Open BitChat on Device A
2. Tap '+' button to scan for devices
3. Open BitChat on Device B
4. Device A will discover Device B
5. Tap "Connect" on Device A
6. Start chatting - messages go directly P2P!

## 🛠️ Technical Details

### Bluetooth Configuration

**Service UUID**: `0000fff0-0000-1000-8000-00805f9b34fb`  
**Message Characteristic**: `0000fff1-0000-1000-8000-00805f9b34fb`

### Permissions

**Android** (automatically configured):
- BLUETOOTH_SCAN
- BLUETOOTH_CONNECT
- BLUETOOTH_ADVERTISE
- ACCESS_FINE_LOCATION

**iOS** (automatically configured):
- NSBluetoothAlwaysUsageDescription
- NSBluetoothPeripheralUsageDescription

### Local Storage

All data stored locally using AsyncStorage:
- Messages: `@bitchat_messages`
- Chats: `@bitchat_chats`
- Contacts: `@bitchat_contacts`
- User ID: `@bitchat_user_id`

## 📚 Documentation

- **[PURE_MESH_IMPLEMENTATION.md](PURE_MESH_IMPLEMENTATION.md)** - Complete technical guide
- **[PURE_MESH.md](PURE_MESH.md)** - Architecture overview
- **[BUILD_APK.md](BUILD_APK.md)** - Building APK guide
- **[GIT_READY.md](GIT_READY.md)** - Git workflow

## 🎯 Why Pure Mesh?

### Maximum Privacy
- No servers = No one can intercept messages
- No metadata collection
- No accounts or tracking
- True anonymity

### Offline First
- Works without internet
- Perfect for remote areas
- Survives network outages
- Censorship resistant

### Zero Cost
- No hosting fees
- No bandwidth costs
- No operational expenses
- Sustainable forever

### True Decentralization
- Not marketing buzzwords
- Actual peer-to-peer networking
- Each device is equal
- Community owned

## 🔧 Development

### Tech Stack
- **React Native** + Expo SDK 52
- **TypeScript** for type safety
- **react-native-ble-plx** for Bluetooth
- **AsyncStorage** for local data
- **React Navigation** for routing

### Code Quality
```bash
# Type checking
npm run tsc

# Linting
npm run lint

# Format
npm run format
```

## 🐛 Troubleshooting

### "No devices found"
- Ensure both devices have app open
- Check Bluetooth is enabled
- Verify permissions are granted
- Device name should include "BitChat"

### "Connection failed"
- Move devices closer (<30m)
- Restart Bluetooth
- Clear app cache
- Check console logs

### "Permission denied"
- Go to Settings → Apps → BitChat → Permissions
- Enable Bluetooth and Location
- Restart app

## 📈 Roadmap

### Phase 1: Core P2P ✅ DONE
- [x] Bluetooth device discovery
- [x] Direct P2P connection
- [x] Message sending/receiving
- [x] Local storage
- [x] Contact management

### Phase 2: Security (Next)
- [ ] End-to-end encryption (ChaCha20-Poly1305)
- [ ] Public key exchange (X25519)
- [ ] Message signing (Ed25519)

### Phase 3: Multi-Hop Routing
- [ ] Forward messages through peers
- [ ] Routing algorithm
- [ ] Network visualization

### Phase 4: Advanced Features
- [ ] Group chats
- [ ] File sharing
- [ ] Voice messages
- [ ] QR code contact exchange

## 🤝 Contributing

Contributions welcome! This is a learning project focused on:
- Privacy-first design
- True P2P networking
- Minimal dependencies
- Clean code

## 📄 License

MIT License - See LICENSE file

## 🙏 Acknowledgments

Built to learn Django, Flask, PostgreSQL, React Native, and Bluetooth mesh networking while creating something truly privacy-focused.

## 📞 Contact

- GitHub: [@badrinagarjun](https://github.com/badrinagarjun)
- Repository: [bitchat](https://github.com/badrinagarjun/bitchat)

---

**🚀 Welcome to the pure mesh revolution!**

No servers. No tracking. Just pure P2P communication.
