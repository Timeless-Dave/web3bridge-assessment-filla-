'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Home, BookOpen } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { fadeInUp } from '@/utils/animations';

export default function NotFound() {
  const { goBack, goHome, goToGame } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🔍</div>
        <div className="absolute top-40 right-16 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>❓</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🗺️</div>
        <div className="absolute bottom-40 right-12 text-3xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-coral-200 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-sunshine-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-turquoise-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '0.8s' }}></div>
      </div>

      <Header
        title="Filla"
        gems={0}
        showGems={false}
      />

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* 404 Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative"
          >
            {/* Main 404 Display */}
            <div className="relative mb-8">
              {/* Number 4 */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block text-9xl font-bold bg-gradient-to-br from-coral-400 to-coral-600 bg-clip-text text-transparent mr-4"
              >
                4
              </motion.div>

              {/* Owl mascot in place of 0 */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.6 }}
                className="inline-block relative mx-2"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-turquoise-400 to-turquoise-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <motion.span 
                    className="text-6xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🦉
                  </motion.span>
                </div>
                
                {/* Question mark thought bubble */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-8 -right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-turquoise-200"
                >
                  <span className="text-2xl">❓</span>
                </motion.div>
              </motion.div>

              {/* Number 4 */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="inline-block text-9xl font-bold bg-gradient-to-br from-secondary-400 to-secondary-600 bg-clip-text text-transparent ml-4"
              >
                4
              </motion.div>
            </div>

            {/* Decorative elements around the 404 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-4 left-4 text-3xl animate-float">⭐</div>
              <div className="absolute top-8 right-8 text-2xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
              <div className="absolute bottom-4 left-8 text-3xl animate-float" style={{ animationDelay: '2s' }}>🌟</div>
              <div className="absolute bottom-8 right-4 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>💫</div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found!
            </h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
              Our wise owl couldn't find this page! It might have flown away or never existed.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={goBack}
              size="lg"
              variant="outline"
              leftIcon={<ArrowLeft className="w-5 h-5" />}
              className="bg-white/80 hover:bg-white border-2 border-turquoise-300 hover:border-turquoise-400 text-turquoise-700 hover:text-turquoise-800 btn-playful"
            >
              Back
            </Button>

            <Button
              onClick={goHome}
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
              className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white btn-playful"
            >
              Go Home
            </Button>

            <Button
              onClick={goToGame}
              size="lg"
              leftIcon={<BookOpen className="w-5 h-5" />}
              className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white btn-playful"
            >
              Start Learning
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Motivational Section */}
      <motion.section
        {...fadeInUp}
        transition={{ delay: 1.4 }}
        className="relative z-10 p-4 pb-24"
      >
        <div className="max-w-4xl mx-auto">
          <Card 
            padding="none" 
            className="bg-gradient-to-r from-sunshine-400 to-accent-500 text-white overflow-hidden shadow-2xl"
          >
            <div className="relative p-8">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6, type: "spring", bounce: 0.6 }}
                  className="text-4xl mb-4"
                >
                  🚀
                </motion.div>
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Start Your Learning Adventure?
                </h2>
                <p className="text-sunshine-100 mb-6 max-w-2xl mx-auto">
                  Don't let a lost page stop your progress! Join thousands of learners improving their skills every day with fun, interactive challenges.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center space-x-2 text-sunshine-100">
                    <span className="text-lg">🎯</span>
                    <span className="text-sm">Personalized Learning</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sunshine-100">
                    <span className="text-lg">🏆</span>
                    <span className="text-sm">Achievement System</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sunshine-100">
                    <span className="text-lg">🔥</span>
                    <span className="text-sm">Daily Streaks</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
            </div>
          </Card>
        </div>
      </motion.section>

      <Navigation />
    </div>
  );
}
