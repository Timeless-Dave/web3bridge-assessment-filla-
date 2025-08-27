'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  onClick?: () => void;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  showProgress = false,
  onClick,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };

  const rarityColors = {
    common: 'from-gray-300 to-gray-500',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-sunshine-400 to-accent-500',
  };

  const rarityGlow = {
    common: 'shadow-lg',
    rare: 'shadow-lg shadow-blue-500/25',
    epic: 'shadow-lg shadow-purple-500/25',
    legendary: 'shadow-xl shadow-yellow-500/50',
  };

  const progress = achievement.progress || 0;
  const maxProgress = achievement.maxProgress || 100;
  const progressPercentage = (progress / maxProgress) * 100;

  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 15 }}
    >
      {/* Badge container */}
      <div
        className={`
          ${sizeClasses[size]} 
          ${achievement.unlocked ? `bg-gradient-to-br ${rarityColors[achievement.rarity]} ${rarityGlow[achievement.rarity]}` : 'bg-gradient-to-br from-gray-200 to-gray-400'} 
          rounded-full flex items-center justify-center border-4 border-white relative overflow-hidden
          ${achievement.unlocked ? '' : 'grayscale opacity-60'}
        `}
      >
        {/* Background shine effect for unlocked achievements */}
        {achievement.unlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Emoji */}
        <span className={`${achievement.unlocked ? '' : 'filter grayscale'} relative z-10`}>
          {achievement.emoji}
        </span>

        {/* Lock overlay for locked achievements */}
        {!achievement.unlocked && (
          <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">🔒</span>
          </div>
        )}

        {/* Sparkle effect for legendary achievements */}
        {achievement.unlocked && achievement.rarity === 'legendary' && (
          <>
            <motion.div
              className="absolute -top-1 -right-1 text-xs"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1 text-xs"
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ⭐
            </motion.div>
          </>
        )}
      </div>

      {/* Progress ring for in-progress achievements */}
      {showProgress && !achievement.unlocked && achievement.progress !== undefined && (
        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="4"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - progressPercentage / 100) }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <div className="font-semibold">{achievement.title}</div>
        <div className="text-xs text-gray-300">{achievement.description}</div>
        {showProgress && achievement.progress !== undefined && !achievement.unlocked && (
          <div className="text-xs text-gray-400 mt-1">
            {progress}/{maxProgress}
          </div>
        )}
        
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </motion.div>
    </motion.div>
  );
};

// Achievement notification component
interface AchievementNotificationProps {
  achievement: Achievement;
  isVisible: boolean;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  isVisible,
  onClose,
}) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.8 }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-sunshine-400 to-accent-500 text-white rounded-2xl p-4 shadow-2xl border-4 border-white max-w-sm mx-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
        className="text-center"
      >
        <div className="text-4xl mb-2">{achievement.emoji}</div>
        <h3 className="font-bold text-lg mb-1">Achievement Unlocked!</h3>
        <p className="font-semibold">{achievement.title}</p>
        <p className="text-sm text-sunshine-100">{achievement.description}</p>
      </motion.div>

      {/* Celebration particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: '50%',
              y: '50%',
              scale: 0,
            }}
            animate={{
              x: `${50 + (Math.random() - 0.5) * 200}%`,
              y: `${50 + (Math.random() - 0.5) * 200}%`,
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
