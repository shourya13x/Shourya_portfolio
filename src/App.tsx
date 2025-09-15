import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import TechnicalExpertise from '@/components/TechnicalExpertise/TechnicalExpertise';
import Projects from '@/components/Projects/Projects';
import Experience from '@/components/Experience/Experience';
import Contact from '@/components/Contact/Contact';
import GitHubContributions from '@/components/GitHubContributions/GitHubContributions';
import CLI from '@/components/CLI/CLI';
import FuturisticEffects from '@/components/FuturisticEffects';
import ErrorBoundary from '@/components/ErrorBoundary';
import CLIToggleSlider from '@/components/CLIToggleSlider';
import FloatingActionButton from '@/components/FloatingActionButton';
import Footer from '@/components/Footer';
import { useViewMode, useDevice, usePerformanceMonitor } from '@/hooks';
import { cn } from '@/utils';

// Loading component
const LoadingScreen: React.FC = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-dark-300/98"
  >
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <div className="text-primary font-mono text-lg mb-2">
        <span className="typing-cursor">Initializing portfolio</span>
      </div>
      <div className="text-white/90 font-mono text-sm font-bold drop-shadow-glow">
        explore it and have fun 😎
      </div>
    </div>
  </motion.div>
);



// Performance monitor (development only)
const PerformanceMonitor: React.FC = () => {
  const metrics = usePerformanceMonitor();
  const [showMetrics, setShowMetrics] = useState(false);

  // Only show in development
  if (import.meta.env?.PROD) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={() => setShowMetrics(!showMetrics)}
        className="px-3 py-1 bg-dark-200/80 backdrop-blur-md border border-primary/20 rounded text-xs font-mono text-primary"
      >
        Perf
      </button>

      <AnimatePresence>
        {showMetrics && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2 p-3 bg-dark-200/90 backdrop-blur-md border border-primary/30 rounded text-xs font-mono text-primary space-y-1"
          >
            <div>FPS: {metrics.fps}</div>
            <div>Memory: {metrics.memoryUsage}MB</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};





const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { viewMode, toggleViewMode } = useViewMode();
  const { isMobile } = useDevice();
  


  // Avoid crashing the app due to benign global errors on some mobile browsers.
  // Rely on the top-level ErrorBoundary for render errors instead.
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Prevent noisy unhandled promise rejections from bubbling
      event.preventDefault();
      console.warn('Unhandled promise rejection (ignored):', event.reason);
    };

    const handleError = (event: ErrorEvent) => {
      // Log the error but don't crash the app
      console.warn('Global error caught:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  // Initialize app with performance-based loading
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Short loading time for mobile-optimized experience
        const loadingTime = 300;
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Initialization timeout')), 5000);
        });
        
        const loadingPromise = new Promise(resolve => setTimeout(resolve, loadingTime));
        
        await Promise.race([loadingPromise, timeoutPromise]);
        setIsLoading(false);
      } catch (error) {
        console.warn('Error during app initialization:', error);
        // Still set loading to false to show the app
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Prevent scroll when CLI mode is active on mobile and fix horizontal scrolling
  useEffect(() => {
    try {
      if (viewMode === 'cli' && isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.overflowX = 'hidden';
        document.body.style.touchAction = 'none';
      } else {
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden'; // Always prevent horizontal scroll
        document.body.style.touchAction = isMobile ? 'pan-y' : 'auto';
      }

      return () => {
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        document.body.style.touchAction = 'auto';
      };
    } catch (error) {
      console.warn('Error setting body overflow:', error);
    }
  }, [viewMode, isMobile]);

  // Add global touch prevention for horizontal swipes
  useEffect(() => {
    if (!isMobile) return;

    const preventHorizontalSwipe = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      
      let moveX = 0;
      let moveY = 0;
      
      const handleTouchMove = (moveEvent: TouchEvent) => {
        const moveTouch = moveEvent.touches[0];
        moveX = Math.abs(moveTouch.clientX - startX);
        moveY = Math.abs(moveTouch.clientY - startY);
        
        // If horizontal movement is greater than vertical, prevent it
        if (moveX > moveY && moveX > 10) {
          moveEvent.preventDefault();
        }
      };
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchstart', preventHorizontalSwipe, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', preventHorizontalSwipe);
    };
  }, [isMobile]);

  // Don't show mobile fallback - let the app load normally even with minor errors

  // Render continues; fatal render errors will be handled by ErrorBoundary in main.tsx

  return (
    <div 
      className={cn(
        'min-h-screen text-white antialiased relative',
        'selection:bg-primary/30 selection:text-white',
        'prevent-horizontal-scroll', // Apply mobile scroll fixes
        isMobile && 'mobile-safe' // Additional mobile safety
      )}
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden', // Prevent flicker
        touchAction: isMobile ? 'pan-y' : 'auto', // Only allow vertical scrolling on mobile
        WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
      }}
    >
      {/* Main Background - Semi-transparent to allow stars to show through */}
      <div className="fixed inset-0 bg-dark-300/95 z-[1]" />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Futuristic Background Effects - Always Active */}
          <ErrorBoundary>
            <FuturisticEffects enabled={true} />
          </ErrorBoundary>

          {/* Mouse Trail removed */}





          {/* CLI Toggle Slider */}
          <CLIToggleSlider
            viewMode={viewMode}
            onToggle={toggleViewMode}
          />

          {/* Performance Monitor (dev only) */}
          <PerformanceMonitor />

          <AnimatePresence mode="wait">
            {viewMode === 'gui' ? (
              <motion.div
                key="gui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-20"
                style={{ isolation: 'auto' }} // Don't create new stacking context
              >
                <Navigation />

                <main className={cn("relative", isMobile && "mobile-safe")} style={{ isolation: 'auto' }}>
                  {/* Ensure at least basic content shows */}
                  <div className={cn("min-h-screen flex flex-col", isMobile && "prevent-horizontal-scroll")}>
                    <Hero />
                    <About />
                    <GitHubContributions />
                    <TechnicalExpertise />
                    <Projects />
                    <Experience />
                    <Contact />

                    {/* Footer */}
                    <Footer />
                  </div>
                </main>

                {/* Scroll indicator */}
                <motion.div
                  className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="cli"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-0 z-[9999]"
              >
                <CLI />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vercel Analytics */}
          <Analytics />
        </>
      )}

      {/* Floating Action Button - Always visible, outside main container */}
      {!isLoading && (
        <FloatingActionButton
          viewMode={viewMode}
          onCLIToggle={toggleViewMode}
        />
      )}
    </div>
  );
};

export default App;