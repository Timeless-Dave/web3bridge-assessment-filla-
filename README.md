# Filla - Educational Quiz Game 🦉

An interactive educational quiz game built with Next.js, TypeScript, and React. Features dynamic questions across multiple categories, realtime leaderboards, and adaptive difficulty levels.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)

## 🌟 Features

- **Multiple Question Categories**
  - Quantitative Reasoning (Mathematics)
  - Verbal Reasoning (Word Games)
  - Career-Based Vocabulary (Law, IT, Aviation, Medical, Police)

- **Adaptive Difficulty System**
  - Questions adjust based on player age and performance
  - Four difficulty levels: Easy, Medium, Hard, Expert

- **Realtime Leaderboard**
  - Firebase Realtime Database integration
  - Automatic score synchronization
  - Local storage fallback for offline play

- **Per-Question Timer**
  - 30-second countdown for each question
  - Visual timer feedback
  - Automatic submission on timeout

- **Progress Tracking**
  - XP and leveling system
  - Gem rewards
  - Streak tracking
  - Comprehensive statistics

- **Enhanced Error Handling**
  - React Error Boundaries
  - Graceful fallbacks
  - Storage quota management
  - Helpful error messages

## 🎮 How to Play

1. **Sign In**: Enter your name (optional) and age range
2. **Choose Category**: Select from Mathematics, Word Games, or Careers
3. **Answer Questions**: You have 30 seconds per question
4. **Earn Rewards**: Get XP, gems, and maintain your streak
5. **Climb the Leaderboard**: Compete with other players globally

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Timeless-Dave/web3bridge-assessment-filla-.git
   cd web3bridge-assessment-filla-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional - for Firebase)
   
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
   
   See [ENV_SETUP.md](./ENV_SETUP.md) for detailed Firebase setup instructions.
   
   **Note**: The app works perfectly without Firebase - it will use localStorage as fallback.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Building for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add Firebase environment variables in Project Settings
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Storage**: localStorage + Firebase Realtime Database
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── game/              # Game pages
│   ├── leaderboard/       # Leaderboard page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── game/              # Game-specific components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── gameLogic.ts       # Game logic functions
│   ├── storage.ts         # Storage utilities
│   └── realtime.ts        # Firebase integration
├── types/                 # TypeScript type definitions
└── utils/                 # Helper utilities
```

## 🎯 Key Features Implementation

### Question System
- Dynamic question generation
- Multiple choice format
- Hints and explanations
- Category-based filtering

### Scoring System
- Points based on difficulty
- Time bonus for quick answers
- XP calculation
- Gem rewards

### Leaderboard
- Realtime updates with Firebase
- Ranking algorithm
- Top 100 players
- Personal rank display

### Error Handling
- Error boundaries for React errors
- Try-catch blocks for async operations
- Graceful fallbacks
- User-friendly error messages

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS settings
- `tsconfig.json` - TypeScript compiler options
- `vitest.config.ts` - Test configuration
- `.env.local` - Environment variables (create this)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Timeless-Dave** - [GitHub](https://github.com/Timeless-Dave)

## 🙏 Acknowledgments

- Web3Bridge Cohort XIII Pre-Qualification Exercise
- Next.js and React teams for excellent documentation
- Firebase for realtime database services
- The open-source community

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the maintainers.

## 🎓 Educational Purpose

This project was created as part of the Web3Bridge Cohort XIII Pre-Qualification Exercise to demonstrate:
- React/Next.js proficiency
- TypeScript usage
- API integration
- State management
- Testing practices
- Git workflow
- Deployment skills

---

Made with ❤️ for education and learning
