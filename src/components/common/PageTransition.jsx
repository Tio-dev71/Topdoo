import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageTransition — Framer Motion wrapper for page views
 * Provides smooth, subtle entrance animations matching modern SaaS apps
 */
export function PageTransition({ children, className = '', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ width: '100%', ...style }}
    >
      {children}
    </motion.div>
  );
}
