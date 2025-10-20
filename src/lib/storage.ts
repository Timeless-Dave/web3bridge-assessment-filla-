import { User, GameSession, GameState, DailyChallenge, Achievement, LeaderboardEntry } from '@/types/game';

// LocalStorage keys
const STORAGE_KEYS = {
  USER: 'filla_user',
  GAME_STATE: 'filla_game_state',
  SESSIONS: 'filla_sessions',
  DAILY_CHALLENGE: 'filla_daily_challenge',
  ACHIEVEMENTS: 'filla_achievements',
  LEADERBOARD: 'filla_leaderboard',
  SETTINGS: 'filla_settings',
};

// Storage utilities
export class GameStorage {
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      
      const parsed = JSON.parse(item);
      return parsed;
    } catch (error) {
      console.error(`Error reading from localStorage (key: ${key}):`, error);
      // Attempt to clear corrupted data
      try {
        localStorage.removeItem(key);
      } catch (clearError) {
        console.error('Failed to clear corrupted localStorage item:', clearError);
      }
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error writing to localStorage (key: ${key}):`, error);
      
      // Check if it's a quota exceeded error
      if (error instanceof DOMException && 
          (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.warn('localStorage quota exceeded. Attempting to clear old data...');
        
        // Try to clear some old session data
        try {
          const sessions = this.get<any[]>(STORAGE_KEYS.SESSIONS, []);
          if (sessions.length > 10) {
            // Keep only last 10 sessions
            this.set(STORAGE_KEYS.SESSIONS, sessions.slice(-10));
            // Retry the original operation
            localStorage.setItem(key, JSON.stringify(value));
          }
        } catch (retryError) {
          console.error('Failed to recover from quota error:', retryError);
        }
      }
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    if (typeof window === 'undefined') return;
    
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// User management
export const saveUser = (user: User): void => {
  GameStorage.set(STORAGE_KEYS.USER, user);
};

export const loadUser = (): User | null => {
  return GameStorage.get<User | null>(STORAGE_KEYS.USER, null);
};

export const createUser = (age: number, name?: string): User => {
  const user: User = {
    id: `user_${Date.now()}_${Math.random()}`,
    age,
    name,
    gems: 10, // Starting gems
    xp: 0,
    level: 1,
    streak: 0,
    createdAt: new Date(),
    lastPlayed: new Date(),
  };
  
  saveUser(user);
  return user;
};

export const updateUser = (updates: Partial<User>): User | null => {
  const user = loadUser();
  if (!user) return null;
  
  const updatedUser = { ...user, ...updates, lastPlayed: new Date() };
  saveUser(updatedUser);
  return updatedUser;
};

// Game session management
export const saveGameSession = (session: GameSession): void => {
  const sessions = GameStorage.get<GameSession[]>(STORAGE_KEYS.SESSIONS, []);
  const existingIndex = sessions.findIndex(s => s.id === session.id);
  
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  
  // Keep only last 50 sessions
  if (sessions.length > 50) {
    sessions.splice(0, sessions.length - 50);
  }
  
  GameStorage.set(STORAGE_KEYS.SESSIONS, sessions);
};

export const loadGameSessions = (): GameSession[] => {
  return GameStorage.get<GameSession[]>(STORAGE_KEYS.SESSIONS, []);
};

export const getLastSession = (): GameSession | null => {
  const sessions = loadGameSessions();
  return sessions.length > 0 ? sessions[sessions.length - 1] : null;
};

// Game state management
export const saveGameState = (state: GameState): void => {
  GameStorage.set(STORAGE_KEYS.GAME_STATE, state);
};

export const loadGameState = (): GameState | null => {
  return GameStorage.get<GameState | null>(STORAGE_KEYS.GAME_STATE, null);
};

// Daily challenge management
export const saveDailyChallenge = (challenge: DailyChallenge): void => {
  GameStorage.set(STORAGE_KEYS.DAILY_CHALLENGE, challenge);
};

export const loadDailyChallenge = (): DailyChallenge | null => {
  return GameStorage.get<DailyChallenge | null>(STORAGE_KEYS.DAILY_CHALLENGE, null);
};

// Achievements management
export const saveAchievements = (achievements: Achievement[]): void => {
  GameStorage.set(STORAGE_KEYS.ACHIEVEMENTS, achievements);
};

export const loadAchievements = (): Achievement[] => {
  return GameStorage.get<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, []);
};

export const unlockAchievement = (achievementId: string): void => {
  const achievements = loadAchievements();
  const achievement = achievements.find(a => a.id === achievementId);
  
  if (achievement && !achievement.unlockedAt) {
    achievement.unlockedAt = new Date();
    saveAchievements(achievements);
  }
};

// Leaderboard management
export const saveLeaderboard = (leaderboard: LeaderboardEntry[]): void => {
  GameStorage.set(STORAGE_KEYS.LEADERBOARD, leaderboard);
};

export const loadLeaderboard = (): LeaderboardEntry[] => {
  return GameStorage.get<LeaderboardEntry[]>(STORAGE_KEYS.LEADERBOARD, []);
};

export const updateLeaderboard = (entry: LeaderboardEntry): void => {
  const leaderboard = loadLeaderboard();
  const existingIndex = leaderboard.findIndex(e => e.userId === entry.userId);
  
  if (existingIndex >= 0) {
    leaderboard[existingIndex] = entry;
  } else {
    leaderboard.push(entry);
  }
  
  // Sort by score and update ranks
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });
  
  // Keep only top 100
  if (leaderboard.length > 100) {
    leaderboard.splice(100);
  }
  
  saveLeaderboard(leaderboard);
};

// Statistics and analytics
export const getGameStats = () => {
  const sessions = loadGameSessions();
  const user = loadUser();
  
  if (!user) return null;
  
  const completedSessions = sessions.filter(s => s.completed);
  const totalQuestions = completedSessions.reduce((sum, s) => sum + s.questions.length, 0);
  const totalCorrect = completedSessions.reduce((sum, s) => {
    return sum + s.questions.filter((q, i) => i < s.currentQuestionIndex).length;
  }, 0);
  
  return {
    totalSessions: completedSessions.length,
    totalQuestions,
    totalCorrect,
    accuracy: totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0,
    averageScore: completedSessions.length > 0 
      ? completedSessions.reduce((sum, s) => sum + s.score, 0) / completedSessions.length 
      : 0,
    currentStreak: user.streak,
    totalXP: user.xp,
    currentLevel: user.level,
    totalGems: user.gems,
  };
};

