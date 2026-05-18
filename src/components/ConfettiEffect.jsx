import { useEffect, useRef } from 'react';
import canvasConfetti from 'canvas-confetti';

const ConfettiEffect = ({ active, duration = 3000 }) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    const end = Date.now() + duration;

    const colors = ['#f43f5e', '#fb7185', '#fda4af', '#c084fc', '#e879f9', '#facc15'];

    const frame = () => {
      canvasConfetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      canvasConfetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    return () => { hasRun.current = false; };
  }, [active, duration]);

  return null;
};

export default ConfettiEffect;
