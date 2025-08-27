'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, GameSession, Question, DifficultyLevel, QuestionCategory } from '@/types/game';
import { 
  loadUser, 
  saveUser, 
  createUser, 
  updateUser,
  saveGameSession,
  loadGameSessions,
  getGameStats
} from '@/lib/storage';
import { 
  generateQuestion, 
  validateAnswer, 
  calculateXP, 
  calculateGemReward,
  getDifficultyForAge,
  getNextDifficulty
} from '@/lib/gameLogic';

export const useGameState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user state
  useEffect(() => {
    const savedUser = loadUser();
    setUser(savedUser);
    setIsLoading(false);
  }, []);

  // Create or update user
  const initializeUser = useCallback((age: number, name?: string) => {
    const newUser = createUser(age, name);
    setUser(newUser);
    return newUser;
  }, []);

  // Update user data
  const updateUserData = useCallback((updates: Partial<User>) => {
    if (!user) return null;
    
    const updatedUser = updateUser(updates);
    setUser(updatedUser);
    return updatedUser;
  }, [user]);

  // Start new game session
  const startGameSession = useCallback((category: QuestionCategory) => {
    if (!user) return null;

    const difficulty = getDifficultyForAge(user.age);
    const questions = Array.from({ length: 10 }, () => 
      generateQuestion(category, difficulty)
    );

    const session: GameSession = {
      id: `session_${Date.now()}_${Math.random()}`,
      userId: user.id,
      category,
      difficulty,
      questions,
      currentQuestionIndex: 0,
      score: 0,
      startTime: new Date(),
      completed: false,
    };

    setCurrentSession(session);
    saveGameSession(session);
    return session;
  }, [user]);

  // Answer question
  const answerQuestion = useCallback((answer: string | number) => {
    if (!currentSession || !user) return { isCorrect: false, question: null };

    const question = currentSession.questions[currentSession.currentQuestionIndex];
    const isCorrect = validateAnswer(question, answer);
    
    // Calculate rewards
    const xpGained = calculateXP(question.difficulty, isCorrect);
    const gemsGained = isCorrect ? calculateGemReward(question.difficulty, user.streak) : 0;
    const pointsGained = isCorrect ? question.points : 0;

    // Update session
    const updatedSession = {
      ...currentSession,
      currentQuestionIndex: currentSession.currentQuestionIndex + 1,
      score: currentSession.score + pointsGained,
    };

    // Update user
    const newStreak = isCorrect ? user.streak + 1 : 0;
    const updatedUser = {
      ...user,
      xp: user.xp + xpGained,
      gems: user.gems + gemsGained,
      streak: newStreak,
      level: Math.floor((user.xp + xpGained) / 100) + 1, // Simple level calculation
    };

    setCurrentSession(updatedSession);
    setUser(updatedUser);
    
    saveGameSession(updatedSession);
    saveUser(updatedUser);

    return {
      isCorrect,
      question,
      xpGained,
      gemsGained,
      pointsGained,
    };
  }, [currentSession, user]);

  // Get next question
  const getNextQuestion = useCallback(() => {
    if (!currentSession) return null;
    
    if (currentSession.currentQuestionIndex >= currentSession.questions.length) {
      // Session completed
      const completedSession = {
        ...currentSession,
        completed: true,
        endTime: new Date(),
      };
      
      setCurrentSession(completedSession);
      saveGameSession(completedSession);
      return null;
    }

    return currentSession.questions[currentSession.currentQuestionIndex];
  }, [currentSession]);

  // Use hint (costs gems)
  const useHint = useCallback(() => {
    if (!user || user.gems < 1) return false;
    
    const updatedUser = updateUserData({ gems: user.gems - 1 });
    return !!updatedUser;
  }, [user, updateUserData]);

  // Retry question (costs gems)
  const retryQuestion = useCallback(() => {
    if (!user || user.gems < 1 || !currentSession) return false;
    
    const updatedUser = updateUserData({ gems: user.gems - 1 });
    return !!updatedUser;
  }, [user, updateUserData, currentSession]);

  // Get game statistics
  const getStats = useCallback(() => {
    return getGameStats();
  }, []);

  // Check if session is completed
  const isSessionCompleted = useCallback(() => {
    return currentSession?.completed || 
           (currentSession && currentSession.currentQuestionIndex >= currentSession.questions.length);
  }, [currentSession]);

  // Get session progress
  const getProgress = useCallback(() => {
    if (!currentSession) return { current: 0, total: 0, percentage: 0 };
    
    const current = currentSession.currentQuestionIndex;
    const total = currentSession.questions.length;
    const percentage = Math.round((current / total) * 100);
    
    return { current, total, percentage };
  }, [currentSession]);

  return {
    user,
    currentSession,
    isLoading,
    initializeUser,
    updateUserData,
    startGameSession,
    answerQuestion,
    getNextQuestion,
    useHint,
    retryQuestion,
    getStats,
    isSessionCompleted,
    getProgress,
  };
};




