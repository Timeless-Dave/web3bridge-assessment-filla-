# Filla - Educational Game

An interactive educational game designed to improve quantitative reasoning, verbal reasoning, and vocabulary through engaging puzzles and challenges.

## Features

### Core Game Mechanics
- **Quantitative Reasoning**: Math equations with missing values
- **Verbal Reasoning**: Word completion puzzles  
- **Vocabulary Building**: Career-specific terminology challenges
- **Adaptive Difficulty**: Game difficulty scales based on user performance
- **Gems & Rewards**: Earn gems for correct answers, use them for hints and retries

### User Experience
- **Age-Appropriate Content**: Difficulty automatically adjusted based on user age
- **Progress Tracking**: XP system, levels, and streak tracking
- **Achievements**: Unlock badges for various accomplishments
- **Leaderboards**: Compete with other players
- **Celebration Effects**: Confetti and animations for positive reinforcement

### Technical Features
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Full type safety
- **TailwindCSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **LocalStorage**: Persistent user data without backend
- **Responsive Design**: Works on mobile and desktop

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd filla
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
src/
├── app/                 # Next.js App Router pages
│   ├── game/           # Game pages
│   ├── leaderboard/    # Leaderboard page
│   ├── profile/        # User profile page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── game/          # Game-specific components
│   └── layout/        # Layout components
├── hooks/             # Custom React hooks
├── lib/               # Core game logic
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── data/              # Static data
└── store/             # State management
\`\`\`

## Game Flow

1. **User Setup**: Enter age to determine initial difficulty
2. **Category Selection**: Choose from Math, Vocabulary, or Career challenges
3. **Question Session**: Answer 10 questions with increasing difficulty
4. **Rewards**: Earn XP, gems, and unlock achievements
5. **Progress**: Track stats and compete on leaderboards

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Future Enhancements

- Daily challenges
- Multiplayer mode
- More question categories
- Advanced analytics
- Backend integration for global leaderboards
- Mobile app version




