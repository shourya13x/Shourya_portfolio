import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/utils';

interface PlayArrowProps {
  className?: string;
}

const PlayArrow: React.FC<PlayArrowProps> = ({ className }) => {
  return (
    <motion.div
      className={cn(
        'absolute z-20 flex flex-col items-center gap-2',
        'text-white cursor-pointer group',
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Arrow Icon with Bouncy Animation */}
      <motion.div
        className="relative"
        animate={{
          y: [0, 8, 0],
        }}
        whileHover={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 0.8,
            ease: "easeInOut"
          }
        }}
      >
        <ArrowDown 
          size={32} 
          className="text-white drop-shadow-glow group-hover:text-primary transition-colors duration-300" 
        />
      </motion.div>
      
      {/* Text with Blinking Animation */}
      <motion.span
        className="text-sm font-mono text-white/90 group-hover:text-primary transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.4 }}
      >
        <motion.span
          animate={{
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Give me a spin!
        </motion.span>
        <motion.span 
          className="text-lg"
          animate={{
            opacity: [1, 0.5, 1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          👀⚡
        </motion.span>
      </motion.span>
      
      {/* Enhanced Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/25 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Additional glow layer */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20 blur-2xl"
        animate={{
          scale: [1.2, 1.4, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </motion.div>
  );
};

export default PlayArrow; 