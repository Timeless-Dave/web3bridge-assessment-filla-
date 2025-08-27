'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'sunshine' | 'coral' | 'turquoise';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  animated = true,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600',
    success: 'bg-gradient-to-r from-success-500 to-success-600',
    warning: 'bg-gradient-to-r from-sunshine-400 to-sunshine-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600',
    sunshine: 'bg-gradient-to-r from-sunshine-400 to-accent-500',
    coral: 'bg-gradient-to-r from-coral-400 to-coral-600',
    turquoise: 'bg-gradient-to-r from-turquoise-400 to-turquoise-600',
  };

  return (
    <div className={clsx('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || `${value} / ${max}`}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={clsx(
        'w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-200/50',
        sizeClasses[size]
      )}>
        <motion.div
          className={clsx(
            'h-full rounded-full transition-colors duration-200 relative overflow-hidden shadow-sm',
            colorClasses[color]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 1.2, ease: 'easeOut' } : { duration: 0 }}
        >
          {/* Shimmer effect */}
          {animated && (
            <>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.5,
                }}
              />
              
              {/* Sparkle effects for full progress */}
              {percentage >= 100 && (
                <>
                  <motion.div
                    className="absolute top-0 left-1/4 w-1 h-full bg-white opacity-60"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-0 right-1/3 w-1 h-full bg-white opacity-60"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  />
                </>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

