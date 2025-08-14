import React, { useEffect, useRef, useCallback } from 'react';

interface MouseTrailProps {
  enabled?: boolean;
  particleSize?: number;
  trailLength?: number;
  animationDuration?: number;
  throttleDelay?: number;
  glowColor?: string;
  particleColor?: string;
}

// Enhanced performance detection
const getPerformanceLevel = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency <= 4 || isMobile;
  
  // Check for very low-end devices
  const isVeryLowEnd = navigator.hardwareConcurrency <= 2 || 
                       (window.screen && window.screen.width < 400) ||
                       /Android.*4\.|Android.*5\./i.test(navigator.userAgent);
  
  return {
    isLowEnd,
    isMobile,
    isVeryLowEnd,
    hasWebGL: !!gl
  };
};

const MouseTrail: React.FC<MouseTrailProps> = ({
  enabled = true,
  particleSize = 10,
  trailLength = 50,
  animationDuration = 1000,
  throttleDelay = 20,
  glowColor = '#FFFFFF',
  particleColor = '#FFFFFF'
}) => {
  const lastMouseMove = useRef<number>(0);
  const particles = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const performanceLevel = useRef(getPerformanceLevel());
  const animationFrameId = useRef<number>();

  // Adjust settings based on device performance
  const adjustedSettings = {
    trailLength: performanceLevel.current.isVeryLowEnd ? 5 : 
                 performanceLevel.current.isLowEnd ? Math.min(trailLength, 10) : trailLength,
    throttleDelay: performanceLevel.current.isVeryLowEnd ? 100 :
                   performanceLevel.current.isLowEnd ? Math.max(throttleDelay, 80) : throttleDelay,
    animationDuration: performanceLevel.current.isVeryLowEnd ? animationDuration * 0.3 :
                       performanceLevel.current.isLowEnd ? animationDuration * 0.5 : animationDuration,
    particleSize: performanceLevel.current.isMobile ? particleSize * 0.6 : particleSize
  };

  // Disable on mobile devices for maximum smoothness
  const shouldDisable = performanceLevel.current.isMobile;

  // Throttled mouse move handler with performance optimization
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!enabled || shouldDisable) return;

    const now = Date.now();
    if (now - lastMouseMove.current < adjustedSettings.throttleDelay) return;
    lastMouseMove.current = now;

    // Use requestAnimationFrame for smoother performance
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
      createParticle(event.clientX, event.clientY);
    });
  }, [enabled, shouldDisable, adjustedSettings.throttleDelay]);

  // Optimized particle creation with object pooling concept
  const createParticle = useCallback((x: number, y: number) => {
    if (!containerRef.current || particles.current.length >= adjustedSettings.trailLength) {
      return;
    }

    const particle = document.createElement('div');
    
    // Use CSS classes instead of inline styles for better performance
    particle.className = 'mouse-trail-particle';
    particle.style.cssText = `
      position: fixed;
      left: ${x - adjustedSettings.particleSize / 2}px;
      top: ${y - adjustedSettings.particleSize / 2}px;
      width: ${adjustedSettings.particleSize}px;
      height: ${adjustedSettings.particleSize}px;
      border-radius: 50%;
      background-color: ${particleColor};
      ${performanceLevel.current.isLowEnd ? '' : `box-shadow: 0 0 ${adjustedSettings.particleSize}px ${glowColor};`}
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      transform: scale(1);
      transition: opacity ${adjustedSettings.animationDuration}ms ease-out, transform ${adjustedSettings.animationDuration}ms ease-out;
    `;

    containerRef.current.appendChild(particle);
    particles.current.push(particle);

    // Use requestAnimationFrame for animation
    requestAnimationFrame(() => {
      particle.style.opacity = '0';
      particle.style.transform = 'scale(0.3)';
    });

    // Cleanup with more efficient timeout
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      const index = particles.current.indexOf(particle);
      if (index > -1) {
        particles.current.splice(index, 1);
      }
    }, adjustedSettings.animationDuration);

  }, [adjustedSettings, particleColor, glowColor, performanceLevel.current.isLowEnd]);

  // Cleanup all particles
  const cleanupParticles = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    particles.current.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    particles.current = [];
  }, []);

  useEffect(() => {
    if (!enabled || shouldDisable) {
      cleanupParticles();
      return;
    }

    // Use passive listeners for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cleanupParticles();
    };
  }, [enabled, shouldDisable, handleMouseMove, cleanupParticles]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupParticles();
    };
  }, [cleanupParticles]);

  // Don't render on low-end mobile devices
  if (!enabled || shouldDisable) return null;

  return (
    <>
      <style>{`
        .mouse-trail-particle {
          will-change: opacity, transform;
        }
      `}</style>
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />
    </>
  );
};

export default MouseTrail;