import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode,
  Database as DatabaseIcon,
  Smartphone as Mobile,
  Cpu as CpuIcon,
  Network as NetworkIcon,
  Brain as BrainIcon,
  Layers as LayersIcon,
  GitBranch as GitIcon,
  Cloud as CloudIcon,
  Server as ServerIcon,
  Globe as GlobeIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Bot as BotIcon,
  Laptop as LaptopIcon
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

  const skillCategories: SkillCategory[] = [
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: Mobile,
      skills: [
        { 
          id: 'flutter', 
          name: 'Flutter', 
          category: 'mobile', 
          icon: 'flutter',
          proficiency: 92,
          description: 'Cross-platform mobile app development'
        },
        { 
          id: 'dart', 
          name: 'Dart', 
          category: 'mobile', 
          icon: 'dart',
          proficiency: 90,
          description: 'Programming language for Flutter development'
        },
        { 
          id: 'material', 
          name: 'Material Design', 
          category: 'mobile', 
          icon: 'material',
          proficiency: 88,
          description: 'Modern UI design system implementation'
        },
        { 
          id: 'reactnative', 
          name: 'React Native', 
          category: 'mobile', 
          icon: 'react',
          proficiency: 75,
          description: 'Cross-platform mobile development with React'
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
          description: 'Frontend library for building user interfaces'
        },
        { 
          id: 'nextjs', 
          name: 'Next.js', 
          category: 'webdev', 
          icon: 'nextjs',
          proficiency: 80,
          description: 'React framework for production applications'
        },
        { 
          id: 'nodejs', 
          name: 'Node.js', 
          category: 'webdev', 
          icon: 'nodejs',
          proficiency: 82,
          description: 'JavaScript runtime for server-side development'
        },
        { 
          id: 'express', 
          name: 'Express.js', 
          category: 'webdev', 
          icon: 'express',
          proficiency: 85,
          description: 'Web application framework for Node.js'
        },
        { 
          id: 'typescript', 
          name: 'TypeScript', 
          category: 'webdev', 
          icon: 'typescript',
          proficiency: 88,
          description: 'Typed superset of JavaScript for better development'
        },
        { 
          id: 'mongodb', 
          name: 'MongoDB', 
          category: 'webdev', 
          icon: 'mongodb',
          proficiency: 85,
          description: 'NoSQL database for modern web applications'
        },
        { 
          id: 'postgresql', 
          name: 'PostgreSQL', 
          category: 'webdev', 
          icon: 'postgresql',
          proficiency: 80,
          description: 'Advanced open-source relational database'
        }
      ]
    },
    {
      id: 'languages',
      title: 'Programming Languages',
      icon: LaptopIcon,
      skills: [
        { 
          id: 'python', 
          name: 'Python', 
          category: 'languages', 
          icon: 'python',
          proficiency: 70,
          description: 'AI/ML development, data science, and automation'
        },
        { 
          id: 'cpp', 
          name: 'C++', 
          category: 'languages', 
          icon: 'cpp',
          proficiency: 88,
          description: 'System programming and competitive coding'
        },
        { 
          id: 'javascript', 
          name: 'JavaScript', 
          category: 'languages', 
          icon: 'javascript',
          proficiency: 85,
          description: 'Web development and modern ES6+ features'
        },
        { 
          id: 'c', 
          name: 'C', 
          category: 'languages', 
          icon: 'c',
          proficiency: 82,
          description: 'System programming and foundational concepts'
        }
      ]
    },
    {
      id: 'tools',
      title: 'Technologies & Tools',
      icon: TerminalIcon,
      skills: [
        { 
          id: 'firebase', 
          name: 'Firebase', 
          category: 'tools', 
          icon: 'firebase',
          proficiency: 85,
          description: 'Real-time database and backend services'
        },
        { 
          id: 'supabase', 
          name: 'Supabase', 
          category: 'tools', 
          icon: 'supabase',
          proficiency: 80,
          description: 'Open-source Firebase alternative with PostgreSQL'
        },
        { 
          id: 'sql', 
          name: 'SQL', 
          category: 'tools', 
          icon: 'sql',
          proficiency: 88,
          description: 'Database querying and data manipulation'
        },
        { 
          id: 'git', 
          name: 'Git', 
          category: 'tools', 
          icon: 'git',
          proficiency: 90,
          description: 'Version control and collaborative development'
        }
      ]
    },
    {
      id: 'mlai',
      title: 'AI & Machine Learning',
      icon: BotIcon,
      skills: [
        { 
          id: 'langgraph', 
          name: 'LangGraph & AI Agents', 
          category: 'mlai', 
          icon: 'langgraph',
          proficiency: 85,
          description: 'Building intelligent AI agents and workflows'
        },
        { 
          id: 'huggingface', 
          name: 'Hugging Face Transformers', 
          category: 'mlai', 
          icon: 'huggingface',
          proficiency: 80,
          description: 'State-of-the-art transformer models and NLP'
        },
        { 
          id: 'langchain', 
          name: 'LangChain', 
          category: 'mlai', 
          icon: 'langchain',
          proficiency: 88,
          description: 'LLM application development and orchestration'
        },
        { 
          id: 'llm', 
          name: 'Large Language Models', 
          category: 'mlai', 
          icon: 'llm',
          proficiency: 85,
          description: 'GPT, Claude, and custom LLM development'
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
      reactnative: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      
      // Programming Languages
      python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      
      // Technologies & Tools
      firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      
      // Full Stack Web Development
      react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    };

    const iconUrl = iconUrls[skill.icon];
    
    if (!iconUrl) {
      // Improved fallback icons with better specificity
      const fallbackIcons: { [key: string]: React.ElementType } = {
        // Mobile Development
        flutter: Mobile,
        dart: FileCode,
        material: CpuIcon,
        reactnative: Mobile,
        
        // Programming Languages
        python: CodeIcon,
        cpp: CpuIcon,
        javascript: CodeIcon,
        c: TerminalIcon,
        
        // Technologies & Tools
        firebase: CloudIcon,
        supabase: DatabaseIcon,
        sql: DatabaseIcon,
        git: GitIcon,
        
        // AI & Machine Learning
        langgraph: NetworkIcon,
        huggingface: BrainIcon,
        langchain: LayersIcon,
        llm: BrainIcon,
        
        // Full Stack Web Development
        react: GlobeIcon,
        nextjs: GlobeIcon,
        nodejs: ServerIcon,
        express: ServerIcon,
        typescript: FileCode,
        mongodb: DatabaseIcon,
        postgresql: DatabaseIcon
      };
      
      const FallbackIcon = fallbackIcons[skill.icon] || CodeIcon;
      return <FallbackIcon size={20} className="text-primary" />;
    }

    return (
      <img 
        src={iconUrl} 
        alt={skill.name} 
        width={20} 
        height={20} 
        className="object-contain"
      />
    );
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section id="expertise" ref={elementRef} className="py-16 lg:py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary"></div>
              <h2 className="text-2xl lg:text-4xl font-bold text-primary">
                Technical Expertise
              </h2>
            </div>
            <p className="text-base text-white/70 max-w-2xl mx-auto">
              Comprehensive skill set spanning multiple technologies and domains
            </p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Skills' },
              { id: 'mobile', label: 'Mobile' },
              { id: 'webdev', label: 'Web Dev' },
              { id: 'languages', label: 'Languages' },
              { id: 'tools', label: 'Tools' },
              { id: 'mlai', label: 'ML/AI' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-md border',
                  activeCategory === cat.id
                    ? 'bg-primary text-black shadow-lg shadow-primary/25 border-primary/30'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-white/10'
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {skillCategories
              .filter(category => activeCategory === 'all' || category.id === activeCategory)
              .map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="glass rounded-xl p-5 hover:glass-strong transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <category.icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="w-full h-px bg-primary/20 mb-4"></div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        variants={skillVariants}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        className="group"
                      >
                        <div className="p-3 rounded-lg bg-dark-200/20 hover:bg-dark-200/40 transition-all duration-300 group-hover:scale-105 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                              {getSkillIcon(skill)}
                            </div>
                            <div className="text-xs font-medium text-white group-hover:text-primary transition-colors duration-300 truncate">
                              {skill.name}
                            </div>
                          </div>
                          <div className="w-full bg-dark-200/30 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
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