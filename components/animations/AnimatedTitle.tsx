'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedTitle() {
  const title = "TIC TAC TOE";
  const letters = title.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center gradient-text mb-4"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
