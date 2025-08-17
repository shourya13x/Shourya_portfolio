import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
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

// Navigation Bar Component
const NavigationBar: React.FC = () => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', isActive: true },
    { id: 'about', label: 'About', icon: '👤', isActive: false },
    { id: 'github', label: 'GitHub', icon: '🐙', isActive: false },
    { id: 'expertise', label: 'Expertise', icon: '⚡', isActive: false },
    { id: 'projects', label: 'Projects', icon: '<>', isActive: false },
    { id: 'experience', label: 'Experience', icon: '💼', isActive: false },
    { id: 'contact', label: 'Contact', icon: '✉️', isActive: false },
  ];

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                item.isActive
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'text-white hover:bg-gray-800/50 hover:text-gray-200'
              }`}
            >
              <span className="text-sm font-medium">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

// Performance detection with proper memoization
const getDevicePerformance = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const memoryInfo = (performance as any).memory;
  const hasLowMemory = memoryInfo ? memoryInfo.jsHeapSizeLimit < 1073741824 : false; // < 1GB
  const isLowEnd = hasLowMemory || isMobile;
  
  return {
    isMobile,
    isLowEnd,
    shouldDisable: false
  };
};

const FallingBinary: React.FC<FallingBinaryProps> = ({ 
  enabled = true, 
  density = 20,
  speed = 1,
  className = ""
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const columnsRef = useRef<BinaryColumn[]>([]);
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const resizeTimeoutRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const performanceLevel = useMemo(() => getDevicePerformance(), []);

  // Adjust settings based on device performance with proper memoization
  const adjustedSettings = useMemo(() => ({
    density: performanceLevel.isMobile ? Math.min(density, 3) : 
             performanceLevel.isLowEnd ? Math.min(density, 5) : Math.min(density, 12),
    speed: performanceLevel.isMobile ? speed * 0.4 :
           performanceLevel.isLowEnd ? speed * 0.6 : speed,
    updateInterval: performanceLevel.isMobile ? 200 :
                    performanceLevel.isLowEnd ? 150 : 100,
    maxCharacters: performanceLevel.isMobile ? 3 :
                   performanceLevel.isLowEnd ? 5 : 8
  }), [density, speed, performanceLevel.isMobile, performanceLevel.isLowEnd]);

  // Memoized column creation function
  const createColumns = useCallback((width: number, height: number): BinaryColumn[] => {
    const columnWidth = width / adjustedSettings.density;
    const newColumns: BinaryColumn[] = [];

    for (let i = 0; i < adjustedSettings.density; i++) {
      const columnHeight = Math.min(
        Math.floor(height / 30) + 3, 
        adjustedSettings.maxCharacters
      );
      const characters = Array.from({ length: columnHeight }, () => 
        Math.random() > 0.5 ? '1' : '0'
      );
      
      newColumns.push({
        id: `column-${i}`,
        x: i * columnWidth + Math.random() * 10, // Add slight randomness
        speed: 0.5 + Math.random() * 1.2 * adjustedSettings.speed,
        characters,
        positions: characters.map((_, idx) => -idx * 30 - Math.random() * height * 0.5),
        opacity: characters.map((_, idx) => Math.max(0.15, 0.9 - idx * 0.15))
      });
    }

    return newColumns;
  }, [adjustedSettings]);

  // Optimized resize handler with proper cleanup
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = window.setTimeout(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      columnsRef.current = createColumns(width, height);
    }, 300);
  }, [createColumns]);

  // Initialize dimensions and columns
  useEffect(() => {
    if (performanceLevel.shouldDisable) return;

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      columnsRef.current = createColumns(width, height);
    };

    updateDimensions();
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [handleResize, createColumns, performanceLevel.shouldDisable]);

  // Optimized animation loop using refs instead of state
  useEffect(() => {
    if (!enabled || performanceLevel.shouldDisable) return;

    let frameCount = 0;
    const targetFPS = performanceLevel.isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastUpdateRef.current > frameInterval) {
        frameCount++;
        
        // Update columns directly in ref for better performance
        columnsRef.current = columnsRef.current.map(column => {
          const newPositions = column.positions.map(pos => {
            const newPos = pos + column.speed * 12;
            return newPos > dimensions.height + 100 ? 
              -Math.random() * dimensions.height * 0.3 - 50 : newPos;
          });

          // Even less frequent character updates
          const shouldUpdateChars = frameCount % 100 === 0 && Math.random() > 0.98;
          const newCharacters = shouldUpdateChars
            ? column.characters.map(() => Math.random() > 0.5 ? '1' : '0')
            : column.characters;

          return {
            ...column,
            positions: newPositions,
            characters: newCharacters
          };
        });

        // Force re-render only when needed
        if (frameCount % 2 === 0) {
          if (containerRef.current) {
            containerRef.current.style.transform = `translateZ(0)`;
          }
        }

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
  }, [enabled, dimensions.width, dimensions.height, adjustedSettings, performanceLevel]);

  // Don't render on very low-end devices
  if (!enabled || performanceLevel.shouldDisable) return null;

  // Use a custom component to handle rendering optimization
  const renderColumns = () => {
    return columnsRef.current.map(column => (
      <div
        key={column.id}
        className="absolute top-0"
        style={{ 
          left: column.x, 
          width: '30px',
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'transform'
        }}
      >
        {column.characters.map((char, index) => (
          <div
            key={`${column.id}-${index}`}
            className="absolute font-mono font-bold select-none"
            style={{
              top: column.positions[index],
              color: '#facc15',
              opacity: Math.max(0.15, column.opacity[index] || 0.2),
              fontSize: performanceLevel.isMobile ? '13px' : performanceLevel.isLowEnd ? '14px' : '16px',
              lineHeight: performanceLevel.isMobile ? '16px' : performanceLevel.isLowEnd ? '18px' : '20px',
              textShadow: performanceLevel.isLowEnd ? 'none' : `0 0 6px rgba(250, 204, 21, ${(column.opacity[index] || 0.2) * 0.7})`,
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          >
            {char}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Navigation Bar */}
      <NavigationBar />
      
      {/* Simplified grid overlay for higher-end devices only */}
      {!performanceLevel.isLowEnd && !performanceLevel.isMobile && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'translateZ(0)'
          }}
        />
      )}
      
      {/* Falling binary columns with optimized rendering */}
      <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
        {renderColumns()}
      </div>

      {/* Tech terms only for non-mobile devices */}
      {!performanceLevel.isMobile && <OptimizedTechTerms />}
    </div>
  );
};

// Optimized tech terms component with proper cleanup
const OptimizedTechTerms: React.FC = React.memo(() => {
  const [terms, setTerms] = useState<Array<{
    id: string;
    text: string;
    x: number;
    y: number;
    opacity: number;
  }>>([]);
  
  const timeoutsRef = useRef<Set<number>>(new Set());
  const intervalRef = useRef<number>();

  const techTerms = useMemo(() => [
    'Code', 'Debug', 'Build', 'Deploy', 'Scale', 'Optimize'
  ], []);

  const addTerm = useCallback(() => {
    const newTerm = {
      id: `term-${Date.now()}-${Math.random()}`,
      text: techTerms[Math.floor(Math.random() * techTerms.length)],
      x: Math.random() * (window.innerWidth - 120),
      y: Math.random() * (window.innerHeight - 60),
      opacity: 0.3 + Math.random() * 0.2
    };

    setTerms(prev => {
      if (prev.length >= 3) return prev; // Limit max terms
      return [...prev, newTerm];
    });

    // Schedule removal with proper cleanup tracking
    const removeTimeout = setTimeout(() => {
      setTerms(prev => prev.filter(term => term.id !== newTerm.id));
      timeoutsRef.current.delete(removeTimeout);
    }, 2500 + Math.random() * 1500);
    
    timeoutsRef.current.add(removeTimeout);
  }, [techTerms]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (Math.random() > 0.85) {
        addTerm();
      }
    }, 4000);

    return () => {
      // Cleanup interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Cleanup all timeouts
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, [addTerm]);

  return (
    <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
      <AnimatePresence mode="popLayout">
        {terms.map(term => (
          <motion.div
            key={term.id}
            className="absolute text-white font-medium text-xs tracking-wider pointer-events-none select-none"
            style={{
              left: term.x,
              top: term.y,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.7,
              y: term.y + 20
            }}
            animate={{ 
              opacity: term.opacity, 
              scale: 1,
              y: term.y
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.6,
              y: term.y - 15
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {term.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

export default FallingBinary;