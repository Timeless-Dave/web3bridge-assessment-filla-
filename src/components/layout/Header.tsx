'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Trophy, User, Menu } from 'lucide-react';
import { GemCounter } from '@/components/game/GemCounter';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  title?: string;
  gems?: number;
  showGems?: boolean;
  onMenuClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Filla',
  gems = 0,
  showGems = true,
  onMenuClick,
  showBackButton = false,
  onBackClick,
}) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-coral-400 via-purple-500 to-turquoise-400 shadow-lg sticky top-0 z-50 overflow-hidden backdrop-blur-md"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {showBackButton ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackClick}
                leftIcon={<Home className="w-4 h-4" />}
                className="text-white hover:bg-white/20 border-white/30"
              >
                Back
              </Button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <motion.div 
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-2xl">🦉</span>
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-white drop-shadow-sm">{title}</h1>
                  <div className="text-xs text-white/80">Educational Game</div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {showGems && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
              >
                <GemCounter count={gems} />
              </motion.div>
            )}
            
            {onMenuClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                leftIcon={<Menu className="w-4 h-4" />}
                className="text-white hover:bg-white/20 border-white/30"
              >
                Menu
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

