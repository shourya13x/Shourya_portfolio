import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Eye, 
  Smartphone, 
  Monitor, 
  Package,
  Brain
} from 'lucide-react';
import { useVisibility } from '@/hooks';
import '@/components/FuturisticEffects/FuturisticEffects.css';
import { cn } from '@/utils';
import TouchCard from '@/components/TouchCard';
import type { Project } from '@/types';

const Projects: React.FC = () => {
  const { isVisible, elementRef } = useVisibility(0.2);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All Projects', icon: Package },
    { id: 'web', label: 'Web Apps', icon: Monitor },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'genai', label: 'Gen AI', icon: Brain },
  ];
  
  const projects: Project[] = [
    {
      id: 'memeverse',
      name: '🎉 MemeVerse - Tech Memes App',
      description: 'Beautifully designed meme app for techies with Material 3 UI and infinite scrolling',
      longDescription: 'A passion project built with love for tech and memes. Features stunning Material 3 UI, infinite scrolling, animated backgrounds, Firebase authentication, and favorites system.',
      technologies: ['Flutter', 'Dart', 'Reddit API', 'Firebase', 'Material Design 3', 'Google Login'],
      liveUrl: 'https://www.linkedin.com/posts/shouryagupta13_memeverse-applaunch-flutter-activity-7345614820462706688-JPIg?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD2WtkIBC25BCQHwNG5SwDfH-vdwIGY3g_8',
      githubUrl: 'https://github.com/shourya13x/memeverse',
      imageUrl: '/projects/memeverse.jpg',
      features: [
        'Stunning Material 3 UI with joyful design',
        'Infinite scrolling for endless meme fun',
        'Animated home background with smooth loops',
        'Firebase + Google Login for secure access',
        'Save favorites and share instantly',
        'Dark/Light mode support with adaptive theming'
      ],
      category: 'mobile',
      status: 'completed',
      year: 2024
    },

    {
      id: 'newsflow-app',
      name: '📰 NewsFlow - Your Real-Time News Companion',
      description: 'Modern Flutter app aggregating news from multiple sources with seamless experience',
      longDescription: 'Just launched NewsFlow - a modern Flutter app built to aggregate news from multiple sources, offering a seamless and beautiful experience for staying updated with real-time news from top APIs.',
      technologies: ['Flutter', 'Dart', 'Provider', 'REST API Integration', 'Material 3', 'Multi-API'],
      liveUrl: 'https://www.linkedin.com/posts/shouryagupta13_flutter-opensource-newsapp-activity-7345943370243981314-qlnl?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD2WtkIBC25BCQHwNG5SwDfH-vdwIGY3g_8',
      githubUrl: 'https://github.com/shourya13x/newsflow',
      imageUrl: '/projects/newsflow.png',
      features: [
        'Real-time news from 5 top APIs (NewsAPI, GNews, Bing News, MediaStack, NewsData.io)',
        'Effortless category filtering and unified structure',
        'Save favorite articles with offline support',
        'Toggle between light & dark mode',
        'Clean, responsive UI for all screen sizes',
        'Pull-to-refresh functionality with cache-busting'
      ],
      category: 'mobile',
      status: 'completed',
      year: 2024
    },
    {
      id: 'calcnova-calculator',
      name: '🔧 CalcNova - All-in-One Calculator & Converter',
      description: 'Full-featured calculator & converter app with 10+ calculators and 10+ converters',
      longDescription: 'Introducing CalcNova – A Full-Featured Calculator & Converter App Built from Scratch with Flutter. Every tool you\'ve ever needed — all in one clean, beautiful, responsive app.',
      technologies: ['Flutter', 'Dart', 'Mathematical Computing', 'Glassmorphism UI', 'Cross-Platform'],
      liveUrl: 'https://www.linkedin.com/posts/shouryagupta13_calcnova-flutter-madewithflutter-activity-7344476195134087169-hOyW?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD2WtkIBC25BCQHwNG5SwDfH-vdwIGY3g_8',
      githubUrl: 'https://github.com/shourya13x/calcnova',
      imageUrl: '/projects/calcnova.png',
      features: [
        '10+ Calculators: Scientific, Basic, Percentage, Discount, GST, Date Difference, Birthday + Age, BMI, EMI, Profit & Loss',
        '10+ Converters: Length, Mass, Temperature, Area, Time, Currency, Data Storage, Speed, Volume, Number System',
        'Animated glassmorphism UI with floating bubbles',
        'Dark Mode + Light Mode support',
        'Works on Android, iOS, Web & Desktop',
        'Sound & Haptic feedback with real-time validation'
      ],
      category: 'mobile',
      status: 'completed',
      year: 2024
    },
    {
      id: 'savenote-app',
      name: 'SaveNote - Your Favorite Notes App',
      description: 'Beautiful and minimal notes app with SQLite integration',
      longDescription: 'Built a beautiful and minimal notes app for seamlessly capturing thoughts, todos, and reminders with intuitive UI design and robust local storage.',
      technologies: ['Flutter', 'SQLite', 'CRUD Operations', 'InheritedWidget'],
      liveUrl: 'https://drive.google.com/file/d/1Ga0wAoM0DvH9ivACWbvkFYSVkg-tHexu/view',
      githubUrl: 'https://github.com/shourya13x/savenote',
      imageUrl: '/projects/savenote-thumbnail.png',
      features: [
        'Seamless note capture with intuitive UI',
        'Robust SQLite local data storage',
        'Efficient CRUD operations with data persistence',
        'Custom InheritedWidget for state management',
        'Optimized UI updates without over-rebuilding',
        'Beautiful and minimal design approach'
      ],
      category: 'mobile',
      status: 'completed',
      year: 2023
    },
    {
      id: 'jarvis-ai',
      name: '🦾 JARVIS.AI - AI Assistant',
      description: 'Iron Man-inspired AI assistant with voice recognition and Google Gemini integration',
      longDescription: 'Developed an advanced AI assistant inspired by Iron Man\'s JARVIS, featuring voice recognition, Google Gemini AI integration, and a stunning holographic UI with real-time system monitoring.',
      technologies: ['Flutter', 'Riverpod', 'Google Gemini API', 'Speech Recognition', 'Text-to-Speech', 'Rive Animations'],
      githubUrl: 'https://github.com/shourya13x/jarvis-ai',
      imageUrl: '/projects/jarvis-ai-thumbnail.png',
      features: [
        'Voice recognition with real-time feedback',
        'Google Gemini AI integration for intelligent responses',
        'Iron Man-themed UI with holographic animations',
        'Real-time system monitoring (Memory, CPU, Network)',
        'Speech-to-text and text-to-speech capabilities',
        'Conversation memory and context management'
      ],
      category: 'mobile',
      status: 'in-progress',
      year: 2024
    },
    
    {
      id: 'portfolio-website',
      name: '🌐 Interactive Portfolio Website',
      description: 'Modern, responsive portfolio website with advanced animations and 3D elements',
      longDescription: 'A cutting-edge portfolio website featuring interactive 3D elements, smooth animations, and a modern design that showcases projects and skills in an engaging way.',
      technologies: ['React', 'Three.js', 'Framer Motion', 'TypeScript', 'Tailwind CSS', 'Vite'],
      imageUrl: '/projects/portfolio-website.png',
      liveUrl: 'https://www.shourya.online/',
      githubUrl: 'https://github.com/shourya13x/Shourya_portfolio',
      features: [
        'Interactive 3D animations',
        'Smooth page transitions',
        'Responsive design for all devices',
        'Dark/light mode toggle',
        'Performance optimized',
        'SEO friendly structure'
      ],
      category: 'web',
      status: 'completed',
      year: 2025
    },
    
  ];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // Removed: icon overlay mapping; not used after simplifying image area

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-full"
      >
        <TouchCard className="holo-card no-shine group" intensity={0.4} glowColor="#0099ff">
          <motion.div 
            className="relative p-6 rounded-2xl border border-white/10 bg-transparent hover:border-white/20 transition-all duration-500 h-full flex flex-col overflow-hidden"
            whileHover={{ 
              y: -10,
              rotateX: 5,
              rotateY: 5,
              transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
          >
          {/* Enhanced Project Image */}
          <motion.div 
            className="relative aspect-video bg-transparent mb-6 rounded-lg border border-white/5 group-hover:border-white/10 transition-all duration-500 overflow-hidden"
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(0, 153, 255, 0.2)",
              borderColor: "rgba(0, 153, 255, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Image layer */}
            <img 
              src={project.imageUrl} 
              alt={project.name} 
              className={cn(
                'absolute inset-0 w-full h-full bg-black/40 transition-transform duration-500',
                (project.id === 'savenote-app' || project.id === 'jarvis-ai') 
                  ? 'object-cover transform scale-125' 
                  : 'object-contain'
              )}
            />
          </motion.div>
            
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
              <span className={cn(
                'px-2 py-1 text-xs font-semibold rounded-full',
                project.status === 'completed' && 'bg-primary/10 text-primary border border-primary/20',
                project.status === 'in-progress' && 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
                project.status === 'coming-soon' && 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
                project.status === 'archived' && 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
              )}>
                {project.status === 'completed' && 'Completed'}
                {project.status === 'in-progress' && 'In Progress'}
                {project.status === 'coming-soon' && 'Coming Soon'}
                {project.status === 'archived' && 'Archived'}
              </span>
            </div>
          </motion.div>
        
          {/* Project Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3 gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
              {project.name}
            </h3>
            <span className="text-xs sm:text-sm text-white/50 font-mono flex-shrink-0">
              {project.year}
            </span>
          </div>
          
          <p className="text-sm sm:text-base text-white/80 mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>
          
          {/* Enhanced Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-3 py-1 text-xs bg-primary/5 text-primary rounded-full font-mono border border-primary/10 relative overflow-hidden cursor-pointer"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'rgba(0, 255, 136, 0.15)',
                  borderColor: 'rgba(0, 255, 136, 0.3)',
                  color: '#ffffff',
                  transition: { duration: 0.2 }
                }}
                animate={isHovered ? {
                  y: [0, -3, 0],
                  boxShadow: [
                    '0 0 5px rgba(0, 255, 136, 0.2)',
                    '0 0 15px rgba(0, 255, 136, 0.4)',
                    '0 0 5px rgba(0, 255, 136, 0.2)'
                  ],
                } : {
                  y: 0,
                  boxShadow: '0 0 0px transparent',
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                  delay: techIndex * 0.1,
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={isHovered ? {
                    x: ['-100%', '200%'],
                  } : { x: '-100%' }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                    delay: techIndex * 0.05,
                    repeatDelay: 0.5,
                  }}
                />
                
                <span className="relative z-10">{tech}</span>
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <motion.span 
                className="px-3 py-1 text-xs bg-white/5 text-white/60 rounded-full font-mono border border-white/10 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  transition: { duration: 0.2 }
                }}
                animate={isHovered ? {
                  opacity: [0.6, 1, 0.6],
                } : { opacity: 0.6 }}
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <span className="relative z-10">+{project.technologies.length - 4} more</span>
              </motion.span>
            )}
          </div>
          
          {/* Enhanced Action Links */}
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.liveUrl && project.status !== 'coming-soon' && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors relative group"
                whileHover={{ 
                  scale: 1.1,
                  x: 5,
                  transition: { duration: 0.2, type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Magnetic glow effect */}
                <motion.div
                  className="absolute -inset-2 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
                
                <motion.div
                  animate={isHovered ? {
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  } : { rotate: 0, scale: 1 }}
                  transition={{
                    duration: 1,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <Eye size={14} />
                </motion.div>
                <span className="relative z-10">Live Demo</span>
              </motion.a>
            )}
            
            {project.githubUrl && project.status !== 'coming-soon' && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white/90 transition-colors relative group"
                whileHover={{ 
                  scale: 1.1,
                  x: 5,
                  transition: { duration: 0.2, type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Magnetic glow effect */}
                <motion.div
                  className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
                
                <motion.div
                  animate={isHovered ? {
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1],
                  } : { rotate: 0, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  <Github size={14} />
                </motion.div>
                <span className="relative z-10">Code</span>
              </motion.a>
            )}
            
            {project.status === 'coming-soon' && (
              <motion.div
                className="flex items-center gap-2 text-xs sm:text-sm text-purple-400"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Brain size={14} />
                </motion.div>
                <span>Coming Soon</span>
              </motion.div>
            )}
          </div>
          
          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/60 rounded-full pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30 - Math.random() * 20, 0],
                    x: [0, (Math.random() - 0.5) * 40, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </>
          )}
        </div>
        </TouchCard>
      </div>
    );
  };
  
  return (
    <section id="projects" ref={elementRef} className="section-y relative">
      {/* Ultra-Subtle Background Overlay - Minimal interference with space effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-300/3 via-dark-200/2 to-dark-300/3" />
              <div className="container-page relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="eyebrow mb-3">02. Projects</div>
            <h2 className="h2-title mb-4 whitespace-nowrap">
              <span className="holographic-text" data-text="Featured Projects">Featured Projects</span>
            </h2>
            <p className="prose-muted max-w-3xl mx-auto px-4">
              Here are some of my favorite projects that showcase my skills and experience. 
              Each project represents a unique challenge and learning opportunity.
            </p>
          </motion.div>
          
          {/* Enhanced Category Filter */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div 
              className="flex flex-wrap gap-2 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full justify-center relative overflow-hidden"
              whileHover={{ 
                boxShadow: "0 10px 30px rgba(0, 153, 255, 0.1)",
                borderColor: "rgba(0, 153, 255, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
                animate={{
                  x: ['-100%', '100%', '-100%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'relative flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 overflow-hidden',
                    selectedCategory === category.id
                      ? 'bg-primary text-black shadow-lg shadow-primary/25'
                      : 'text-white/70 hover:text-white/90'
                  )}
                  whileHover={{ 
                    scale: 1.08,
                    y: -2,
                    transition: { duration: 0.2, type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={selectedCategory === category.id ? {
                    boxShadow: [
                      '0 0 10px rgba(0, 255, 136, 0.3)',
                      '0 0 20px rgba(0, 255, 136, 0.5)',
                      '0 0 10px rgba(0, 255, 136, 0.3)'
                    ],
                  } : {
                    boxShadow: '0 0 0px transparent',
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: selectedCategory === category.id ? Infinity : 0,
                      ease: "easeInOut",
                    }
                  }}
                >
                  {/* Ripple effect for active state */}
                  {selectedCategory === category.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-full"
                      animate={{
                        scale: [0, 2],
                        opacity: [0.3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  
                  {/* Icon with animation */}
                  <motion.div
                    animate={selectedCategory === category.id ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    } : { rotate: 0, scale: 1 }}
                    transition={{
                      duration: 1.5,
                      repeat: selectedCategory === category.id ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <category.icon size={16} />
                  </motion.div>
                  
                  <span className="relative z-10">{category.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="card-grid items-stretch"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}

                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* View More Button */}
          <motion.div variants={itemVariants} className="text-center">
            <button
              className="btn-secondary"
            >
              View All Projects on GitHub
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-50" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent opacity-50" />
    </section>
  );
};

export default Projects;