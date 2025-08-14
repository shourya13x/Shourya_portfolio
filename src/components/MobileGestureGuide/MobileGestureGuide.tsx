import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Smartphone, Zap, X } from 'lucide-react';

const MobileGestureGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const seen = localStorage.getItem('mobile-gesture-guide-seen');
    
    setIsMobile(mobile);
    setHasSeenGuide(!!seen);

    if (mobile && !seen) {
      // Show guide after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('mobile-gesture-guide-seen', 'true');
    setHasSeenGuide(true);
  };

  if (!isMobile || hasSeenGuide) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Guide Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-full max-w-sm mx-4"
          >
            <div className="bg-dark-200/95 backdrop-blur-lg border border-primary/20 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="text-primary" size={24} />
                  <h3 className="text-lg font-bold text-white">Touch Interactions</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/60 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Touch & Drag */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Hand size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Touch & Drag</div>
                    <div className="text-white/60 text-xs">3D elements respond to your finger</div>
                  </div>
                </div>

                {/* Tap Effects */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Zap size={20} className="text-secondary" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Tap for Ripples</div>
                    <div className="text-white/60 text-xs">Touch anywhere for visual feedback</div>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <motion.div
                      className="w-5 h-5 bg-accent rounded"
                      animate={{ rotateY: [0, 180, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Interactive Cards</div>
                    <div className="text-white/60 text-xs">Cards tilt and glow with touch</div>
                  </div>
                </div>
              </div>

              {/* Demo Animation */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <div className="text-center">
                  <motion.div
                    className="inline-block w-12 h-12 bg-primary/20 rounded-full border-2 border-primary/40 mb-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(0, 255, 136, 0.4)',
                        '0 0 0 20px rgba(0, 255, 136, 0)',
                        '0 0 0 0 rgba(0, 255, 136, 0)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="text-primary text-sm font-medium">Try touching the floating elements!</div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full mt-4 px-4 py-2 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Got it! Let's explore
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileGestureGuide;