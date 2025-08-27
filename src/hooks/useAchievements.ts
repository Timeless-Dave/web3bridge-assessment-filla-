import { useState, useEffect } from 'react';
import { Achievement } from '@/components/game/AchievementBadge';

// Sample achievements
const SAMPLE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first question',
    emoji: '👶',
    unlocked: false,
    rarity: 'common',
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    emoji: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    rarity: 'rare',
  },
  {
    id: 'math_wizard',
    title: 'Math Wizard',
    description: 'Score 100% accuracy in math',
    emoji: '🧙‍♂️',
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 'word_master',
    title: 'Word Master',
    description: 'Complete 50 word challenges',
    emoji: '📚',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    rarity: 'epic',
  },
  {
    id: 'career_explorer',
    title: 'Career Explorer',
    description: 'Learn about 20 different careers',
    emoji: '🌟',
    unlocked: false,
    progress: 0,
    maxProgress: 20,
    rarity: 'rare',
  },
  {
    id: 'gem_collector',
    title: 'Gem Collector',
    description: 'Collect 100 gems',
    emoji: '💎',
    unlocked: false,
    progress: 0,
    maxProgress: 100,
    rarity: 'rare',
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Answer 10 questions in under 30 seconds',
    emoji: '⚡',
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete a perfect game (100% accuracy)',
    emoji: '🎯',
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 'legendary_learner',
    title: 'Legendary Learner',
    description: 'Reach level 10',
    emoji: '👑',
    unlocked: false,
    rarity: 'legendary',
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Answer 1000 questions correctly',
    emoji: '🔍',
    unlocked: false,
    progress: 0,
    maxProgress: 1000,
    rarity: 'legendary',
  },
];

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(SAMPLE_ACHIEVEMENTS);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Load achievements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('filla_achievements');
    if (saved) {
      try {
        const savedAchievements = JSON.parse(saved);
        setAchievements(savedAchievements);
      } catch (error) {
        console.error('Error loading achievements:', error);
      }
    }
  }, []);

  // Save achievements to localStorage
  const saveAchievements = (newAchievements: Achievement[]) => {
    localStorage.setItem('filla_achievements', JSON.stringify(newAchievements));
    setAchievements(newAchievements);
  };

  // Update achievement progress
  const updateProgress = (achievementId: string, progress: number) => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.id === achievementId) {
        const newProgress = Math.min(progress, achievement.maxProgress || 100);
        const shouldUnlock = !achievement.unlocked && newProgress >= (achievement.maxProgress || 100);
        
        const updated = {
          ...achievement,
          progress: newProgress,
          unlocked: achievement.unlocked || shouldUnlock,
        };

        // Show notification for new achievement
        if (shouldUnlock) {
          setNewAchievement(updated);
        }

        return updated;
      }
      return achievement;
    });

    saveAchievements(updatedAchievements);
  };

  // Unlock achievement directly
  const unlockAchievement = (achievementId: string) => {
    const updatedAchievements = achievements.map(achievement => {
      if (achievement.id === achievementId && !achievement.unlocked) {
        const updated = { ...achievement, unlocked: true };
        setNewAchievement(updated);
        return updated;
      }
      return achievement;
    });

    saveAchievements(updatedAchievements);
  };

  // Increment achievement progress
  const incrementProgress = (achievementId: string, amount: number = 1) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && achievement.progress !== undefined) {
      updateProgress(achievementId, achievement.progress + amount);
    }
  };

  // Check multiple achievements at once (useful for game events)
  const checkAchievements = (stats: {
    questionsAnswered?: number;
    correctAnswers?: number;
    streak?: number;
    gems?: number;
    level?: number;
    mathQuestions?: number;
    wordQuestions?: number;
    careerQuestions?: number;
    perfectGames?: number;
  }) => {
    // First steps
    if (stats.questionsAnswered && stats.questionsAnswered >= 1) {
      unlockAchievement('first_steps');
    }

    // Streak master
    if (stats.streak) {
      updateProgress('streak_master', stats.streak);
    }

    // Word master
    if (stats.wordQuestions) {
      updateProgress('word_master', stats.wordQuestions);
    }

    // Career explorer
    if (stats.careerQuestions) {
      updateProgress('career_explorer', stats.careerQuestions);
    }

    // Gem collector
    if (stats.gems) {
      updateProgress('gem_collector', stats.gems);
    }

    // Perfectionist
    if (stats.perfectGames && stats.perfectGames >= 1) {
      unlockAchievement('perfectionist');
    }

    // Legendary learner
    if (stats.level && stats.level >= 10) {
      unlockAchievement('legendary_learner');
    }

    // Knowledge seeker
    if (stats.correctAnswers) {
      updateProgress('knowledge_seeker', stats.correctAnswers);
    }
  };

  const dismissNotification = () => {
    setNewAchievement(null);
  };

  const getUnlockedAchievements = () => {
    return achievements.filter(a => a.unlocked);
  };

  const getAchievementsByRarity = (rarity: Achievement['rarity']) => {
    return achievements.filter(a => a.rarity === rarity);
  };

  const getTotalProgress = () => {
    const total = achievements.length;
    const unlocked = achievements.filter(a => a.unlocked).length;
    return { unlocked, total, percentage: Math.round((unlocked / total) * 100) };
  };

  return {
    achievements,
    newAchievement,
    updateProgress,
    unlockAchievement,
    incrementProgress,
    checkAchievements,
    dismissNotification,
    getUnlockedAchievements,
    getAchievementsByRarity,
    getTotalProgress,
  };
};
