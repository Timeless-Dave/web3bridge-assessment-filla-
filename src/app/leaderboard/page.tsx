'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Trophy, Medal, Star, Crown, Gem } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useGameState } from '@/hooks/useGameState';
import { loadLeaderboard } from '@/lib/storage';
import { fadeInUp, stagger } from '@/utils/animations';

interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number;
  rank: number;
  gems: number;
  level: number;
  streak: number;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const { user } = useGameState();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'allTime'>('allTime');

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    // Subscribe to realtime leaderboard updates
    const setupLeaderboard = async () => {
      try {
        const { subscribeLeaderboard } = await import('@/lib/realtime');
        unsubscribe = await subscribeLeaderboard((entries) => {
          setLeaderboard(entries);
        });
      } catch (error) {
        console.error('Error setting up leaderboard:', error);
        // Fallback to localStorage
        const data = loadLeaderboard();
        setLeaderboard(data);
      }
    };
    
    setupLeaderboard();
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-semibold">{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gray-100';
  };

  // Use only real leaderboard data - no mock data
  const displayLeaderboard = leaderboard;
  
  // Find current user's rank in the leaderboard
  const userRank = displayLeaderboard.findIndex(entry => entry.userId === user?.id) + 1;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sunshine-50 via-coral-50 to-turquoise-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-5xl opacity-20 animate-float">🏆</div>
        <div className="absolute top-40 right-16 text-4xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🎖️</div>
        <div className="absolute bottom-32 left-20 text-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🥇</div>
        <div className="absolute bottom-40 right-12 text-4xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
        
        {/* Celebration elements */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-sunshine-400 rounded-full opacity-40 animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-coral-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-turquoise-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '0.8s' }}></div>
      </div>

      <Header
        title="Leaderboard"
        gems={user?.gems || 0}
        showGems={true}
      />

      <main className="flex-1 p-4 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            {...fadeInUp}
            className="text-center bg-gradient-to-r from-sunshine-400 to-accent-500 rounded-3xl p-8 text-white overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">
                Leaderboard
              </h2>
              <p className="text-sunshine-100">
                You're Great! 🌟
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/10 rounded-full"></div>
          </motion.div>

          {/* Time Frame Selector */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-white/50 shadow-lg">
              {['daily', 'weekly', 'allTime'].map((frame) => (
                <Button
                  key={frame}
                  variant={timeFrame === frame ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimeFrame(frame as any)}
                  className={`mx-1 transition-all duration-300 ${
                    timeFrame === frame 
                      ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-white/50'
                  }`}
                >
                  {frame === 'allTime' ? 'All Time' : frame.charAt(0).toUpperCase() + frame.slice(1)}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Top 3 Podium */}
          {displayLeaderboard.length > 0 ? (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative mb-8"
            >
              {/* Podium Background */}
              <div className="bg-gradient-to-b from-sunshine-100 to-turquoise-100 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                
                {/* Podium Platforms */}
                <div className="relative z-10 flex items-end justify-center space-x-6">
                  {displayLeaderboard.slice(0, 3).map((player, index) => {
                  const positions = [1, 0, 2]; // Arrange as 2nd, 1st, 3rd
                  const actualIndex = positions[index];
                  const actualPlayer = displayLeaderboard[actualIndex];
                  const heights = ['h-24', 'h-32', 'h-20']; // 2nd, 1st, 3rd heights
                  const bgColors = [
                    'from-gray-300 to-gray-500', // 2nd place - silver
                    'from-sunshine-400 to-accent-500', // 1st place - gold
                    'from-amber-400 to-amber-600' // 3rd place - bronze
                  ];
                  const isFirst = actualPlayer.rank === 1;
                  
                  return (
                    <motion.div
                      key={actualPlayer.userId}
                      className="flex flex-col items-center"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Character Avatar */}
                      <motion.div
                        className={`relative mb-4 ${isFirst ? 'transform scale-110' : ''}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: isFirst ? 1.1 : 1, rotate: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring", bounce: 0.6 }}
                      >
                        <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white/50">
                          <span className="text-3xl">
                            {actualPlayer.rank === 1 ? '👑' : actualPlayer.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        </div>
                        
                        {/* Crown for first place */}
                        {isFirst && (
                          <motion.div
                            className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="text-2xl">👑</span>
                          </motion.div>
                        )}
                      </motion.div>
                      
                      {/* Player Info */}
                      <div className="text-center mb-3">
                        <h3 className="font-bold text-gray-800 text-sm truncate max-w-20">
                          {actualPlayer.name}
                        </h3>
                        <p className="text-xs text-gray-600 font-semibold">
                          {actualPlayer.score} PTS
                        </p>
                      </div>
                      
                      {/* Podium Base */}
                      <motion.div
                        className={`w-20 ${heights[index]} bg-gradient-to-t ${bgColors[index]} rounded-t-2xl flex items-center justify-center shadow-lg`}
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                      >
                        <span className="text-white font-bold text-2xl">
                          {actualPlayer.rank}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
          ) : (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-center py-12"
            >
              <Card className="bg-white/70 backdrop-blur-sm">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No Scores Yet!
                </h3>
                <p className="text-gray-600 mb-6">
                  Be the first to play and climb to the top of the leaderboard!
                </p>
                <Button
                  onClick={() => router.push('/')}
                  size="lg"
                  className="bg-gradient-to-r from-coral-500 to-coral-600"
                >
                  Play Now 🚀
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Full Leaderboard */}
          {displayLeaderboard.length > 0 && (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-2"
          >
            {displayLeaderboard.map((player, index) => (
              <motion.div
                key={player.userId}
                {...fadeInUp}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card 
                  className={`${
                    player.userId === user?.id 
                      ? 'ring-2 ring-coral-400 bg-gradient-to-r from-coral-50 to-purple-50 border-coral-200' 
                      : 'bg-white/70 backdrop-blur-sm border border-white/50'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                  hover={player.userId !== user?.id}
                >
                  <div className="flex items-center space-x-4 p-2">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-8 flex justify-center">
                      {getRankIcon(player.rank)}
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 truncate">
                        {player.name}
                        {player.userId === user?.id && (
                          <span className="ml-2 text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Level {player.level} • {player.streak} day streak
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-gray-800">
                          {player.score}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Gem className="w-3 h-3 text-purple-500" />
                        <span className="text-sm text-gray-600">
                          {player.gems}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          )}

          {/* Your Rank Card - Only show if user has played */}
          {user && userRank > 0 && (
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card 
                padding="none" 
                className="bg-gradient-to-r from-coral-400 to-secondary-500 text-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative p-6">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">🚀</span>
                          <h4 className="font-bold text-lg">Your Current Rank</h4>
                        </div>
                        <p className="text-coral-100 mb-3">
                          Keep playing to climb higher!
                        </p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <span className="text-lg">⭐</span>
                            <span className="font-bold">{user.xp} XP</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-lg">💎</span>
                            <span className="font-bold">{user.gems} gems</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <motion.div 
                          className="text-4xl font-bold mb-1"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {userRank > 0 ? `#${userRank}` : '--'}
                        </motion.div>
                        <div className="text-sm opacity-90">
                          {displayLeaderboard.length > 0 
                            ? `of ${displayLeaderboard.length} player${displayLeaderboard.length !== 1 ? 's' : ''}`
                            : 'Play to join!'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  );
}




