# 📁 BitChat Repository Structure Explained

## Root Level (`bitchat/`)

```
bitchat/
├── mobile/              # Your main React Native mobile app
├── docs/                # All documentation files
├── .github/             # GitHub-specific configuration
├── .git/                # Git version control (hidden)
├── README.md            # Main project documentation
├── LICENSE              # MIT License for open source
└── .gitignore           # Files to ignore in git
```

---

## 📱 `mobile/` - The Main Application

This is your **React Native mobile app** - the actual BitChat application!

### Structure:
```
mobile/
├── src/                 # Source code (your actual app code)
├── assets/              # Images, icons, splash screens
├── android/             # Native Android project (auto-generated)
├── .expo/               # Expo cache (auto-generated)
├── node_modules/        # Installed npm packages (auto-generated)
├── App.tsx              # Main app entry point
├── app.json             # Expo configuration
├── eas.json             # EAS Build configuration
├── package.json         # Dependencies & scripts
├── package-lock.json    # Locked dependency versions
├── tsconfig.json        # TypeScript configuration
├── index.ts             # App entry point
└── .gitignore           # Files to ignore in mobile/
```

### Key Files:

#### `App.tsx` 
**What it is**: Main application component  
**What it does**: Sets up navigation, defines all screens  
**You edit**: When adding new screens or changing navigation  

#### `app.json`
**What it is**: Expo configuration file  
**What it does**: App name, permissions, icons, splash screen  
**You edit**: When changing app name, permissions, or icons  

#### `eas.json`
**What it is**: EAS Build configuration  
**What it does**: Defines how to build APK/IPA  
**You edit**: When changing build settings  

#### `package.json`
**What it is**: Project dependencies  
**What it does**: Lists all npm packages used  
**You edit**: When installing new packages with `npm install`  

---

## 💻 `mobile/src/` - Your App Code

This is where **ALL your app code lives**!

```
src/
├── screens/             # UI screens (what users see)
├── services/            # Business logic (Bluetooth, storage)
└── types/               # TypeScript type definitions
```

### `src/screens/` - User Interface

**What it is**: All the screens users can navigate to  

```
screens/
├── HomeScreen.tsx       # Chat list screen
├── ChatScreen.tsx       # Individual conversation screen
└── NewChatScreen.tsx    # Device discovery screen
```

**HomeScreen.tsx**:
- Shows list of chats
- Floating '+' button to add new chat
- Dark theme with chat previews

**ChatScreen.tsx**:
- Individual conversation view
- Message bubbles (yours vs theirs)
- Text input to send messages

**NewChatScreen.tsx**:
- Bluetooth device scanner
- Lists nearby BitChat devices
- Connect to start chatting

### `src/services/` - Core Functionality

**What it is**: Business logic separated from UI  

```
services/
├── bluetoothMesh.ts     # Bluetooth P2P networking
└── localStorage.ts      # Local data storage
```

**bluetoothMesh.ts**:
- Discovers nearby devices
- Connects to peers
- Sends/receives messages via Bluetooth
- Uses BLE (Bluetooth Low Energy)

**localStorage.ts**:
- Saves messages locally
- Manages chat list
- Stores contacts
- No internet needed!

### `src/types/` - Type Definitions

**What it is**: TypeScript interfaces/types  

```
types/
└── index.ts             # All type definitions
```

Defines data structures like:
- `Chat` - Chat object structure
- `ChatMessage` - Message format
- `BluetoothDevice` - Device info
- `Contact` - Saved contact

---

## 📚 `docs/` - Documentation

```
docs/
├── ARCHITECTURE.md              # Project structure explanation
└── PURE_MESH_IMPLEMENTATION.md  # Technical implementation guide
```

**ARCHITECTURE.md**:
- Complete project structure breakdown
- Data flow diagrams
- How everything connects

**PURE_MESH_IMPLEMENTATION.md**:
- Step-by-step implementation guide
- Bluetooth configuration details
- Testing instructions

---

## 🔧 `.github/` - GitHub Configuration

```
.github/
└── copilot-instructions.md      # Instructions for GitHub Copilot
```

