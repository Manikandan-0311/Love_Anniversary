import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiHeart, FiMusic } from 'react-icons/fi';
import FloatingHearts from '../components/FloatingHearts';
import StarField from '../components/StarField';
import { CREDENTIALS } from '../data/loveData';

const LoginScreen = ({ onMusicToggle, musicPlaying }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      triggerError("Please fill in your name and secret code, my love 💕");
      return;
    }
    if (name.trim() !== CREDENTIALS.name || password.trim() !== CREDENTIALS.password) {
      triggerError("Hmm, that's not quite right... Try again, sweetheart 😘");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    navigate('/home');
  };

  const triggerError = (msg) => {
    setError(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 3500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Romantic gradient background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0d0015 0%, #1a002d 20%, #2d0045 40%, #1a0030 60%, #0d0020 80%, #050010 100%)',
        }}
      />

      {/* Radial glow orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            top: '10%', left: '10%',
            background: 'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: '10%', right: '10%',
            background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <StarField count={60} />
      <FloatingHearts count={18} />

      {/* Music toggle */}
      <motion.button
        onClick={onMusicToggle}
        className="fixed top-6 right-6 z-50 glass rounded-full p-3 text-rose-400 hover:text-rose-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={musicPlaying ? 'Pause music' : 'Play music'}
      >
        <FiMusic size={22} />
        {musicPlaying && (
          <motion.span
            className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Main card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="glass-strong rounded-3xl p-10 glow-rose">
          {/* Couple image */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden glow-rose-strong border-2 border-rose-400/40">
                <img
                  src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=300&q=80"
                  alt="Couple"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 text-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              >
                ❤️
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="font-romantic text-3xl font-bold text-white mb-2 text-glow">
              Welcome To Our
            </h1>
            <h1 className="font-romantic text-3xl font-bold text-rose-400 mb-3 text-glow">
              Love Story ❤️
            </h1>
            <div className="romantic-divider text-xs">
              <span>✦</span>
            </div>
            <p className="text-white/40 text-sm mt-3 font-soft italic">
              Enter your secret to unlock our memories...
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <motion.div
              className="relative"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400/70 z-10" size={18} />
              <input
                type="text"
                placeholder="Your Name, my love..."
                value={name}
                onChange={e => setName(e.target.value)}
                className="input-romantic w-full pl-12 pr-4 py-4 rounded-2xl text-sm font-soft"
              />
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400/70 z-10" size={18} />
              <input
                type="password"
                placeholder="Our secret code 🔐"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-romantic w-full pl-12 pr-4 py-4 rounded-2xl text-sm font-soft"
              />
            </motion.div>

            {/* Error message */}
            <AnimatePresence>
              {showError && (
                <motion.p
                  className="text-rose-400 text-sm text-center font-soft italic"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-romantic w-full py-4 rounded-2xl text-white font-romantic font-semibold text-lg mt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {loading ? (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Opening our love story...
                </motion.span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FiHeart />
                  Enter Our World
                  <FiHeart />
                </span>
              )}
            </motion.button>
          </form>

          <motion.p
            className="text-center text-white/25 text-xs mt-6 font-dancing italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            "Every love story is beautiful, but ours is my favorite."
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
