'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Star, Gem } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ResultModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  correctAnswer: string | number;
  userAnswer: string | number;
  explanation?: string;
  pointsEarned: number;
  gemsEarned: number;
  onNext: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  isCorrect,
  correctAnswer,
  userAnswer,
  explanation,
  pointsEarned,
  gemsEarned,
  onNext,
  onRetry,
  showRetry = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full relative z-[110]"
          >
            <Card padding="lg" className="text-center relative overflow-hidden z-[120]">
              {/* Background Animation */}
              {isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 3 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-green-200 to-green-300 opacity-20 rounded-lg"
                />
              )}
              
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="mb-4"
              >
                {isCorrect ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                )}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-2xl font-bold mb-2 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isCorrect ? '🎉 Correct!' : '😞 Incorrect'}
              </motion.h2>

              {/* Answer Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4 space-y-2"
              >
                {!isCorrect && (
                  <p className="text-gray-600">
                    <span className="font-medium">Your answer:</span> {userAnswer}
                  </p>
                )}
                <p className="text-gray-600">
                  <span className="font-medium">Correct answer:</span> {correctAnswer}
                </p>
              </motion.div>

              {/* Explanation */}
              {explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4 p-3 bg-blue-50 rounded-lg"
                >
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Explanation:</span> {explanation}
                  </p>
                </motion.div>
              )}

              {/* Rewards */}
              {isCorrect && (pointsEarned > 0 || gemsEarned > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 flex justify-center space-x-4"
                >
                  {pointsEarned > 0 && (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="font-semibold">+{pointsEarned}</span>
                    </div>
                  )}
                  {gemsEarned > 0 && (
                    <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      <Gem className="w-4 h-4" />
                      <span className="font-semibold">+{gemsEarned}</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3 relative z-[130]"
              >
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Continue button clicked!'); // Debug log
                    if (onNext) {
                      onNext();
                    }
                  }}
                  fullWidth
                  size="lg"
                  variant={isCorrect ? 'default' : 'secondary'}
                  type="button"
                >
                  {isCorrect ? 'Next Question' : 'Continue'}
                </Button>
                
                {showRetry && onRetry && !isCorrect && (
                  <Button
                    onClick={onRetry}
                    fullWidth
                    variant="outline"
                  >
                    Try Again (1 gem)
                  </Button>
                )}
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

