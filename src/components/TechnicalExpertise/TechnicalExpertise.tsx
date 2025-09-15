import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database as DatabaseIcon,
  Network as NetworkIcon,
  Brain as BrainIcon,
  Layers as LayersIcon,
  Globe as GlobeIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
  TrendingUp
} from 'lucide-react';
import { useVisibility } from '@/hooks';
import { cn } from '@/utils';

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  proficiency: number;
  description: string;
  yearsExperience: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  color: string;
  iconComponent?: React.ElementType;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  skills: Skill[];
}

const TechnicalExpertise: React.FC = () => {
  const { isVisible, elementRef } = useVisibility(0.2);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const wasVisible = useRef(false);

  const skillCategories: SkillCategory[] = [
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: GlobeIcon,
      skills: [
        { 
          id: 'flutter', 
          name: 'Flutter', 
          category: 'mobile', 
          icon: 'flutter',
          proficiency: 92,
          description: 'Cross-platform mobile app development',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#02569B'
        },
        { 
          id: 'dart', 
          name: 'Dart', 
          category: 'mobile', 
          icon: 'dart',
          proficiency: 90,
          description: 'Programming language for Flutter development',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#0175C2'
        },
        { 
          id: 'material', 
          name: 'Material Design', 
          category: 'mobile', 
          icon: 'material',
          proficiency: 88,
          description: 'Modern UI design system implementation',
          yearsExperience: 2,
          skillLevel: 'Advanced',
          color: '#757575'
        },
        { 
          id: 'reactnative', 
          name: 'React Native', 
          category: 'mobile', 
          icon: 'react',
          proficiency: 75,
          description: 'Cross-platform mobile development with React',
          yearsExperience: 1.5,
          skillLevel: 'Advanced',
          color: '#61DAFB'
        }
      ]
    },
    {
      id: 'webdev',
      title: 'Full Stack Web Development',
      icon: GlobeIcon,
      skills: [
        { 
          id: 'react', 
          name: 'React.js', 
          category: 'webdev', 
          icon: 'react',
          proficiency: 85,
          description: 'Frontend library for building user interfaces',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#61DAFB'
        },
        { 
          id: 'nextjs', 
          name: 'Next.js', 
          category: 'webdev', 
          icon: 'nextjs',
          proficiency: 80,
          description: 'React framework for production applications',
          yearsExperience: 2,
          skillLevel: 'Advanced',
          color: '#000000'
        },
        { 
          id: 'nodejs', 
          name: 'Node.js', 
          category: 'webdev', 
          icon: 'nodejs',
          proficiency: 82,
          description: 'JavaScript runtime for server-side development',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#339933'
        },
        { 
          id: 'express', 
          name: 'Express.js', 
          category: 'webdev', 
          icon: 'express',
          proficiency: 85,
          description: 'Web application framework for Node.js',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#000000'
        },
        { 
          id: 'typescript', 
          name: 'TypeScript', 
          category: 'webdev', 
          icon: 'typescript',
          proficiency: 88,
          description: 'Typed superset of JavaScript for better development',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#3178C6'
        },
        { 
          id: 'mongodb', 
          name: 'MongoDB', 
          category: 'webdev', 
          icon: 'mongodb',
          proficiency: 85,
          description: 'NoSQL database for modern web applications',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#47A248'
        },
        { 
          id: 'postgresql', 
          name: 'PostgreSQL', 
          category: 'webdev', 
          icon: 'postgresql',
          proficiency: 80,
          description: 'Advanced open-source relational database',
          yearsExperience: 2,
          skillLevel: 'Advanced',
          color: '#336791'
        }
      ]
    },
    {
      id: 'languages',
      title: 'Programming Languages',
      icon: CodeIcon,
      skills: [
        { 
          id: 'python', 
          name: 'Python', 
          category: 'languages', 
          icon: 'python',
          proficiency: 70,
          description: 'AI/ML development, data science, and automation',
          yearsExperience: 3,
          skillLevel: 'Advanced',
          color: '#3776AB'
        },
        { 
          id: 'cpp', 
          name: 'C++', 
          category: 'languages', 
          icon: 'cpp',
          proficiency: 88,
          description: 'System programming and competitive coding',
          yearsExperience: 4,
          skillLevel: 'Expert',
          color: '#00599C'
        },
        { 
          id: 'javascript', 
          name: 'JavaScript', 
          category: 'languages', 
          icon: 'javascript',
          proficiency: 85,
          description: 'Web development and modern ES6+ features',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#F7DF1E'
        },
        { 
          id: 'c', 
          name: 'C', 
          category: 'languages', 
          icon: 'c',
          proficiency: 82,
          description: 'System programming and foundational concepts',
          yearsExperience: 4,
          skillLevel: 'Expert',
          color: '#A8B9CC'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Technologies & Tools',
      icon: SettingsIcon,
      skills: [
        { 
          id: 'firebase', 
          name: 'Firebase', 
          category: 'tools', 
          icon: 'firebase',
          proficiency: 85,
          description: 'Real-time database and backend services',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#FFCA28'
        },
        { 
          id: 'supabase', 
          name: 'Supabase', 
          category: 'tools', 
          icon: 'supabase',
          proficiency: 80,
          description: 'Open-source Firebase alternative with PostgreSQL',
          yearsExperience: 2,
          skillLevel: 'Advanced',
          color: '#3ECF8E'
        },
        { 
          id: 'sql', 
          name: 'SQL', 
          category: 'tools', 
          icon: 'sql',
          proficiency: 88,
          description: 'Database querying and data manipulation',
          yearsExperience: 3,
          skillLevel: 'Expert',
          color: '#336791'
        },
        { 
          id: 'git', 
          name: 'Git', 
          category: 'tools', 
          icon: 'git',
          proficiency: 90,
          description: 'Version control and collaborative development',
          yearsExperience: 4,
          skillLevel: 'Expert',
          color: '#F05032'
        }
      ]
    },
    {
      id: 'mlai',
      title: 'AI & Machine Learning',
      icon: BrainIcon,
      skills: [
        { 
          id: 'langgraph', 
          name: 'LangGraph & AI Agents', 
          category: 'mlai', 
          icon: 'langgraph',
          proficiency: 85,
          description: 'Building intelligent AI agents and workflows',
          yearsExperience: 2,
          skillLevel: 'Expert',
          color: '#FF6B6B'
        },
        { 
          id: 'huggingface', 
          name: 'Hugging Face Transformers', 
          category: 'mlai', 
          icon: 'huggingface',
          proficiency: 80,
          description: 'State-of-the-art transformer models and NLP',
          yearsExperience: 2,
          skillLevel: 'Advanced',
          color: '#FFD21E'
        },
        { 
          id: 'langchain', 
          name: 'LangChain', 
          category: 'mlai', 
          icon: 'langchain',
          proficiency: 88,
          description: 'LLM application development and orchestration',
          yearsExperience: 2,
          skillLevel: 'Expert',
          color: '#1C3A5E'
        },
        { 
          id: 'llm', 
          name: 'Large Language Models', 
          category: 'mlai', 
          icon: 'llm',
          proficiency: 85,
          description: 'GPT, Claude, and custom LLM development',
          yearsExperience: 2,
          skillLevel: 'Expert',
          color: '#10A37F'
        }
      ]
    }
  ];

  const getSkillIcon = (skill: Skill) => {
    const iconUrls: { [key: string]: string } = {
      // Mobile Development
      flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      dart: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
      material: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
      
      // Web Development
      react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      
      // Programming Languages
      python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      
      // Tools
      firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
    };

    const iconUrl = iconUrls[skill.icon];
    
    if (!iconUrl) {
      // Fallback icons for skills without devicon support
      const fallbackIcons: { [key: string]: React.ElementType } = {
        // AI & ML
        langgraph: NetworkIcon,
        huggingface: BrainIcon,
        langchain: LayersIcon,
        llm: BrainIcon,
        
        // Tools
        supabase: DatabaseIcon
      };
      
      const FallbackIcon = fallbackIcons[skill.icon] || CodeIcon;
      return <FallbackIcon size={28} className="text-white" />;
    }

    return (
      <img 
        src={iconUrl} 
        alt={skill.name} 
        width={28} 
        height={28} 
        className="object-contain filter brightness-110"
      />
    );
  };

  // Get all skills for "All Skills" view
  const allSkills = skillCategories.flatMap(category => category.skills);

  // Get filtered skills based on active category
  const getFilteredSkills = () => {
    if (activeCategory === 'all') {
      return allSkills;
    }
    const category = skillCategories.find(cat => cat.id === activeCategory);
    return category ? category.skills : [];
  };

  // Set default selected skill
  React.useEffect(() => {
    if (!selectedSkill && allSkills.length > 0) {
      setSelectedSkill(allSkills.find(skill => skill.id === 'react') || allSkills[0]);
    }
  }, [allSkills, selectedSkill]);

  // Restart animations when section becomes visible
  useEffect(() => {
    if (isVisible && !wasVisible.current) {
      // Section just became visible, restart animations
      setAnimationKey(prev => prev + 1);
      wasVisible.current = true;
    } else if (!isVisible && wasVisible.current) {
      // Section is no longer visible
      wasVisible.current = false;
    }
  }, [isVisible]);

  // Ball physics animation variants
  const ballVariants = {
    hidden: (index: number) => ({
      y: -100 - (index * 50), // Start from different heights
      x: Math.random() * 200 - 100, // Random horizontal offset
      scale: 0,
      opacity: 0,
      rotate: 0
    }),
    visible: (index: number) => ({
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      rotate: 360,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 1.2,
        delay: index * 0.1,
        duration: 1.5,
        opacity: { duration: 0.3, delay: index * 0.1 },
        scale: { duration: 0.4, delay: index * 0.1 },
        rotate: { duration: 1.5, delay: index * 0.1 }
      }
    }),
    bounce: {
      y: [0, -20, 0, -10, 0, -5, 0],
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  // Container variants for staggered children animation
  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="expertise" ref={elementRef} className="py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary"></div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary whitespace-nowrap">
                Technical Expertise
              </h2>
            </div>
            <p className="text-base text-white/70 max-w-2xl mx-auto">
              Comprehensive skill set spanning multiple technologies and domains
            </p>
          </motion.div>

          {/* Tabbed Navigation */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All Skills', icon: LayersIcon },
              { id: 'mobile', label: 'Mobile', icon: GlobeIcon },
              { id: 'webdev', label: 'Web Dev', icon: GlobeIcon },
              { id: 'languages', label: 'Languages', icon: CodeIcon },
              { id: 'tools', label: 'Tools', icon: SettingsIcon },
              { id: 'mlai', label: 'AI & ML', icon: BrainIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-md border',
                  activeCategory === tab.id
                    ? 'bg-primary text-black shadow-lg shadow-primary/25 border-primary/30'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-white/10'
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Main Content Area */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8">
          {/* Skills Grid */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-6 overflow-hidden relative">
                <motion.div
                  className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-7 gap-4"
                  variants={skillsContainerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${activeCategory}-${animationKey}`} // Re-trigger animation when category changes or section becomes visible
                >
                  {getFilteredSkills().map((skill, index) => (
                    <motion.div
                      key={`${activeCategory}-${skill.id}-${animationKey}`} // Unique key for re-animation
                      custom={index}
                      variants={ballVariants}
                      initial="hidden"
                      animate="visible"
                      onMouseEnter={() => setSelectedSkill(skill)}
                      onFocus={() => setSelectedSkill(skill)}
                      whileHover={{ 
                        scale: 1.15,
                        y: -10,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ 
                        scale: 0.95,
                        transition: { duration: 0.1 }
                      }}
                      onClick={() => {
                        setSelectedSkill(skill);
                        // Add bounce animation on click
                        const element = document.getElementById(`skill-${skill.id}`);
                        if (element) {
                          element.style.animation = 'none';
                          element.offsetHeight; // Trigger reflow
                          element.style.animation = 'bounce 0.6s ease-out';
                        }
                      }}
                      className={cn(
                        'relative group cursor-pointer',
                        selectedSkill?.id === skill.id && 'ring-2 ring-primary rounded-full'
                      )}
                    >
                      <motion.div 
                        id={`skill-${skill.id}`}
                        className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`,
                          border: `2px solid ${skill.color}60`,
                          boxShadow: `0 4px 20px ${skill.color}30, inset 0 1px 0 ${skill.color}50`
                        }}
                        animate={{
                          boxShadow: [
                            `0 4px 20px ${skill.color}30, inset 0 1px 0 ${skill.color}50`,
                            `0 6px 25px ${skill.color}40, inset 0 1px 0 ${skill.color}60`,
                            `0 4px 20px ${skill.color}30, inset 0 1px 0 ${skill.color}50`
                          ]
                        }}
                        transition={{
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }
                        }}
                      >
                        {getSkillIcon(skill)}
                        
                        {/* Glowing effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${skill.color}15 0%, transparent 70%)`
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                      
                      {/* Skill Name Tooltip */}
                      <motion.div 
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                      >
                        <div className="bg-dark-200 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-white/10 backdrop-blur-sm">
                          {skill.name}
                    </div>
                      </motion.div>
                  
                      {/* Ripple effect on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{
                          scale: [0, 1.5],
                          opacity: [0, 0.3, 0],
                          transition: { duration: 0.6 }
                        }}
                        style={{
                          background: `radial-gradient(circle, ${skill.color}30 0%, transparent 70%)`
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/20 rounded-full"
                      animate={{
                        x: [0, Math.random() * 400, 0],
                        y: [0, Math.random() * 300, 0],
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 1.5
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Detail Panel */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                {selectedSkill && (
                  <motion.div
                    key={selectedSkill.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-2xl p-6 h-fit"
                  >
                    {/* Skill Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${selectedSkill.color}30, ${selectedSkill.color}15)`,
                          border: `2px solid ${selectedSkill.color}50`
                        }}
                      >
                        {getSkillIcon(selectedSkill)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{selectedSkill.name}</h3>
                        <div className="flex items-center gap-2 text-primary text-sm">
                          <span>{selectedSkill.yearsExperience}+ years experience</span>
                            </div>
                            </div>
                          </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      {selectedSkill.description}
                    </p>

                    {/* Proficiency */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm font-medium">Proficiency</span>
                        <span className="text-primary font-semibold">{selectedSkill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-dark-200/30 rounded-full h-2">
                        <motion.div 
                          className="h-2 rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${selectedSkill.color}, ${selectedSkill.color}80)`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedSkill.proficiency}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                    </div>

                    {/* Skill Level */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                          <TrendingUp size={16} />
                        </div>
                        <div className="text-white font-semibold text-lg">{selectedSkill.skillLevel}</div>
                        <div className="text-white/60 text-xs">Skill Level</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10 text-secondary mx-auto mb-2">
                          <span className="font-bold text-sm">{selectedSkill.yearsExperience}+</span>
                        </div>
                        <div className="text-white font-semibold text-lg">Years</div>
                        <div className="text-white/60 text-xs">Experience</div>
                      </div>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-px h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-px h-24 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
    </section>
  );
};

export default TechnicalExpertise; 