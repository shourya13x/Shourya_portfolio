import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, Briefcase, Mail, Zap, Github } from 'lucide-react';
import { cn, downloadResume } from '@/utils';
import type { NavigationItem } from '@/types';
import '@/components/FuturisticEffects/FuturisticEffects.css';

// Butter-smooth scrolling helper with distance-based duration, gentle easing, and cancellation
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

let activeScrollCancel: (() => void) | null = null;

const smoothScrollTo = (targetY: number, customDuration?: number) => {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    window.scrollTo({ top: targetY, behavior: 'auto' });
    return;
  }

  // Cancel any previous animation
  if (activeScrollCancel) {
    activeScrollCancel();
    activeScrollCancel = null;
  }

  const scroller = document.scrollingElement || document.documentElement;
  const startY = scroller.scrollTop;
  const distanceY = targetY - startY;
  const absDistance = Math.abs(distanceY);
  // Dynamic duration: quick for short jumps, capped for long jumps
  const duration = typeof customDuration === 'number'
    ? customDuration
    : Math.min(Math.max(180 + absDistance * 0.22, 240), 600);
  const startTime = performance.now();
  let rafId = 0;
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
    if (rafId) cancelAnimationFrame(rafId);
    removeInterruptionListeners();
  };

  const onUserInterruption = () => cancel();

  const addInterruptionListeners = () => {
    window.addEventListener('wheel', onUserInterruption, { passive: true, once: true });
    window.addEventListener('touchstart', onUserInterruption, { passive: true, once: true });
    window.addEventListener('pointerdown', onUserInterruption, { passive: true, once: true });
    window.addEventListener('keydown', onUserInterruption, { passive: true, once: true });
  };

  const removeInterruptionListeners = () => {
    window.removeEventListener('wheel', onUserInterruption as EventListener);
    window.removeEventListener('touchstart', onUserInterruption as EventListener);
    window.removeEventListener('pointerdown', onUserInterruption as EventListener);
    window.removeEventListener('keydown', onUserInterruption as EventListener);
  };

  activeScrollCancel = cancel;
  addInterruptionListeners();

  const step = (now: number) => {
    if (cancelled) return;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutSine(progress);
    const nextY = Math.round(startY + distanceY * eased);
    scroller.scrollTop = nextY;
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      removeInterruptionListeners();
      activeScrollCancel = null;
    }
  };

  rafId = requestAnimationFrame(step);
};

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '#hero', icon: 'Home' },
  { id: 'about', label: 'About', href: '#about', icon: 'User' },
  { id: 'github', label: 'GitHub', href: '#github-contributions', icon: 'Github' },
  { id: 'expertise', label: 'Expertise', href: '#expertise', icon: 'Zap' },
  { id: 'projects', label: 'Projects', href: '#projects', icon: 'Code' },
  { id: 'experience', label: 'Experience', href: '#experience', icon: 'Briefcase' },
  { id: 'contact', label: 'Contact', href: '#contact', icon: 'Mail' },
];

const getIcon = (iconName: string) => {
  const iconMap = {
    Home,
    User,
    Code,
    Briefcase,
    Mail,
    Zap,
    Github,
  };
  return iconMap[iconName as keyof typeof iconMap] || Home;
};

