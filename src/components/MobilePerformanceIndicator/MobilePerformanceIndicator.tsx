import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, ZapOff } from 'lucide-react';

const MobilePerformanceIndicator: React.FC = () => {
  const [fps, setFps] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);
    
    if (!mobile) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = (currentTime: number) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const currentFPS = Math.round(frameCount * 1000 / (currentTime - lastTime));
        setFps(currentFPS);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    // Show indicator for 10 seconds on mobile
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 10000);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(timer);
    };
  }, []);

  if (!isMobile || !isVisible) return null;

  const getPerformanceColor = (fps: number) => {
    if (fps >= 45) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceIcon = (fps: number) => {
    return fps >= 30 ? Zap : ZapOff;
  };

  const PerformanceIcon = getPerformanceIcon(fps);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-16 left-4 z-40 bg-dark-200/90 backdrop-blur-md border border-primary/20 rounded-lg p-3"
    >
      <div className="flex items-center gap-2">
        <Smartphone size={16} className="text-primary" />
        <div className="flex items-center gap-1">
          <PerformanceIcon size={14} className={getPerformanceColor(fps)} />
          <span className="text-xs font-mono text-white/80">
            {fps} FPS
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MobilePerformanceIndicator;

