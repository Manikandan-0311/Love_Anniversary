import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = ({ count = 15, size = 'mixed' }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: size === 'mixed' ? (Math.random() * 24 + 10) : size,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 6,
      opacity: Math.random() * 0.5 + 0.2,
      color: ['#f43f5e', '#fb7185', '#e11d48', '#fda4af', '#c084fc', '#e879f9'][Math.floor(Math.random() * 6)],
    }));
  }, [count, size]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.left}%`, bottom: '-50px' }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 60, Math.cos(heart.id) * 40, 0],
            rotate: [0, 15, -15, 10, 0],
            opacity: [0, heart.opacity, heart.opacity, 0],
            scale: [0.5, 1, 1.1, 0.8],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            style={{ filter: `drop-shadow(0 0 6px ${heart.color})` }}
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
