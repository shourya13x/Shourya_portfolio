import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface TouchRipple {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

interface TouchInteractionProps {
  enabled?: boolean;
  rippleColor?: string;
  rippleSize?: number;
  rippleDuration?: number;
}

const TouchInteraction: React.FC<TouchInteractionProps> = ({
  enabled = true,
  rippleColor = '#00FF88',
  rippleSize = 100,
  rippleDuration = 800
}) => {
  const [ripples, setRipples] = useState<TouchRipple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  const createRipple = useCallback((x: number, y: number) => {
    if (!enabled || !isMobile) return;

    const newRipple: TouchRipple = {
      id: `ripple-${Date.now()}-${Math.random()}`,
      x,
      y,
      timestamp: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, rippleDuration);
  }, [enabled, isMobile, rippleDuration]);

  const handleTouch = useCallback((event: TouchEvent) => {
    if (!enabled || !isMobile) return;

    const touch = event.touches[0] || event.changedTouches[0];
    if (touch) {
      createRipple(touch.clientX, touch.clientY);
    }
  }, [enabled, isMobile, createRipple]);

  useEffect(() => {
    if (!enabled || !isMobile) return;

    // Add touch event listeners
    document.addEventListener('touchstart', handleTouch, { passive: true });
    document.addEventListener('touchmove', handleTouch, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('touchmove', handleTouch);
    };
  }, [enabled, isMobile, handleTouch]);

  if (!enabled || !isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
    >
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full border-2 pointer-events-none"
          style={{
            left: ripple.x - rippleSize / 2,
            top: ripple.y - rippleSize / 2,
            width: rippleSize,
            height: rippleSize,
            borderColor: rippleColor,
            backgroundColor: `${rippleColor}20`
          }}
          initial={{
            scale: 0,
            opacity: 0.8
          }}
          animate={{
            scale: 2,
            opacity: 0
          }}
          transition={{
            duration: rippleDuration / 1000,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default TouchInteraction;