**What it is**: GitHub-specific settings  
**What it does**: Configures GitHub features like Copilot  
**You edit**: Rarely, only for GitHub automation  

---

## 🎨 `mobile/assets/` - Media Files

```
assets/
├── icon.png             # App icon
├── splash-icon.png      # Splash screen
├── adaptive-icon.png    # Android adaptive icon
└── favicon.png          # Web favicon
```

**What it is**: Images and icons for your app  
**What it does**: App icon, splash screen when app starts  
**You edit**: When designing custom branding  

---

## 🤖 `mobile/android/` - Native Android Project

```
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/             # Android Java/Kotlin code
│   │       ├── res/              # Android resources
│   │       └── AndroidManifest.xml
│   └── build.gradle
└── gradle/
```

**What it is**: Auto-generated Android native project  
**What it does**: Allows building APK files  
**Generated by**: `npx expo prebuild`  
**You edit**: Rarely, only for advanced native features  

**Key file**: `AndroidManifest.xml` - Android permissions

---

## 📦 Auto-Generated Folders (Don't Edit!)

### `node_modules/`
**What it is**: Installed npm packages  
**Size**: Can be 100+ MB  
**Generated by**: `npm install`  
**Don't commit**: Listed in `.gitignore`  

### `.expo/`
**What it is**: Expo cache  
**Generated by**: `npx expo start`  
**Don't commit**: Listed in `.gitignore`  

### `.git/`
**What it is**: Git version control database  
**Generated by**: `git init`  
**Don't edit**: Managed by git commands  

---

## 📄 Configuration Files

### `README.md` (Root)
**What it is**: Main project documentation  
**Contains**: 
- Project description
- Quick start guide
- Features list
- Installation instructions

### `LICENSE`
**What it is**: MIT License  
**Contains**: Legal terms for open source usage  
**Allows**: Free use, modification, distribution  

### `.gitignore` (Root & Mobile)
**What it is**: Files to ignore in git  
**Contains**:
```
node_modules/
.expo/
.env
*.log
android/
ios/
```

### `tsconfig.json`
**What it is**: TypeScript compiler configuration  
**Contains**: How to compile TypeScript to JavaScript  

---

## 🎯 What You Actually Work On

**90% of your time:**
```
mobile/src/screens/      # Add new screens, modify UI
mobile/src/services/     # Add features, business logic
mobile/src/types/        # Define new data structures
```

**10% of your time:**
```
mobile/App.tsx           # Add navigation routes
mobile/app.json          # Change app settings
mobile/package.json      # Install new packages
```

**Rarely touch:**
```
mobile/android/          # Native code (advanced)
docs/                    # Documentation updates
.github/                 # GitHub config
```

**Never touch:**
```
node_modules/            # Auto-generated
.expo/                   # Auto-generated
.git/                    # Managed by git
```

---

## 📊 File Size Breakdown

```
node_modules/           ~200 MB  (packages)
mobile/android/         ~50 MB   (native)
mobile/src/             ~50 KB   (your code!)
docs/                   ~30 KB   (documentation)
assets/                 ~1 MB    (images)
configs (json, ts)      ~10 KB   (settings)
```

**Total**: ~250 MB  
**Your actual code**: ~50 KB (0.02%)!

---

## 🔄 Workflow: Where Files Come From

### You Create:
- `src/screens/*.tsx` - Your screens
- `src/services/*.ts` - Your services
- `src/types/*.ts` - Your types

### You Modify:
- `app.json` - App config
- `package.json` - Add dependencies
- `README.md` - Update docs

### Auto-Generated:
- `node_modules/` - From `npm install`
- `.expo/` - From `npx expo start`
- `android/` - From `npx expo prebuild`
- `package-lock.json` - From `npm install`

### Git Manages:
- `.git/` - Version history
- `.gitignore` - What to ignore

---

## 🎓 Summary

**Simple Answer**:
- **`mobile/src/`** = Your app code (screens, services, types)
- **`mobile/`** = React Native app
- **`docs/`** = Documentation
- **Everything else** = Configuration or auto-generated

**Focus on**: `mobile/src/` folder - that's where BitChat lives!

The rest is just infrastructure to make it work. 🚀
