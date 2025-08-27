'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, QuestionType } from '@/types/game';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HelpCircle, Timer } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string | number) => void;
  onHint?: () => void;
  showHint?: boolean;
  timeLimit?: number;
  onTimeUp?: () => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onHint,
  showHint = false,
  timeLimit,
  onTimeUp,
  disabled = false,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(timeLimit || 0);

  React.useEffect(() => {
    if (timeLimit && timeLeft > 0 && !disabled) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && timeLimit && onTimeUp) {
      onTimeUp();
    }
  }, [timeLeft, timeLimit, disabled, onTimeUp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim() && !disabled) {
      onAnswer(userAnswer.trim());
    }
  };

  const handleMultipleChoice = (option: string) => {
    if (!disabled) {
      onAnswer(option);
    }
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = () => {
    switch (question.category) {
      case 'quantitative': return '🔢';
      case 'verbal': return '📝';
      case 'vocabulary': return '📖';
      case 'career': return '💼';
      default: return '❓';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-2xl mx-auto" padding="lg">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getCategoryIcon()}</span>
            <div>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor()}`}>
                {question.difficulty.toUpperCase()}
              </span>
              <p className="text-sm text-gray-600 mt-1 capitalize">
                {question.category.replace('_', ' ')} • {question.points} pts
              </p>
            </div>
          </div>
          
          {timeLimit && (
            <div className="flex items-center space-x-2 text-sm">
              <Timer className="w-4 h-4" />
              <span className={timeLeft <= 10 ? 'text-red-600 font-bold' : 'text-gray-600'}>
                {timeLeft}s
              </span>
            </div>
          )}
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {question.question}
          </h2>
          
          {question.career && (
            <p className="text-sm text-purple-600 bg-purple-50 p-2 rounded">
              💼 Career: {question.career}
            </p>
          )}
        </div>

        {/* Answer Input */}
        <div className="mb-6">
          {question.type === QuestionType.MULTIPLE_CHOICE && question.options ? (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleMultipleChoice(option)}
                  disabled={disabled}
                  className="w-full p-3 text-left border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!disabled ? { scale: 1.02 } : {}}
                  whileTap={!disabled ? { scale: 0.98 } : {}}
                >
                  <span className="font-medium text-gray-700">{option}</span>
                </motion.button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  disabled={disabled}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-lg text-center disabled:opacity-50 disabled:cursor-not-allowed"
                  autoComplete="off"
                />
              </div>
              <Button
                type="submit"
                fullWidth
                disabled={!userAnswer.trim() || disabled}
                size="lg"
              >
                Submit Answer
              </Button>
            </form>
          )}
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && question.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4"
            >
              <div className="flex items-start space-x-2">
                <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Hint:</p>
                  <p className="text-sm text-blue-700">{question.hint}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint Button */}
        {!showHint && question.hint && onHint && (
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={onHint}
              disabled={disabled}
              leftIcon={<HelpCircle className="w-4 h-4" />}
            >
              Need a hint? (Uses 1 gem)
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

