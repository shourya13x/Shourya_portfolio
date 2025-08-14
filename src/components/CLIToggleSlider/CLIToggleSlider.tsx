import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Monitor } from 'lucide-react';
import { useViewMode } from '@/hooks';
import { cn } from '@/utils';

interface CLIToggleSliderProps {
  className?: string;
  showIcons?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
  viewMode?: 'gui' | 'cli';
  onToggle?: () => void;
}

const CLIToggleSlider: React.FC<CLIToggleSliderProps> = ({
  className = "",
  showIcons = true,
  showLabel = true,
  size = 'md',
  position = 'top-right',
  viewMode: propViewMode,
  onToggle: propOnToggle
}) => {
  // Use props if provided, otherwise fall back to hook
  const hookResult = useViewMode();
  const viewMode = propViewMode ?? hookResult.viewMode;
  const toggleViewMode = propOnToggle ?? hookResult.toggleViewMode;
  


  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  const sliderSizes = {
    sm: 'w-10 h-5',
    md: 'w-12 h-6',
    lg: 'w-14 h-7'
  };

  const knobSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  const getSliderOffset = () => {
    switch (size) {
      case 'sm': return 20;
      case 'md': return 24;
      case 'lg': return 28;
      default: return 24;
    }
  };

  return (
    <motion.div
      className={cn(
        'absolute z-[10000]',
        positionClasses[position],
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <motion.button
        onClick={() => {
          console.log('🔘 Toggle button clicked!');
          console.log('Current viewMode before toggle:', viewMode);
          toggleViewMode();
          console.log('Toggle function called');
        }}
        className={cn(
          'relative flex items-center gap-3 rounded-full font-mono',
          'bg-dark-200/90 backdrop-blur-md border border-primary/30',
          'hover:border-primary/50 transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-300',
          'shadow-lg shadow-primary/10',
          'cursor-pointer pointer-events-auto',
          sizeClasses[size]
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${viewMode === 'gui' ? 'CLI' : 'GUI'} mode`}
      >
        {/* Toggle Slider */}
        <div className={cn(
          'relative bg-dark-300 rounded-full border border-primary/20 overflow-hidden',
          sliderSizes[size]
        )}>
          <motion.div
            className={cn(
              'absolute top-0.5 left-0.5 bg-primary rounded-full shadow-lg',
              knobSizes[size]
            )}
            animate={{
              x: viewMode === 'cli' ? getSliderOffset() : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
            animate={{
              opacity: viewMode === 'cli' ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Icons */}
        {showIcons && (
          <div className="flex items-center gap-2">
            <Monitor 
              size={iconSizes[size]} 
              className={cn(
                'transition-colors duration-300',
                viewMode === 'gui' ? 'text-primary' : 'text-white/50'
              )} 
            />
            <Terminal 
              size={iconSizes[size]} 
              className={cn(
                'transition-colors duration-300',
                viewMode === 'cli' ? 'text-primary' : 'text-white/50'
              )} 
            />
          </div>
        )}
        
        {/* Text Label */}
        {showLabel && (
          <span className="text-primary font-medium">
            {viewMode === 'gui' ? 'CLI' : 'GUI'}
          </span>
        )}
      </motion.button>
    </motion.div>
  );
};

export default CLIToggleSlider; 