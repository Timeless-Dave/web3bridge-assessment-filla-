'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Star, Sparkles } from 'lucide-react';

interface XPBarProps {
  currentXP: number;
  xpToNextLevel: number;
  level: number;
  className?: string;
}

export const XPBar: React.FC<XPBarProps> = ({
  currentXP,
  xpToNextLevel,
  level,
  className = '',
}) => {
  const xpForCurrentLevel = xpToNextLevel - currentXP;
  const totalXPForLevel = xpToNextLevel;
  const progress = ((totalXPForLevel - xpForCurrentLevel) / totalXPForLevel) * 100;
  const canLevelUp = progress >= 100;

  return (
    <div className={`relative ${className}`}>
      {/* Level indicator */}
      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Level badge */}
          <div className="relative">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-sunshine-400 to-accent-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
              animate={canLevelUp ? { 
                boxShadow: [
                  "0 0 0 0 rgba(251, 191, 36, 0.4)",
                  "0 0 0 20px rgba(251, 191, 36, 0)"
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-bold text-xl">{level}</span>
            </motion.div>
            
            {/* Floating stars around level badge */}
            {canLevelUp && (
              <>
                <motion.div
                  className="absolute -top-2 -right-2 text-xl"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 text-lg"
                  animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              </>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800">Level {level}</h3>
            <p className="text-sm text-gray-600">
              {canLevelUp ? (
                <span className="text-success-600 font-semibold flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Ready to level up! 🎉</span>
                </span>
              ) : (
                `${xpForCurrentLevel} XP to next level`
              )}
            </p>
          </div>
        </motion.div>

        {/* XP Counter */}
        <div className="text-right">
          <div className="flex items-center space-x-1 text-sunshine-600 font-bold">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-lg">{totalXPForLevel - xpForCurrentLevel}</span>
          </div>
          <span className="text-xs text-gray-500">/ {totalXPForLevel} XP</span>
        </div>
      </div>
      
      {/* Enhanced progress bar */}
      <div className="space-y-2">
        <ProgressBar
          value={totalXPForLevel - xpForCurrentLevel}
          max={totalXPForLevel}
          color="sunshine"
          size="lg"
          animated={true}
          className="drop-shadow-sm"
        />
        
        {/* Motivational message */}
        <div className="text-center">
          {canLevelUp ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-success-100 to-turquoise-100 rounded-full px-4 py-2 inline-flex items-center space-x-2"
            >
              <span className="text-success-700 font-semibold">🎉 Level up available!</span>
            </motion.div>
          ) : progress > 75 ? (
            <span className="text-sm text-accent-600 font-medium">Almost there! Keep going! 💪</span>
          ) : progress > 50 ? (
            <span className="text-sm text-turquoise-600 font-medium">Great progress! 🌟</span>
          ) : progress > 25 ? (
            <span className="text-sm text-coral-600 font-medium">You're doing great! 🚀</span>
          ) : (
            <span className="text-sm text-secondary-600 font-medium">Just getting started! ✨</span>
          )}
        </div>
      </div>
    </div>
  );
};

