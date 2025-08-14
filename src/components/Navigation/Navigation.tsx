import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, Briefcase, Mail, Zap, Github } from 'lucide-react';
import { useScroll } from '@/hooks';
import { cn, downloadResume } from '@/utils';
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
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative',
        'hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-300',
        isActive ? 'text-primary bg-primary/10' : 'text-white/80 hover:text-primary',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Navigate to ${item.label}`}
    >
      <Icon size={18} />
      <span className="font-medium">{item.label}</span>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 rounded-lg border border-primary/30 bg-primary/5"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY, scrollDirection } = useScroll();
  
  // Hide navigation when scrolling down, show when scrolling up
  const shouldHideNav = scrollY > 100 && scrollDirection === 'down';
  
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
      } else {
        console.log('Navigation Debug: All sections found successfully');
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
      
      // Debug: Log found sections
      const foundSections = sections.filter(s => s.element);
      if (foundSections.length !== sections.length) {
        console.log('Navigation Debug: Missing sections:', 
          sections.filter(s => !s.element).map(s => s.id));
      }
      
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
          console.log('Navigation Debug: Active section changed to:', currentSection.id);
          setActiveSection(currentSection.id);
        }
      } else {
        // If no section is found, check if we're at the top
        if (window.scrollY < 100) {
          if (activeSection !== 'home') {
            console.log('Navigation Debug: Back to home section');
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
    console.log('Navigation Debug: Clicked on', id, 'href:', href);
    const element = document.getElementById(href.slice(1));
    if (element) {
      console.log('Navigation Debug: Found element, scrolling to', href);
      // Add offset for fixed navigation
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
      setIsMenuOpen(false);
    } else {
      console.error('Navigation Debug: Element not found for', href);
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
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-center">
            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 glass px-6 py-3 rounded-full"
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
          className="fixed top-0 left-0 right-0 z-30 glass-strong"
        >
          <div className="flex items-center justify-between px-4 py-3">
            {/* Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg glass hover:glass-strong transition-all duration-300"
              aria-label="Toggle menu"
            >
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
            </button>
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
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[80vw] glass-strong border-l border-white/10"
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
      
      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-20 h-1 bg-dark-200"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          style={{
            scaleX: Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1),
            transformOrigin: '0%'
          }}
        />
      </motion.div>
    </>
  );
};

export default Navigation;