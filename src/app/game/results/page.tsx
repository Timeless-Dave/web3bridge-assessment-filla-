'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Trophy, Star, Gem, Home, RotateCcw, Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useGameState } from '@/hooks/useGameState';
import { triggerCelebration } from '@/utils/confetti';
import { fadeInUp, bounceIn } from '@/utils/animations';

export default function GameResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');
  
  const { user, currentSession } = useGameState();

  useEffect(() => {
    if (currentSession?.completed) {
      triggerCelebration('levelUp');
    }
  }, [currentSession]);

  if (!user || !currentSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card padding="lg" className="text-center">
          <p className="text-gray-600 mb-4">Session not found</p>
          <Button onClick={() => router.push('/')}>Go Home</Button>
        </Card>
      </div>
    );
  }

  const totalQuestions = currentSession.questions.length;
  const answeredQuestions = currentSession.currentQuestionIndex;
  const accuracy = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  const score = currentSession.score;

  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { text: 'Excellent!', color: 'text-green-600', emoji: '🌟' };
    if (accuracy >= 75) return { text: 'Great Job!', color: 'text-blue-600', emoji: '🎉' };
    if (accuracy >= 60) return { text: 'Good Work!', color: 'text-yellow-600', emoji: '👍' };
    return { text: 'Keep Trying!', color: 'text-orange-600', emoji: '💪' };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <motion.div
          {...bounceIn}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Game Complete!
          </h1>
          <p className={`text-xl font-semibold ${performance.color}`}>
            {performance.emoji} {performance.text}
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white shadow-lg">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {score}
              </div>
              <div className="text-gray-600">Total Points</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Questions Answered</span>
                  <span className="font-semibold">{answeredQuestions} / {totalQuestions}</span>
                </div>
                <ProgressBar
                  value={answeredQuestions}
                  max={totalQuestions}
                  color="primary"
                  animated={true}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-semibold">{Math.round(accuracy)}%</span>
                </div>
                <ProgressBar
                  value={accuracy}
                  max={100}
                  color={accuracy >= 80 ? 'success' : accuracy >= 60 ? 'warning' : 'danger'}
                  animated={true}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Rewards */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <h3 className="text-lg font-semibold mb-4 text-center">
              🎁 Rewards Earned
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-xl font-bold">+{score}</div>
                <div className="text-sm opacity-90">XP Points</div>
              </div>
              <div className="text-center">
                <Gem className="w-8 h-8 mx-auto mb-2" />
                <div className="text-xl font-bold">+{Math.floor(score / 50)}</div>
                <div className="text-sm opacity-90">Gems</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <h4 className="font-semibold text-gray-800 mb-3">Session Stats</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium capitalize">{currentSession.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty</span>
                <span className="font-medium capitalize">{currentSession.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Played</span>
                <span className="font-medium">
                  {currentSession.endTime && currentSession.startTime
                    ? Math.round((new Date(currentSession.endTime).getTime() - new Date(currentSession.startTime).getTime()) / 60000)
                    : 0} min
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Button
            onClick={() => router.push(`/game?category=${currentSession.category}`)}
            fullWidth
            size="lg"
            leftIcon={<RotateCcw className="w-5 h-5" />}
          >
            Play Again
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            fullWidth
            size="lg"
            variant="outline"
            leftIcon={<Home className="w-5 h-5" />}
          >
            Home
          </Button>
        </motion.div>

        {/* Achievements */}
        {accuracy >= 90 && (
          <motion.div
            {...fadeInUp}
            transition={{ delay: 1.0 }}
          >
            <Card className="border-2 border-yellow-300 bg-yellow-50">
              <div className="text-center">
                <Target className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h4 className="font-semibold text-yellow-800 mb-1">
                  Achievement Unlocked!
                </h4>
                <p className="text-sm text-yellow-700">
                  Perfect Score - 90%+ accuracy!
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}





