import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingText = ({ text, speed = 40, onComplete }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setDone(true);
        onComplete && onComplete();
      }
    }, speed);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          className="inline-block w-0.5 h-5 bg-rose-400 ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
};

const MemoryReveal = ({ memory, onNext, isLast }) => {
  const [textDone, setTextDone] = useState(false);

  const imageUrl = memory.memoryImage ||
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80';

  return (
    <motion.div
      className="relative z-10 w-full max-w-lg mx-4"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Polaroid style */}
      <motion.div
        className="glass-strong rounded-3xl p-6"
        style={{
          boxShadow: '0 0 60px rgba(244,63,94,0.3), 0 30px 80px rgba(0,0,0,0.6)',
        }}
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Memory title */}
        <motion.div
          className="text-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2
            className="text-2xl font-bold text-rose-400 text-glow"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {memory.memoryTitle}
          </h2>
        </motion.div>

        {/* Photo with cinematic zoom */}
        <motion.div
          className="relative rounded-2xl overflow-hidden mb-5"
          style={{ height: 250 }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          <motion.img
            src={imageUrl}
            alt="Memory"
            className="w-full h-full object-cover"
            animate={{ scale: [1, 1.08] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            style={{ filter: 'saturate(1.3) brightness(0.8)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 50%, rgba(10,0,20,0.85) 100%)',
            }}
          />
          {/* Sparkles overlay */}
          {['✨', '💫', '🌟'].map((s, i) => (
            <motion.span
              key={i}
              className="absolute text-xl"
              style={{
                top: `${20 + i * 25}%`,
                right: `${8 + i * 10}%`,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 2, delay: i * 0.7, repeat: Infinity }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* Memory text with typing animation */}
        <motion.div
          className="glass rounded-2xl p-4 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-white/85 text-sm leading-relaxed font-soft italic">
            <TypingText text={memory.memoryText} speed={30} onComplete={() => setTextDone(true)} />
          </p>
        </motion.div>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: textDone ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={onNext}
            className="btn-romantic w-full py-3 rounded-2xl text-white font-romantic font-semibold text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLast ? '🎉 See Our Celebration!' : '💕 Next Memory'}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryReveal;
