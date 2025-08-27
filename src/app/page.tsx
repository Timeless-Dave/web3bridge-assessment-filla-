'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Calculator, Briefcase, Trophy, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { GemCounter } from '@/components/game/GemCounter';
import { XPBar } from '@/components/game/XPBar';
import { useGameState } from '@/hooks/useGameState';
import { QuestionCategory, CareerType } from '@/types/game';
import { fadeInUp, stagger } from '@/utils/animations';
import { CareerSelectionModal } from '@/components/game/CareerSelectionModal';

const gameCategories = [
  {
    id: QuestionCategory.QUANTITATIVE,
    title: 'Mathematics',
    description: 'Solve fun number puzzles',
    icon: Calculator,
    gradient: 'from-coral-400 to-coral-600',
    bgClass: 'subject-math',
    emoji: '🔢',
    example: '□ × 3 = 15',
    wordCount: '24 puzzles',
  },
  {
    id: QuestionCategory.VERBAL,
    title: 'Word Games',
    description: 'Complete words and learn new ones',
    icon: BookOpen,
    gradient: 'from-success-400 to-success-600',
    bgClass: 'subject-verbal',
    emoji: '📚',
    example: 'A_ple → Apple',
    wordCount: '16 words',
  },
  {
    id: QuestionCategory.CAREER,
    title: 'Careers',
    description: 'Discover amazing professions',
    icon: Briefcase,
    gradient: 'from-secondary-400 to-secondary-600',
    bgClass: 'subject-career',
    emoji: '💼',
    example: 'Lawyer: Cou_t → Court',
    wordCount: '34 terms',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { user, initializeUser, isLoading, getStats } = useGameState();
  const [showWelcome, setShowWelcome] = useState(false);
  const [userAge, setUserAge] = useState('');
  const [userName, setUserName] = useState('');
  const [showCareerSelection, setShowCareerSelection] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setShowWelcome(true);
    }
  }, [isLoading, user]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseFloat(userAge);
    if (age >= 2 && age <= 15) {
      initializeUser(Math.round(age), userName || undefined);
      setShowWelcome(false);
    }
  };

  const handlePlayCategory = (category: QuestionCategory) => {
    if (category === QuestionCategory.CAREER) {
      setShowCareerSelection(true);
    } else {
      router.push(`/game?category=${category}`);
    }
  };

  const handleCareerSelect = (career: CareerType, customCareer?: string) => {
    setShowCareerSelection(false);
    const queryParams = new URLSearchParams({
      category: QuestionCategory.CAREER,
      career: career,
      ...(customCareer && { customCareer })
    });
    router.push(`/game?${queryParams.toString()}`);
  };

  const stats = user ? getStats() : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-coral-100 via-purple-100 to-turquoise-100">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl animate-float">⭐</div>
          <div className="absolute top-40 right-16 text-3xl animate-float" style={{ animationDelay: '1s' }}>🌟</div>
          <div className="absolute bottom-32 left-20 text-5xl animate-float" style={{ animationDelay: '2s' }}>✨</div>
          <div className="absolute bottom-40 right-12 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>💫</div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-10"
        >
          <Card padding="none" className="overflow-hidden bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 shadow-2xl">
            {/* Header with mascot */}
            <div className="bg-gradient-to-r from-coral-400 to-coral-600 px-6 py-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                className="relative z-10 mb-4"
              >
                {/* Cute mascot character */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-float">
                  <span className="text-4xl animate-wiggle">🦉</span>
                </div>
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold mb-2"
                >
                  Hi, I'm Filla! 
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-coral-100"
                >
                  Let's get you signed in!
                </motion.p>
              </motion.div>
            </div>

            {/* Form section */}
            <div className="p-6">
              <form onSubmit={handleCreateUser} className="space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-coral-400 focus:outline-none bg-white/70 backdrop-blur-sm transition-all duration-300 text-gray-800 placeholder-gray-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl">👤</div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <div className="relative">
                    <select
                      value={userAge}
                      onChange={(e) => setUserAge(e.target.value)}
                      required
                      className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-coral-400 focus:outline-none bg-white/70 backdrop-blur-sm transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select your age range</option>
                      <option value="2.5">2 - 3 years</option>
                      <option value="4">3 - 5 years</option>
                      <option value="7">5 - 9 years</option>
                      <option value="11">9 - 13 years</option>
                      <option value="14">13 - 15 years</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl pointer-events-none">🎂</div>
                    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <Button 
                    type="submit" 
                    fullWidth 
                    size="lg"
                    className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 btn-playful"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Start Learning!</span>
                      <span className="text-xl">🚀</span>
                    </span>
                  </Button>
                </motion.div>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <Header 
        title="Filla"
        gems={user?.gems || 0}
        showGems={true}
      />

      <main className="flex-1 p-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Section with Mascot */}
          <motion.div
            {...fadeInUp}
            className="text-center relative"
          >
            <div className="relative bg-gradient-to-r from-coral-400 to-purple-500 rounded-3xl p-6 text-white overflow-hidden mb-6">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              
              {/* Floating mascot */}
              <motion.div 
                className="absolute top-4 right-4 text-4xl animate-float"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                🦉
              </motion.div>
              
              <div className="relative z-10">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold mb-2"
                >
                  Hello, {user?.name ? user.name : 'Learner'}! 🌟
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-coral-100"
                >
                  Nice to see you again!
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Level Progress */}
          {user && (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-sunshine-400 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.level}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Level {user.level}</h3>
                    <p className="text-sm text-gray-600">Level {user.level + 1} in {(user.level * 100) - user.xp} XP</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-sunshine-600">{user.xp} XP</div>
                </div>
              </div>
              <XPBar
                currentXP={user.xp}
                xpToNextLevel={(user.level * 100)}
                level={user.level}
              />
            </motion.div>
          )}

          {/* Quick Stats */}
          {stats && (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              <Card className="text-center bg-gradient-to-br from-turquoise-50 to-turquoise-100 border-turquoise-200 border-2">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold text-turquoise-600">
                  {stats.currentStreak}
                </div>
                <div className="text-sm text-turquoise-700">Day Streak</div>
              </Card>
              <Card className="text-center bg-gradient-to-br from-success-50 to-success-100 border-success-200 border-2">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-success-600">
                  {Math.round(stats.accuracy)}%
                </div>
                <div className="text-sm text-success-700">Accuracy</div>
              </Card>
              <Card className="text-center bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200 border-2">
                <div className="text-3xl mb-2">🎮</div>
                <div className="text-2xl font-bold text-secondary-600">
                  {stats.totalSessions}
                </div>
                <div className="text-sm text-secondary-700">Games Played</div>
              </Card>
            </motion.div>
          )}

          {/* Subjects Section */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Subjects
              </h3>
              <p className="text-gray-600">Choose your adventure!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    {...fadeInUp}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      padding="none"
                      onClick={() => handlePlayCategory(category.id)}
                      className="cursor-pointer overflow-hidden bg-white/70 backdrop-blur-sm border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className={`bg-gradient-to-br ${category.gradient} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-4xl">{category.emoji}</div>
                            <motion.div 
                              className="text-right"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Play className="w-6 h-6 text-white/80" />
                            </motion.div>
                          </div>
                          <h4 className="text-xl font-bold mb-1">{category.title}</h4>
                          <p className="text-sm opacity-90 mb-3">{category.description}</p>
                          
                          {/* Progress/Word count */}
                          <div className="flex items-center justify-between text-sm">
                            <span className="bg-white/20 px-3 py-1 rounded-full">
                              {category.wordCount}
                            </span>
                            <span className="opacity-75">
                              {category.example}
                            </span>
                          </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full"></div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card 
              padding="none" 
              className="bg-gradient-to-r from-accent-400 to-sunshine-500 text-white overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative p-6">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">🏆</span>
                        <h4 className="font-bold text-lg">Daily Challenge</h4>
                      </div>
                      <p className="text-accent-100 mb-3">
                        Complete today's special challenge for bonus rewards!
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-lg">💎</span>
                          <span className="font-bold">+50</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-lg">⭐</span>
                          <span className="font-bold">+100 XP</span>
                        </div>
                      </div>
                    </div>
                    <motion.div 
                      className="text-4xl ml-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎯
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      <Navigation />
      
      {/* Career Selection Modal */}
      <CareerSelectionModal
        isOpen={showCareerSelection}
        onClose={() => setShowCareerSelection(false)}
        onSelectCareer={handleCareerSelect}
      />
    </div>
  );
}




