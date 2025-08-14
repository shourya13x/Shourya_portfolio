// Haptic feedback utilities for mobile devices

export const hapticFeedback = {
  // Light tap feedback
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  },

  // Medium tap feedback
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  },

  // Strong tap feedback
  strong: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 10, 30]);
    }
  },

  // Success feedback
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 25, 50]);
    }
  },

  // Error feedback
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  },

  // Check if haptics are supported
  isSupported: () => {
    return 'vibrate' in navigator;
  }
};

// Hook for using haptic feedback in components
export const useHaptics = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isSupported = hapticFeedback.isSupported() && isMobile;

  return {
    light: isSupported ? hapticFeedback.light : () => {},
    medium: isSupported ? hapticFeedback.medium : () => {},
    strong: isSupported ? hapticFeedback.strong : () => {},
    success: isSupported ? hapticFeedback.success : () => {},
    error: isSupported ? hapticFeedback.error : () => {},
    isSupported
  };
};