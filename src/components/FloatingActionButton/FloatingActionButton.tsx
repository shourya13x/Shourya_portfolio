import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Mail, 
  Zap, 
  Github,
  Terminal,
  Sparkles
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import type { NavigationItem } from '@/types';

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
    Terminal,
  };
  return iconMap[iconName as keyof typeof iconMap] || Home;
};

interface FloatingActionButtonProps {
  onCLIToggle?: () => void;
  viewMode?: 'gui' | 'cli';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onCLIToggle, 
  viewMode = 'gui' 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle navigation
  const handleNavigation = (href: string, id: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  // Handle CLI toggle
  const handleCLIToggle = () => {
    if (onCLIToggle) {
      onCLIToggle();
    }
    setIsMenuOpen(false);
  };

  // Don't show FAB in CLI mode
  if (viewMode === 'cli') {
    return null;
  }

  if (!mounted) return null;

  const contents = (
    <div 
      className="fixed bottom-8 right-8 z-[99999] pointer-events-none" 
      ref={menuRef}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 99999,
        transform: 'none'
      }}
    >
      {/* Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 backdrop-blur-[2px]"
            style={{ 
              zIndex: -1,
              background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.7, 
              y: 30, 
              x: 20,
              rotate: -5
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              x: 0,
              rotate: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 20,
              x: 10,
              transition: { duration: 0.1, ease: "easeIn" }
            }}
            transition={{ 
              type: "spring",
              damping: 18,
              stiffness: 500,
              mass: 0.7,
              staggerChildren: 0.02,
              delayChildren: 0.02
            }}
            className="absolute bottom-20 right-0 mb-4"
          >
            <div 
              className="backdrop-blur-xl rounded-2xl p-2 shadow-2xl pointer-events-auto border"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  0 0 20px rgba(0, 255, 136, 0.1),
                  0 0 0 1px rgba(255, 255, 255, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,
                isolation: 'isolate'
              }}
            >
              <div className="space-y-1">
                {/* Navigation Items */}
                {navigationItems.map((item, index) => {
                  const Icon = getIcon(item.icon || 'Home');
                  const isActive = activeSection === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ 
                        opacity: 0, 
                        x: 30, 
                        y: 10,
                        scale: 0.8,
                        rotate: 3
                      }}
                      animate={{ 
                        opacity: 1, 
                        x: 0, 
                        y: 0,
                        scale: 1,
                        rotate: 0
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: 20, 
                        y: -5,
                        scale: 0.9,
                        transition: { 
                          duration: 0.08,
                          ease: "easeIn",
                          delay: (navigationItems.length - index - 1) * 0.02
                        }
                      }}
                      transition={{ 
                        type: "spring",
                        damping: 18,
                        stiffness: 500,
                        mass: 0.55,
                        delay: index * 0.02
                      }}
                      onClick={() => handleNavigation(item.href, item.id)}
                      className={cn(
                        'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all duration-300',
                        'focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-0',
                        'backdrop-blur-sm whitespace-nowrap',
                        isActive
                          ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      )}
                      style={{
                        boxShadow: isActive 
                          ? '0 0 20px rgba(16, 185, 129, 0.2)'
                          : 'none'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        x: -2,
                        transition: { type: "spring", damping: 16, stiffness: 600 }
                      }}
                      whileTap={{ 
                        scale: 0.95,
                        transition: { duration: 0.1 }
                      }}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
                
                {/* Divider */}
                <div className="h-px bg-white/10 my-2" />
                
                {/* CLI Toggle */}
                <motion.button
                  initial={{ 
                    opacity: 0, 
                    x: 30, 
                    y: 10,
                    scale: 0.8,
                    rotate: 3
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    y: 0,
                    scale: 1,
                    rotate: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: 20, 
                    y: -5,
                    scale: 0.9,
                    transition: { 
                      duration: 0.08,
                      ease: "easeIn",
                      delay: 0
                    }
                  }}
                  transition={{ 
                    type: "spring",
                    damping: 18,
                    stiffness: 500,
                    mass: 0.55,
                    delay: navigationItems.length * 0.02 + 0.05
                  }}
                  onClick={handleCLIToggle}
                  className={cn(
                    'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:ring-offset-0',
                    'backdrop-blur-sm whitespace-nowrap',
                    'text-purple-400 hover:text-purple-300 hover:bg-purple-400/10'
                  )}
                  whileHover={{ 
                    scale: 1.05,
                    x: -2,
                    transition: { type: "spring", damping: 16, stiffness: 600 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                >
                  <Terminal size={18} />
                  <span className="font-medium">CLI Mode</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        animate={{ 
          y: isMenuOpen ? 0 : [0, -10, 0],
          scale: isMenuOpen ? 1.1 : 1,
          // gentle wiggle when closed; snap to 180 when open
          rotate: isMenuOpen ? 180 : [-6, 6, -6]
        }}
        transition={{ 
          y: {
            duration: 1.8, 
            repeat: isMenuOpen ? 0 : Infinity, 
            ease: "easeInOut"
          },
          scale: {
            type: "spring",
            damping: 16,
            stiffness: 700,
            duration: 0.2
          },
          rotate: isMenuOpen
            ? { type: "spring", damping: 16, stiffness: 700, duration: 0.25 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className={cn(
          'relative w-16 h-16 rounded-full flex items-center justify-center',
          'bg-gradient-to-br from-primary to-emerald-400',
          'hover:from-emerald-400 hover:to-primary',
          'focus:outline-none focus:ring-4 focus:ring-primary/30',
          'transition-all duration-300 shadow-2xl',
          'border border-primary/20',
          'pointer-events-auto'
        )}
        style={{
          background: `
            linear-gradient(135deg, #00ff88 0%, #10b981 50%, #059669 100%)
          `,
          boxShadow: `
             0 0 20px rgba(0, 255, 136, 0.4),
             0 8px 32px rgba(0, 255, 136, 0.3),
             0 4px 16px rgba(0, 0, 0, 0.2),
             inset 0 1px 0 rgba(255, 255, 255, 0.2),
             inset 0 0 20px rgba(0, 255, 136, 0.1)
           `
         }}
         whileHover={{ 
           scale: isMenuOpen ? 1.2 : 1.15,
           boxShadow: `
             0 0 30px rgba(0, 255, 136, 0.6),
             0 0 60px rgba(0, 255, 136, 0.4),
             0 12px 40px rgba(0, 255, 136, 0.3),
             0 6px 20px rgba(0, 0, 0, 0.3),
             inset 0 1px 0 rgba(255, 255, 255, 0.3),
             inset 0 0 30px rgba(0, 255, 136, 0.2)
           `,
           transition: { type: "spring", damping: 20, stiffness: 400 }
         }}
         whileTap={{ 
           scale: isMenuOpen ? 1.05 : 0.95,
           transition: { duration: 0.1 }
         }}
         aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
       >
         {/* Tooltip */}
         <motion.div
           className="absolute right-full mr-3 px-3 py-1 backdrop-blur-md border rounded-lg text-xs font-medium text-white/90 whitespace-nowrap"
           style={{
             background: 'rgba(255, 255, 255, 0.08)',
             backdropFilter: 'blur(15px)',
             border: '1px solid rgba(255, 255, 255, 0.15)',
             boxShadow: `
               0 4px 16px rgba(0, 0, 0, 0.2),
               0 0 10px rgba(0, 255, 136, 0.1),
               inset 0 1px 0 rgba(255, 255, 255, 0.1)
             `
           }}
           initial={{ opacity: 0, x: 10 }}
           whileHover={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.2 }}
         >
           Navigation Menu
           <div 
             className="absolute top-1/2 -right-1 w-2 h-2 border-r border-b transform rotate-45 -translate-y-1/2" 
             style={{
               background: 'rgba(255, 255, 255, 0.08)',
               borderRight: '1px solid rgba(255, 255, 255, 0.15)',
               borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
             }}
           />
         </motion.div>
         <AnimatePresence mode="wait">
           {isMenuOpen ? (
             <motion.div
               key="close"
               initial={{ rotate: -90, opacity: 0 }}
               animate={{ rotate: 0, opacity: 1 }}
               exit={{ rotate: 90, opacity: 0 }}
               transition={{ duration: 0.12 }}
             >
               <X size={24} className="text-white" />
             </motion.div>
           ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: [0, 360], opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse effect when menu is closed */}
        {!isMenuOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(0, 255, 136, 0.4) 0%, rgba(0, 255, 136, 0.1) 70%, transparent 100%)`
            }}
            animate={{ 
              scale: [1, 1.4, 1], 
              opacity: [0.8, 0, 0.8] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        )}

        {/* Additional glow effect for better visibility */}
        <motion.div
          className="absolute inset-0 rounded-full blur-sm"
          style={{
            background: `radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, rgba(0, 255, 136, 0.1) 60%, transparent 100%)`
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Matrix-style particles effect */}
        {!isMenuOpen && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 255, 136, 0.3)',
                '0 0 40px rgba(0, 255, 136, 0.6)',
                '0 0 60px rgba(0, 255, 136, 0.4)',
                '0 0 20px rgba(0, 255, 136, 0.3)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>
    </div>
  );

  return createPortal(contents, document.body);
};

export default FloatingActionButton;
