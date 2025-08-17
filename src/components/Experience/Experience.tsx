import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ExternalLink, ChevronRight } from 'lucide-react';
import { useVisibility } from '@/hooks';
import { formatDate, calculateDuration, cn } from '@/utils';
import type { Experience } from '@/types';

const Experience: React.FC = () => {
  const { isVisible, elementRef } = useVisibility(0.2);
  const [activeExperience, setActiveExperience] = useState<string>('ieee-student-member');
  const timelineRef = useRef<HTMLDivElement>(null);
  const [dotPosition, setDotPosition] = useState(0);
  
  const experiences: Experience[] = [
    {
      id: 'ieee-student-member',
      company: 'IEEE Student Branch',
      position: 'Student Member & Event Organizer',
      startDate: '2023-01-01',
      endDate: undefined,
      current: true,
      description: 'Organizing technical events and hackathons while volunteering in IEEE conferences',
      achievements: [
        'Organized and coordinated multiple hackathons and technical events',
        'Managed teams of 20+ participants ensuring smooth event execution',
        'Volunteered in technical workshops and coding competitions',
        'Supported event logistics and enhanced participant engagement',
        'Contributed to IEEE conferences and technical community building'
      ],
      technologies: ['Event Management', 'Team Leadership', 'Community Building', 'Technical Workshops'],
      location: 'Chandigarh University, Mohali',
      companyUrl: 'https://ieee.org',
      logoUrl: '/companies/ieee.jpg'
    },
    {
      id: 'blockchain-developer',
      company: 'Metacrafters Training Program',
      position: 'Summer Trainee',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      current: false,
      description: 'Developed Solidity-based Smart Contracts and deployed DApps on Avalanche testnet',
      achievements: [
        'Developed Solidity-based Smart Contracts using Gitpod, Remix IDE, Hardhat, and Truffle',
        'Optimized contract deployment time by 30% through efficient coding practices',
        'Deployed and tested DApps on Avalanche Fuji C-Chain Testnet',
        'Ensured 99% uptime during testing and development phases',
        'Earned ₹14,000 scholarship for successfully completing the program'
      ],
      technologies: ['Solidity', 'Hardhat', 'Truffle', 'Remix IDE', 'Avalanche', 'DApp Development'],
      location: 'Remote',
      companyUrl: 'https://metacrafters.io',
      logoUrl: '/companies/metacrafters.jpg'
    },
    {
      id: 'competitive-programmer',
      company: 'Problem Solving',
      position: 'Problem Solver & Algorithm Enthusiast',
      startDate: '2022-08-01',
      endDate: undefined,
      current: true,
      description: 'Active problem solver tackling DSA problems across multiple platforms',
      achievements: [
        'Achieved 6-star rating in Problem Solving and C++ on HackerRank',
        'Solved 400+ DSA questions on LeetCode with consistent progress',
        'Completed 600+ total DSA problems across GFG, Codeforces, and CodeChef',
        'Maintained 300+ days Problem of the Day (POTD) streak on LeetCode'
      ],
      technologies: ['C++', 'C', 'Data Structures', 'Algorithms', 'Problem Solving'],
      location: 'Online Platforms',
      companyUrl: 'https://codolio.com/profile/shouryagupta13',
      logoUrl: '/companies/competitive.jpg'
    }
  ];

  // Calculate dot position based on active experience
  useEffect(() => {
    const activeIndex = experiences.findIndex(exp => exp.id === activeExperience);
    if (activeIndex !== -1 && timelineRef.current) {
      const items = timelineRef.current.children;
      if (items[activeIndex]) {
        const itemElement = items[activeIndex] as HTMLElement;
        const itemTop = itemElement.offsetTop;
        const itemHeight = itemElement.offsetHeight;
        const timelineTop = timelineRef.current.offsetTop;
        const newPosition = (itemTop - timelineTop) + (itemHeight / 2) - 16; // Center the dot
        setDotPosition(Math.max(0, newPosition));
      }
    }
  }, [activeExperience, experiences.length]);

  const handleExperienceChange = (experienceId: string) => {
    setActiveExperience(experienceId);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const selectedExperience = experiences.find(exp => exp.id === activeExperience);
  
  return (
    <section id="experience" ref={elementRef} className="py-20 lg:py-32 relative">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 whitespace-nowrap">
              <span className="text-primary">03.</span>{' '}
              <span className="text-white">Experience</span>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              My professional journey spans several years across different companies and projects, 
              each contributing to my growth as a software engineer.
            </p>
          </motion.div>
          
          {/* Timeline Layout */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-8 lg:gap-16 space-y-8 lg:space-y-0">
            {/* Timeline Sidebar - relative, fixed width */}
            <div className="w-full lg:w-[400px] relative z-30 flex-shrink-0">
              {/* Timeline Line */}
              <div className="absolute -left-6 top-0 h-full w-2 bg-gradient-to-b from-primary/40 via-primary to-primary/40 rounded-full shadow-lg shadow-primary/20" />
              {/* Timeline Line Glow */}
              <div className="absolute -left-6 top-0 h-full w-2 bg-gradient-to-b from-primary/20 via-primary/30 to-primary/20 rounded-full blur-sm" />
              {/* Dynamic Moving Dot */}
              <motion.div
                className="absolute -left-9 top-0 w-8 h-8 bg-primary rounded-full border-4 border-dark-300 z-20 shadow-xl shadow-primary/40"
                initial={false}
                animate={{ 
                  y: dotPosition,
                  scale: dotPosition === 0 ? 0 : 1
                }}
                transition={{ 
                  y: {
                    type: "spring", 
                    stiffness: 200, 
                    damping: 20,
                    duration: 0.4
                  },
                  scale: {
                    duration: 0.2
                  }
                }}
              />
                             <div ref={timelineRef} className="relative py-8 space-y-6">
                  {experiences.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative z-30"
                    >
                    {/* Static Timeline Dot (for visual reference) */}
                    <div className="absolute -left-9 top-1/2 -translate-y-1/2 w-8 h-8 bg-transparent rounded-full border-3 border-white/30 z-10" />
                                          {/* Timeline Item Content */}
                      <motion.button
                        onClick={() => handleExperienceChange(experience.id)}
                        className={cn(
                          'w-full text-left p-6 pl-32 rounded-2xl transition-all duration-300 border-2',
                          'hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-300',
                          'lg:border-2',
                          'relative z-30',
                          activeExperience === experience.id
                            ? 'bg-primary/10 border-primary/50 text-primary shadow-xl shadow-primary/20'
                            : 'border-white/20 text-white/80 hover:border-primary/50 hover:text-white hover:shadow-xl'
                        )}
                        style={{ fontSize: '1rem' }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                      {/* Current Badge */}
                      {experience.current && (
                        <div className="absolute -top-3 -right-3 z-20">
                          <span className="px-2 py-1 sm:px-3 sm:py-1 bg-primary text-dark-300 text-xs rounded-full font-bold shadow-lg">
                            CURRENT
                          </span>
                        </div>
                      )}
                      
                      {/* Company Info */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-lg lg:text-xl mb-2 leading-tight">
                            {experience.company}
                          </h3>
                          <p className="text-sm lg:text-base font-medium opacity-80 leading-relaxed">
                            {experience.position}
                          </p>
                        </div>
                        
                        {/* Duration */}
                        <div className="flex items-center gap-2 text-xs lg:text-sm opacity-70">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <Calendar size={14} className="flex-shrink-0" />
                          <span className="truncate">
                            {formatDate(experience.startDate)} -{' '}
                            {experience.current ? 'Present' : formatDate(experience.endDate!)}
                          </span>
                        </div>
                        
                        {/* Location */}
                        <div className="flex items-center gap-2 text-xs lg:text-sm opacity-70">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <MapPin size={14} className="flex-shrink-0" />
                          <span className="truncate">{experience.location}</span>
                        </div>
                        
                        {/* Duration Badge */}
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-mono border border-primary/20">
                          {calculateDuration(experience.startDate, experience.endDate)}
                        </div>
                      </div>
                      
                      {/* Arrow Indicator */}
                      <div className={cn(
                        'absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 transition-transform duration-200 z-10',
                        activeExperience === experience.id ? 'text-primary' : 'text-white/40'
                      )}>
                        <div className={cn(
                          'w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200',
                          activeExperience === experience.id 
                            ? 'bg-primary/20' 
                            : 'bg-white/5 hover:bg-white/10'
                        )}>
                          <ChevronRight 
                            size={14} 
                            className={cn(
                              'transition-transform duration-200 sm:w-4 sm:h-4',
                              activeExperience === experience.id ? 'rotate-90' : ''
                            )}
                          />
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
            
                         {/* Experience Details - take the rest of the space, extra left margin */}
             <div className="w-full lg:flex-1 relative z-20 lg:ml-8">
              <AnimatePresence mode="wait">
                {selectedExperience && (
                  <motion.div
                    key={selectedExperience.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-20"
                  >
                    {/* Company Header */}
                    <div className="space-y-6 mb-12">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-3">
                          <h3 className="text-3xl lg:text-4xl font-bold text-primary">
                            {selectedExperience.position}
                          </h3>
                          <div className="flex items-center gap-2 text-xl text-white/90">
                            {selectedExperience.companyUrl ? (
                              <a
                                href={selectedExperience.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-primary transition-colors"
                              >
                                <span className="font-semibold">
                                  {selectedExperience.company}
                                </span>
                                <ExternalLink size={20} />
                              </a>
                            ) : (
                              <span className="font-semibold">
                                {selectedExperience.company}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        {selectedExperience.current && (
                          <div className="flex-shrink-0">
                            <span className="px-4 py-2 bg-primary/20 text-primary text-sm rounded-full font-bold border border-primary/30 shadow-lg">
                              Currently Working
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Meta Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-white/70 bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
                          <Calendar size={16} className="flex-shrink-0" />
                          <span className="truncate">
                            {formatDate(selectedExperience.startDate)} -{' '}
                            {selectedExperience.current ? 'Present' : formatDate(selectedExperience.endDate!)}
                          </span>
                          <span className="text-primary font-mono flex-shrink-0">
                            ({calculateDuration(selectedExperience.startDate, selectedExperience.endDate)})
                          </span>
                        </div>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
                          <MapPin size={16} className="flex-shrink-0" />
                          <span className="truncate">{selectedExperience.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg mb-8">
                      <h4 className="text-white font-semibold mb-6 text-lg flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Role Overview
                      </h4>
                      <p className="text-white/80 text-lg leading-relaxed">
                        {selectedExperience.description}
                      </p>
                    </div>
                    
                    {/* Key Achievements */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg mb-8">
                      <h4 className="text-white font-semibold mb-6 text-lg flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-4">
                        {selectedExperience.achievements.map((achievement, index) => (
                          <motion.li
                            key={`achievement-${index}-${achievement.slice(0, 20)}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 text-white/80"
                          >
                            <div className="w-5 h-5 bg-primary rounded-full mt-2 flex-shrink-0 shadow-sm" />
                            <span className="leading-relaxed text-base">
                              {achievement}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          

        </motion.div>
      </div>
    </section>
  );
};

export default Experience;