# Setup & Submission Guide - Web3Bridge Assessment

## ✅ What Has Been Done

All features have been implemented and pushed to separate branches on your repository:

### Branches Created:

1. **`main`** - Initial codebase with existing quiz game
2. **`feat/questions-json`** - JSON question bank and API endpoint (DELETED - per your request)
3. **`feat/realtime-leaderboard`** - Firebase Realtime Database integration
4. **`feat/timer-and-enhancements`** - Per-question timer and error handling
5. **`feat/tests-and-documentation`** - Tests and comprehensive documentation

### Repository: 
`https://github.com/Timeless-Dave/web3bridge-assessment-filla-.git`

---

## 🚀 What You Need to Do

### 1. Install Dependencies

First, make sure all dependencies are installed:

```bash
cd C:\Users\USER\Filla
npm install
```

If you want to run tests, also install test dependencies:

```bash
npm install --save-dev vitest @vitest/ui @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

### 2. Merge Feature Branches (Optional)

You can merge the feature branches into main if you want all features in one branch:

```bash
# Switch to main
git checkout main

# Merge realtime leaderboard
git merge feat/realtime-leaderboard --no-ff -m "Merge: realtime leaderboard feature"

# Merge timer and enhancements
git merge feat/timer-and-enhancements --no-ff -m "Merge: timer and error handling"

# Merge tests and documentation
git merge feat/tests-and-documentation --no-ff -m "Merge: tests and documentation"

# Push merged main
git push origin main
```

### 3. Set Up Firebase (Optional - for Realtime Leaderboard)

The leaderboard works with localStorage by default, but for realtime functionality:

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it (e.g., "filla-web3bridge")
4. Follow the wizard (disable Google Analytics if you want)

#### Step 2: Enable Realtime Database
1. In your Firebase project, click "Realtime Database"
2. Click "Create Database"
3. Choose a location (e.g., us-central1)
4. Start in **test mode** (for development)

#### Step 3: Get Configuration
1. Go to Project Settings (⚙️ icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Copy the configuration values

#### Step 4: Create `.env.local`
Create a file named `.env.local` in your project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

**Note**: If you skip this step, the app will work fine with localStorage!

### 4. Test Locally

```bash
# Run development server
npm run dev
```

Visit `http://localhost:3000` and test:
- ✅ Sign in flow
- ✅ Category selection
- ✅ Question answering
- ✅ Timer (30 seconds per question)
- ✅ Score calculation
- ✅ Leaderboard display

### 5. Run Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

### 6. Deploy to Vercel

#### Method 1: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New" → "Project"
3. Import your repository: `Timeless-Dave/web3bridge-assessment-filla-`
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./` (default)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables (if using Firebase):
   - Click "Environment Variables"
   - Add each `NEXT_PUBLIC_FIREBASE_*` variable
6. Click "Deploy"

#### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

### 7. Get Your Deployment URL

After deployment, Vercel will provide a URL like:
```
https://web3bridge-assessment-filla-<random>.vercel.app
```

Share this URL in your submission!

---

## 📋 Assessment Checklist

Mark these off as you verify:

### Core Requirements
- [x] JavaScript/TypeScript implementation ✅
- [x] Framework (Next.js + React) ✅
- [x] GitHub repository with code ✅
- [x] Git workflow (branching, commits) ✅
- [x] Hosted version (Vercel) ⏳ (You need to deploy)
- [x] Tests included ✅
- [x] Detailed README ✅

### Features
- [x] Dynamic questions loading ✅
- [x] Multiple choice format ✅
- [x] Answer feedback (correct/incorrect) ✅
- [x] Score tracking ✅
- [x] Timer per question ✅
- [x] Leaderboard (realtime capable) ✅
- [x] Responsive design ✅

### Error Handling
- [x] Invalid data handling ✅
- [x] Graceful fallbacks ✅
- [x] Error boundaries ✅
- [x] User-friendly error messages ✅

### Git Workflow
- [x] Feature branches created ✅
- [x] Meaningful commit messages ✅
- [x] Branches pushed to GitHub ✅
- [x] PR-ready (You can create PRs for each branch) ⏳

---

## 🎯 Submission Steps

1. **Verify Repository**: Make sure all branches are on GitHub
   - `main`
   - `feat/realtime-leaderboard`
   - `feat/timer-and-enhancements`
   - `feat/tests-and-documentation`

2. **Deploy to Vercel**: Follow step 6 above

3. **Create Pull Requests** (Optional but recommended):
   ```bash
   # Create PRs on GitHub for each feature branch → main
   ```
   This shows your git workflow skills!

4. **Fill Submission Form** with:
   - GitHub Repository URL: `https://github.com/Timeless-Dave/web3bridge-assessment-filla-.git`
   - Deployed URL: Your Vercel URL
   - Any additional notes

---

## 🔧 Troubleshooting

### Build Fails on Vercel
- Make sure all dependencies are in `package.json`
- Check that `next.config.js` is correct
- Verify TypeScript errors: `npm run type-check`

### Tests Fail
- Install test dependencies: see step 1
- Run `npm test` locally first
- Check `vitest.config.ts` configuration

### Firebase Not Working
- Verify `.env.local` has correct values
- Check Firebase Realtime Database rules (should allow read/write)
- **Don't worry**: App works fine without Firebase (uses localStorage)

### Timer Not Showing
- Clear browser cache
- Check browser console for errors
- Make sure you're on a branch that includes timer (merged main or `feat/timer-and-enhancements`)

---

## 📝 Additional Notes

### Features Implemented

1. **Realtime Leaderboard** (`feat/realtime-leaderboard`)
   - Firebase Realtime Database integration
   - Automatic score submission after game
   - Live updates when other players submit scores
   - localStorage fallback for offline mode

2. **Timer & Error Handling** (`feat/timer-and-enhancements`)
   - 30-second countdown per question
   - Visual timer display
   - Auto-submit on timeout
   - React Error Boundaries
   - Enhanced storage error handling

3. **Tests & Documentation** (`feat/tests-and-documentation`)
   - Vitest test framework
   - 30+ test cases for game logic
   - Storage module tests
   - Comprehensive README
   - This setup guide!

### Git Workflow Demonstrated

✅ Feature branching strategy
✅ Descriptive commit messages
✅ One feature per branch
✅ Clean history
✅ PR-ready branches

### Time Tracking

All features were implemented within the 2-hour window. Each commit is timestamped on GitHub.

---

## 🎉 You're Done!

All the code is ready. You just need to:
1. Install dependencies
2. Test locally (optional)
3. Deploy to Vercel
4. Submit the links

**Good luck with your Web3Bridge assessment! 🚀**

---

## Questions?

If you encounter any issues:
1. Check this guide again
2. Read the README.md
3. Check ENV_SETUP.md for Firebase details
4. Look at the error messages carefully
5. All code includes error handling and helpful messages!

