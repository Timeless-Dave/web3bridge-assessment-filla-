# Environment Variables Setup

## Firebase Configuration for Realtime Leaderboard

To enable realtime leaderboard functionality, you need to set up Firebase Realtime Database:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### 2. Enable Realtime Database

1. In your Firebase project, go to "Realtime Database"
2. Click "Create Database"
3. Choose a location
4. Start in **test mode** for development (you can secure it later)

### 3. Get Your Configuration

1. Go to Project Settings (⚙️ icon) > General
2. Scroll to "Your apps" section
3. If you haven't added a web app, click the web icon (`</>`) to add one
4. Copy the `firebaseConfig` object values

### 4. Create `.env.local` File

Create a file named `.env.local` in the root directory with these values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 5. Install Firebase Dependency

```bash
npm install firebase
```

## Without Firebase

**The app works perfectly without Firebase!** If you don't configure Firebase:
- Leaderboard will use localStorage (local browser storage)
- Scores are saved locally on each device
- No realtime synchronization between users
- Great for development and testing

## Security Rules (Production)

For production, update your Firebase Realtime Database rules:

```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      "$userId": {
        ".write": "auth != null || true",
        ".validate": "newData.hasChildren(['userId', 'name', 'score', 'rank', 'gems', 'level', 'streak'])"
      }
    }
  }
}
```

## Troubleshooting

- **"Firebase config not found"**: Check that your `.env.local` file exists and has correct variable names
- **"Permission denied"**: Update your Firebase Realtime Database rules
- **App works without errors**: Firebase is optional; localStorage fallback is working

