import { useState, useEffect, useCallback, useRef } from 'react';
import type { DeviceType, ViewMode, PerformanceMetrics } from '@/types';
import { throttle, createIntersectionObserver } from '@/utils';

// Custom hook for managing view mode (GUI/CLI)
export const useViewMode = (initialMode: ViewMode = 'gui') => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  
  const toggleViewMode = useCallback(() => {
    setViewMode(prev => {
      const newMode = prev === 'gui' ? 'cli' : 'gui';
      return newMode;
    });
  }, []);
  
  return { viewMode, setViewMode, toggleViewMode };
};

// Custom hook for device detection - Force mobile view for all devices
export const useDevice = () => {
  const [deviceType] = useState<DeviceType>('mobile'); // Force mobile view
  const [isMobile] = useState(true); // Force mobile detection
  
  return { deviceType, isMobile };
};

// Custom hook for managing visibility of elements
export const useVisibility = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = createIntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      { threshold }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, [threshold, hasBeenVisible]);
  
  return { isVisible, hasBeenVisible, elementRef };
};

// Custom hook for typing animation
export const useTypingAnimation = (
  texts: string[],
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenTexts = 2000
) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          // Finished typing, start deleting after delay
          setTimeout(() => setIsDeleting(true), delayBetweenTexts);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typeSpeed, deleteSpeed, delayBetweenTexts]);
  
  return currentText;
};

// Custom hook for mouse position
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = throttle((event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }, 16);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mousePosition;
};

// Custom hook for local storage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);
  
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);
  
  return [storedValue, setValue, removeValue] as const;
};

// Custom hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    renderTime: 0,
  });
  
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const frameCountRef = useRef<number>(0);
  
  useEffect(() => {
    try {
      // Monitor FPS
      const measureFPS = (timestamp: number) => {
        try {
          if (lastTimeRef.current) {
            frameCountRef.current++;
            
            if (timestamp - lastTimeRef.current >= 1000) {
              setMetrics(prev => ({
                ...prev,
                fps: Math.round(frameCountRef.current * 1000 / (timestamp - lastTimeRef.current!))
              }));
              
              frameCountRef.current = 0;
              lastTimeRef.current = timestamp;
            }
          } else {
            lastTimeRef.current = timestamp;
          }
          
          frameRef.current = requestAnimationFrame(measureFPS);
        } catch (error) {
          console.warn('Error in FPS measurement:', error);
          // Stop monitoring on error
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
        }
      };
      
      frameRef.current = requestAnimationFrame(measureFPS);
      
      // Monitor memory usage (if available)
      if ('memory' in performance) {
        const updateMemoryUsage = () => {
          try {
            const memory = (performance as any).memory;
            setMetrics(prev => ({
              ...prev,
              memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024)
            }));
          } catch (error) {
            console.warn('Error updating memory usage:', error);
          }
        };
        
        const memoryInterval = setInterval(updateMemoryUsage, 5000);
        
        return () => {
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
          clearInterval(memoryInterval);
        };
      }
      
      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    } catch (error) {
      console.warn('Error initializing performance monitor:', error);
      // Return cleanup function that does nothing
      return () => {};
    }
  }, []);
  
  return metrics;
};

// Custom hook for form handling
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: (values: T) => Partial<Record<keyof T, string>>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name] && validationSchema) {
      const newErrors = validationSchema({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  }, [values, touched, validationSchema]);
  
  const setFieldTouched = useCallback((name: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);
  
  const validateForm = useCallback(() => {
    if (!validationSchema) return true;
    
    const newErrors = validationSchema(values);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  }, [values, validationSchema]);
  
  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void
  ) => {
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validateForm]);
  
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateForm,
    handleSubmit,
    reset,
  };
};