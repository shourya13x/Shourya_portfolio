import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Code, Twitter } from 'lucide-react';
import { useTypingAnimation, useMousePosition } from '@/hooks';
import { smoothScrollTo, cn, glassmorphismComponents } from '@/utils';
import RotatingWheel from '@/components/RotatingWheel/RotatingWheel';
import SplineRobot from '@/components/SplineRobot';
import PlayArrow from '@/components/PlayArrow';
import '@/components/FuturisticEffects/FuturisticEffects.css';

const Hero: React.FC = () => {
  const mousePosition = useMousePosition();
  const heroRef = useRef<HTMLElement>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  
  // Enhanced mouse tracking for velocity-based effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    setMouseVelocity({ x, y });
  }, []);
  
  // Typing animation for the taglines
  const taglines = [
    "Flutter Developer",
    "Mobile App Developer",
    "Full-Stack Developer", 
    "Problem Solver",
    "Gen AI Developer"
  ];
  
  const currentTagline = useTypingAnimation(taglines, 150, 100, 2000);
  
  // Parallax effect for background elements
  const parallaxOffset = {
    x: (mousePosition.x - window.innerWidth / 2) * 0.01,
    y: (mousePosition.y - window.innerHeight / 2) * 0.01,
  };
  
  const handleScrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      smoothScrollTo(aboutSection);
    }
  };
  
  // Social links data
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/shourya13x',
      icon: Github,
      color: 'hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/shouryagupta13',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Shourya_gupta13',
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/shouryaGupta13/',
      icon: Code,
      color: 'hover:text-yellow-400'
    },
    {
      name: 'Email',
      url: 'mailto:shouryaofficial1303@gmail.com',
      icon: Mail,
      color: 'hover:text-primary'
    }
  ];
  
  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      onMouseMove={handleMouseMove}
    >
      {/* Minimal Background Grid - Let space effects show through */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Rotating Wheel - Background Element */}
      <div className="absolute top-1/4 right-8 lg:right-16 opacity-30 pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
        >
          <RotatingWheel size={250} />
        </motion.div>
      </div>
      
      {/* Secondary Smaller Wheel */}
      <div className="absolute bottom-1/4 left-8 lg:left-16 opacity-20 pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: 90 }}
          animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
          transition={{ delay: 2, duration: 1.8, ease: "easeOut" }}
        >
          <RotatingWheel size={180} />
        </motion.div>
      </div>

      {/* Interactive Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute border rounded-lg transition-all duration-500",
              i % 3 === 0 ? "w-16 h-16 border-primary/30" : 
              i % 3 === 1 ? "w-20 h-20 border-secondary/25" : "w-12 h-12 border-accent/20"
            )}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              rotate: [0, 360],
              x: [0, parallaxOffset.x * (i + 1) + mouseVelocity.x * 10],
              y: [0, parallaxOffset.y * (i + 1) + mouseVelocity.y * 5, 0],
              scale: [1, 1.1, 1],
              borderRadius: ["8px", "50%", "8px"],
            }}
            transition={{
              rotate: { duration: 15 + i * 3, repeat: Infinity, ease: "linear" },
              x: { duration: 1.5, ease: "easeOut" },
              y: { duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
              borderRadius: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.3 }}
          />
        ))}
        
        {/* Floating Interactive Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, mouseVelocity.x * 20, 0],
              y: [0, mouseVelocity.y * 15, 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container-page">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
        >
          {/* Left Side - Intro Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-1 text-left lg:text-left max-w-2xl"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="eyebrow mb-3"
            >
              Hi, my name is
            </motion.p>
          
          {/* Name with Holographic Effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h1-display mb-2 whitespace-nowrap"
          >
            <span className="text-white">Shourya</span>{' '}
            <span className="holographic-text" data-text="Gupta">
              Gupta
            </span>
          </motion.h1>
          
          {/* Dynamic Tagline with Glitch Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-16 md:h-20 flex items-start mb-6 w-full min-w-0"
          >
            <h2 className="h2-title whitespace-nowrap min-w-0 flex-shrink-0">
              <span className="glitch-text matrix-text" data-text={currentTagline}>
                <span className="typing-cursor">{currentTagline}</span>
              </span>
            </h2>
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="prose-muted text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
          >
            "Tech runs through my veins like code through processors. I live for the rush of understanding how things tick, then building digital experiences that make others fall in love with technology too."
          </motion.p>
          

          

          
          {/* Enhanced Social Links with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-start gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.div key={social.name} className="relative">
                {/* Magnetic hover area */}
                <motion.div 
                  className="absolute inset-0 w-20 h-20 -m-4 rounded-full"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'relative p-3 rounded-lg transition-all duration-300 block',
                    'text-white/70 group overflow-hidden',
                    social.color
                  )}
                  style={{
                    ...glassmorphismComponents.button,
                    ...glassmorphismComponents.hover
                  }}
                  initial={{ opacity: 0, y: 20, rotateY: -45 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    delay: 1.4 + index * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.15,
                    rotateX: 10,
                    rotateY: hoveredSocial === social.name ? 0 : 5,
                    transition: { duration: 0.2, type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ 
                    scale: 0.9,
                    rotateX: -5,
                    transition: { duration: 0.1 }
                  }}
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  aria-label={`Visit my ${social.name} profile`}
                >
                  {/* Ripple effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredSocial === social.name ? 
                      { scale: [0, 1.2, 1], opacity: [0, 0.3, 0] } : 
                      { scale: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Orbiting particles */}
                  {hoveredSocial === social.name && (
                    <>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-primary rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                          }}
                          animate={{
                            x: [0, Math.cos(i * 120 * Math.PI / 180) * 30],
                            y: [0, Math.sin(i * 120 * Math.PI / 180) * 30],
                            rotate: [0, 360],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </>
                  )}
                  
                  <motion.div
                    className="relative z-10"
                    animate={hoveredSocial === social.name ? {
                      boxShadow: [
                        '0 0 10px rgba(0, 255, 136, 0.4)',
                        '0 0 30px rgba(0, 255, 136, 0.8)',
                        '0 0 10px rgba(0, 255, 136, 0.4)'
                      ],
                      rotate: [0, 5, -5, 0],
                    } : {
                      boxShadow: '0 0 5px rgba(0, 255, 136, 0.2)',
                      rotate: 0,
                    }}
                    transition={{
                      boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 0.4, ease: "easeInOut" },
                    }}
                  >
                    <social.icon size={24} className="drop-shadow-glow" />
                  </motion.div>
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-dark-200/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg border border-primary/20 whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={hoveredSocial === social.name ? 
                      { opacity: 1, y: 0, scale: 1 } : 
                      { opacity: 0, y: 10, scale: 0.8 }
                    }
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {social.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-dark-200/90"></div>
                  </motion.div>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right Side - Spline 3D Robot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="flex-1 flex justify-center lg:justify-end items-center relative"
        >
          
          <div className="relative">
            <PlayArrow className="absolute top-[8%] md:top-[6%] lg:top-[6%] left-[62%] md:left-[60%] lg:left-[58%]" />
            <SplineRobot mouseVelocity={mouseVelocity} />
          </div>
        </motion.div>
      </motion.div>
    </div>
      
      {/* Enhanced Interactive Scroll Indicator */}
      <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 w-20 h-20 -m-6 border border-primary/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 1.5, 
            duration: 0.8,
            type: "spring",
            stiffness: 200
          }}
          onClick={handleScrollToNext}
          className="relative text-white/60 hover:text-primary transition-all duration-300 group"
          style={{
            ...glassmorphismComponents.button,
            padding: '16px 24px',
            borderRadius: '25px'
          }}
          whileHover={{ 
            scale: 1.1,
            y: -5,
            boxShadow: "0 10px 25px rgba(0, 255, 136, 0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.95,
            y: 2,
            transition: { duration: 0.1 }
          }}
          aria-label="Scroll to next section"
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="relative flex flex-col items-center gap-3">
            <motion.span 
              className="text-sm font-mono tracking-wider"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Scroll down
            </motion.span>
            
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <ChevronDown 
                size={28} 
                className="group-hover:scale-125 transition-all duration-300 drop-shadow-glow" 
              />
            </motion.div>
            
            {/* Trailing particles */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/60 rounded-full"
                style={{
                  left: '50%',
                  top: '60%',
                }}
                animate={{
                  y: [0, 20 + i * 5, 40 + i * 10],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.button>
      </motion.div>
      
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-300 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;