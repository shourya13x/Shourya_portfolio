import React from 'react';
import { motion } from 'framer-motion';

interface RotatingWheelProps {
  size?: number;
  className?: string;
}

const RotatingWheel: React.FC<RotatingWheelProps> = ({ 
  size = 300, 
  className = "" 
}) => {
  // Tech terms to display around the wheel
  const techTerms = [
    'Code', 'Debug', 'Learn', 'Excel', 'Build', 'Test', 'Deploy', 'Scale'
  ];
  
  // Binary numbers for scattered effect
  const binaryNumbers = ['0', '1', '0', '1', '1', '0', '1', '0', '1', '0'];
  
  // Generate positions for tech terms in a circle
  const termPositions = techTerms.map((_, index) => {
    const angle = (index / techTerms.length) * 2 * Math.PI;
    const radius = size * 0.35;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotation: (angle * 180) / Math.PI + 90, // Rotate text to follow circle
    };
  });
  
  // Generate random positions for binary numbers
  const binaryPositions = binaryNumbers.map(() => {
    const angle = Math.random() * 2 * Math.PI;
    const radius = (size * 0.15) + (Math.random() * size * 0.25);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      delay: Math.random() * 2,
    };
  });

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Main Rotating Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Outer Circle Ring */}
        <div 
          className="absolute border-2 border-primary/30 rounded-full"
          style={{ 
            width: size * 0.8, 
            height: size * 0.8 
          }}
        />
        
        {/* Inner Circle Ring */}
        <div 
          className="absolute border border-secondary/20 rounded-full"
          style={{ 
            width: size * 0.6, 
            height: size * 0.6 
          }}
        />
        
        {/* Tech Terms Around the Circle */}
        {techTerms.map((term, index) => (
          <motion.div
            key={term}
            className="absolute flex items-center justify-center text-white font-semibold tracking-wider"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${termPositions[index].x}px, ${termPositions[index].y}px) rotate(${termPositions[index].rotation}deg)`,
              fontSize: `${size * 0.045}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <span className={`${term === 'Code' ? 'text-primary' : term === 'Debug' ? 'text-secondary' : term === 'Learn' ? 'text-yellow-400' : term === 'Excel' ? 'text-pink-400' : 'text-white'}`}>
              {term}
            </span>
          </motion.div>
        ))}
        
        {/* Center Dot */}
        <div className="absolute w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" 
             style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
      </motion.div>
      
      {/* Binary Numbers (Non-rotating) */}
      <div className="absolute inset-0">
        {binaryNumbers.map((number, index) => (
          <motion.div
            key={`binary-${index}`}
            className="absolute text-yellow-400 font-mono font-bold opacity-70"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${binaryPositions[index].x}px, ${binaryPositions[index].y}px)`,
              fontSize: `${size * 0.06}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.2, 1] 
            }}
            transition={{
              delay: binaryPositions[index].delay,
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {number}
          </motion.div>
        ))}
      </div>
      
      {/* Animated Arrows/Pointers */}
      <motion.div
        className="absolute"
        style={{
          left: '20%',
          top: '30%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          rotate: [0, 15, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute"
        style={{
          right: '25%',
          bottom: '35%',
          transform: 'translate(50%, 50%)',
        }}
        animate={{
          rotate: [0, -20, 20, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" className="text-secondary">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      
      {/* Glowing Effect */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
};

export default RotatingWheel;