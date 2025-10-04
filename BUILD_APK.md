# 📱 Build BitChat Mobile APK

Guide to build an Android APK file for BitChat mobile app.

---

## 🚀 Quick Build (Expo EAS Build - Recommended)

### Step 1: Install EAS CLI

```powershell
npm install -g eas-cli
```

### Step 2: Login to Expo

```powershell
# Login to your Expo account (create one at expo.dev if needed)
eas login
```

### Step 3: Configure Your Project

```powershell
cd mobile

# Initialize EAS build
eas build:configure
```

### Step 4: Build APK

```powershell
# Build APK for Android
eas build --platform android --profile preview

# This will:
# - Create cloud build
# - Download APK when complete
# - Takes 10-15 minutes
```

---

## 📦 Alternative: Local APK Build

### Prerequisites
- Android Studio installed
- Java JDK 11+ installed
- Android SDK configured

### Step 1: Install Dependencies

```powershell
cd mobile

# Install Expo development build tools
npx expo install expo-dev-client
```

### Step 2: Generate Android Project

```powershell
# Generate native Android code
npx expo prebuild --platform android
```

### Step 3: Build APK Locally

```powershell
# Navigate to android folder
cd android

# Build debug APK
.\gradlew assembleDebug

# Build release APK (production)
.\gradlew assembleRelease
```

**APK Location:**
- Debug: `mobile/android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `mobile/android/app/build/outputs/apk/release/app-release.apk`

---

## 🎯 Quick APK for Testing (Easiest!)

### Using Expo Go (No APK needed)

**Best for Development:**

```powershell
cd mobile
npm start
```

1. Install **Expo Go** from Play Store
2. Scan QR code
3. App runs directly - no APK needed!

### Using Expo Dev Build

```powershell
# Build development client
eas build --platform android --profile development

# Once built, install the APK
# Then run: npm start
```

---

## 🔧 EAS Build Configuration

Create `eas.json` in mobile folder:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

## 📋 Build Profiles Explained

### Development Build
```powershell
eas build --platform android --profile development
```
- For testing during development
- Includes dev tools
- Larger file size

### Preview Build (APK)
```powershell
eas build --platform android --profile preview
```
- Creates APK file
- For sharing with testers
- Ready to install on any Android device

### Production Build (AAB)
```powershell
eas build --platform android --profile production
```
- Creates App Bundle (.aab)
- For Google Play Store
- Optimized file size

---

## 🎯 Recommended Approach for You

### Option 1: Cloud Build with EAS (Easiest)

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Go to mobile folder
cd mobile

# Configure
eas build:configure

# Build APK
eas build --platform android --profile preview
```

**Pros:**
- ✅ No Android Studio needed
- ✅ No local setup required
- ✅ Cloud builds the APK
- ✅ Works on any computer

**Cons:**
- ⏱️ Takes 10-15 minutes
- 📡 Requires internet
- 🔐 Needs Expo account (free)

### Option 2: Expo Go (Fastest for Testing)

```powershell
cd mobile
npm start
```

**Pros:**
- ✅ Instant testing
- ✅ No build needed
- ✅ Perfect for development

**Cons:**
- ❌ Need Expo Go app
- ❌ Can't share as APK

---

## 🚀 Step-by-Step: Build Your First APK

### 1. Create Expo Account
- Go to: https://expo.dev/signup
- Create free account

### 2. Install EAS CLI
```powershell
npm install -g eas-cli
```

### 3. Login
```powershell
eas login
```

### 4. Configure Backend URL
Edit `mobile/src/services/api.ts`:

```typescript
// Use your deployed backend URL or ngrok for testing
const DJANGO_API_URL = 'https://your-backend-url.com/api';
```

### 5. Build APK
```powershell
cd mobile
eas build:configure
eas build --platform android --profile preview
```

### 6. Download APK
- Build completes in 10-15 minutes
- You'll get a download link
- Share APK with anyone!

---

## 📱 Install APK on Android Device

### Method 1: Direct Download
1. Copy APK to phone
2. Open APK file
3. Enable "Install from Unknown Sources"
4. Install BitChat

### Method 2: ADB Install
```powershell
# Connect phone via USB
adb devices

# Install APK
adb install path/to/bitchat.apk
```

---

## 🔍 Troubleshooting

### "eas command not found"
```powershell
npm install -g eas-cli
# Restart terminal
```

### Build Fails
```powershell
# Check logs
eas build:list

# View specific build
eas build:view [BUILD_ID]
```

### APK Won't Install
- Enable "Unknown Sources" in Android settings
- Check Android version compatibility (min SDK 21)
- Uninstall old version first

---

## 📊 Build Size Estimates

| Build Type | Size | Purpose |
|------------|------|---------|
| Development | ~50-60 MB | Testing with dev tools |
| Preview APK | ~40-50 MB | Sharing with testers |
| Production AAB | ~30-40 MB | Play Store optimized |

---

## 🎯 Next Steps After Building APK

1. **Test on Real Device**
   - Install APK
   - Test all features
   - Check backend connection

2. **Update Backend URL**
   - Point to deployed backend
   - Or use ngrok for local testing

3. **Share with Testers**
   - Send APK file
   - Collect feedback
   - Fix bugs

4. **Prepare for Play Store**
   - Build production AAB
   - Create store listing
   - Submit for review

---

## 💡 Pro Tips

1. **Use EAS Build** for easiest experience
2. **Test with Expo Go** during development
3. **Build APK** when ready to share
4. **Build AAB** for Play Store

---

## 🔗 Useful Links

- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Expo Account: https://expo.dev/
- Android Studio: https://developer.android.com/studio
- Play Store Console: https://play.google.com/console

---

## ⚡ Quick Commands Reference

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
cd mobile
eas build:configure

# Build APK
eas build --platform android --profile preview

# Check builds
eas build:list

# View build details
eas build:view [BUILD_ID]

# Cancel build
eas build:cancel [BUILD_ID]
```

---

**Ready to build your first APK? Start with:** 

```powershell
npm install -g eas-cli
eas login
cd mobile
eas build --platform android --profile preview
```

🚀 You'll have a shareable APK in 15 minutes!
