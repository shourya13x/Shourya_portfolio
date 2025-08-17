import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

interface SplineRobotProps {
  className?: string;
}

const SplineRobot: React.FC<SplineRobotProps> = ({ className = '' }) => {

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

      
              <Spline
          scene="https://prod.spline.design/5UkbzuOAfdpNRs3o/scene.splinecode"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
    </motion.div>
  );
};

export default SplineRobot; 