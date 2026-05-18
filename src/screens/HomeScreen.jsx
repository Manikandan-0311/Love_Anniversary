import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import StarField from '../components/StarField';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0d0015 0%, #200030 20%, #350050 40%, #200035 70%, #0d0015 100%)',
        }}
      />

      {/* Blur orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute"
          style={{
            width: 700, height: 700, top: '5%', left: '-10%',
            background: 'radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute"
          style={{
            width: 600, height: 600, bottom: '-5%', right: '-10%',
            background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <StarField count={50} />
      <FloatingHearts count={20} />

      {/* Main glassmorphism card */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-4"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          className="glass-strong rounded-3xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            boxShadow: '0 0 40px rgba(244,63,94,0.25), 0 0 80px rgba(244,63,94,0.1), 0 30px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Glowing border */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none z-20"
            style={{ border: '1px solid rgba(244,63,94,0.3)' }}
            animate={{
              boxShadow: [
                'inset 0 0 20px rgba(244,63,94,0.05)',
                'inset 0 0 40px rgba(244,63,94,0.15)',
                'inset 0 0 20px rgba(244,63,94,0.05)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Card content */}
          <div className="p-8 pb-10">
            {/* Title */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="font-romantic text-4xl font-bold text-white text-glow mb-1">
                Love Anniversary
              </h1>
              <motion.span
                className="text-3xl block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                ❤️
              </motion.span>
            </motion.div>

            {/* Couple Image */}
            <motion.div
              className="relative mx-auto mb-6 rounded-2xl overflow-hidden"
              style={{ maxWidth: 340, height: 240 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&q=80"
                alt="Our Love"
                className="w-full h-full object-cover"
                style={{ filter: 'saturate(1.2) brightness(0.85)' }}
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 40%, rgba(13,0,21,0.8) 100%)',
                }}
              />
              {/* Floating heart on image */}
              <motion.div
                className="absolute top-3 right-3 text-2xl"
                animate={{ scale: [1, 1.3, 1], rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💕
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="romantic-divider mb-4">
                <span className="text-rose-400 text-lg">✦</span>
              </div>
              <p
                className="text-xl text-rose-200 font-semibold"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                5 Years of Beautiful Memories Together
              </p>
              <p className="text-white/40 text-sm mt-2 font-soft">
                Every second with you is a treasure 💫
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { value: '5', label: 'Years', emoji: '🌹' },
                { value: '1825', label: 'Days', emoji: '💫' },
                { value: '∞', label: 'Love', emoji: '❤️' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-2xl p-3 text-center"
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <div className="text-lg mb-1">{stat.emoji}</div>
                  <div className="text-2xl font-bold text-rose-400 font-romantic">{stat.value}</div>
                  <div className="text-white/50 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Start Journey button */}
            <motion.button
              onClick={() => navigate('/journey/0')}
              className="btn-romantic w-full py-4 rounded-2xl text-white font-romantic font-bold text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="flex items-center justify-center gap-3"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Start Journey ✨
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeScreen;
