import React from 'react';
import './FuturisticEffects.css';

interface FuturisticEffectsProps {
  enabled?: boolean;
}

const FuturisticEffects: React.FC<FuturisticEffectsProps> = ({ enabled = true }) => {
  if (!enabled) return null;

  return (
    <>
      {/* Neon Grid Background */}
      <div className="neon-grid fixed inset-0 pointer-events-none z-[45]" />
      
      {/* Enhanced Star Field */}
      <div className="fixed inset-0 pointer-events-none z-[46] overflow-hidden">
        {/* Tiny distant stars */}
        {Array.from({ length: 200 }).map((_, i) => {
          const size = Math.random() * 1.5 + 0.3;
          const brightness = Math.random() * 0.8 + 0.5; // Much brighter for testing
          const color = Math.random() > 0.85 ? 'rgba(0, 255, 136, ' : 'rgba(255, 255, 255, ';
          return (
            <div
              key={`tiny-${i}`}
              className="star-particle absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `${color}${brightness})`,
                boxShadow: `0 0 ${size * 3}px ${color}${brightness * 0.8})`, // Much stronger glow for testing
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${Math.random() * 6 + 4}s`,
                willChange: 'transform, opacity'
              }}
            />
          );
        })}

        {/* Medium twinkling stars */}
        {Array.from({ length: 80 }).map((_, i) => {
          const size = Math.random() * 2.5 + 1;
          const brightness = Math.random() * 0.8 + 0.3;
          const hasColor = Math.random() > 0.7;
          const color = hasColor ? 
            (Math.random() > 0.5 ? 'rgba(0, 255, 136, ' : 'rgba(0, 136, 255, ') : 
            'rgba(255, 255, 255, ';
          return (
            <div
              key={`medium-${i}`}
              className="star-particle absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `${color}${brightness})`,
                boxShadow: `
                  0 0 ${size * 2}px ${color}${brightness * 0.6}),
                  0 0 ${size * 4}px ${color}${brightness * 0.3})
                `,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
                willChange: 'transform, opacity'
              }}
            />
          );
        })}
        
        {/* Bright accent stars */}
        {Array.from({ length: 25 }).map((_, i) => {
          const size = Math.random() * 4 + 2.5;
          const starType = Math.random();
          let color, glowColor;
          
          if (starType > 0.8) {
            color = 'rgba(255, 0, 136, 1)'; // Pink
            glowColor = 'rgba(255, 0, 136, ';
          } else if (starType > 0.6) {
            color = 'rgba(0, 255, 136, 1)'; // Green
            glowColor = 'rgba(0, 255, 136, ';
          } else if (starType > 0.4) {
            color = 'rgba(0, 136, 255, 1)'; // Blue
            glowColor = 'rgba(0, 136, 255, ';
          } else {
            color = 'rgba(255, 255, 255, 1)'; // White
            glowColor = 'rgba(255, 255, 255, ';
          }
          
          return (
            <div
              key={`bright-${i}`}
              className="star-particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                boxShadow: `
                  0 0 ${size * 3}px ${glowColor}0.8),
                  0 0 ${size * 6}px ${glowColor}0.4),
                  0 0 ${size * 12}px ${glowColor}0.2)
                `,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 5 + 4}s`,
              willChange: 'transform, opacity'
            }}
          />
          );
        })}

        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none constellation-lines">
          {Array.from({ length: 8 }).map((_, i) => {
            const x1 = Math.random() * 100;
            const y1 = Math.random() * 100;
            const x2 = x1 + (Math.random() - 0.5) * 20;
            const y2 = y1 + (Math.random() - 0.5) * 20;
            return (
              <line
                key={`constellation-${i}`}
                x1={`${Math.max(0, Math.min(100, x1))}%`}
                y1={`${Math.max(0, Math.min(100, y1))}%`}
                x2={`${Math.max(0, Math.min(100, x2))}%`}
                y2={`${Math.max(0, Math.min(100, y2))}%`}
                stroke="rgba(0, 255, 136, 0.15)"
                strokeWidth="0.5"
                className="constellation-line"
                style={{
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 3 + 4}s`
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Ultra-Slow Graceful Falling Stars */}
      <div className="fixed inset-0 pointer-events-none z-[47] overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => {
          const speed = Math.random() * 6 + 8; // 8-14 seconds (much slower)
          const size = Math.random() * 2.5 + 1.5;
          const color = Math.random() > 0.6 ? 'rgba(0, 255, 136, ' : 'rgba(255, 255, 255, ';
          const brightness = Math.random() * 0.3 + 0.8; // 0.8-1.1 brightness - VERY bright for testing
          return (
            <div
              key={`falling-${i}`}
              className="falling-star absolute"
              style={{
                left: `${Math.random() * 120 - 10}%`, // Start slightly off-screen
                top: `-15px`,
                animationDelay: `${Math.random() * 25 + 8}s`, // 8-33s delay
                animationDuration: `${speed}s`,
                willChange: 'transform, opacity'
              }}
            >
              <div 
                className="falling-star-core"
                style={{
                  backgroundColor: `${color}${brightness})`,
                  width: `${size + 1}px`,
                  height: `${size + 1}px`,
                  boxShadow: `
                    0 0 ${(size + 1) * 3}px ${color}${brightness * 0.8}),
                    0 0 ${(size + 1) * 6}px ${color}${brightness * 0.5}),
                    0 0 ${(size + 1) * 9}px ${color}${brightness * 0.3})
                  `
                }}
              />
              <div 
                className="falling-star-trail"
                style={{
                  background: `linear-gradient(to bottom,
                    ${color}${brightness * 0.9}) 0%,
                    ${color}${brightness * 0.7}) 15%,
                    ${color}${brightness * 0.5}) 35%,
                    ${color}${brightness * 0.3}) 55%,
                    ${color}${brightness * 0.15}) 75%,
                    transparent 100%
                  )`,
                  height: `${70 + size * 12}px`,
                  width: '2px'
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Moving Asteroids */}
      <div className="fixed inset-0 pointer-events-none z-[44] overflow-hidden">
        {/* Small Asteroids */}
        {Array.from({ length: 6 }).map((_, i) => {
          const size = Math.random() * 15 + 10; // 10-25px
          const duration = Math.random() * 10 + 15; // 15-25s
          const delay = Math.random() * 20 + 5; // 5-25s delay
          const verticalPos = Math.random() * 60 + 20; // 20-80vh
          
          return (
            <div
              key={`asteroid-${i}`}
              className="asteroid"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${verticalPos}vh`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                willChange: 'transform, opacity'
              }}
            />
          );
        })}

        {/* Medium Asteroids */}
        {Array.from({ length: 4 }).map((_, i) => {
          const size = Math.random() * 20 + 20; // 20-40px
          const duration = Math.random() * 8 + 18; // 18-26s
          const delay = Math.random() * 25 + 8; // 8-33s delay
          const verticalPos = Math.random() * 50 + 25; // 25-75vh
          
          return (
            <div
              key={`asteroid-med-${i}`}
              className="asteroid"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${verticalPos}vh`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                willChange: 'transform, opacity'
              }}
            />
          );
        })}

        {/* Large Slow Asteroids */}
        {Array.from({ length: 2 }).map((_, i) => {
          const size = Math.random() * 30 + 35; // 35-65px
          const delay = Math.random() * 30 + 10; // 10-40s delay
          const verticalPos = Math.random() * 40 + 30; // 30-70vh
          
          return (
            <div
              key={`asteroid-large-${i}`}
              className="asteroid asteroid-large"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${verticalPos}vh`,
                animationDelay: `${delay}s`,
                willChange: 'transform, opacity'
              }}
            />
          );
        })}
      </div>



      {/* Corner Decorations - GPU Accelerated */}
      <div 
        className="fixed top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary pointer-events-none z-[49] cyber-corner" 
        style={{ willChange: 'opacity, box-shadow' }}
      />
      <div 
        className="fixed top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary pointer-events-none z-[49] cyber-corner" 
        style={{ willChange: 'opacity, box-shadow' }}
      />
      <div 
        className="fixed bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary pointer-events-none z-[49] cyber-corner" 
        style={{ willChange: 'opacity, box-shadow' }}
      />
      <div 
        className="fixed bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary pointer-events-none z-[49] cyber-corner" 
        style={{ willChange: 'opacity, box-shadow' }}
      />

      {/* Holographic Overlay */}
      <div className="holographic-overlay fixed inset-0 pointer-events-none z-[46]" />
    </>
  );
};

export default FuturisticEffects;
