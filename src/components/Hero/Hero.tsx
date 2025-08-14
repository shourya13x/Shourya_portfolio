import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Code, Twitter } from 'lucide-react';
import { useTypingAnimation, useMousePosition } from '@/hooks';
import { smoothScrollTo, cn } from '@/utils';
import RotatingWheel from '@/components/RotatingWheel/RotatingWheel';
import SplineRobot from '@/components/SplineRobot';
import PlayArrow from '@/components/PlayArrow';

const Hero: React.FC = () => {
  const mousePosition = useMousePosition();
  const heroRef = useRef<HTMLElement>(null);
  
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
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

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-primary/20 rounded-lg"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              rotate: [0, 360],
              x: [0, parallaxOffset.x * (i + 1)],
              y: [0, parallaxOffset.y * (i + 1), 0],
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
              x: { duration: 2, ease: "easeOut" },
              y: { duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
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
              className="text-primary font-mono text-lg md:text-xl mb-4 text-left"
            >
              Hi, my name is
            </motion.p>
          
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 whitespace-nowrap"
          >
            <span className="text-white">Shourya</span>{' '}
            <span className="glow-text gradient-animate bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Gupta
            </span>
          </motion.h1>
          
          {/* Dynamic Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-16 md:h-20 flex items-start mb-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              <span className="typing-cursor">{currentTagline}</span>
            </h2>
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl"
          >
            Fueled by a deep passion for technology and gaming, I'm a curious explorer of gadgets, operating systems, and the hardware-software synergy that brings them to life. 
            I love diving into device specs, understanding how things work, and turning that obsession into building sleek, high-performance apps. 
            With every line of code, I aim to create digital experiences that excite users—just like great games and innovative tech excite me—and build them better, 
            because for me, tech isn't just a career, it's a lifestyle.
          </motion.p>
          

          

          
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-start gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'relative p-3 rounded-lg backdrop-blur-md bg-white/5 hover:backdrop-blur-lg hover:bg-white/10 transition-all duration-300',
                  'text-white/70 hover:scale-110 group',
                  'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-primary/20 before:to-secondary/20 before:opacity-0 before:transition-opacity before:duration-300',
                  'hover:before:opacity-100 hover:shadow-lg hover:shadow-primary/25',
                  social.color
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                whileHover={{ 
                  y: -5,
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Visit my ${social.name} profile`}
              >
                <motion.div
                  className="relative z-10"
                  animate={{
                    boxShadow: [
                      '0 0 5px rgba(0, 255, 136, 0.3)',
                      '0 0 20px rgba(0, 255, 136, 0.6)',
                      '0 0 5px rgba(0, 255, 136, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <social.icon size={24} className="drop-shadow-glow" />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right Side - Spline 3D Robot */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="flex-1 flex justify-center lg:justify-end items-center"
        >
          <div className="relative">
            {/* Play Arrow - positioned above the robot */}
            <PlayArrow className="absolute -top-20 left-1/2 -translate-x-1/2" />
            <SplineRobot />
          </div>
        </motion.div>
      </motion.div>
    </div>
      
      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={handleScrollToNext}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 hover:text-primary transition-colors duration-300 group"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-mono">Scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={24} className="group-hover:scale-110 transition-transform" />
          </motion.div>
        </div>
      </motion.button>
      
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-300 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;