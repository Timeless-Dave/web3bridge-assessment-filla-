'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft, Home } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { fadeInUp } from '@/utils/animations';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const { goBack, goHome } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">⚠️</div>
        <div className="absolute top-40 right-16 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🔧</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🛠️</div>
        <div className="absolute bottom-40 right-12 text-3xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
      </div>

      <Header
        title="Filla"
        gems={0}
        showGems={false}
      />

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Error Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative"
          >
            {/* Confused Owl */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.6 }}
              className="w-32 h-32 bg-gradient-to-br from-coral-400 to-coral-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl border-4 border-white"
            >
              <motion.span 
                className="text-6xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🦉
              </motion.span>
            </motion.div>

            {/* Error symbols around owl */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-4 left-4 text-3xl animate-float">⚠️</div>
              <div className="absolute top-8 right-8 text-2xl animate-float" style={{ animationDelay: '1s' }}>❗</div>
              <div className="absolute bottom-4 left-8 text-3xl animate-float" style={{ animationDelay: '2s' }}>🔧</div>
              <div className="absolute bottom-8 right-4 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>⚙️</div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Oops! Something Went Wrong!
            </h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
              Our wise owl encountered an unexpected error. Don't worry, we're working to fix it!
            </p>
            {process.env.NODE_ENV === 'development' && (
              <Card className="mt-4 p-4 bg-red-50 border-red-200">
                <p className="text-sm text-red-700 font-mono">{error.message}</p>
              </Card>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={reset}
              size="lg"
              leftIcon={<RefreshCw className="w-5 h-5" />}
              className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white btn-playful"
            >
              Try Again
            </Button>

            <Button
              onClick={goBack}
              size="lg"
              variant="outline"
              leftIcon={<ArrowLeft className="w-5 h-5" />}
              className="bg-white/80 hover:bg-white border-2 border-coral-300 hover:border-coral-400 text-coral-700 hover:text-coral-800 btn-playful"
            >
              Back
            </Button>

            <Button
              onClick={goHome}
              size="lg"
              leftIcon={<Home className="w-5 h-5" />}
              className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white btn-playful"
            >
              Go Home
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Help Section */}
      <motion.section
        {...fadeInUp}
        transition={{ delay: 1 }}
        className="relative z-10 p-4 pb-24"
      >
        <div className="max-w-4xl mx-auto">
          <Card 
            padding="none" 
            className="bg-gradient-to-r from-secondary-400 to-secondary-600 text-white overflow-hidden shadow-2xl"
          >
            <div className="relative p-8">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", bounce: 0.6 }}
                  className="text-4xl mb-4"
                >
                  🆘
                </motion.div>
                <h2 className="text-2xl font-bold mb-4">
                  Need Help?
                </h2>
                <p className="text-secondary-100 mb-6 max-w-2xl mx-auto">
                  If this error persists, please refresh the page or try again later. Your learning progress is always saved!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center space-x-2 text-secondary-100">
                    <span className="text-lg">💾</span>
                    <span className="text-sm">Auto-Save Progress</span>
                  </div>
                  <div className="flex items-center space-x-2 text-secondary-100">
                    <span className="text-lg">🔄</span>
                    <span className="text-sm">Quick Recovery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-secondary-100">
                    <span className="text-lg">🛡️</span>
                    <span className="text-sm">Safe Learning</span>
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