interface NavLinkProps {
  item: NavigationItem;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, onClick, className }) => {
  const Icon = getIcon(item.icon || 'Home');
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-3 px-5 py-2 rounded-xl text-sm transition-all duration-300 overflow-hidden',
        'focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-0',
        'backdrop-blur-sm group',
        isActive
          ? 'text-emerald-400'
          : 'text-white/80 hover:text-white',
        className
      )}
      style={{
        background: isActive 
          ? 'rgba(16, 185, 129, 0.15)' 
          : 'rgba(255, 255, 255, 0.05)',
        border: isActive 
          ? '1px solid rgba(16, 185, 129, 0.3)' 
          : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isActive 
          ? `
            0 0 24px rgba(16, 185, 129, 0.25),
            0 4px 16px rgba(16, 185, 129, 0.15),
            inset 0 1px 0 rgba(16, 185, 129, 0.2)
          `
          : `
            0 4px 16px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        backdropFilter: 'blur(10px)',
        isolation: 'isolate'
      }}
      whileHover={{ 
        scale: 1.08,
        y: -2,
        transition: { duration: 0.2, type: "spring", stiffness: 300 }
      }}
      whileTap={{ 
        scale: 0.95,
        y: 1,
        transition: { duration: 0.1 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label={`Navigate to ${item.label}`}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-emerald-400/5 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? 
          { scale: [0, 1.2, 1], opacity: [0, 0.3, 0] } : 
          { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      {/* Active state particles */}
      {isActive && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/80 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: '50%',
              }}
              animate={{
                y: [0, -8, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}
      
      {/* Icon with enhanced animation */}
      <motion.div
        animate={isActive ? {
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1],
        } : isHovered ? {
          rotate: [0, 3, 0],
          scale: [1, 1.05, 1],
        } : {
          rotate: 0,
          scale: 1,
        }}
        transition={{
          duration: isActive ? 1 : 0.3,
          ease: "easeInOut",
          repeat: isActive ? Infinity : 0,
        }}
        className="relative z-10"
      >
        <Icon size={18} />
      </motion.div>
      
      {/* Text with glow effect */}
      <motion.span 
        className="font-medium relative z-10"
        animate={isActive ? {
          textShadow: [
            '0 0 5px rgba(16, 185, 129, 0.3)',
            '0 0 10px rgba(16, 185, 129, 0.6)',
            '0 0 5px rgba(16, 185, 129, 0.3)'
          ],
        } : {
          textShadow: '0 0 0px transparent',
        }}
        transition={{
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {item.label}
      </motion.span>
      
      {/* Hover glow border */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 border border-emerald-400/40 rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Hide navigation when scrolling down, show when scrolling up
  const shouldHideNav = false; // Simplified for now
  
  // Verify all section IDs exist on mount
  useEffect(() => {
    const verifySections = () => {
      const missingSections = navigationItems.filter(item => {
        const element = document.getElementById(item.href.slice(1));
        return !element;
      });
      
      if (missingSections.length > 0) {
        console.warn('Navigation Warning: Missing sections:', 
          missingSections.map(s => `${s.id} (${s.href})`));
      }
    };
    
    // Check after a delay to ensure DOM is fully loaded
    const timeoutId = setTimeout(verifySections, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  // Handle section detection based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.href.slice(1))
      }));
      
      // Find the section that's currently in view
      const currentSection = sections.find(section => {
        if (!section.element) return false;
        
        const rect = section.element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Consider a section active if it's in the top 1/3 of the viewport
        return rect.top <= windowHeight * 0.33 && rect.bottom >= windowHeight * 0.33;
      });
      
      if (currentSection) {
        if (currentSection.id !== activeSection) {
          setActiveSection(currentSection.id);
        }
      } else {
        // If no section is found, check if we're at the top
        if (window.scrollY < 100) {
          if (activeSection !== 'home') {
            setActiveSection('home');
          }
        }
      }
    };
    
    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [activeSection]);
  
  const handleNavClick = (href: string, id: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      // Add offset for fixed navigation
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      // Butter-smooth scroll with easing
      smoothScrollTo(elementPosition, 950);
      
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: shouldHideNav ? -100 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-30 hidden lg:block"
      >
        <div className="container-page py-4">
          <div className="flex items-center justify-center">
            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 rounded-full px-6 py-3"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(255, 255, 255, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                isolation: 'isolate'
              }}
            >
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative"
                >
                  <NavLink
                    item={item}
                    isActive={activeSection === item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: shouldHideNav ? -100 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-30"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `
              0 4px 20px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            `
          }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            {/* Enhanced Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="relative p-2 rounded-lg transition-all duration-300 overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: `
                  0 4px 16px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 8px 25px rgba(0, 255, 136, 0.2)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.9,
                rotate: -5,
                transition: { duration: 0.1 }
              }}
              aria-label="Toggle menu"
            >
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg"
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[80vw] border-l"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: `
                    -4px 0 20px rgba(0, 0, 0, 0.3),
                    inset 1px 0 0 rgba(255, 255, 255, 0.05)
                  `,
                  touchAction: 'pan-y', // Only allow vertical scrolling in menu
                  overflowX: 'hidden' // Prevent horizontal overflow in menu
                }}
              >
                <div className="flex flex-col h-full pt-20 px-6">
                  {/* Navigation Links */}
                  <nav className="flex-1">
                    <div className="space-y-2">
                      {navigationItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <NavLink
                            item={item}
                            isActive={activeSection === item.id}
                            onClick={() => handleNavClick(item.href, item.id)}
                            className="w-full justify-start relative"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </nav>
                  
                  {/* Resume Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pb-6"
                  >
                    <button 
                      className="btn-primary w-full"
                      onClick={downloadResume}
                    >
                      Download Resume
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      
      {/* Enhanced Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-20 h-1 bg-dark-200/50 backdrop-blur-sm"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        {/* Main progress bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden"
          style={{
            scaleX: Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1),
            transformOrigin: '0%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              width: '20%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
            }}
            animate={{
              x: ['-100%', '500%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
          />
        </motion.div>
        
        {/* Progress indicator dots */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          {navigationItems.map((item, index) => {
            const progress = Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
            const sectionProgress = index / (navigationItems.length - 1);
            const isActive = progress >= sectionProgress;
            
            return (
              <motion.div
                key={item.id}
                className={cn(
                  "w-1 h-1 rounded-full transition-all duration-300",
                  isActive ? "bg-white shadow-lg" : "bg-white/30"
                )}
                animate={isActive ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                } : {
                  scale: 1,
                  opacity: 0.3,
                }}
                transition={{
                  duration: 1.5,
                  repeat: isActive ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;