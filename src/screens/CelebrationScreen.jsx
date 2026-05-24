import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import StarField from '../components/StarField';
import FireworksEffect from '../components/FireworksEffect';
import ConfettiEffect from '../components/ConfettiEffect';
import { couplePhotos } from '../data/loveData';

const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const PhotoSlideshow = ({ photos }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <img
            src={photos[current]}
            alt={`Memory ${current + 1}`}
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(1.3) brightness(0.75)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 40%, rgba(10,0,20,0.9) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {photos.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === current ? 20 : 6,
              background: i === current ? '#f43f5e' : 'rgba(255,255,255,0.4)',
            }}
            style={{ height: 6 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

const CelebrationScreen = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const years = useCounter(4, 2000, started);
  const days = useCounter(1460, 2500, started);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-8">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0a0015 0%, #1a0030 20%, #300050 45%, #1a0035 70%, #0a0015 100%)',
        }}
      />

      {/* Rotating glow orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[
          { color: '244,63,94', top: '5%', left: '5%', size: 600 },
          { color: '147,51,234', bottom: '5%', right: '5%', size: 500 },
          { color: '244,63,94', top: '40%', right: '10%', size: 400 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              bottom: orb.bottom,
              left: orb.left,
              right: orb.right,
              background: `radial-gradient(circle, rgba(${orb.color},0.12) 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i }}
          />
        ))}
      </div>

      <StarField count={80} />
      <FloatingHearts count={25} />
      <FireworksEffect active={started} />
      {started && <ConfettiEffect active duration={6000} />}

      <motion.div
        className="relative z-10 w-full max-w-lg mx-4"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div
          className="glass-strong rounded-3xl p-8"
          style={{ boxShadow: '0 0 60px rgba(244,63,94,0.3), 0 0 100px rgba(147,51,234,0.15), 0 40px 80px rgba(0,0,0,0.6)' }}
        >
          {/* Animated header */}
          <motion.div
            className="text-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="text-6xl mb-3"
              animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💑
            </motion.div>
            <h1
              className="text-4xl font-bold text-white text-glow mb-1"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Our Beautiful Journey
            </h1>
            <div className="romantic-divider my-3">
              <span className="text-rose-400">✦</span>
            </div>
          </motion.div>

          {/* Slideshow */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <PhotoSlideshow photos={couplePhotos} />
          </motion.div>

          {/* Animated counters */}
          <motion.div
            className="grid grid-cols-2 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {[
              { value: years, label: 'Years Together', suffix: '', emoji: '🌹', color: '#f43f5e' },
              { value: days, label: 'Days of Love', suffix: '+', emoji: '💫', color: '#c084fc' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="glass rounded-2xl p-4 text-center"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <motion.div
                  className="text-4xl font-bold font-romantic"
                  style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}80` }}
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-white/50 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Romantic quote */}
          <motion.div
            className="glass rounded-2xl p-5 mb-6 text-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'radial-gradient(circle at 50% 50%, #f43f5e 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <span className="text-rose-400/60 text-4xl font-serif leading-none block mb-2">"</span>
            <p
              className="text-white/90 text-base leading-relaxed relative z-10"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
            >
              No matter how many years pass, you will always be my favorite person ❤️
            </p>
            <span className="text-rose-400/60 text-4xl font-serif leading-none block mt-1">"</span>
          </motion.div>

          {/* Milestone badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {['💌 First Message', '💋 First Kiss', '💑 First Date', '✈️ First Trip', '💍 Forever'].map((badge, i) => (
              <motion.span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full font-soft"
                style={{
                  background: 'rgba(244,63,94,0.15)',
                  border: '1px solid rgba(244,63,94,0.3)',
                  color: 'rgba(255,200,210,0.9)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, background: 'rgba(244,63,94,0.3)' }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>

          {/* Forever note */}
          <motion.div
            className="glass rounded-2xl p-5 mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <h2
              className="text-2xl text-white font-romantic font-bold mb-3"
              style={{ textShadow: '0 0 18px rgba(244,63,94,0.55)' }}
            >
              Notes:
            </h2>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left">
              Namakulla inimel ethachum sanda vantha entha page eduthu paaru thangam. One dayku mela namakulla sanda venam papa, namma palayamari irukalam papa. Namakulla ipoo athigama palasu pesi tha sanda varuthu papa. Mudunjavara palasu nenaikama neyapgam paduthi pakama iru thangam.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Un santhosam tha papa enaku important. Ni nalla irukanumnu nenacha ethunalum enta ni direct ahh slu thangam, na accept pannipa. Ni ena tha sonnalum pannalum una na love pannitey tha papa irupa 😊.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Ipoolam enaku romba bayama iruku. Marupadium marupadium solra papa, sanda vantha namma web page eduthu paaru papa.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Butta ❤️ Buttu
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              I Love You Pondatti ❤️.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Vishali ❤️ Manikandan
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Happy Love Anniversary My Love ❤️.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Intha page unaku pudikumanu therila una na epoovumey force pannamata papa. ennala mudunja oru chinna web page panna namma love anniversaryku.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Un odambu enaku vena papa.Na ini kekamata papa.unaku thali kattunathuku apro na paathukara papa. odambu paathu una na love pannala papa😭😭.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Na ethula thappa pesi iruntha ena mannichuka papa 🙏.Na nalla paiya enkuda irukarthu unaku safety iruntha mattum ena kalayanam pannika papa .
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Enaku life unkuda valanumnu aasa iruku papa😊. unaku puducha ena ethuka papa.enaku romba aasa oru kudumbam appa kupda kolantha ellam venumnu papa sami enakunu ena eluthi vachu irukanu therila😭. Enakunu ellam intha mari sami kudupana illayanu  theirla papa . saami kudutha unmulama kudukattum illana ena kuptukattum 😊😊.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Ipoo na una hurt panni iruntha mannichuka papa 🙏.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Sikrama vanthu kuptukara Pondatti ❤️.
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Ummmmaaaaaaaa💋💋💋💋💋Papa
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-soft text-left mt-3">
              Papa ❤️ Mama
            </p>
          </motion.div>

          {/* Forever button */}
          <motion.button
            onClick={() => {
              setStarted(false);
              setTimeout(() => setStarted(true), 100);
            }}
            className="btn-romantic w-full py-4 rounded-2xl text-white font-romantic font-bold text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="flex items-center justify-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Forever Together ❤️
            </motion.span>
          </motion.button>

          {/* Replay journey */}
          <motion.button
            onClick={() => navigate('/home')}
            className="w-full mt-3 py-3 rounded-2xl text-white/50 font-soft text-sm"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}
            whileHover={{ color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(244,63,94,0.4)' }}
          >
            🔄 Relive the Journey
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CelebrationScreen;
