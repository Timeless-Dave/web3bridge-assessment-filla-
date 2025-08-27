'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem } from 'lucide-react';

interface GemCounterProps {
  count: number;
  showIncrease?: number;
  className?: string;
}

export const GemCounter: React.FC<GemCounterProps> = ({
  count,
  showIncrease,
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        className="flex items-center space-x-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={showIncrease ? { 
            scale: [1, 1.3, 1], 
            rotate: [0, 360, 360] 
          } : {}}
          transition={{ duration: 0.6 }}
        >
          <Gem className="w-5 h-5 fill-current" />
        </motion.div>
        <span className="font-bold text-sm">{count}</span>
      </motion.div>
      
      <AnimatePresence>
        {showIncrease && showIncrease > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: [0, -20, -40, -60],
              scale: [0.8, 1.2, 1, 0.8]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute pointer-events-none"
          >
            <div className="flex items-center space-x-1 text-green-500 font-bold text-lg">
              <Gem className="w-4 h-4 fill-current" />
              <span>+{showIncrease}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

