import { useEffect, useRef } from 'react';
import canvasConfetti from 'canvas-confetti';

const FireworksEffect = ({ active }) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!active) {
      clearInterval(intervalRef.current);
      return;
    }

    const colors = ['#f43f5e', '#fb7185', '#c084fc', '#e879f9', '#facc15', '#34d399'];

    const launchFirework = () => {
      const x = Math.random();
      const y = Math.random() * 0.5;

      canvasConfetti({
        particleCount: 60,
        startVelocity: 45,
        spread: 360,
        origin: { x, y },
        colors,
        shapes: ['circle', 'square'],
        ticks: 200,
      });
    };

    launchFirework();
    intervalRef.current = setInterval(launchFirework, 1200);

    return () => clearInterval(intervalRef.current);
  }, [active]);

  return null;
};

export default FireworksEffect;
