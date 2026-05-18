import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../data/loveData';
import FloatingHearts from '../components/FloatingHearts';
import StarField from '../components/StarField';
import ConfettiEffect from '../components/ConfettiEffect';
import MemoryReveal from '../components/MemoryReveal';

const HeartBurstOverlay = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{ originX: '50%', originY: '50%' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: Math.cos((i / 16) * Math.PI * 2) * (120 + Math.random() * 80),
              y: Math.sin((i / 16) * Math.PI * 2) * (120 + Math.random() * 80),
              opacity: [1, 1, 0],
              scale: [0, 1.5, 0.5],
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {['❤️', '💕', '💖', '💗', '💓'][i % 5]}
          </motion.div>
        ))}
        <motion.div
          className="text-8xl"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.8, 1.4] }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 300 }}
        >
          💖
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const BrokenHeartOverlay = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-8xl"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1.5, 1.2], rotate: [-10, 10, -5, 5, 0] }}
          transition={{ duration: 0.8 }}
        >
          💔
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const wrongMessages = [
  "Oops! Not quite, my love~ Try again! 😜",
  "Aww, close but no kiss! 😘 Think harder!",
  "Your memory is slipping, sweetheart! 😂 Try once more!",
  "Nope! I know you know this one... 🙈",
  "That's not right! Remember our story 💕",
];

const JourneyScreen = () => {
  const { questionIndex } = useParams();
  const navigate = useNavigate();
  const qIndex = parseInt(questionIndex) || 0;
  const question = questions[qIndex];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [showBrokenHeart, setShowBrokenHeart] = useState(false);
  const [shakeIndex, setShakeIndex] = useState(null);
  const [wrongMsg, setWrongMsg] = useState('');
  const [confetti, setConfetti] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setAnswered(false);
    setIsCorrect(false);
    setShowMemory(false);
    setShowHeartBurst(false);
    setShowBrokenHeart(false);
    setShakeIndex(null);
    setWrongMsg('');
    setConfetti(false);
  }, [qIndex]);

  if (!question) {
    navigate('/celebration');
    return null;
  }

  const handleOption = (idx) => {
    if (answered) return;
    setSelectedIndex(idx);
    setAnswered(true);

    if (idx === question.correctIndex) {
      setIsCorrect(true);
      setShowHeartBurst(true);
      setConfetti(true);
      setTimeout(() => setShowHeartBurst(false), 1800);
      setTimeout(() => setShowMemory(true), 1200);
    } else {
      setIsCorrect(false);
      setShakeIndex(idx);
      setShowBrokenHeart(true);
      setWrongMsg(wrongMessages[Math.floor(Math.random() * wrongMessages.length)]);
      setTimeout(() => setShowBrokenHeart(false), 1500);
      setTimeout(() => {
        setSelectedIndex(null);
        setAnswered(false);
        setShakeIndex(null);
      }, 1800);
    }
  };

  const handleNext = () => {
    const next = qIndex + 1;
    if (next >= questions.length) {
      navigate('/celebration');
    } else {
      navigate(`/journey/${next}`);
    }
  };

  const progress = ((qIndex) / questions.length) * 100;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-8">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0d0018 0%, #1a0035 25%, #2d0050 50%, #1a0030 75%, #0d0018 100%)',
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600, top: '10%', left: '5%',
            background: 'radial-gradient(circle, rgba(244,63,94,0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <StarField count={40} />
      <FloatingHearts count={12} />
      <HeartBurstOverlay show={showHeartBurst} />
      <BrokenHeartOverlay show={showBrokenHeart} />
      {confetti && <ConfettiEffect active={confetti} duration={2500} />}

      <AnimatePresence mode="wait">
        {!showMemory ? (
          <motion.div
            key={`question-${qIndex}`}
            className="relative z-10 w-full max-w-lg mx-4"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Progress bar */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between text-white/40 text-xs mb-2 font-soft">
                <span>Question {qIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #f43f5e, #c084fc)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>

            {/* Question card */}
            <div
              className="glass-strong rounded-3xl p-8"
              style={{ boxShadow: '0 0 40px rgba(244,63,94,0.15), 0 30px 60px rgba(0,0,0,0.5)' }}
            >
              {/* Emoji */}
              <motion.div
                className="text-center text-5xl mb-4"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {question.emoji}
              </motion.div>

              {/* Question text */}
              <motion.h2
                className="font-romantic text-2xl font-bold text-white text-center mb-8 leading-snug"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {question.question}
              </motion.h2>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, idx) => {
                  let btnClass = 'option-btn';
                  if (answered && selectedIndex === idx) {
                    btnClass += isCorrect ? ' correct' : ' wrong';
                  } else if (answered && idx === question.correctIndex && isCorrect) {
                    btnClass += ' correct';
                  }

                  return (
                    <motion.button
                      key={idx}
                      className={`${btnClass} px-5 py-4 rounded-2xl font-soft text-sm flex items-center gap-3 ${shakeIndex === idx ? 'shake' : ''}`}
                      onClick={() => handleOption(idx)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      whileHover={!answered ? { x: 8 } : {}}
                    >
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: 'rgba(244,63,94,0.2)',
                          border: '1px solid rgba(244,63,94,0.3)',
                        }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {answered && selectedIndex === idx && (
                        <span className="text-lg">{isCorrect ? '✅' : '❌'}</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Wrong answer message */}
              <AnimatePresence>
                {answered && !isCorrect && wrongMsg && (
                  <motion.div
                    className="mt-5 text-center glass rounded-2xl p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-rose-300 text-sm font-soft italic">{wrongMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Correct feedback */}
              <AnimatePresence>
                {answered && isCorrect && (
                  <motion.div
                    className="mt-5 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <p className="text-emerald-400 font-romantic font-semibold text-lg">
                      That's right, my love! 💖
                    </p>
                    <p className="text-white/50 text-xs mt-1">Unlocking your memory...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <MemoryReveal
            key={`memory-${qIndex}`}
            memory={question}
            onNext={handleNext}
            isLast={qIndex === questions.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default JourneyScreen;
