import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

interface MouseTrailProps {
  enabled?: boolean;
  particleSize?: number;
  trailLength?: number;
  animationDuration?: number;
  throttleDelay?: number;
  glowColor?: string;
}

interface WavePoint {
  x: number;
  y: number;
  timestamp: number;
  id: string;
}

const MouseTrail: React.FC<MouseTrailProps> = ({
  enabled = true,
  particleSize = 6,
  trailLength = 8,
  animationDuration = 400,
  throttleDelay = 80,
  glowColor = '#00FF88'
}) => {
  const [wavePoints, setWavePoints] = useState<WavePoint[]>([]);
  const lastMouseMove = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  // Create wave effect by adding points along the mouse path
  const addWavePoint = useCallback((x: number, y: number) => {
    if (!enabled) return;

    const now = performance.now(); // Use high-resolution timer
    if (now - lastMouseMove.current < throttleDelay) return;
    lastMouseMove.current = now;

    const newPoint: WavePoint = {
      x,
      y,
      timestamp: now,
      id: `wave-${now}-${Math.random()}`
    };

    setWavePoints(prev => {
      // More efficient filtering and limiting
      const filtered = prev.filter(point => now - point.timestamp < animationDuration);
      const newPoints = [...filtered, newPoint];
      return newPoints.length > trailLength ? newPoints.slice(-trailLength) : newPoints;
    });
  }, [enabled, throttleDelay, animationDuration, trailLength]);

  // Mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
      addWavePoint(event.clientX, event.clientY);
    });
  }, [addWavePoint]);

  // Touch move handler for mobile - passive to allow scrolling
  const handleTouchMove = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch) {
      touchRef.current = { x: touch.clientX, y: touch.clientY };
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        addWavePoint(touch.clientX, touch.clientY);
      });
    }
  }, [addWavePoint]);

  // Touch start handler - passive to allow scrolling
  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch) {
      touchRef.current = { x: touch.clientX, y: touch.clientY };
      addWavePoint(touch.clientX, touch.clientY);
    }
  }, [addWavePoint]);

  // Auto-cleanup old points - optimized with requestAnimationFrame
  useEffect(() => {
    let cleanupFrameId: number;
    
    const cleanup = () => {
      const now = performance.now();
      setWavePoints(prev => {
        const filtered = prev.filter(point => now - point.timestamp < animationDuration);
        return filtered.length !== prev.length ? filtered : prev; // Only update if changed
      });
      cleanupFrameId = requestAnimationFrame(cleanup);
    };
    
    cleanupFrameId = requestAnimationFrame(cleanup);

    return () => {
      if (cleanupFrameId) {
        cancelAnimationFrame(cleanupFrameId);
      }
    };
  }, [animationDuration]);

  // Event listeners
  useEffect(() => {
    if (!enabled) return;

    // All events are passive to allow normal scrolling behavior
    const passiveOptions = { passive: true };
    
    // Mouse events for desktop
    window.addEventListener('mousemove', handleMouseMove, passiveOptions);
    
    // Touch events for mobile - passive to allow scrolling
    window.addEventListener('touchstart', handleTouchStart, passiveOptions);
    window.addEventListener('touchmove', handleTouchMove, passiveOptions);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [enabled, handleMouseMove, handleTouchMove, handleTouchStart]);

  if (!enabled || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{ 
        overflow: 'visible', // Allow effects to show everywhere
        touchAction: 'auto', // Allow normal touch actions like scrolling
        userSelect: 'none',   // Prevent text selection
        isolation: 'isolate' // Create new stacking context
      }}
    >

      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{ 
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: '99999'
        }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={glowColor} stopOpacity="0" />
            <stop offset="50%" stopColor={glowColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/> {/* Stronger glow */}
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Wave path */}
        {wavePoints.length > 1 && (
          <g>
            {/* Create smooth wave path */}
            <path
              d={createWavePath(wavePoints)}
              fill="none"
              stroke="#00FF88" // Direct color for debugging
              strokeWidth="8" // Much thicker for visibility
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              opacity={1} // Full opacity for debugging
            />
            
            {/* Wave particles */}
            {wavePoints.map((point) => {
              const age = performance.now() - point.timestamp;
              const progress = Math.min(age / animationDuration, 1); // Clamp to avoid negative values
              const opacity = Math.max(0, 1 - progress);
              const scale = Math.max(0.2, 1 - progress * 0.8);
              
              // Skip rendering if too faded
              if (opacity < 0.01) return null;
              
              return (
                <g key={point.id} style={{ willChange: 'transform, opacity' }}>
                  {/* Main particle - DEBUGGING */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={particleSize * scale}
                    fill="#00FF88" // Bright green for debugging
                    opacity={1} // Full opacity for debugging
                    stroke="#FFFFFF" // White border for visibility
                    strokeWidth="2"
                  />
                  
                  {/* Glow effect - only render if opacity is significant */}
                  {opacity > 0.1 && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={particleSize * scale * 2}
                      fill={glowColor}
                      opacity={opacity * 0.3}
                      style={{ willChange: 'opacity' }}
                    />
                  )}
                  
                  {/* Wave ripple effect - only early in animation */}
                  {progress < 0.5 && opacity > 0.2 && (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={particleSize * (1 + progress * 3)}
                      fill="none"
                      stroke={glowColor}
                      strokeWidth="1"
                      opacity={(1 - progress * 2) * 0.5}
                      style={{ willChange: 'opacity' }}
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </div>,
    document.body
  );
};

// Helper function to create smooth wave path
const createWavePath = (points: WavePoint[]): string => {
  if (points.length < 2) return '';

  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    const current = points[i];
    const previous = points[i - 1];
    
    // Create smooth curves between points
    const controlX = (previous.x + current.x) / 2;
    const controlY = (previous.y + current.y) / 2;
    
    // Add some wave-like variation
    const waveOffset = Math.sin(i * 0.5) * 5;
    
    path += ` Q ${controlX} ${controlY + waveOffset} ${current.x} ${current.y}`;
  }
  
  return path;
};

export default MouseTrail;