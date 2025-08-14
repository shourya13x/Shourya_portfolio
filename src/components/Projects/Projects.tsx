import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  // ExternalLink, 
  Github, 
  Eye, 
  Code, 
  Smartphone, 
  Monitor, 
  Package,
  Laugh,
  Newspaper,
  Calculator,
  StickyNote,
  Bot,
  Droplets,
  Zap,
  Database,
  Mic,
  Brain,
  Target,
  TrendingUp,
  Palette,
  Shield,
  Globe,
  Smartphone as Mobile,
  Cpu,
  // Network
} from 'lucide-react';
import { useVisibility } from '@/hooks';
import { cn } from '@/utils';
import TouchCard from '@/components/TouchCard';
import type { Project } from '@/types';

const Projects: React.FC = () => {
  const { isVisible, elementRef } = useVisibility(0.2);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const categories = [
    { id: 'all', label: 'All Projects', icon: Package },
    { id: 'web', label: 'Web Apps', icon: Monitor },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'library', label: 'Libraries', icon: Code },
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
      imageUrl: '/projects/newsflow.jpg',
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
      imageUrl: '/projects/calcnova.jpg',
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
      imageUrl: '/projects/savenote.jpg',
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
      imageUrl: '/projects/jarvis-ai.jpg',
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
      id: 'water-tracker-app',
      name: '💧 HydrateFlow - Water Intake Tracker',
      description: 'Smart water intake tracker with personalized hydration goals and beautiful UI',
      longDescription: 'Building an intelligent water intake tracking app with personalized hydration goals, beautiful animations, and smart reminders to help users maintain optimal hydration levels.',
      technologies: ['Flutter', 'Provider', 'SQLite', 'Local Notifications', 'Custom Animations', 'Health Integration'],
      githubUrl: 'https://github.com/shourya13x/hydrateflow',
      imageUrl: '/projects/hydrateflow.jpg',
      features: [
        'Personalized daily hydration goals based on weight and activity',
        'Beautiful water drop animations and progress visualization',
        'Smart reminder system with customizable intervals',
        'Daily, weekly, and monthly hydration statistics',
        'Integration with health apps for comprehensive tracking',
        'Offline-first design with local data storage'
      ],
      category: 'mobile',
      status: 'in-progress',
      year: 2024
    }
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
  
  // Function to get relevant icons for each project
  const getProjectIcons = (projectId: string) => {
    const iconMap: Record<string, { icon: React.ComponentType<any>; label: string }[]> = {
      'memeverse': [
        { icon: Laugh, label: 'Entertainment' },
        { icon: Palette, label: 'Material Design' },
        { icon: TrendingUp, label: 'Trending' },
        { icon: Globe, label: 'Social Media' }
      ],
      'newsflow-app': [
        { icon: Newspaper, label: 'News' },
        { icon: Database, label: 'Multi-API' },
        { icon: Globe, label: 'Real-time' },
        { icon: TrendingUp, label: 'Updates' }
      ],
      'calcnova-calculator': [
        { icon: Calculator, label: 'Calculator' },
        { icon: Zap, label: 'Fast' },
        { icon: Target, label: 'Precise' },
        { icon: Palette, label: 'Beautiful UI' }
      ],
      'savenote-app': [
        { icon: StickyNote, label: 'Notes' },
        { icon: Database, label: 'SQLite' },
        { icon: Shield, label: 'Secure' },
        { icon: Palette, label: 'Minimal' }
      ],
      'jarvis-ai': [
        { icon: Bot, label: 'AI Assistant' },
        { icon: Brain, label: 'Intelligent' },
        { icon: Mic, label: 'Voice Control' },
        { icon: Cpu, label: 'System Monitor' }
      ],
      'water-tracker-app': [
        { icon: Droplets, label: 'Hydration' },
        { icon: Target, label: 'Goals' },
        { icon: TrendingUp, label: 'Progress' },
        { icon: Mobile, label: 'Mobile App' }
      ]
    };
    return iconMap[projectId] || [{ icon: Package, label: 'Project' }];
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const projectIcons = getProjectIcons(project.id);
    
    return (
      <TouchCard className="group" intensity={0.3} glowColor="#0099ff">
        <div className="card h-full flex flex-col overflow-hidden">
          {/* Project Image */}
          <div className="relative aspect-video bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 mb-6 rounded-lg overflow-hidden group-hover:bg-gradient-to-br group-hover:from-primary/15 group-hover:via-secondary/10 group-hover:to-primary/10 transition-all duration-500">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
            </div>
            {/* Project Icons Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 sm:p-4">
                {projectIcons.map(({ icon: Icon, label }, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300"
                    title={label}
                  >
                    <Icon 
                      size={24} 
                      className="text-white/70 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span className={cn(
                'px-2 py-1 text-xs font-semibold rounded-full',
                project.status === 'completed' && 'bg-primary/20 text-primary',
                project.status === 'in-progress' && 'bg-yellow-500/20 text-yellow-400',
                project.status === 'archived' && 'bg-gray-500/20 text-gray-400'
              )}>
                {project.status === 'completed' && 'Completed'}
                {project.status === 'in-progress' && 'In Progress'}
                {project.status === 'archived' && 'Archived'}
              </span>
            </div>
          </div>
        
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
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-mono"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 text-xs bg-white/10 text-white/60 rounded-full font-mono">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
          
          {/* Action Links */}
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Eye size={14} />
                Live Demo
              </a>
            )}
            
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-white/70 hover:text-white/90 transition-colors"
              >
                <Github size={14} />
                Code
              </a>
            )}
          </div>
        </div>
        </div>
      </TouchCard>
    );
  };
  
  return (
    <section id="projects" ref={elementRef} className="py-12 sm:py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">
              <span className="text-primary">02.</span>{' '}
              <span className="text-white">Featured Projects</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto px-4">
              Here are some of my favorite projects that showcase my skills and experience. 
              Each project represents a unique challenge and learning opportunity.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="flex flex-wrap gap-2 p-2 glass rounded-full justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200',
                    selectedCategory === category.id
                      ? 'bg-primary text-black shadow-lg shadow-primary/25'
                      : 'text-white/70 hover:text-white/90'
                  )}
                >
                  <category.icon size={16} />
                  {category.label}
                </button>
              ))}
            </div>
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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