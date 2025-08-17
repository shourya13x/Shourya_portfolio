import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TouchCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

const TouchCard: React.FC<TouchCardProps> = ({ 
  children, 
  className = '', 
  intensity = 1,
  glowColor = '#00FF88'
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D transforms
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  // Transform values
  const rotateX = useTransform(springY, [-100, 100], [15 * intensity, -15 * intensity]);
  const rotateY = useTransform(springX, [-100, 100], [-15 * intensity, 15 * intensity]);
  const scale = useTransform(springX, [-100, 100], [0.95, 1.05]);

  React.useEffect(() => {
    try {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    } catch (error) {
      console.warn('Error detecting mobile device in TouchCard:', error);
      setHasError(true);
    }
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    try {
      if (!isMobile) return;
      // Only handle single touches to avoid interfering with scrolling
      if (event.touches.length !== 1) return;
      
      setIsPressed(true);
      const touch = event.touches[0];
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((touch.clientX - centerX) * 0.5);
        y.set((touch.clientY - centerY) * 0.5);
      }
    } catch (error) {
      console.warn('Error in TouchCard touch start:', error);
      setHasError(true);
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    try {
      if (!isMobile || !isPressed) return;
      // Only handle single touches and don't interfere with scrolling
      if (event.touches.length !== 1) return;
      
      const touch = event.touches[0];
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((touch.clientX - centerX) * 0.5);
        y.set((touch.clientY - centerY) * 0.5);
      }
    } catch (error) {
      console.warn('Error in TouchCard touch move:', error);
      setHasError(true);
    }
  };

  const handleTouchEnd = () => {
    try {
      setIsPressed(false);
      x.set(0);
      y.set(0);
    } catch (error) {
      console.warn('Error in TouchCard touch end:', error);
      setHasError(true);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    try {
      if (isMobile) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) * 0.3);
        y.set((event.clientY - centerY) * 0.3);
      }
    } catch (error) {
      console.warn('Error in TouchCard mouse move:', error);
      setHasError(true);
    }
  };

  const handleMouseLeave = () => {
    try {
      if (isMobile) return;
      x.set(0);
      y.set(0);
    } catch (error) {
      console.warn('Error in TouchCard mouse leave:', error);
      setHasError(true);
    }
  };

  // Don't render if there's an error
  if (hasError) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`touch-card mobile-safe ${className}`}
      style={{
        rotateX,
        rotateY,
        scale: isMobile ? (isPressed ? 0.98 : 1) : scale,
        transformStyle: 'preserve-3d',
        touchAction: 'manipulation', // Allow system touch gestures but prevent double-tap zoom
        WebkitTouchCallout: 'none', // Disable iOS callout
        WebkitUserSelect: 'none', // Disable text selection
        userSelect: 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        boxShadow: isPressed 
          ? `0 10px 30px rgba(${hexToRgb(glowColor)}, 0.4), 0 0 20px rgba(${hexToRgb(glowColor)}, 0.3)`
          : `0 5px 15px rgba(${hexToRgb(glowColor)}, 0.2), 0 0 10px rgba(${hexToRgb(glowColor)}, 0.1)`
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative z-10"
        animate={{
          transform: isPressed ? 'translateZ(10px)' : 'translateZ(0px)'
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      
      {/* Touch feedback overlay */}
      {isMobile && isPressed && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, rgba(${hexToRgb(glowColor)}, 0.1) 0%, transparent 70%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  return '0, 255, 136'; // Default to primary color
};

export default TouchCard;