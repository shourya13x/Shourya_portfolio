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
import ProfileViews from '@/components/ProfileViews';
import CLI from '@/components/CLI/CLI';
import MouseTrail from '@/components/MouseTrail/MouseTrail';
import FallingBinary from '@/components/FallingBinary/FallingBinary';


import CLIToggleSlider from '@/components/CLIToggleSlider';
import ToggleArrow from '@/components/ToggleArrow';
import Footer from '@/components/Footer';
import PerformanceSettings from '@/components/PerformanceSettings';
import MobilePerformanceIndicator from '@/components/MobilePerformanceIndicator';
import TouchInteraction from '@/components/TouchInteraction';
import Mobile3DElements from '@/components/Mobile3DElements';
import MobileGestureGuide from '@/components/MobileGestureGuide';

import { useViewMode, useDevice, usePerformanceMonitor } from '@/hooks';
// import { PerformanceProvider, usePerformance } from '@/contexts/PerformanceContext';
import { cn } from '@/utils';

// Loading component
const LoadingScreen: React.FC = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-dark-300"
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

// Performance detection
const getDeviceCapabilities = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency <= 2; // More conservative threshold
  const memoryInfo = (performance as any).memory;
  const hasLowMemory = memoryInfo ? memoryInfo.jsHeapSizeLimit < 536870912 : false; // < 512MB

  return {
    isMobile,
    isLowEnd: isLowEnd || hasLowMemory,
    shouldReduceAnimations: isLowEnd || hasLowMemory,
    shouldDisableHeavyFeatures: isMobile && (isLowEnd || hasLowMemory)
  };
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { viewMode, toggleViewMode } = useViewMode();
  const { isMobile } = useDevice();
  const [deviceCapabilities] = useState(() => getDeviceCapabilities());

  // Error boundary effect with better error filtering
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      // Filter out certain non-critical errors
      const errorMessage = error.message?.toLowerCase() || '';
      const ignoredErrors = [
        'script error',
        'network error',
        'loading chunk',
        'non-error promise rejection'
      ];
      
      if (ignoredErrors.some(ignored => errorMessage.includes(ignored))) {
        console.warn('Non-critical error ignored:', error);
        return;
      }

      console.error('App Error:', error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.warn('Unhandled promise rejection:', event.reason);
      // Don't crash the app for unhandled promise rejections
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Initialize app with performance-based loading
  useEffect(() => {
    const initializeApp = async () => {
      // Much shorter loading time, especially for mobile
      const loadingTime = deviceCapabilities.isMobile ? 300 : 800;
      await new Promise(resolve => setTimeout(resolve, loadingTime));
      setIsLoading(false);
    };

    initializeApp();
  }, [deviceCapabilities.isMobile]);

  // Prevent scroll when CLI mode is active on mobile
  useEffect(() => {
    if (viewMode === 'cli' && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [viewMode, isMobile]);

  // Error fallback
  if (hasError) {
    return (
      <div className="min-h-screen bg-dark-300 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Something went wrong</h1>
          <p className="text-white/80 mb-4">Please refresh the page to try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-black rounded hover:bg-primary/80 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'min-h-screen bg-dark-300 text-white antialiased',
      'selection:bg-primary/30 selection:text-white'
    )}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Debug info for mobile (remove in production) */}
          {deviceCapabilities.isMobile && (
            <div className="fixed top-0 left-0 z-50 bg-red-500 text-white p-2 text-xs">
              Mobile: {deviceCapabilities.isMobile ? 'Yes' : 'No'} |
              ViewMode: {viewMode} |
              LowEnd: {deviceCapabilities.isLowEnd ? 'Yes' : 'No'}
            </div>
          )}

          {/* Falling Binary Animation - Reduced on mobile */}
          {!deviceCapabilities.shouldDisableHeavyFeatures && (
            <FallingBinary
              enabled={viewMode === 'gui'}
              density={deviceCapabilities.isMobile ? 3 : deviceCapabilities.isLowEnd ? 6 : 12}
              speed={deviceCapabilities.isMobile ? 0.5 : deviceCapabilities.isLowEnd ? 0.8 : 1.2}
              className={deviceCapabilities.isMobile ? "opacity-20" : deviceCapabilities.isLowEnd ? "opacity-30" : "opacity-50"}
            />
          )}

          {/* Mouse Trail Animation - Reduced on mobile */}
          {!deviceCapabilities.shouldDisableHeavyFeatures && (
            <MouseTrail
              enabled={viewMode === 'gui'}
              particleSize={deviceCapabilities.isMobile ? 8 : 16}
              trailLength={deviceCapabilities.isMobile ? 10 : 30}
              animationDuration={deviceCapabilities.isMobile ? 300 : 500}
              throttleDelay={deviceCapabilities.isMobile ? 100 : 60}
              glowColor="#00FF88"
              particleColor="#FFFFFF"
            />
          )}



          {/* CLI Toggle Slider */}
          <CLIToggleSlider
            viewMode={viewMode}
            onToggle={toggleViewMode}
          />

          {/* Toggle Arrow - positioned below CLI toggle */}
          <ToggleArrow className="top-20 right-4" />

          {/* Performance Monitor (dev only) */}
          <PerformanceMonitor />

          {/* Performance Settings */}
          <PerformanceSettings />

          {/* Mobile Performance Indicator */}
          <MobilePerformanceIndicator />

          {/* Touch Interaction Effects */}
          <TouchInteraction
            enabled={viewMode === 'gui'}
            rippleColor="#00FF88"
            rippleSize={80}
            rippleDuration={600}
          />

          {/* Mobile 3D Interactive Elements */}
          <Mobile3DElements enabled={viewMode === 'gui'} />

          {/* Mobile Gesture Guide */}
          <MobileGestureGuide />

          <AnimatePresence mode="wait">
            {viewMode === 'gui' ? (
              <motion.div
                key="gui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <Navigation />

                <main className="relative">
                  {/* Ensure at least basic content shows */}
                  <div className="min-h-screen flex flex-col">
                    <Hero />
                    <About />
                    <GitHubContributions />
                    <TechnicalExpertise />
                    <Projects />
                    <Experience />
                    <Contact />

                    {/* Profile Views Widget - At the end of portfolio */}
                    <ProfileViews />

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
    </div>
  );
};

export default App;