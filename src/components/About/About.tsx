import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Code, 
  Database, 
  GitBranch, 
  Network,
  Layers,
  Rocket,
  Smartphone as Mobile,
  Bot
} from 'lucide-react';
import { useVisibility } from '@/hooks';
import { cn, downloadResume } from '@/utils';
import profileImage from '@/assets/images/profile.jpg';


import TouchCard from '@/components/TouchCard';
import '@/components/FuturisticEffects/FuturisticEffects.css';

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
  delay: number;
}

const About: React.FC = () => {
  const { isVisible, elementRef } = useVisibility(0.1); // Reduced threshold for earlier triggering
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  
  // Handle mouse movement for magnetic effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      mouseX.set(x);
      mouseY.set(y);
    }
  }, [mouseX, mouseY]);
  
  const stats = [
    { label: " Days Streak", value: "300+", icon: Code },
    
    { label: "LeetCode Problems", value: "500+", icon: Code },
    { label: "Projects Completed", value: "10+", icon: GitBranch },
    { label: "Technologies Mastered", value: "15+", icon: Database }
  ];
  
  const services: ServiceItem[] = [
    {
      id: "flutter-development",
      title: "FLUTTER DEVELOPMENT",
      icon: Mobile,
      description: "Building elegant, high-performance, cross-platform apps that work flawlessly across Android and iOS. From meme aggregation platforms to smart productivity tools, I focus on creating intuitive mobile experiences that users genuinely enjoy.",
      color: "from-primary to-secondary",
      delay: 0
    },
    {
      id: "genai-integration",
      title: "GENERATIVE AI",
      icon: Bot,
      description: "Deeply fascinated by the world of Generative AI and its potential to revolutionize how we build, create, and interact with technology. Exploring how GenAI can be integrated into mobile apps through intelligent assistants, image generation, and personalized experiences.",
      color: "from-accent to-primary",
      delay: 0
    },
    {
      id: "gaming-development",
      title: "GAMING & GAME DEVELOPMENT",
      icon: Rocket,
      description: "Passionate about creating immersive gaming experiences and interactive entertainment. From mobile games to web-based gaming platforms, I develop engaging gameplay mechanics, smooth user interfaces, and innovative gaming solutions that captivate players.",
      color: "from-secondary to-accent",
      delay: 0
    },
    {
      id: "web-development",
      title: "WEB DEVELOPMENT",
      icon: Code,
      description: "Building modern, responsive web applications with cutting-edge technologies. From full-stack development to progressive web apps, I create scalable, performant, and user-friendly web solutions that deliver exceptional digital experiences.",
      color: "from-primary to-accent",
      delay: 0
    },
    {
      id: "learning-tech",
      title: "LEARNING & EXPLORING TECH",
      icon: Layers,
      description: "Constantly expanding my knowledge and exploring emerging technologies. From new programming languages to cutting-edge frameworks, I'm passionate about staying ahead of the curve and mastering the latest tools and methodologies in software development.",
      color: "from-accent to-secondary",
      delay: 0
    },
    {
      id: "data-structures-algorithms",
      title: "DATA STRUCTURES & ALGORITHMS",
      icon: Network,
      description: "Strong foundation in fundamental computer science concepts. Solving complex problems with efficient algorithms, optimizing data structures, and implementing scalable solutions. From sorting algorithms to graph theory, I tackle challenging computational problems with systematic approaches.",
      color: "from-secondary to-primary",
      delay: 0
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
        delayChildren: 0
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  const iconVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.4,
        delay: 0,
        ease: "backOut"
      }
    }
  };
  
  return (
    <section id="about" ref={elementRef} className="py-20 lg:py-32 relative">
      {/* Ultra-Subtle Background Overlay - Minimal interference with space effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-300/5 via-dark-200/3 to-dark-300/5" />
      
      {/* Animated Background Elements - Always visible */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/3 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-20"
        >
          {/* About Me Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              <span className="text-primary">01.</span>{' '}
              <span className="holographic-text" data-text="About Me">About Me</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              I'm a future-focused software engineer passionate about crafting meaningful digital experiences. 
              With 2+ years of hands-on development, I've built everything from intuitive mobile apps to 
              full-scale web solutions — and now, I'm diving deep into the world of GenAI and emerging tech to shape what's next.
            </p>
          </motion.div>
          
          {/* Enhanced Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                onMouseEnter={() => setHoveredStat(stat.label)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <TouchCard
                  className="holo-card card text-center group relative overflow-hidden"
                  intensity={0.5}
                  glowColor="#00FF88"
                >
                {/* Animated background particles */}
                {hoveredStat === stat.label && (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/60 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </>
                )}
                
                {/* Magnetic icon */}
                <motion.div 
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 relative overflow-hidden"
                    animate={hoveredStat === stat.label ? {
                      boxShadow: [
                        '0 0 10px rgba(0, 255, 136, 0.3)',
                        '0 0 25px rgba(0, 255, 136, 0.6)',
                        '0 0 10px rgba(0, 255, 136, 0.3)'
                      ],
                      scale: [1, 1.05, 1],
                    } : {
                      boxShadow: '0 0 5px rgba(0, 255, 136, 0.1)',
                      scale: 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredStat === stat.label ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg"
                      animate={hoveredStat === stat.label ? {
                        scale: [0, 2],
                        opacity: [0.5, 0],
                      } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    
                    <motion.div
                      animate={hoveredStat === stat.label ? {
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1],
                      } : { rotate: 0, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                    >
                      <stat.icon size={24} />
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Animated counter */}
                <motion.div 
                  className="text-2xl lg:text-3xl font-bold text-primary mb-2"
                  animate={hoveredStat === stat.label ? {
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 5px rgba(0, 255, 136, 0.3)',
                      '0 0 15px rgba(0, 255, 136, 0.6)',
                      '0 0 5px rgba(0, 255, 136, 0.3)'
                    ],
                  } : {
                    scale: 1,
                    textShadow: '0 0 0px transparent',
                  }}
                  transition={{
                    duration: 1,
                    repeat: hoveredStat === stat.label ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  {stat.value}
                </motion.div>
                
                {/* Enhanced label with typing effect */}
                <motion.div 
                  className="text-sm text-white/70"
                  animate={hoveredStat === stat.label ? {
                    color: 'rgba(255, 255, 255, 0.9)',
                  } : {
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.label}
                </motion.div>
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-0"
                  animate={hoveredStat === stat.label ? {
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 0.8],
                  } : { opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 2,
                    repeat: hoveredStat === stat.label ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
                </TouchCard>
              </div>
            ))}
          </motion.div>
          
          {/* Enhanced Bio Section */}
          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-2 gap-12 items-center"
            onMouseMove={handleMouseMove}
          >
            {/* Enhanced Profile Image with 3D Tilt */}
            <motion.div 
              ref={profileRef}
              className="relative group perspective-1000"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Main image container */}
              <motion.div 
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border border-white/10"
                whileHover={{ 
                  boxShadow: "0 25px 50px rgba(0, 255, 136, 0.2)",
                  borderColor: "rgba(0, 255, 136, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Profile image */}
                <motion.img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover aspect-square scale-150"
                  whileHover={{ 
                    scale: 1.6,
                    filter: "brightness(1.1) contrast(1.1)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                
                {/* Interactive overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                  style={{
                    width: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.8), transparent)',
                  }}
                  animate={{
                    x: [-50, 450],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                />
              </motion.div>
              
              {/* Floating particles around image */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/60 rounded-full"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [0, -20 - Math.random() * 20, 0],
                    x: [0, (Math.random() - 0.5) * 40, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
              
              {/* Enhanced Decorative Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-32 h-32 border-2 border-primary/20 rounded-2xl -z-10"
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  borderColor: ['rgba(0, 255, 136, 0.2)', 'rgba(0, 255, 136, 0.6)', 'rgba(0, 255, 136, 0.2)'],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  borderColor: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ 
                  scale: 1.1,
                  borderColor: 'rgba(0, 255, 136, 0.8)',
                }}
              />
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-28 h-28 border-2 border-secondary/20 rounded-2xl -z-10"
                animate={{
                  rotate: [360, 270, 180, 90, 0],
                  borderColor: ['rgba(0, 153, 255, 0.2)', 'rgba(0, 153, 255, 0.6)', 'rgba(0, 153, 255, 0.2)'],
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  borderColor: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ 
                  scale: 1.1,
                  borderColor: 'rgba(0, 153, 255, 0.8)',
                }}
              />
              
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
                }}
                whileHover={{ 
                  opacity: 1,
                  scale: 1.1,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Bio Text */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                🚀 Shaping the Future with Flutter, GenAI & Beyond
              </h3>
              
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Hi, I'm a Computer Science student at Chandigarh University, driven by a passion for turning ideas into reality through code, creativity, and cutting-edge technology.
                </p>
                
                <p>
                  🧠 My core strength lies in Flutter development, where I build elegant, high-performance, cross-platform apps that work flawlessly across Android and iOS. From meme aggregation platforms to smart productivity tools, I focus on creating intuitive mobile experiences that users genuinely enjoy.
                </p>
                
                <p>
                  🤖 I'm also deeply fascinated by the world of Generative AI and its potential to revolutionize the way we build, create, and interact with technology. I constantly explore how GenAI can be integrated into mobile apps — whether it's through intelligent assistants, image generation, or personalized experiences — to deliver next-gen functionality.
                </p>
                
                <p>
                  ⚡ I thrive at the intersection of UI/UX design, mobile innovation, and evolving tech ecosystems. Whether it's experimenting with new frameworks, contributing to futuristic projects, or pushing the boundaries of what's possible — I'm all in.
                </p>
                
                <p>
                  When I'm not building, I'm learning. When I create, I aim to inspire.
                </p>
              </div>
              
              <motion.button
                className="btn-primary relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.08,
                  y: -2,
                  boxShadow: "0 10px 30px rgba(0, 255, 136, 0.3)",
                  transition: { duration: 0.2, type: "spring", stiffness: 300 }
                }}
                whileTap={{ 
                  scale: 0.95,
                  y: 1,
                  transition: { duration: 0.1 }
                }}
                onClick={downloadResume}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Ripple effect on click */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{
                    scale: [0, 1.2],
                    opacity: [0.5, 0],
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                
                {/* Glowing particles */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/80 rounded-full"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: '50%',
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
                
                <span className="relative z-10 font-semibold">Download Resume</span>
              </motion.button>
            </div>
          </motion.div>
          
          {/* What I Do Section */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 whitespace-nowrap">
                <span className="glitch-text matrix-text" data-text="WHAT I DO">
                  WHAT I DO
                </span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Transforming ideas into digital reality through innovative solutions and cutting-edge technology
              </p>
            </div>
            

            
            {/* Services Section - Centered */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center space-y-6 max-w-4xl mx-auto"
            >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                custom={index}
                className="group relative w-full max-w-2xl mx-auto"
                onHoverStart={() => setHoveredService(service.id)}
                onHoverEnd={() => setHoveredService(null)}
                layout
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.3  // Reduced from 0.4
                }}
              >
                {/* Service Card */}
                <motion.div
                  className={cn(
                    "relative p-6 rounded-2xl border border-white/10",
                    "hover:border-white/20 hover:bg-white/1 transition-all duration-300",
                    "shadow-lg hover:shadow-primary/10",
                    hoveredService === service.id ? "border-primary/30 bg-primary/2" : "bg-transparent"
                  )}
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.005) 0%, rgba(255,255,255,0.001) 100%)`,
                  }}
                  layout
                >
                  {/* Subtle Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center space-x-4">
                    {/* Icon */}
                    <motion.div
                      variants={iconVariants}
                      className={cn(
                        "p-3 rounded-lg bg-primary/10 border border-primary/20",
                        "group-hover:scale-105 transition-all duration-300",
                        "group-hover:bg-primary/20 group-hover:border-primary/40",
                        "shadow-lg shadow-primary/20 group-hover:shadow-primary/40"
                      )}
                    >
                      <service.icon size={20} className="text-primary drop-shadow-lg" />
                    </motion.div>
                    
                    {/* Text Content */}
                    <div className="flex-1">
                      <h3 className={cn(
                        "text-lg font-semibold mb-2 transition-all duration-300",
                        hoveredService === service.id 
                          ? "text-primary" 
                          : "text-white/90 group-hover:text-white"
                      )}>
                        {service.title}
                      </h3>
                      
                      {/* Description - Only show on hover */}
                      <AnimatePresence>
                        {hoveredService === service.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            transition={{ 
                              duration: 0.3,
                              ease: "easeInOut"
                            }}
                            className="text-white/80 text-sm leading-relaxed overflow-hidden"
                          >
                            {service.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Arrow Icon */}
                    <motion.div
                      className={cn(
                        "transition-colors duration-300",
                        hoveredService === service.id 
                          ? "text-primary/80" 
                          : "text-white/30 group-hover:text-white/60"
                      )}
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        animate={{ 
                          rotate: hoveredService === service.id ? 90 : 0 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </motion.svg>
                    </motion.div>
                  </div>
                  
                  {/* Subtle Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-radial from-primary/8 to-transparent" />
                </motion.div>
                
                {/* Connecting Line (except for last item) */}
                {index < services.length - 1 && (
                  <motion.div
                    className="absolute left-1/2 top-full w-px bg-gradient-to-b from-white/10 to-transparent"
                    initial={{ height: 0 }}
                    animate={isVisible ? { height: 20 } : { height: 0 }}
                    transition={{ delay: 0, duration: 0.4 }}
                    layout
                  />
                )}
                            </motion.div>
            ))}
          </motion.div>
          </motion.div>
          

        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping" />
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-secondary rounded-full animate-ping delay-1000" />
      <div className="absolute top-1/2 left-10 w-1 h-1 bg-white/50 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-10 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-500" />
    </section>
  );
};

export default About;