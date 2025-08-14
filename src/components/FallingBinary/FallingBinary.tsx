import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BinaryColumn {
  id: string;
  x: number;
  speed: number;
  characters: string[];
  positions: number[];
  opacity: number[];
}

interface FallingBinaryProps {
  enabled?: boolean;
  density?: number;
  speed?: number;
  className?: string;
}

// Performance detection
const getDevicePerformance = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency <= 4 || isMobile;
  const memoryInfo = (performance as any).memory;
  const hasLowMemory = memoryInfo ? memoryInfo.jsHeapSizeLimit < 1073741824 : false; // < 1GB
  
  return {
    isMobile,
    isLowEnd: isLowEnd || hasLowMemory,
    shouldDisable: isMobile && isLowEnd
  };
};

const FallingBinary: React.FC<FallingBinaryProps> = ({ 
  enabled = true, 
  density = 20,
  speed = 1,
  className = ""
}) => {
  const [columns, setColumns] = useState<BinaryColumn[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const performanceLevel = useMemo(() => getDevicePerformance(), []);

  // Adjust settings based on device performance
  const adjustedSettings = useMemo(() => ({
    density: performanceLevel.isMobile ? Math.min(density, 4) : 
             performanceLevel.isLowEnd ? Math.min(density, 6) : density,
    speed: performanceLevel.isMobile ? speed * 0.3 :
           performanceLevel.isLowEnd ? speed * 0.5 : speed,
    updateInterval: performanceLevel.isMobile ? 150 :
                    performanceLevel.isLowEnd ? 120 : 80, // Much lower FPS for mobile
    maxCharacters: performanceLevel.isMobile ? 4 :
                   performanceLevel.isLowEnd ? 6 : 12
  }), [density, speed, performanceLevel]);

  // Initialize columns based on screen width
  useEffect(() => {
    if (performanceLevel.shouldDisable) return;

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });

      const columnWidth = width / adjustedSettings.density;
      const newColumns: BinaryColumn[] = [];

      for (let i = 0; i < adjustedSettings.density; i++) {
        const columnHeight = Math.min(
          Math.floor(height / 25) + 5, 
          adjustedSettings.maxCharacters
        );
        const characters = Array.from({ length: columnHeight }, () => 
          Math.random() > 0.5 ? '1' : '0'
        );
        
        newColumns.push({
          id: `column-${i}`,
          x: i * columnWidth,
          speed: 0.3 + Math.random() * 1.5 * adjustedSettings.speed,
          characters,
          positions: characters.map((_, idx) => -idx * 25 - Math.random() * height),
          opacity: characters.map((_, idx) => Math.max(0.1, 0.8 - idx * 0.1))
        });
      }

      setColumns(newColumns);
    };

    updateDimensions();
    
    // Debounce resize events
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateDimensions, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [adjustedSettings, performanceLevel.shouldDisable]);

  // Optimized animation loop
  useEffect(() => {
    if (!enabled || columns.length === 0 || performanceLevel.shouldDisable) return;

    const animate = (currentTime: number) => {
      if (currentTime - lastUpdateRef.current > adjustedSettings.updateInterval) {
        setColumns(prevColumns => 
          prevColumns.map(column => {
            const newPositions = column.positions.map(pos => {
              const newPos = pos + column.speed * 15;
              return newPos > dimensions.height + 50 ? -Math.random() * dimensions.height * 0.5 : newPos;
            });

            // Less frequent character updates for better performance
            const shouldUpdateChars = Math.random() > 0.995;
            const newCharacters = shouldUpdateChars
              ? column.characters.map(() => Math.random() > 0.5 ? '1' : '0')
              : column.characters;

            return {
              ...column,
              positions: newPositions,
              characters: newCharacters
            };
          })
        );
        lastUpdateRef.current = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, columns.length, dimensions.height, adjustedSettings, performanceLevel.shouldDisable]);

  // Don't render on very low-end devices
  if (!enabled || performanceLevel.shouldDisable) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Simplified grid overlay for low-end devices */}
      {!performanceLevel.isLowEnd && (
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      )}
      
      {/* Falling binary columns */}
      <div className="absolute inset-0">
        {columns.map(column => (
          <div
            key={column.id}
            className="absolute top-0"
            style={{ left: column.x, width: '25px' }}
          >
            {column.characters.map((char, index) => (
              <div
                key={`${column.id}-${index}`}
                className="absolute font-mono font-bold"
                style={{
                  top: column.positions[index],
                  color: '#facc15',
                  opacity: Math.max(0.1, column.opacity[index] || 0),
                  fontSize: performanceLevel.isLowEnd ? '14px' : '16px',
                  lineHeight: performanceLevel.isLowEnd ? '18px' : '20px',
                  textShadow: performanceLevel.isLowEnd ? 'none' : `0 0 8px rgba(250, 204, 21, ${column.opacity[index] || 0.3})`,
                  willChange: 'transform'
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Simplified tech terms for better performance */}
      {!performanceLevel.isLowEnd && <OptimizedTechTerms />}
    </div>
  );
};

// Optimized tech terms component
const OptimizedTechTerms: React.FC = () => {
  const [terms, setTerms] = useState<Array<{
    id: string;
    text: string;
    x: number;
    y: number;
    opacity: number;
  }>>([]);

  const techTerms = [
    'Code', 'Debug', 'Build', 'Deploy', 'Scale', 'Optimize'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Reduced frequency and max terms for better performance
      if (Math.random() > 0.8 && terms.length < 4) {
        const newTerm = {
          id: `term-${Date.now()}`,
          text: techTerms[Math.floor(Math.random() * techTerms.length)],
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 50),
          opacity: 0.4 + Math.random() * 0.3
        };

        setTerms(prev => [...prev, newTerm]);

        // Shorter lifetime for better performance
        setTimeout(() => {
          setTerms(prev => prev.filter(term => term.id !== newTerm.id));
        }, 2000 + Math.random() * 1000);
      }
    }, 3000); // Less frequent updates

    return () => clearInterval(interval);
  }, [terms.length]);

  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        {terms.map(term => (
          <motion.div
            key={term.id}
            className="absolute text-white font-medium text-xs tracking-wide pointer-events-none"
            style={{
              left: term.x,
              top: term.y,
              opacity: term.opacity * 0.5,
              willChange: 'transform, opacity'
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8
            }}
            animate={{ 
              opacity: term.opacity * 0.5, 
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.5
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut"
            }}
          >
            {term.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FallingBinary;