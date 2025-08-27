export interface User {
  id: string;
  age: number;
  name?: string;
  gems: number;
  xp: number;
  level: number;
  streak: number;
  createdAt: Date;
  lastPlayed: Date;
}

export interface GameSession {
  id: string;
  userId: string;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  type: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  correctAnswer: string | number;
  options?: string[];
  hint?: string;
  explanation?: string;
  career?: CareerType;
  points: number;
}

export enum QuestionCategory {
  QUANTITATIVE = 'quantitative',
  VERBAL = 'verbal',
  VOCABULARY = 'vocabulary',
  CAREER = 'career'
}

export enum QuestionType {
  FILL_BLANK = 'fill_blank',
  MULTIPLE_CHOICE = 'multiple_choice',
  MATH_EQUATION = 'math_equation',
  WORD_COMPLETION = 'word_completion'
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export enum CareerType {
  LAW = 'law',
  IT = 'it',
  AVIATION = 'aviation',
  MEDICAL = 'medical',
  POLICE = 'police',
  CUSTOM = 'custom'
}

export interface GameState {
  user: User;
  currentSession: GameSession | null;
  settings: GameSettings;
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
}

export interface GameSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  difficulty: DifficultyLevel;
  dailyGoal: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  target: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  rank: number;
  gems: number;
  level: number;
  streak: number;
}

export interface DailyChallenge {
  id: string;
  date: string;
  questions: Question[];
  participants: number;
  topScore: number;
  completed: boolean;
  userScore?: number;
}

