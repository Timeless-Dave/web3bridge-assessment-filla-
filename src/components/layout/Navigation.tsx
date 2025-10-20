'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Play, Trophy, User, Settings } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { icon: Home, label: 'Home', href: '/', emoji: '🏠', color: 'from-coral-400 to-coral-600' },
  { icon: Play, label: 'Games', href: '/game', emoji: '🎮', color: 'from-success-400 to-success-600' },
  { icon: Trophy, label: 'Leaderboard', href: '/leaderboard', emoji: '🏆', color: 'from-sunshine-400 to-accent-500' },
  { icon: User, label: 'Profile', href: '/profile', emoji: '👤', color: 'from-secondary-400 to-secondary-600' },
];

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-purple-200 shadow-2xl ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <motion.button
                key={item.href}
                onClick={() => router.push(item.href)}
                className="relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Background for active item */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Icon container */}
                <div className="relative z-10 flex flex-col items-center space-y-1">
                  <motion.div
                    className={`w-8 h-8 flex items-center justify-center rounded-xl ${
                      isActive 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors duration-200`}
                    whileHover={{ rotate: isActive ? 0 : 5 }}
                  >
                    <span className="text-lg">{item.emoji}</span>
                  </motion.div>
                  
                  <span className={`text-xs font-semibold transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`}>
                    {item.label}
                  </span>
                </div>
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 right-1/2 transform translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};




