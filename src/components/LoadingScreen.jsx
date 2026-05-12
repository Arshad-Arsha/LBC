import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Scissors SVG */}
      <motion.div
        initial={{ rotate: -15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: 24 }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="27" stroke="#D4AF37" strokeWidth="1.5" opacity="0.3" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fill="#D4AF37">
            ✂
          </text>
        </svg>
      </motion.div>

      <div className="loading-logo gold-text font-display text-2xl font-bold tracking-widest">
        LBC
      </div>



      <div className="loading-bar-track">
        <div className="loading-bar-fill" />
      </div>
    </motion.div>
  );
}
