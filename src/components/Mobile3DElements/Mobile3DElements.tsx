import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Mobile3DElementsProps {
  enabled?: boolean;
}

const Mobile3DElements: React.FC<Mobile3DElementsProps> = ({ enabled = true }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Transform values for 3D effects
  const rotateX = useTransform(springY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);

  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    if (!isMobile) return;
    setIsPressed(true);
    const touch = event.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = touch.clientX - rect.left - rect.width / 2;
      const y = touch.clientY - rect.top - rect.height / 2;
      setTouchPosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!isMobile || !isPressed) return;
    const touch = event.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = touch.clientX - rect.left - rect.width / 2;
      const y = touch.clientY - rect.top - rect.height / 2;
      setTouchPosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    // Return to center
    mouseX.set(0);
    mouseY.set(0);
  };

  if (!enabled || !isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      {/* Interactive 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Interactive Sphere */}
        <motion.div
          ref={containerRef}
          className="absolute top-1/4 right-8 w-32 h-32 pointer-events-auto"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-sm"
            animate={{
              boxShadow: isPressed 
                ? '0 0 30px rgba(0, 255, 136, 0.6), inset 0 0 20px rgba(0, 255, 136, 0.2)'
                : '0 0 15px rgba(0, 255, 136, 0.3), inset 0 0 10px rgba(0, 255, 136, 0.1)'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Inner rotating element */}
            <motion.div
              className="absolute inset-4 rounded-full bg-primary/10 border border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center dot */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
              animate={{
                scale: isPressed ? 1.5 : 1,
                opacity: isPressed ? 1 : 0.7
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </motion.div>

        {/* Secondary Interactive Elements */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 pointer-events-auto"
            style={{
              left: `${20 + i * 30}%`,
              top: `${60 + (i % 2) * 20}%`,
              rotateX: useTransform(springY, [-200, 200], [10, -10]),
              rotateY: useTransform(springX, [-200, 200], [-10, 10])
            }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              mouseX.set((touch.clientX - window.innerWidth / 2) * 0.5);
              mouseY.set((touch.clientY - window.innerHeight / 2) * 0.5);
            }}
            whileTap={{ scale: 1.2, rotate: 180 }}
          >
            <motion.div
              className="w-full h-full rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 border border-secondary/30 backdrop-blur-sm"
              animate={{
                rotate: [0, 360],
                borderColor: isPressed ? 'rgba(0, 153, 255, 0.6)' : 'rgba(0, 153, 255, 0.3)'
              }}
              transition={{
                rotate: { duration: 12 + i * 2, repeat: Infinity, ease: "linear" },
                borderColor: { duration: 0.3 }
              }}
            >
              <div className="absolute inset-2 rounded border border-secondary/20" />
            </motion.div>
          </motion.div>
        ))}

        {/* Touch Feedback Particles */}
        {isPressed && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: touchPosition.x + window.innerWidth / 2,
              top: touchPosition.y + window.innerHeight / 2
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: -4,
                  top: -4
                }}
                animate={{
                  x: Math.cos((i * 60) * Math.PI / 180) * 30,
                  y: Math.sin((i * 60) * Math.PI / 180) * 30,
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Touch Instructions */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="bg-dark-200/80 backdrop-blur-md border border-primary/20 rounded-lg px-4 py-2">
          <div className="text-primary text-sm font-mono mb-1">👆 Touch & Drag</div>
          <div className="text-white/60 text-xs">Interactive 3D elements</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Mobile3DElements;