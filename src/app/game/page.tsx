'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Home, Pause, HelpCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { QuestionCard } from '@/components/game/QuestionCard';
import { ResultModal } from '@/components/game/ResultModal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useGameState } from '@/hooks/useGameState';
import { QuestionCategory } from '@/types/game';
import { triggerCelebration } from '@/utils/confetti';

export default function GamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as QuestionCategory;
  
  const {
    user,
    currentSession,
    startGameSession,
    answerQuestion,
    getNextQuestion,
    useHint,
    retryQuestion,
    isSessionCompleted,
    getProgress,
  } = useGameState();

  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (user && category && !currentSession) {
      const session = startGameSession(category);
      if (session) {
        setCurrentQuestion(getNextQuestion());
      }
    }
  }, [user, category, currentSession, startGameSession, getNextQuestion]);

  useEffect(() => {
    if (currentSession && !currentQuestion && !isSessionCompleted()) {
      setCurrentQuestion(getNextQuestion());
    }
  }, [currentSession, currentQuestion, getNextQuestion, isSessionCompleted]);

  const handleAnswer = (answer: string | number) => {
    const result = answerQuestion(answer);
    setLastResult(result);
    setShowResult(true);
    setShowHint(false);

    if (result.isCorrect) {
      triggerCelebration('correct');
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    
    if (isSessionCompleted()) {
      // Navigate to results page or back home
      router.push(`/game/results?session=${currentSession?.id}`);
    } else {
      setCurrentQuestion(getNextQuestion());
    }
  };

  const handleHint = () => {
    if (user && user.gems >= 1) {
      const success = useHint();
      if (success) {
        setShowHint(true);
      }
    }
  };

  const handleRetry = () => {
    if (user && user.gems >= 1) {
      const success = retryQuestion();
      if (success) {
        setShowResult(false);
        setShowHint(false);
      }
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleQuit = () => {
    router.push('/');
  };

  const progress = getProgress();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card padding="lg" className="text-center">
          <p className="text-gray-600 mb-4">Please set up your profile first</p>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </Card>
      </div>
    );
  }

  if (!currentSession || !currentQuestion) {
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-turquoise-100 via-blue-100 to-purple-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🌟</div>
        <div className="absolute top-40 right-16 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>✨</div>
        <div className="absolute bottom-40 right-12 text-3xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>💫</div>
        
        {/* Mountain silhouettes */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-success-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-32 bg-gradient-to-t from-success-300/40 to-transparent rounded-tr-full"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-28 bg-gradient-to-t from-turquoise-300/40 to-transparent rounded-tl-full"></div>
      </div>

      <Header
        title={`${category} Challenge`}
        gems={user.gems}
        showGems={true}
        showBackButton={true}
        onBackClick={handleQuit}
      />

      <main className="flex-1 p-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-coral-400 to-coral-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {progress.current + 1}
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Question {progress.current + 1} of {progress.total}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg">⭐</span>
                      <span className="font-semibold text-sunshine-600">{currentSession.score} points</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-lg">💎</span>
                      <span className="font-semibold text-secondary-600">{user.gems} gems</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePause}
                leftIcon={<Pause className="w-4 h-4" />}
                className="bg-white/80 hover:bg-white border-purple-200 hover:border-purple-300"
              >
                Pause
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>Progress</span>
                <span>{Math.round((progress.current / progress.total) * 100)}%</span>
              </div>
              <ProgressBar
                value={progress.current}
                max={progress.total}
                color="primary"
                animated={true}
              />
            </div>
          </motion.div>

          {/* Question */}
          <AnimatePresence mode="wait">
            {!isPaused && (
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                onAnswer={handleAnswer}
                onHint={user.gems >= 1 ? handleHint : undefined}
                showHint={showHint}
                disabled={showResult}
              />
            )}
          </AnimatePresence>

          {/* Pause Menu */}
          <AnimatePresence>
            {isPaused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  <Card padding="none" className="text-center overflow-hidden bg-white/95 backdrop-blur-sm border-2 border-purple-200 shadow-2xl max-w-sm w-full">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-coral-400 to-purple-500 p-6 text-white">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-4xl mb-2"
                      >
                        ⏸️
                      </motion.div>
                      <h3 className="text-2xl font-bold">Game Paused</h3>
                      <p className="text-coral-100 text-sm">Take a break and come back!</p>
                    </div>
                    
                    {/* Actions */}
                    <div className="p-6 space-y-4">
                      <Button
                        onClick={handlePause}
                        fullWidth
                        size="lg"
                        className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white font-bold btn-playful"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span>Resume Game</span>
                          <span className="text-xl">▶️</span>
                        </span>
                      </Button>
                      <Button
                        onClick={handleQuit}
                        fullWidth
                        variant="outline"
                        size="lg"
                        className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 btn-playful"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span>Quit Game</span>
                          <span className="text-xl">🚪</span>
                        </span>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Result Modal */}
      {lastResult && (
        <ResultModal
          isOpen={showResult}
          isCorrect={lastResult.isCorrect}
          correctAnswer={lastResult.question?.correctAnswer || ''}
          userAnswer={lastResult.userAnswer || ''}
          explanation={lastResult.question?.explanation}
          pointsEarned={lastResult.pointsGained || 0}
          gemsEarned={lastResult.gemsGained || 0}
          onNext={handleNextQuestion}
          onRetry={!lastResult.isCorrect && user.gems >= 1 ? handleRetry : undefined}
          showRetry={!lastResult.isCorrect && user.gems >= 1}
        />
      )}
    </div>
  );
}





