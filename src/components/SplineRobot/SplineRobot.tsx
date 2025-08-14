import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SplineRobotProps {
  className?: string;
}

const SplineRobot: React.FC<SplineRobotProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Spline viewer script with error handling
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.39/build/spline-viewer.js';
    script.async = true;
    
    script.onload = () => {
      // Create spline-viewer element
      if (containerRef.current) {
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute('url', 'https://prod.spline.design/piGKhdki-YX8uQ-t/scene.splinecode');
        splineViewer.style.width = '100%';
        splineViewer.style.height = '100%';
        splineViewer.style.borderRadius = '16px';
        splineViewer.style.transform = 'scale(1.4)';
        splineViewer.style.transformOrigin = 'center center';
        
        // Clear container and append the viewer
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(splineViewer);
        
        // Hide the Spline watermark after a short delay
        setTimeout(() => {
          const hideWatermark = () => {
            // More comprehensive watermark selectors
            const watermarkSelectors = [
              '[data-spline-watermark]',
              '.spline-watermark',
              '[class*="watermark"]',
              '[class*="spline"]:not([class*="spline-viewer"])',
              '[class*="built"]',
              '[class*="attribution"]',
              '[class*="logo"]',
              '[class*="brand"]',
              '[class*="powered"]',
              '[class*="credit"]',
              '[class*="footer"]',
              '[class*="bottom"]',
              '[class*="corner"]',
              '[style*="bottom"]',
              '[style*="position: fixed"]',
              '[style*="position:fixed"]',
              '[style*="z-index"]',
              'a[href*="spline"]',
              'div[title*="Spline"]',
              'span[title*="Spline"]'
            ];
            
            watermarkSelectors.forEach(selector => {
              const elements = containerRef.current?.querySelectorAll(selector);
              elements?.forEach(element => {
                (element as HTMLElement).style.setProperty('display', 'none', 'important');
                (element as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
                (element as HTMLElement).style.setProperty('opacity', '0', 'important');
                (element as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
                (element as HTMLElement).style.setProperty('position', 'absolute', 'important');
                (element as HTMLElement).style.setProperty('z-index', '-1', 'important');
                (element as HTMLElement).style.setProperty('transform', 'translateX(-9999px)', 'important');
              });
            });
            
            // Also try to hide any elements with Spline-related text
            const allElements = containerRef.current?.querySelectorAll('*');
            allElements?.forEach(element => {
              const text = element.textContent?.toLowerCase() || '';
              const title = element.getAttribute('title')?.toLowerCase() || '';
              const href = element.getAttribute('href')?.toLowerCase() || '';
              
              if (text.includes('built with spline') || 
                  text.includes('spline') ||
                  text.includes('powered by') ||
                  title.includes('spline') ||
                  href.includes('spline')) {
                (element as HTMLElement).style.setProperty('display', 'none', 'important');
                (element as HTMLElement).style.setProperty('visibility', 'hidden', 'important');
                (element as HTMLElement).style.setProperty('opacity', '0', 'important');
                (element as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
                (element as HTMLElement).style.setProperty('position', 'absolute', 'important');
                (element as HTMLElement).style.setProperty('z-index', '-1', 'important');
                (element as HTMLElement).style.setProperty('transform', 'translateX(-9999px)', 'important');
              }
            });
          };
          
          // Initial hide attempt
          hideWatermark();
          
          // Set up a MutationObserver to catch dynamically added watermarks
          if (containerRef.current) {
            const observer = new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                  hideWatermark();
                }
              });
            });
            
            observer.observe(containerRef.current, {
              childList: true,
              subtree: true
            });
            
            // Clean up observer after 10 seconds
            setTimeout(() => {
              observer.disconnect();
            }, 10000);
          }
        }, 1000);
      }
    };

    script.onerror = (error) => {
      console.warn('Failed to load Spline viewer script:', error);
      // Optionally show a fallback or just hide the loading state
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="absolute inset-0 flex items-center justify-center bg-dark-200/50 backdrop-blur-sm">
            <div class="text-center">
              <p class="text-white/60 font-mono text-sm">3D Robot temporarily unavailable</p>
            </div>
          </div>
        `;
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      try {
        const existingScript = document.querySelector('script[src*="spline-viewer"]');
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }
      } catch (error) {
        console.warn('Error cleaning up Spline script:', error);
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          .spline-robot-container [data-spline-watermark],
          .spline-robot-container .spline-watermark,
          .spline-robot-container [class*="watermark"],
          .spline-robot-container [class*="spline"]:not([class*="spline-viewer"]),
          .spline-robot-container [class*="built"],
          .spline-robot-container [class*="attribution"],
          .spline-robot-container [class*="logo"],
          .spline-robot-container [class*="brand"],
          .spline-robot-container [class*="powered"],
          .spline-robot-container [class*="credit"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            position: absolute !important;
            z-index: -1 !important;
          }
          
          .spline-robot-container spline-viewer {
            border-radius: 20px;
            transform: scale(1.4) !important;
            transform-origin: center center !important;
          }
        `}
      </style>
      <motion.div
        ref={containerRef}
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
          height: '350px',
          maxWidth: '500px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0, 255, 136, 0.3)',
          border: '2px solid rgba(0, 255, 136, 0.4)'
        }}
      >
      {/* Loading placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-dark-200/50 backdrop-blur-sm">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-primary font-mono text-sm">Loading 3D Robot...</p>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default SplineRobot; 