'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Trophy, 
  Star, 
  Gem, 
  Calendar,
  Target,
  BookOpen,
  Calculator,
  Briefcase,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { XPBar } from '@/components/game/XPBar';
import { AchievementBadge, AchievementNotification } from '@/components/game/AchievementBadge';
import { useGameState } from '@/hooks/useGameState';
import { useAchievements } from '@/hooks/useAchievements';
import { fadeInUp, stagger } from '@/utils/animations';

export default function ProfilePage() {
  const { user, getStats, updateUserData } = useGameState();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  const { 
    achievements, 
    newAchievement, 
    dismissNotification, 
    getUnlockedAchievements,
    getTotalProgress 
  } = useAchievements();

  const stats = getStats();
  const achievementProgress = getTotalProgress();
  const unlockedAchievements = getUnlockedAchievements();

  const categoryStats = [
    { 
      category: 'Quantitative', 
      icon: Calculator, 
      correct: 45, 
      total: 60, 
      color: 'text-blue-600' 
    },
    { 
      category: 'Verbal', 
      icon: BookOpen, 
      correct: 38, 
      total: 50, 
      color: 'text-green-600' 
    },
    { 
      category: 'Career', 
      icon: Briefcase, 
      correct: 22, 
      total: 30, 
      color: 'text-purple-600' 
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card padding="lg" className="text-center">
          <p className="text-gray-600 mb-4">No user profile found</p>
          <Button onClick={() => window.location.href = '/'}>Go Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-5xl opacity-20 animate-float">🌟</div>
        <div className="absolute top-40 right-16 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🏆</div>
        <div className="absolute bottom-32 left-20 text-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🎯</div>
        <div className="absolute bottom-40 right-12 text-4xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
      </div>

      <Header
        title="Profile"
        gems={user.gems}
        showGems={true}
      />

      <main className="flex-1 p-4 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <motion.div
            {...fadeInUp}
            className="text-center bg-gradient-to-r from-coral-400 to-secondary-500 rounded-3xl p-8 text-white overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <motion.div
                className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl">🦉</span>
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">
                {user.name || 'Learning Champion'}
              </h1>
              <p className="text-coral-100 mb-4">
                Level {user.level} • Age {user.age} • {user.gems} gems collected
              </p>
              
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats?.totalSessions || 0}</div>
                  <div className="text-xs text-coral-100">Games Played</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.round(stats?.accuracy || 0)}%</div>
                  <div className="text-xs text-coral-100">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats?.currentStreak || 0}</div>
                  <div className="text-xs text-coral-100">Day Streak</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full"></div>
          </motion.div>

          {/* Level Progress */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Target className="w-6 h-6 text-turquoise-600" />
              <span>Your Progress</span>
            </h2>
            
            <XPBar
              currentXP={user.xp}
              xpToNextLevel={user.level * 100}
              level={user.level}
            />
          </motion.div>

          {/* Achievement Overview */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-sunshine-600" />
                <span>Achievements</span>
              </h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-sunshine-600">
                  {achievementProgress.unlocked}/{achievementProgress.total}
                </div>
                <div className="text-xs text-gray-600">Unlocked</div>
              </div>
            </div>

            <div className="mb-4">
              <ProgressBar
                value={achievementProgress.unlocked}
                max={achievementProgress.total}
                color="sunshine"
                size="md"
                animated={true}
                label={`${achievementProgress.percentage}% Complete`}
                showLabel={true}
              />
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-4">
              {achievements.slice(0, 16).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  size="md"
                  showProgress={true}
                />
              ))}
            </div>
          </motion.div>

          {/* Performance by Category */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Star className="w-6 h-6 text-coral-600" />
              <span>Performance by Category</span>
            </h3>
            <div className="space-y-4">
              {categoryStats.map((stat, index) => {
                const Icon = stat.icon;
                const percentage = (stat.correct / stat.total) * 100;
                
                return (
                  <motion.div
                    key={stat.category}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        percentage >= 80 ? 'bg-success-100' : percentage >= 60 ? 'bg-sunshine-100' : 'bg-coral-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-800">
                            {stat.category}
                          </h4>
                          <span className="text-sm text-gray-600 font-medium">
                            {stat.correct}/{stat.total} ({Math.round(percentage)}%)
                          </span>
                        </div>
                        <ProgressBar
                          value={stat.correct}
                          max={stat.total}
                          color={percentage >= 80 ? 'success' : percentage >= 60 ? 'sunshine' : 'coral'}
                          size="md"
                          animated={true}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Achievements */}
          {unlockedAchievements.length > 0 && (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-coral-600" />
                <span>Recent Achievements</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {unlockedAchievements.slice(-4).map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="bg-gradient-to-r from-sunshine-50 to-coral-50 rounded-xl p-4 border border-sunshine-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{achievement.emoji}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Settings className="w-6 h-6 text-secondary-600" />
              <span>Settings</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  {soundEnabled ? (
                    <div className="w-10 h-10 bg-turquoise-100 rounded-full flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-turquoise-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <VolumeX className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <span className="text-gray-800 font-medium">Sound Effects</span>
                    <p className="text-xs text-gray-600">Play sounds during gameplay</p>
                  </div>
                </div>
                <Button
                  variant={soundEnabled ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={soundEnabled ? 'bg-gradient-to-r from-turquoise-500 to-turquoise-600' : ''}
                >
                  {soundEnabled ? 'On' : 'Off'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    animationsEnabled ? 'bg-coral-100' : 'bg-gray-100'
                  }`}>
                    <Sparkles className={`w-5 h-5 ${animationsEnabled ? 'text-coral-600' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <span className="text-gray-800 font-medium">Animations</span>
                    <p className="text-xs text-gray-600">Enable visual animations</p>
                  </div>
                </div>
                <Button
                  variant={animationsEnabled ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAnimationsEnabled(!animationsEnabled)}
                  className={animationsEnabled ? 'bg-gradient-to-r from-coral-500 to-coral-600' : ''}
                >
                  {animationsEnabled ? 'On' : 'Off'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Navigation />

      {/* Achievement Notification */}
      <AchievementNotification
        achievement={newAchievement!}
        isVisible={!!newAchievement}
        onClose={dismissNotification}
      />
    </div>
  );
}




