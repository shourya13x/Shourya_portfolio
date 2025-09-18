import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

interface SplineRobotProps {
  className?: string;
  mouseVelocity?: { x: number; y: number };
}

const SplineRobot: React.FC<SplineRobotProps> = ({ className = '', mouseVelocity }) => {

  // Compute a responsiveness duration based on mouse velocity magnitude
  const { rotateX, rotateY, responseDuration } = useMemo(() => {
    const vx = mouseVelocity?.x ?? 0;
    const vy = mouseVelocity?.y ?? 0;
    const speed = Math.min(1, Math.sqrt(vx * vx + vy * vy));
    // Map speed (0..1) to duration (fast: 0.12s, slow: 0.5s)
    const duration = 0.5 - speed * 0.38;
    // Subtle parallax/tilt from velocity
    const tiltX = -(vy * 8); // invert so moving up tilts back
    const tiltY = vx * 12;
    return { rotateX: tiltX, rotateY: tiltY, responseDuration: Math.max(0.12, duration) };
  }, [mouseVelocity]);

  return (
    <motion.div
      className={`spline-robot-container ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      style={{
        width: '100%',
        height: '520px',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Outer motion wrapper to create a faster "look" response tied to mouse velocity */}
      <motion.div
        style={{ width: '100%', height: '100%' }}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'tween', ease: 'easeOut', duration: responseDuration }}
      >
        <Spline
          scene="https://prod.spline.design/5UkbzuOAfdpNRs3o/scene.splinecode"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SplineRobot; 