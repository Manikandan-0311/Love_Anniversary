import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import JourneyScreen from './screens/JourneyScreen';
import CelebrationScreen from './screens/CelebrationScreen';
import './index.css';

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const startAmbientMusic = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.connect(ctx.destination);
    gainRef.current = gain;

    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.3 / notes.length, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start(ctx.currentTime + i * 0.5);
      oscillatorsRef.current.push(osc);
    });
  };

  const stopAmbientMusic = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch (_) {}
    });
    oscillatorsRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const handleMusicToggle = () => {
    if (musicPlaying) {
      stopAmbientMusic();
      setMusicPlaying(false);
    } else {
      startAmbientMusic();
      setMusicPlaying(true);
    }
  };

  useEffect(() => {
    return () => stopAmbientMusic();
  }, []);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#0a0010' }}>
        <Routes>
          <Route path="/" element={<LoginScreen onMusicToggle={handleMusicToggle} musicPlaying={musicPlaying} />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/journey/:questionIndex" element={<JourneyScreen />} />
          <Route path="/celebration" element={<CelebrationScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

