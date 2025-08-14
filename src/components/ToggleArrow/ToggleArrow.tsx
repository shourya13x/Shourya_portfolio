import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/utils';

interface ToggleArrowProps {
  className?: string;
}

const ToggleArrow: React.FC<ToggleArrowProps> = ({ className }) => {
  return (
    <motion.div
      className={cn(
        'absolute z-[9999] flex flex-col items-center gap-2',
        'text-white cursor-pointer group',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Arrow Icon */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ArrowUp 
          size={24} 
          className="text-white drop-shadow-glow group-hover:text-primary transition-colors duration-300" 
        />
      </motion.div>
      
      {/* Text */}
      <motion.span
        className="text-xs font-mono text-white/90 group-hover:text-primary transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.4 }}
      >
        toggle me
      </motion.span>
      
      {/* Enhanced Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-lg"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Additional glow layer */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/15 blur-xl"
        animate={{
          scale: [1.1, 1.3, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  );
};

export default ToggleArrow; 