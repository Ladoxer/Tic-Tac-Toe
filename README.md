# Advanced Tic Tac Toe Game

A modern, beautiful Tic Tac Toe game built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion. Features AI opponents with unbeatable Minimax algorithm, stunning animations, sound effects, and engaging UI with psychological design principles.

## ✨ Features

### 🎮 Game Modes
- **Player vs Player**: Classic local multiplayer
- **Player vs AI**: Challenge AI with two difficulty levels
  - **Hard**: Challenging but beatable (80% optimal moves)
  - **Impossible**: Unbeatable AI using Minimax with alpha-beta pruning

### 🎨 UI/UX
- **Glassmorphism** and **Neumorphism** design styles
- **Framer Motion** animations for smooth transitions
- **Neon cyan** and **pink** color scheme with psychological impact
- **Gradient text** and **floating elements**
- **Responsive mobile-first** design
- **Light/Dark mode** with system preference detection

### 🎵 Sound & Feedback
- **Web Audio API** sound effects (click, victory, draw)
- **Confetti animation** on win (canvas-confetti)
- **Victory modal** with celebration overlay
- **Motivational microcopy** ("Nice move!", "You're getting smarter!")
- **Ripple effects** and **micro-animations** on every interaction

### 💾 Persistence
- **localStorage** score tracking across sessions
- **Settings persistence** (difficulty, sound, theme)

### 🎯 Advanced Features
- **Undo moves** functionality
- **Move history** tracking
- **Score reset** with confirmation
- **AI thinking indicator**
- **Winning combination highlight** with glow effect

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play the game.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page with mode selection
│   ├── game/
│   │   └── page.tsx        # Game page
│   ├── settings/
│   │   └── page.tsx        # Settings page
│   └── globals.css         # Global styles and animations
├── components/
│   ├── game/
│   │   ├── GameBoard.tsx   # 3x3 game board
│   │   ├── Scoreboard.tsx  # Score display
│   │   ├── GameControls.tsx # Game action buttons
│   │   └── ConfettiEffect.tsx # Victory confetti
│   ├── layout/
│   │   └── ThemeToggle.tsx # Theme switcher
│   └── animations/
│       ├── AnimatedTitle.tsx # Animated title
│       └── LottieVictory.tsx # Victory modal
├── hooks/
│   ├── useGame.ts          # Game state management (Zustand)
│   ├── useSound.ts         # Sound control
│   └── useTheme.ts         # Theme management
├── lib/
│   ├── game/
│   │   ├── gameTypes.ts    # TypeScript types
│   │   ├── gameLogic.ts    # Core game logic
│   │   └── aiPlayer.ts     # Minimax AI algorithm
│   ├── sound/
│   │   └── soundManager.ts # Sound effect manager
│   ├── storage/
│   │   └── localStorage.ts # Persistence utilities
│   └── utils.ts            # Helper functions
└── tailwind.config.ts      # Tailwind configuration
```

## 🧠 AI Algorithm

The AI uses the **Minimax algorithm with alpha-beta pruning** to play optimally:

- **Minimax**: Explores all possible game states to find the best move
- **Alpha-beta pruning**: Optimizes by eliminating branches that won't affect the outcome
- **Difficulty levels**:
  - **Hard**: 80% optimal moves, 20% random (beatable)
  - **Impossible**: 100% optimal moves (unbeatable)

## 🎨 Design Philosophy

### Color Psychology
- **Deep Blue (#0A192F)**: Trust, stability, intelligence
- **Cyan (#00D9FF)**: Energy, clarity, forward-thinking
- **Neon Green (#0FFF50)**: Success, achievement, dopamine trigger
- **Pink (#F472B6)**: Warmth, playfulness

### Micro-interactions
Every user action has feedback:
- **Hover**: Scale up, glow effect
- **Press**: Scale down, ripple effect
- **Success**: Confetti, sound, victory modal
- **Move**: Motivational message

## 🛠️ Technologies

- **Next.js 14** - App router, React 18
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Zustand** - State management
- **canvas-confetti** - Victory celebrations
- **lottie-react** - Lottie animations
- **Lucide React** - Icons
- **Web Audio API** - Sound effects

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Touch-optimized interactions
- Adaptive text sizes

## 🎮 How to Play

1. **Choose a mode** from the home page
2. **Click cells** to place your mark (X or O)
3. **Win** by getting 3 in a row (horizontal, vertical, or diagonal)
4. Use **Undo** to take back moves
5. Press **New Game** to start fresh
6. **Adjust settings** for difficulty, sound, and theme

Enjoy the game! 🎉
