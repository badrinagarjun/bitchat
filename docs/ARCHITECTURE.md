# BitChat Architecture

## 📁 Project Structure

```
bitchat/
├── mobile/                          # React Native Mobile App
│   ├── src/
│   │   ├── screens/                 # UI Screens
│   │   │   ├── HomeScreen.tsx       # Chat list
│   │   │   ├── ChatScreen.tsx       # Individual conversation
│   │   │   └── NewChatScreen.tsx    # Device discovery
│   │   ├── services/                # Core Services
│   │   │   ├── bluetoothMesh.ts     # P2P Bluetooth networking
│   │   │   └── localStorage.ts      # Local data persistence
│   │   └── types/                   # TypeScript definitions
│   │       └── index.ts
│   ├── assets/                      # Images & icons
│   ├── App.tsx                      # Main app component
│   ├── app.json                     # Expo configuration
│   ├── eas.json                     # EAS Build settings
│   ├── package.json                 # Dependencies
│   └── tsconfig.json                # TypeScript config
├── .github/                         # GitHub Actions & settings
├── README.md                        # Main documentation
├── PURE_MESH_IMPLEMENTATION.md      # Technical implementation guide
└── .gitignore                       # Git ignore rules
```

## 🏗️ Architecture Overview

### Pure Peer-to-Peer Mesh Network

```
┌─────────────┐         Bluetooth         ┌─────────────┐
│  Device A   │◄─────────────────────────►│  Device B   │
│             │         Direct P2P         │             │
│ ┌─────────┐ │                            │ ┌─────────┐ │
│ │  Local  │ │                            │ │  Local  │ │
│ │ Storage │ │                            │ │ Storage │ │
│ └─────────┘ │                            │ └─────────┘ │
└─────────────┘                            └─────────────┘
```

**No servers. No backend. Just pure P2P!**

## 🔧 Core Components

### 1. Bluetooth Mesh Service (`bluetoothMesh.ts`)

**Purpose**: Handle all Bluetooth Low Energy operations

**Key Functions**:
- `initialize()` - Start BLE manager
- `startDiscovery()` - Scan for nearby BitChat devices
- `connectToDevice()` - Establish P2P connection
- `sendMessage()` - Send message via BLE characteristic
- `startListening()` - Receive incoming messages

**UUIDs**:
- Service: `0000fff0-0000-1000-8000-00805f9b34fb`
- Message Characteristic: `0000fff1-0000-1000-8000-00805f9b34fb`

### 2. Local Storage Service (`localStorage.ts`)

**Purpose**: Persist data locally on device

**Key Functions**:
- `saveMessage()` / `getAllMessages()` - Message storage
- `saveChat()` / `getAllChats()` - Chat management
- `saveContact()` / `getContacts()` - Contact list
- `getUserId()` - Anonymous device ID
- `saveKeys()` / `getPublicKey()` - Encryption keys (future)

**Storage Keys**:
- `@bitchat_messages` - All messages
- `@bitchat_chats` - Chat list
- `@bitchat_contacts` - Known devices
- `@bitchat_user_id` - Anonymous user ID

### 3. UI Screens

**HomeScreen**: Chat list with floating action button
**ChatScreen**: Individual conversation view with message bubbles
**NewChatScreen**: Bluetooth device discovery and connection

## 📡 Data Flow

### Message Sending Flow

```
User types message
    ↓
ChatScreen
    ↓
bluetoothMesh.sendMessage()
    ↓
BLE Characteristic Write
    ↓
[Bluetooth Radio]
    ↓
Device B receives
    ↓
localStorage.saveMessage()
    ↓
UI updates
```

### Device Discovery Flow

```
User taps "Start Scanning"
    ↓
NewChatScreen
    ↓
bluetoothMesh.startDiscovery()
    ↓
BLE scan (30 seconds)
    ↓
Devices with "BitChat" in name
    ↓
Display list with signal strength
    ↓
User selects device
    ↓
bluetoothMesh.connectToDevice()
    ↓
localStorage.saveContact()
    ↓
localStorage.saveChat()
    ↓
Navigate back to HomeScreen
```

## 🔒 Security Model

### Current (Phase 1)
- Anonymous device IDs (no real identities)
- Local-only data storage
- No server communication

### Planned (Phase 2)
- End-to-end encryption (ChaCha20-Poly1305)
- Public key exchange (X25519)
- Message signing (Ed25519)
- Perfect Forward Secrecy

## 📱 Platform Support

### Expo Go
- ❌ Bluetooth NOT supported (native module limitation)
- ✅ UI preview only
- Use for: Design testing, navigation flow

### Custom Build (APK/IPA)
- ✅ Full Bluetooth support
- ✅ All features functional
- Required for: Device discovery, P2P messaging

## 🚀 Build & Deploy

### Development
```bash
cd mobile
npx expo start
```

### Production Build
```bash
cd mobile
eas build --platform android --profile preview
```

## 📦 Dependencies

### Core
- `expo` - React Native framework
- `react-navigation` - App navigation
- `@react-native-async-storage/async-storage` - Local storage

### Bluetooth
- `react-native-ble-plx` - Bluetooth Low Energy

### Future
- `react-native-sodium` - Encryption (Phase 2)

## 🎯 Design Principles

1. **Privacy First**: No data leaves device unless sent to peer
2. **Offline Capable**: Works 100% without internet
3. **Minimal Dependencies**: Only essential packages
4. **Clean Architecture**: Clear separation of concerns
5. **Type Safe**: TypeScript throughout

## 🔮 Future Architecture

### Multi-Hop Routing (Phase 3)
```
Device A → Device B → Device C → Device D
         (forward)   (forward)   (delivery)
```

### Group Chats (Phase 4)
```
      Device A
     /    |    \
Device B  C     D
```

## 📚 Documentation

- **README.md** - Quick start, features, testing
- **PURE_MESH_IMPLEMENTATION.md** - Detailed technical guide
- **ARCHITECTURE.md** - This file

## 🛠️ Development Guide

### Adding a New Screen
1. Create `mobile/src/screens/NewScreen.tsx`
2. Add to `App.tsx` Stack.Navigator
3. Import types from `src/types/index.ts`

### Adding a New Service
1. Create `mobile/src/services/newService.ts`
2. Export singleton instance
3. Import in screens as needed

### Testing Bluetooth
1. Build APK: `eas build --platform android`
2. Install on 2 physical devices
3. Open app on both devices
4. Scan and connect
5. Send test messages

## 🐛 Common Issues

**"Bluetooth not available"**
- You're using Expo Go - build custom APK

**"No devices found"**
- Ensure both devices have app open
- Check Bluetooth is enabled
- Device name must include "BitChat"

**"Connection failed"**
- Move devices closer (<30m)
- Restart Bluetooth on both devices

## 📈 Performance

- **Discovery**: ~30 seconds scan time
- **Connection**: 2-5 seconds
- **Message Send**: <1 second
- **Range**: ~30 meters (Bluetooth standard)
- **Battery**: Optimized with background mode

---

**Architecture Version**: 1.0 (Pure Mesh)  
**Last Updated**: October 2025
