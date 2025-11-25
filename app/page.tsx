'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Gamepad2, User, Bot, Settings, Zap, Brain, Trophy, Sparkles, Users, TrendingUp, Target } from 'lucide-react';
import AnimatedTitle from '@/components/animations/AnimatedTitle';

export default function HomePage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-6xl space-y-8 sm:space-y-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center space-y-4 sm:space-y-6">
          <AnimatedTitle />
          
          {/* Subheading with Psychological Hook */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 dark:text-gray-300 light:text-slate-600 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Challenge the <span className="text-cyan-400 dark:text-cyan-400 light:text-blue-600 font-semibold">unbeatable AI</span> or play with friends.
            Master strategy, unlock achievements, and climb the leaderboard! 🎮
          </motion.p>

          {/* Social Proof Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-4"
          >
            {[
              { icon: Users, label: 'Players', value: '10K+' },
              { icon: Trophy, label: 'Games Played', value: '50K+' },
              { icon: TrendingUp, label: 'Win Rate', value: '94%' },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-sm sm:text-base">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <span className="text-gray-400">
                  <span className="font-bold text-white dark:text-white light:text-slate-800">{stat.value}</span> {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Game Mode Cards - Primary CTAs */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            Choose Your Challenge
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* PvP Mode */}
            <motion.button
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/game?mode=pvp')}
              className="group relative overflow-hidden glass rounded-3xl p-6 sm:p-8 border-2 border-white/20 hover:border-cyan-400/50 transition-all duration-300 text-left"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-cyan-500/20 rounded-xl">
                    <Users className="w-8 h-8 text-cyan-400" />
                  </div>
                  <span className="text-xs sm:text-sm bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full font-medium">
                    Popular
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">Player vs Player</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-slate-600 text-sm sm:text-base">
                    Challenge your friends on the same device. Perfect for quick matches and friendly competition! 🤝
                  </p>
                </div>

                <div className="flex items-center gap-2 text-cyan-400 font-medium text-sm sm:text-base">
                  <span>Start Playing</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.button>

            {/* AI Mode */}
            <motion.button
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/game?mode=pvai')}
              className="group relative overflow-hidden glass rounded-3xl p-6 sm:p-8 border-2 border-white/20 hover:border-pink-400/50 transition-all duration-300 text-left"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-pink-500/20 rounded-xl">
                    <Brain className="w-8 h-8 text-pink-400" />
                  </div>
                  <span className="text-xs sm:text-sm bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Powered
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">Player vs AI</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-slate-600 text-sm sm:text-base">
                    Test your skills against our advanced AI. 4 difficulty levels from Easy to Impossible! 🤖
                  </p>
                </div>

                <div className="flex items-center gap-2 text-pink-400 font-medium text-sm sm:text-base">
                  <span>Challenge AI</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            Why You'll Love It
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Brain,
                title: 'Unbeatable AI',
                description: 'Minimax algorithm with alpha-beta pruning. 4 difficulty levels!',
                color: 'purple',
              },
              {
                icon: Zap,
                title: 'Instant Feedback',
                description: 'Dopamine-triggering sounds, confetti, and motivational messages.',
                color: 'cyan',
              },
              {
                icon: Trophy,
                title: 'Track Progress',
                description: 'Win streaks, achievements, and persistent scoreboard.',
                color: 'yellow',
              },
              {
                icon: Sparkles,
                title: 'Beautiful Design',
                description: 'Glassmorphism UI with smooth Framer Motion animations.',
                color: 'pink',
              },
              {
                icon: Target,
                title: 'Strategic Depth',
                description: 'Master timing, positioning, and psychological tactics.',
                color: 'green',
              },
              {
                icon: Gamepad2,
                title: 'Responsive',
                description: 'Works perfectly on mobile, tablet, and desktop devices.',
                color: 'blue',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-3 sm:mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400 light:text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Settings CTA */}
        <motion.div variants={itemVariants} className="text-center space-y-4 pb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/settings')}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-medium transition-all border border-white/20 text-sm sm:text-base"
          >
            <Settings className="w-5 h-5" />
            Customize Settings
          </motion.button>
          
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 light:text-slate-500">
            Adjust difficulty, sounds, and theme preferences
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
