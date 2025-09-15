import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Minimize2, Maximize2, X } from 'lucide-react';
import { useLocalStorage } from '@/hooks';
import { cn, downloadResume } from '@/utils';
import type { CLICommand, CLIOutput, CLISession } from '@/types';
import SplineRobot from '@/components/SplineRobot';

const CLI: React.FC = () => {
  
  const [session, setSession] = useLocalStorage<CLISession>('cli-session', {
    currentPath: '/portfolio',
    history: [],
    historyIndex: -1,
    output: [{
      id: 'welcome',
      type: 'info',
      content: 'Welcome to John Developer\'s Portfolio Terminal!\nType "help" to see available commands.',
      timestamp: new Date()
    }]
  });
  
  const [currentInput, setCurrentInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [showRobot, setShowRobot] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  
  // Reset CLI session when component mounts (every time CLI is opened)
  useEffect(() => {
    const resetSession: CLISession = {
      currentPath: '/portfolio',
      history: [],
      historyIndex: -1,
      output: [{
        id: 'welcome',
        type: 'info',
        content: `Welcome to Shourya's Portfolio Terminal! 🚀\nType "help" to see available commands.\n🤖Try "robot" to meet the robo! 🤖`,
        timestamp: new Date()
      }]
    };
    
    setSession(resetSession);
    setCurrentInput('');
    setIsMinimized(false);
    setIsMaximized(false);
    setCurrentTheme('classic');
  }, []); // Empty dependency array means this runs once when component mounts
  
    const commands: CLICommand[] = [
    {
      name: 'help',
      description: 'Show available commands',
      usage: 'help [command]',
      category: 'system'
    },
    {
      name: 'ls',
      description: 'List directory contents',
      usage: 'ls [directory]',
      category: 'navigation'
    },
    {
      name: 'cd',
      description: 'Change directory',
      usage: 'cd <directory>',
      category: 'navigation'
    },
    {
      name: 'cat',
      description: 'Display file contents',
      usage: 'cat <file>',
      category: 'info'
    },
    {
      name: 'about',
      description: 'Show information about me',
      usage: 'about',
      category: 'info'
    },
    {
      name: 'skills',
      description: 'Display technical skills',
      usage: 'skills [category]',
      category: 'info'
    },
    {
      name: 'projects',
      description: 'List my projects',
      usage: 'projects [filter]',
      category: 'info'
    },
    {
      name: 'experience',
      description: 'Show work experience',
      usage: 'experience',
      category: 'info'
    },
    {
      name: 'contact',
      description: 'Show contact information',
      usage: 'contact',
      category: 'info'
    },
    {
      name: 'resume',
      description: 'Download resume',
      usage: 'resume',
      category: 'action'
    },
    {
      name: 'clear',
      description: 'Clear terminal screen',
      usage: 'clear',
      category: 'system'
    },
    {
      name: 'theme',
      description: 'Change terminal theme',
      usage: 'theme <name>',
      category: 'system'
    },
    {
      name: 'wheel',
      description: 'Interact with the rotating wheels',
      usage: 'wheel [status|info|spin]',
      category: 'action'
    },
    {
      name: 'matrix',
      description: 'Control the falling binary matrix',
      usage: 'matrix [status|rain|stop|neo]',
      category: 'system'
    },
    {
      name: 'robot',
      description: 'Show the 3D Spline robot',
      usage: 'robot',
      category: 'action'
    },
    {
      name: 'close',
      description: 'Close the robot viewer',
      usage: 'close',
      category: 'system'
    }
  ];
  
  const themes = {
    classic: {
      name: 'Classic',
      description: 'Clean and minimal terminal theme',
      colors: {
        primary: '#00ff88',
        secondary: '#0099ff',
        accent: '#facc15',
        background: 'rgba(10, 10, 10, 0.85)',
        surface: 'rgba(26, 26, 26, 0.90)',
        text: '#ffffff',
        muted: '#666666'
      }
    },
    matrix: {
      name: 'Matrix',
      description: 'Green digital rain inspired theme',
      colors: {
        primary: '#00ff41',
        secondary: '#00cc33',
        accent: '#00ff88',
        background: 'rgba(0, 0, 0, 0.85)',
        surface: 'rgba(10, 10, 10, 0.90)',
        text: '#00ff41',
        muted: '#00cc33'
      }
    },
    cyberpunk: {
      name: 'Cyberpunk',
      description: 'Neon cyberpunk aesthetic',
      colors: {
        primary: '#ff0080',
        secondary: '#00ffff',
        accent: '#ffff00',
        background: 'rgba(10, 10, 10, 0.85)',
        surface: 'rgba(26, 26, 26, 0.90)',
        text: '#ffffff',
        muted: '#ff0080'
      }
    },
    ocean: {
      name: 'Ocean',
      description: 'Deep blue ocean theme',
      colors: {
        primary: '#00bfff',
        secondary: '#0080ff',
        accent: '#40e0d0',
        background: 'rgba(0, 17, 34, 0.85)',
        surface: 'rgba(0, 34, 68, 0.90)',
        text: '#ffffff',
        muted: '#00bfff'
      }
    }
  };

  // Auto-completion data
  const autoCompleteData = {
    commands: commands.map(cmd => cmd.name),
    files: [
      'about.md',
      'skills.json', 
      'contact.vcf',
      'meme-aggregation-app.md',
      'newsflow-app.md',
      'calcnova-calculator.md',
      'savenote-app.md',
      'ieee-student-member.md',
      'metacrafters-training.md',
      'competitive-programming.md'
    ],
    directories: ['projects/', 'experience/'],
    themes: Object.keys(themes),
    categories: ['sections', 'interactive', 'ui', '3d'],
    skills: ['software-engineering', 'app-development', 'gaming', 'web-development', 'backend', 'frontend']
  };

  // const fileSystem = {
  //   '/portfolio': {
  //     'about.md': '# About Me\n\nI\'m a passionate software engineer with a love for creating elegant solutions to complex problems. My journey in tech spans over 5 years, during which I\'ve worked on diverse projects ranging from web applications to mobile apps.\n\nI specialize in Flutter development, creating cross-platform applications that run seamlessly on multiple platforms. From meme aggregation apps to comprehensive calculators, I focus on building beautiful, functional, and performant mobile experiences.\n\nWhen I\'m not coding, you can find me solving DSA problems on LeetCode, participating in hackathons, or organizing technical events as an IEEE Student Member. I\'ve solved 600+ problems across various problem solving platforms.',
  //     'skills.json': JSON.stringify({
  //       'software-engineering': ['Clean Architecture', 'Performance Optimization', 'Maintainable Codebases', 'Modern Technologies', 'Best Practices'],
  //       'app-development': ['Flutter', 'React Native', 'Cross-platform Development', 'Native-like Experiences', 'Performance Optimization', 'User Experience', 'Modern Design Patterns'],
  //       'gaming': ['Unity', 'Unreal Engine', 'Game Development', 'Gaming Technologies', 'Development Frameworks', 'Immersive Experiences'],
  //       'web-development': ['React', 'Next.js', 'TypeScript', 'Full-stack Solutions', 'User Experience', 'Performance'],
  //       'backend': ['Node.js', 'Express', 'API Design', 'Microservices', 'RESTful APIs', 'Authentication', 'Security'],
  //       'frontend': ['User Interface Design', 'User Experience', 'Modern Frameworks', 'Accessibility', 'Beautiful UIs', 'User Engagement']
  //     }, null, 2),
  //     'contact.vcf': 'Email: shouryaofficial1303@gmail.com\nPhone: +91-8272070100\nLocation: Chandigarh University, Mohali, Punjab\nLinkedIn: linkedin.com/in/shouryagupta13\nGitHub: github.com/shourya13x\nHackerRank: hackerrank.com/profile/shourya_skg',
  //     'projects/': {
  //       'meme-aggregation-app.md': 'Production-ready meme app supporting 3 platforms with Material Design 3 UI\n\nTechnologies: Flutter, Dart, Reddit API, OAuth2, Material Design 3\n\nFeatures:\n• OAuth2 authentication with Reddit API\n• Access to 142 subreddits across 6 categories\n• Infinite scroll with cursor-based pagination\n• 1000+ memes per session with <2s load times\n• Cached network images with adaptive theming\n• 100% code sharing across platforms\n\nGitHub: https://github.com/shourya13x/meme-app',
  //       'newsflow-app.md': 'Comprehensive news aggregation app integrating 5 major news APIs\n\nTechnologies: Flutter, Multi-API Integration, Provider, Clean Architecture\n\nFeatures:\n• Integration with 5 major news APIs\n• Real-time updates and intelligent filtering\n• Favorites management and offline support\n• Clean Architecture with Repository Pattern\n• Pull-to-refresh and advanced search\n• Adaptive light/dark themes with API fallbacks\n\nGitHub: https://github.com/shourya13x/newsflow',
  //       'calcnova-calculator.md': 'Comprehensive calculator suite with 9 specialized unit converters\n\nTechnologies: Flutter, Mathematical Computing, Responsive Design\n\nFeatures:\n• Advanced and Scientific calculators\n• 9 specialized unit converters\n• 6 special-purpose calculators (Birthday, Discount, etc.)\n• Modern UI with gradient and glassmorphism effects\n• Universal deployment across 7 platforms\n• 100% screen compatibility with smooth animations\n\nGitHub: https://github.com/shourya13x/calcnova',
  //       'savenote-app.md': 'Beautiful and minimal notes app with SQLite integration\n\nTechnologies: Flutter, SQLite, CRUD Operations, InheritedWidget\n\nFeatures:\n• Seamless note capture with intuitive UI\n• Robust SQLite local data storage\n• Efficient CRUD operations with data persistence\n• Custom InheritedWidget for state management\n• Optimized UI updates without over-rebuilding\n• Beautiful and minimal design approach\n\nGitHub: https://github.com/shourya13x/savenote',
  //       'jarvis-ai.md': '🦾 JARVIS.AI - Iron Man-inspired AI Assistant\n\nTechnologies: Flutter, Riverpod, Google Gemini API, Speech Recognition, Text-to-Speech, Rive Animations\n\nFeatures:\n• Voice recognition with real-time feedback\n• Google Gemini AI integration for intelligent responses\n• Iron Man-themed UI with holographic animations\n• Real-time system monitoring (Memory, CPU, Network)\n• Speech-to-text and text-to-speech capabilities\n• Conversation memory and context management\n• Arc Reactor loading animations and particle systems\n• Holographic panel backgrounds with neon glow effects\n\nStatus: In Progress - Core features implemented\nGitHub: https://github.com/shourya13x/jarvis-ai',
  //       'hydrateflow.md': '💧 HydrateFlow - Smart Water Intake Tracker\n\nTechnologies: Flutter, Provider, SQLite, Local Notifications, Custom Animations, Health Integration\n\nFeatures:\n• Personalized daily hydration goals based on weight and activity\n• Beautiful water drop animations and progress visualization\n• Smart reminder system with customizable intervals\n• Daily, weekly, and monthly hydration statistics\n• Integration with health apps for comprehensive tracking\n• Offline-first design with local data storage\n• Custom water drop animations and fluid UI\n• Achievement system and streak tracking\n\nStatus: In Progress - Core UI and tracking features implemented\nGitHub: https://github.com/shourya13x/hydrateflow'
  //     },
  //     'experience/': {
  //       'ieee-student-member.md': 'IEEE Student Branch - Student Member & Event Organizer\n\nDuration: 2023-Present (Current)\nLocation: Chandigarh University, Mohali\n\nDescription: Organizing technical events and hackathons while volunteering in IEEE conferences\n\nKey Achievements:\n• Organized and coordinated multiple hackathons and technical events\n• Managed teams of 20+ participants ensuring smooth event execution\n• Volunteered in technical workshops and coding competitions\n• Supported event logistics and enhanced participant engagement\n• Contributed to IEEE conferences and technical community building\n\nTechnologies: Event Management, Team Leadership, Community Building, Technical Workshops',
  //       'metacrafters-training.md': 'Metacrafters Training Program - Summer Trainee\n\nDuration: Jun 2023 - Aug 2023 (3 months)\nLocation: Remote\n\nDescription: Developed Solidity-based Smart Contracts and deployed DApps on Avalanche testnet\n\nKey Achievements:\n• Developed Solidity-based Smart Contracts using Gitpod, Remix IDE, Hardhat, and Truffle\n• Optimized contract deployment time by 30% through efficient coding practices\n• Deployed and tested DApps on Avalanche Fuji C-Chain Testnet\n• Ensured 99% uptime during testing and development phases\n• Earned ₹14,000 scholarship for successfully completing the program\n\nTechnologies: Solidity, Hardhat, Truffle, Remix IDE, Avalanche, DApp Development',
  //       'competitive-programming.md': 'Problem Solving - Problem Solver & Algorithm Enthusiast\n\nDuration: Aug 2022-Present (Current)\nLocation: Online Platforms\n\nDescription: Active problem solver tackling DSA problems across multiple platforms\n\nKey Achievements:\n• Achieved 6-star rating in Problem Solving and C++ on HackerRank\n• Solved 400+ DSA questions on LeetCode with consistent progress\n• Completed 600+ total DSA problems across GFG, Codeforces, and CodeChef\n• Maintained 300+ days Problem of the Day (POTD) streak on LeetCode\n\nTechnologies: C++, C, Data Structures, Algorithms, Problem Solving'
  //     }
  //   }
  // };
  
  // Auto-completion functions
  const generateSuggestions = (input: string): string[] => {
    const words = input.trim().split(' ');
    const currentWord = words[words.length - 1] || '';
    // const previousWords = words.slice(0, -1);
    
    let suggestions: string[] = [];
    
    // First word - suggest commands
    if (words.length === 1) {
      suggestions = autoCompleteData.commands.filter(cmd => 
        cmd.toLowerCase().startsWith(currentWord.toLowerCase())
      );
    }
    // Second word - suggest based on first command
    else if (words.length === 2) {
      const command = words[0].toLowerCase();
      
      switch (command) {
        case 'ls':
        case 'cd':
          suggestions = [...autoCompleteData.directories, ...autoCompleteData.files].filter(item =>
            item.toLowerCase().startsWith(currentWord.toLowerCase())
          );
          break;
        case 'cat':
          suggestions = autoCompleteData.files.filter(file =>
            file.toLowerCase().startsWith(currentWord.toLowerCase())
          );
          break;
        case 'theme':
          suggestions = autoCompleteData.themes.filter(theme =>
            theme.toLowerCase().startsWith(currentWord.toLowerCase())
          );
          break;
        case 'skills':
          suggestions = autoCompleteData.skills.filter(skill =>
            skill.toLowerCase().startsWith(currentWord.toLowerCase())
          );
          break;
        case 'help':
          suggestions = autoCompleteData.commands.filter(cmd =>
            cmd.toLowerCase().startsWith(currentWord.toLowerCase())
          );
          break;
        default:
          suggestions = [];
      }
    }
    
    return suggestions.slice(0, 5); // Limit to 5 suggestions
  };

  const applySuggestion = (suggestion: string) => {
    const words = currentInput.trim().split(' ');
    words[words.length - 1] = suggestion;
    setCurrentInput(words.join(' '));
    setShowSuggestions(false);
    setSuggestionIndex(0);
  };

  const addOutput = (content: string, type: CLIOutput['type'] = 'output') => {
    const newOutput: CLIOutput = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    
    setSession((prev: any) => ({
      ...prev,
      output: [...prev.output, newOutput]
    }));
  };
  
  const executeCommand = (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    // Add command to history
    setSession((prev: any) => ({
      ...prev,
      history: [...prev.history, trimmedInput],
      historyIndex: -1
    }));
    
    // Add command to output
    addOutput(`${session.currentPath} $ ${trimmedInput}`, 'command');
    
    const [cmd, ...args] = trimmedInput.split(' ');
    const command = commands.find(c => c.name === cmd.toLowerCase());
    
    if (!command) {
      addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
      return;
    }
    
    // Execute command
    switch (cmd.toLowerCase()) {
      case 'help':
        if (args.length > 0) {
          const helpCmd = commands.find(c => c.name === args[0]);
          if (helpCmd) {
            addOutput(`${helpCmd.name} - ${helpCmd.description}\nUsage: ${helpCmd.usage}`);
          } else {
            addOutput(`No help available for: ${args[0]}`, 'error');
          }
        } else {
          const helpText = commands
            .reduce((acc, cmd) => {
              if (!acc[cmd.category]) acc[cmd.category] = [];
              acc[cmd.category].push(`  ${cmd.name.padEnd(12)} ${cmd.description}`);
              return acc;
            }, {} as Record<string, string[]>);
          
          let output = 'Available commands:\n\n';
          Object.entries(helpText).forEach(([category, cmds]) => {
            output += `${category.toUpperCase()}:\n${cmds.join('\n')}\n\n`;
          });
          addOutput(output);
        }
        break;
        
      case 'ls':
        const path = args[0] || session.currentPath;
        if (path === '/portfolio' || path === '.') {
          addOutput('about.md\nskills.json\ncontact.vcf\nprojects/\nexperience/');
        } else if (path === 'projects' || path === 'projects/') {
          addOutput('meme-aggregation-app.md\nnewsflow-app.md\ncalcnova-calculator.md\nsavenote-app.md');
        } else if (path === 'experience' || path === 'experience/') {
          addOutput('ieee-student-member.md\nmetacrafters-training.md\ncompetitive-programming.md');
        } else {
          addOutput(`Directory not found: ${path}`, 'error');
        }
        break;
        
      case 'cd':
        if (args.length === 0) {
          setSession((prev: any) => ({ ...prev, currentPath: '/portfolio' }));
          addOutput('Changed to /portfolio');
        } else {
          const newPath = args[0];
          if (newPath === '..' || newPath === '../') {
            setSession((prev: any) => ({ ...prev, currentPath: '/portfolio' }));
            addOutput('Changed to /portfolio');
          } else {
            addOutput(`Directory not found: ${newPath}`, 'error');
          }
        }
        break;
        
      case 'cat':
        if (args.length === 0) {
          addOutput('Usage: cat <file>', 'error');
        } else {
          const filename = args[0];
                  if (filename === 'about.md') {
          addOutput('# About Me\n\nI\'m a passionate software engineer with a love for creating elegant solutions to complex problems. My journey in tech spans over 5 years, during which I\'ve worked on diverse projects ranging from web applications to mobile apps.\n\nI specialize in Flutter development, creating cross-platform applications that run seamlessly on multiple platforms. From meme aggregation apps to comprehensive calculators, I focus on building beautiful, functional, and performant mobile experiences.\n\nWhen I\'m not coding, you can find me solving DSA problems on LeetCode, participating in hackathons, or organizing technical events as an IEEE Student Member. I\'ve solved 600+ problems across various problem solving platforms.');
        } else if (filename === 'contact.vcf') {
          addOutput('Email: shouryaofficial1303@gmail.com\nPhone: +91-8272070100\nLocation: Chandigarh University, Mohali, Punjab\nLinkedIn: linkedin.com/in/shouryagupta13\nGitHub: github.com/shourya13x\nHackerRank: hackerrank.com/profile/shourya_skg');
        } else if (filename === 'skills.json') {
          addOutput(JSON.stringify({
            'software-engineering': ['Clean Architecture', 'Performance Optimization', 'Maintainable Codebases', 'Modern Technologies', 'Best Practices'],
            'app-development': ['Flutter', 'React Native', 'Cross-platform Development', 'Native-like Experiences', 'Performance Optimization', 'User Experience', 'Modern Design Patterns'],
            'gaming': ['Unity', 'Unreal Engine', 'Game Development', 'Gaming Technologies', 'Development Frameworks', 'Immersive Experiences'],
            'web-development': ['React', 'Next.js', 'TypeScript', 'Full-stack Solutions', 'User Experience', 'Performance'],
            'backend': ['Node.js', 'Express', 'API Design', 'Microservices', 'RESTful APIs', 'Authentication', 'Security'],
            'frontend': ['User Interface Design', 'User Experience', 'Modern Frameworks', 'Accessibility', 'Beautiful UIs', 'User Engagement']
          }, null, 2));
        } else if (filename === 'meme-aggregation-app.md') {
          addOutput('Production-ready meme app supporting 3 platforms with Material Design 3 UI\n\nTechnologies: Flutter, Dart, Reddit API, OAuth2, Material Design 3\n\nFeatures:\n• OAuth2 authentication with Reddit API\n• Access to 142 subreddits across 6 categories\n• Infinite scroll with cursor-based pagination\n• 1000+ memes per session with <2s load times\n• Cached network images with adaptive theming\n• 100% code sharing across platforms\n\nGitHub: https://github.com/shourya13x/meme-app');
        } else if (filename === 'newsflow-app.md') {
          addOutput('Comprehensive news aggregation app integrating 5 major news APIs\n\nTechnologies: Flutter, Multi-API Integration, Provider, Clean Architecture\n\nFeatures:\n• Integration with 5 major news APIs\n• Real-time updates and intelligent filtering\n• Favorites management and offline support\n• Clean Architecture with Repository Pattern\n• Pull-to-refresh and advanced search\n• Adaptive light/dark themes with API fallbacks\n\nGitHub: https://github.com/shourya13x/newsflow');
        } else if (filename === 'calcnova-calculator.md') {
          addOutput('Comprehensive calculator suite with 9 specialized unit converters\n\nTechnologies: Flutter, Mathematical Computing, Responsive Design\n\nFeatures:\n• Advanced and Scientific calculators\n• 9 specialized unit converters\n• 6 special-purpose calculators (Birthday, Discount, etc.)\n• Modern UI with gradient and glassmorphism effects\n• Universal deployment across 7 platforms\n• 100% screen compatibility with smooth animations\n\nGitHub: https://github.com/shourya13x/calcnova');
        } else if (filename === 'savenote-app.md') {
          addOutput('Beautiful and minimal notes app with SQLite integration\n\nTechnologies: Flutter, SQLite, CRUD Operations, InheritedWidget\n\nFeatures:\n• Seamless note capture with intuitive UI\n• Robust SQLite local data storage\n• Efficient CRUD operations with data persistence\n• Custom InheritedWidget for state management\n• Optimized UI updates without over-rebuilding\n• Beautiful and minimal design approach\n\nGitHub: https://github.com/shourya13x/savenote');
        } else if (filename === 'jarvis-ai.md') {
          addOutput('🦾 JARVIS.AI - Iron Man-inspired AI Assistant\n\nTechnologies: Flutter, Riverpod, Google Gemini API, Speech Recognition, Text-to-Speech, Rive Animations\n\nFeatures:\n• Voice recognition with real-time feedback\n• Google Gemini AI integration for intelligent responses\n• Iron Man-themed UI with holographic animations\n• Real-time system monitoring (Memory, CPU, Network)\n• Speech-to-text and text-to-speech capabilities\n• Conversation memory and context management\n• Arc Reactor loading animations and particle systems\n• Holographic panel backgrounds with neon glow effects\n\nStatus: In Progress - Core features implemented\nGitHub: https://github.com/shourya13x/jarvis-ai');
        } else if (filename === 'hydrateflow.md') {
          addOutput('💧 HydrateFlow - Smart Water Intake Tracker\n\nTechnologies: Flutter, Provider, SQLite, Local Notifications, Custom Animations, Health Integration\n\nFeatures:\n• Personalized daily hydration goals based on weight and activity\n• Beautiful water drop animations and progress visualization\n• Smart reminder system with customizable intervals\n• Daily, weekly, and monthly hydration statistics\n• Integration with health apps for comprehensive tracking\n• Offline-first design with local data storage\n• Custom water drop animations and fluid UI\n• Achievement system and streak tracking\n\nStatus: In Progress - Core UI and tracking features implemented\nGitHub: https://github.com/shourya13x/hydrateflow');
        } else if (filename === 'ieee-student-member.md') {
          addOutput('IEEE Student Branch - Student Member & Event Organizer\n\nDuration: 2023-Present (Current)\nLocation: Chandigarh University, Mohali\n\nDescription: Organizing technical events and hackathons while volunteering in IEEE conferences\n\nKey Achievements:\n• Organized and coordinated multiple hackathons and technical events\n• Managed teams of 20+ participants ensuring smooth event execution\n• Volunteered in technical workshops and coding competitions\n• Supported event logistics and enhanced participant engagement\n• Contributed to IEEE conferences and technical community building\n\nTechnologies: Event Management, Team Leadership, Community Building, Technical Workshops');
        } else if (filename === 'metacrafters-training.md') {
          addOutput('Metacrafters Training Program - Summer Trainee\n\nDuration: Jun 2023 - Aug 2023 (3 months)\nLocation: Remote\n\nDescription: Developed Solidity-based Smart Contracts and deployed DApps on Avalanche testnet\n\nKey Achievements:\n• Developed Solidity-based Smart Contracts using Gitpod, Remix IDE, Hardhat, and Truffle\n• Optimized contract deployment time by 30% through efficient coding practices\n• Deployed and tested DApps on Avalanche Fuji C-Chain Testnet\n• Ensured 99% uptime during testing and development phases\n• Earned ₹14,000 scholarship for successfully completing the program\n\nTechnologies: Solidity, Hardhat, Truffle, Remix IDE, Avalanche, DApp Development');
        } else if (filename === 'competitive-programming.md') {
          addOutput('Problem Solving - Problem Solver & Algorithm Enthusiast\n\nDuration: Aug 2022-Present (Current)\nLocation: Online Platforms\n\nDescription: Active problem solver tackling DSA problems across multiple platforms\n\nKey Achievements:\n• Achieved 6-star rating in Problem Solving and C++ on HackerRank\n• Solved 400+ DSA questions on LeetCode with consistent progress\n• Completed 600+ total DSA problems across GFG, Codeforces, and CodeChef\n• Maintained 300+ days Problem of the Day (POTD) streak on LeetCode\n\nTechnologies: C++, C, Data Structures, Algorithms, Problem Solving');
        } else {
          addOutput(`File not found: ${filename}`, 'error');
        }
        }
        break;
        
      case 'about':
        addOutput('👋 Hi! I\'m Shourya Gupta\n\n🎓 Computer Science Student at Chandigarh University\n📱 Flutter Developer specializing in cross-platform mobile apps\n🏆 6-star HackerRank coder with 600+ DSA problems solved\n💻 LeetCode enthusiast with 400+ problems solved\n🚀 Summer Trainee with blockchain experience\n📍 Based in Mohali, Punjab, India\n\nI\'m a passionate software engineer with a love for creating elegant solutions to complex problems. My journey in tech spans over 5 years, during which I\'ve worked on diverse projects ranging from web applications to mobile apps.\n\nI specialize in Flutter development, creating cross-platform applications that run seamlessly on multiple platforms. From meme aggregation apps to comprehensive calculators, I focus on building beautiful, functional, and performant mobile experiences.\n\nWhen I\'m not coding, you can find me solving DSA problems on LeetCode, participating in hackathons, or organizing technical events as an IEEE Student Member. I\'ve solved 600+ problems across various problem solving platforms.');
        break;
        
      case 'skills':
        const category = args[0]?.toLowerCase();
        const skills = {
          'software-engineering': ['Clean Architecture', 'Performance Optimization', 'Maintainable Codebases', 'Modern Technologies', 'Best Practices'],
          'app-development': ['Flutter', 'React Native', 'Cross-platform Development', 'Native-like Experiences', 'Performance Optimization', 'User Experience', 'Modern Design Patterns'],
          'gaming': ['Unity', 'Unreal Engine', 'Game Development', 'Gaming Technologies', 'Development Frameworks', 'Immersive Experiences'],
          'web-development': ['React', 'Next.js', 'TypeScript', 'Full-stack Solutions', 'User Experience', 'Performance'],
          'backend': ['Node.js', 'Express', 'API Design', 'Microservices', 'RESTful APIs', 'Authentication', 'Security'],
                  'frontend': ['User Interface Design', 'User Experience', 'Modern Frameworks', 'Accessibility', 'Beautiful UIs', 'User Engagement']
        };
        
        if (category && skills[category as keyof typeof skills]) {
          addOutput(`${category.toUpperCase()} SKILLS:\n${skills[category as keyof typeof skills].join(', ')}`);
        } else {
          let output = 'WHAT I DO - TECHNICAL EXPERTISE:\n\n';
          Object.entries(skills).forEach(([cat, skillList]) => {
            const categoryName = cat.replace('-', ' ').toUpperCase();
            output += `${categoryName}:\n  ${skillList.join(', ')}\n\n`;
          });
          output += '📊 STATISTICS:\n  • DSA Problems Solved: 600+\n  • LeetCode Problems: 400+\n  • Projects Completed: 10+\n  • Technologies Mastered: 15+';
          addOutput(output);
        }
        break;
        
      case 'projects':
        addOutput('🚀 FEATURED PROJECTS:\n\n1. 🦾 JARVIS.AI - AI Assistant\n   Tech: Flutter, Riverpod, Google Gemini API, Speech Recognition, Text-to-Speech, Rive Animations\n   Features: Iron Man-inspired AI assistant with voice recognition\n   • Voice recognition with real-time feedback\n   • Google Gemini AI integration for intelligent responses\n   • Iron Man-themed UI with holographic animations\n   • Real-time system monitoring (Memory, CPU, Network)\n   • Speech-to-text and text-to-speech capabilities\n   • Conversation memory and context management\n   • Arc Reactor loading animations and particle systems\n   Status: In Progress - Core features implemented\n\n2. 💧 HydrateFlow - Water Intake Tracker\n   Tech: Flutter, Provider, SQLite, Local Notifications, Custom Animations, Health Integration\n   Features: Smart water intake tracker with personalized hydration goals\n   • Personalized daily hydration goals based on weight and activity\n   • Beautiful water drop animations and progress visualization\n   • Smart reminder system with customizable intervals\n   • Daily, weekly, and monthly hydration statistics\n   • Integration with health apps for comprehensive tracking\n   • Offline-first design with local data storage\n   Status: In Progress - Core UI and tracking features implemented\n\n3. Meme Aggregation App\n   Tech: Flutter, Dart, Reddit API, OAuth2, Material Design 3\n   Features: Production-ready meme app supporting 3 platforms\n   • OAuth2 authentication with Reddit API\n   • Access to 142 subreddits across 6 categories\n   • Infinite scroll with cursor-based pagination\n   • 1000+ memes per session with <2s load times\n   • Cached network images with adaptive theming\n   • 100% code sharing across platforms\n\n4. NewsFlow - Your Daily News Dose\n   Tech: Flutter, Multi-API Integration, Provider, Clean Architecture\n   Features: Comprehensive news aggregation app integrating 5 major news APIs\n   • Integration with 5 major news APIs\n   • Real-time updates and intelligent filtering\n   • Favorites management and offline support\n   • Clean Architecture with Repository Pattern\n   • Pull-to-refresh and advanced search\n   • Adaptive light/dark themes with API fallbacks\n\n5. CalcNova - All-in-One Calculation Hub\n   Tech: Flutter, Mathematical Computing, Responsive Design\n   Features: Comprehensive calculator suite with 9 specialized unit converters\n   • Advanced and Scientific calculators\n   • 9 specialized unit converters\n   • 6 special-purpose calculators (Birthday, Discount, etc.)\n   • Modern UI with gradient and glassmorphism effects\n   • Universal deployment across 7 platforms\n   • 100% screen compatibility with smooth animations\n\n6. SaveNote - Your Favorite Notes App\n   Tech: Flutter, SQLite, CRUD Operations, InheritedWidget\n   Features: Beautiful and minimal notes app with SQLite integration\n   • Seamless note capture with intuitive UI\n   • Robust SQLite local data storage\n   • Efficient CRUD operations with data persistence\n   • Custom InheritedWidget for state management\n   • Optimized UI updates without over-rebuilding\n   • Beautiful and minimal design approach\n\nAll projects are available on GitHub!');
        break;
        
      case 'experience':
        addOutput('💼 WORK EXPERIENCE:\n\n1. IEEE Student Branch (2023-Present) - CURRENT\n   Position: Student Member & Event Organizer\n   Location: Chandigarh University, Mohali\n   Duration: 1+ years\n   Description: Organizing technical events and hackathons while volunteering in IEEE conferences\n   Key Achievements:\n   • Organized and coordinated multiple hackathons and technical events\n   • Managed teams of 20+ participants ensuring smooth event execution\n   • Volunteered in technical workshops and coding competitions\n   • Supported event logistics and enhanced participant engagement\n   • Contributed to IEEE conferences and technical community building\n   Technologies: Event Management, Team Leadership, Community Building, Technical Workshops\n\n2. Metacrafters Training Program (Jun 2023 - Aug 2023)\n   Position: Summer Trainee\n   Location: Remote\n   Duration: 3 months\n   Description: Developed Solidity-based Smart Contracts and deployed DApps on Avalanche testnet\n   Key Achievements:\n   • Developed Solidity-based Smart Contracts using Gitpod, Remix IDE, Hardhat, and Truffle\n   • Optimized contract deployment time by 30% through efficient coding practices\n   • Deployed and tested DApps on Avalanche Fuji C-Chain Testnet\n   • Ensured 99% uptime during testing and development phases\n   • Earned ₹14,000 scholarship for successfully completing the program\n   Technologies: Solidity, Hardhat, Truffle, Remix IDE, Avalanche, DApp Development\n\n3. Problem Solving (Aug 2022-Present) - CURRENT\n   Position: Problem Solver & Algorithm Enthusiast\n   Location: Online Platforms\n   Duration: 2+ years\n   Description: Active problem solver tackling DSA problems across multiple platforms\n   Key Achievements:\n   • Achieved 6-star rating in Problem Solving and C++ on HackerRank\n   • Solved 400+ DSA questions on LeetCode with consistent progress\n   • Completed 600+ total DSA problems across GFG, Codeforces, and CodeChef\n   • Ranked in top 2% out of 10,000+ in NPTEL Cloud Computing course\n   • Ranked 30th among 5,500+ participants in university-level AMCAT exam\n   Technologies: C++, C, Data Structures, Algorithms, Problem Solving');
        break;
        
      case 'contact':
        addOutput('📧 GET IN TOUCH:\n\n✉️  Email: shouryaofficial1303@gmail.com\n📱 Phone: +91-8272070100\n📍 Location: Chandigarh University, Mohali, Punjab\n\n🔗 SOCIAL LINKS:\n💼 LinkedIn: linkedin.com/in/shouryagupta13\n🐙 GitHub: github.com/shourya13x\n🏆 HackerRank: hackerrank.com/profile/shourya_skg\n\n⏰ RESPONSE TIME:\nI typically respond to emails within 24-48 hours during business days. For urgent inquiries, please include "URGENT" in the subject line.\n\n💬 I\'m always interested in hearing about new opportunities and interesting projects. Whether you have a question or just want to say hi, I\'ll try my best to get back to you!');
        break;
        
      case 'resume':
        addOutput('📄 Downloading resume...\n\n✅ Resume downloaded successfully!\n\nFile: Shourya_Gupta_Resume.pdf\nSize: 124 KB\nUpdated: ' + new Date().toLocaleDateString() + '\n\n🎓 Computer Science Student (2022-2026)\n📱 Flutter Developer | 🏆 6⭐ HackerRank | 🚀 Summer Trainee');
        downloadResume();
        break;
        
      case 'clear':
        setSession((prev: any) => ({
          ...prev,
          output: [{
            id: 'welcome-clear',
            type: 'info',
            content: 'Terminal cleared. Welcome back!',
            timestamp: new Date()
          }]
        }));
        break;
        
      case 'theme':
        const theme = args[0]?.toLowerCase();
        if (theme && themes[theme as keyof typeof themes]) {
          setCurrentTheme(theme);
          const selectedTheme = themes[theme as keyof typeof themes];
          addOutput(`🎨 Theme changed to: ${selectedTheme.name}\n\n${selectedTheme.description}\n\n✨ Colors applied:\n  • Primary: ${selectedTheme.colors.primary}\n  • Secondary: ${selectedTheme.colors.secondary}\n  • Accent: ${selectedTheme.colors.accent}\n  • Background: ${selectedTheme.colors.background}\n  • Text: ${selectedTheme.colors.text}`);
        } else {
          let output = '🎨 Available themes:\n\n';
          Object.entries(themes).forEach(([key, theme]) => {
            output += `${theme.name} (${key}): ${theme.description}\n`;
          });
          output += '\nUsage: theme <name>\nExample: theme matrix';
          addOutput(output);
        }
        break;
        

        
      // Mouse trail feature removed
        
      case 'wheel':
        const wheelCmd = args[0]?.toLowerCase();
        if (!wheelCmd) {
          addOutput('⚙️ ROTATING WHEEL STATUS:\n\n🌀 Status: ACTIVE (2 wheels spinning)\n📍 Locations: Hero section background\n⚡ Rotation Speed: 30 seconds per revolution\n🎨 Elements: Tech terms + Binary code\n💫 Animation: Continuous smooth rotation\n\nAvailable commands:\n  wheel status - Detailed wheel information\n  wheel info - Technical specifications\n  wheel spin - Speed boost mode\n\n🔄 The wheels display coding terms like "Code", "Debug",\n"Learn", "Excel" with animated binary numbers!');
        } else if (wheelCmd === 'status') {
          addOutput('⚙️ DETAILED WHEEL STATUS:\n\nWheel System: DualWheel v1.0\nRenderer: Framer Motion + CSS Grid\nMain Wheel:\n  - Size: 250px diameter\n  - Position: Top-right background\n  - Opacity: 30%\n  - Terms: Code, Debug, Learn, Excel, Build, Test, Deploy, Scale\n\nSecondary Wheel:\n  - Size: 180px diameter\n  - Position: Bottom-left background  \n  - Opacity: 20%\n  - Delayed animation: +0.5s\n\nBinary Elements: 10 animated numbers\nGrid Background: 20px spacing\nRotation: Infinite linear animation\nPerformance: GPU accelerated');
        } else if (wheelCmd === 'info') {
          addOutput('⚙️ WHEEL SPECIFICATIONS:\n\nDesign: Cyberpunk tech wheel\nColors: Primary (#00ff88), Secondary (#0099ff), Yellow (#facc15)\nElements:\n  - 8 Tech terms in circular arrangement\n  - 10 Binary numbers (0,1) with pulse animation\n  - Grid overlay pattern\n  - Glowing center dot\n  - Animated arrow pointers\n\nAnimations:\n  - Main rotation: 30s infinite linear\n  - Binary pulse: 2s ease-in-out\n  - Arrow sway: 3-4s intervals\n  - Entry animation: Scale + fade + rotate\n\nTech Stack Integration:\n  - React components\n  - Framer Motion physics\n  - CSS transforms\n  - SVG graphics');
        } else if (wheelCmd === 'spin') {
          addOutput('🚀 WHEEL SPIN BOOST ACTIVATED!\n\n💨 TURBO MODE ENGAGED!\n\n⚡ Rotation speed increased to MAXIMUM!\n🌪️  Both wheels now spinning at hyperspeed!\n✨ Binary numbers pulsing rapidly!\n🎯 Arrow pointers going crazy!\n\n(This is a visual demo - the wheels maintain their\nsmooth 30-second rotation for optimal UX)\n\n🎮 Pro tip: The wheels represent the continuous\nlearning cycle in software development!');
        } else {
          addOutput(`Unknown wheel command: ${wheelCmd}\nTry: wheel, wheel status, wheel info, wheel spin`);
        }
        break;
        
      case 'matrix':
        const matrixCmd = args[0]?.toLowerCase();
        if (!matrixCmd) {
          addOutput('🌧️ MATRIX RAIN STATUS:\n\n💚 Status: ACTIVE (Binary rain falling)\n📊 Density: 25 columns across screen\n⚡ Speed: 1.2x (Medium flow)\n🎨 Style: Golden binary digits (0,1)\n✨ Effects: Scattered tech terms + Grid overlay\n\nAvailable commands:\n  matrix status - Detailed matrix information\n  matrix rain - Increase rain intensity\n  matrix stop - Pause the matrix (demo)\n  matrix neo - Enter "The Matrix" mode\n\n🔢 The matrix displays endless streams of binary\ncode falling from the digital sky!');
        } else if (matrixCmd === 'status') {
          addOutput('🌧️ DETAILED MATRIX STATUS:\n\nSystem: MatrixRain v1.0\nRenderer: React + Framer Motion\nColumns: 25 vertical streams\nCharacters: Binary (0,1) only\nColors: Golden yellow (#facc15)\nGrid: 30px spacing overlay\n\nAnimation Properties:\n- Speed: 0.5-2.5 units/frame (randomized)\n- Update Rate: ~20fps (optimized)\n- Character Refresh: 2% chance per frame\n- Opacity Gradient: 1.0 → 0.2 (top to bottom)\n- Glow Effect: Text shadow with color matching\n\nTech Terms System:\n- Pool: 14 different coding terms\n- Spawn Rate: 30% chance every 2 seconds\n- Max Concurrent: 8 terms on screen\n- Lifetime: 3-5 seconds per term\n- Position: Random screen coordinates');
        } else if (matrixCmd === 'rain') {
          addOutput('🌊 MATRIX RAIN INTENSIFIED!\n\n💨 STORM MODE ACTIVATED!\n\n⚡ Binary rain now falling at maximum velocity!\n🌪️  Density increased to MAXIMUM!\n💚 Golden streams flooding the digital realm!\n🔢 Binary sequences cascading faster!\n✨ Tech terms appearing more frequently!\n\n(Visual intensity remains optimized for performance\nwhile maintaining the authentic Matrix experience)\n\n🎭 "Welcome to the Real World" - Morpheus');
        } else if (matrixCmd === 'stop') {
          addOutput('⏸️ MATRIX RAIN PAUSED!\n\n🛑 Binary streams have been frozen in time!\n\n❄️  The digital rain stands still...\n⚡ All binary columns suspended\n🔇 The Matrix has gone silent\n⏳ Time itself seems to have stopped\n\n(This is a demo - the matrix continues running\nfor the best visual experience)\n\n🎬 "There is no spoon" - The Matrix Kid\n\nTo resume: matrix rain');
        } else if (matrixCmd === 'neo') {
          addOutput('👨‍💻 ENTERING NEO MODE...\n\n🕶️ WELCOME TO THE MATRIX, NEO.\n\n💊 You have chosen the RED PILL.\n👁️ Your eyes are now open to the digital truth.\n🌐 You can see the code behind reality.\n⚡ The Matrix has no power over you.\n\n🔢 Binary Vision Activated:\n   - See the falling green code\n   - Understand the digital rain\n   - Bend the rules of the simulation\n   - Become one with the algorithm\n\n🥋 "I know Kung Fu" - Neo\n💯 "Show me" - Morpheus\n\n🎯 Pro tip: The binary rain represents the\nconstant flow of data in our digital world!');
        } else {
          addOutput(`Unknown matrix command: ${matrixCmd}\nTry: matrix, matrix status, matrix rain, matrix neo`);
        }
        break;
        
      case 'robot':
        setShowRobot(true);
        addOutput('🤖 SPLINE 3D ROBOT:\n\n✨ Loading the interactive 3D robot...\n\n🎮 This is a custom 3D robot created with Spline.\n💫 It represents the fusion of technology and creativity.\n🚀 The robot symbolizes innovation and forward-thinking.\n\n🔧 Features:\n  • Interactive 3D model\n  • Smooth animations\n  • Responsive design\n  • Modern web technology\n\n🎯 The robot is now displayed!\n\n💡 Pro tip: This 3D element adds a unique interactive\nexperience to showcase technical skills and creativity.');
        break;
        
      case 'close':
        setShowRobot(false);
        addOutput('✅ Robot viewer closed successfully.');
        break;
        
      default:
        addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setShowSuggestions(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        // Navigate through suggestions
        setSuggestionIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
      } else if (session.history.length > 0) {
        // Navigate through history
        const newIndex = session.historyIndex === -1 
          ? session.history.length - 1 
          : Math.max(0, session.historyIndex - 1);
        setSession((prev: any) => ({ ...prev, historyIndex: newIndex }));
        setCurrentInput(session.history[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        // Navigate through suggestions
        setSuggestionIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
      } else if (session.historyIndex !== -1) {
        // Navigate through history
        const newIndex = session.historyIndex + 1;
        if (newIndex >= session.history.length) {
          setSession((prev: any) => ({ ...prev, historyIndex: -1 }));
          setCurrentInput('');
        } else {
          setSession((prev: any) => ({ ...prev, historyIndex: newIndex }));
          setCurrentInput(session.history[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        // Apply current suggestion
        applySuggestion(suggestions[suggestionIndex]);
      } else {
        // Generate suggestions
        const newSuggestions = generateSuggestions(currentInput);
        if (newSuggestions.length > 0) {
          setSuggestions(newSuggestions);
          setShowSuggestions(true);
          setSuggestionIndex(0);
        }
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSuggestionIndex(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);
    
    // Generate suggestions as user types
    if (value.trim()) {
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };
  
  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [session.output]);
  
  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current && !isMinimized) {
      inputRef.current.focus();
    }
  }, [isMinimized]);
  
  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 left-4 z-50"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-3 px-5 py-3 bg-dark-200 border border-primary/30 rounded-lg text-primary hover:border-primary/50 transition-colors"
        >
          <Terminal size={18} />
          <span className="font-mono text-sm">Terminal</span>
        </button>
      </motion.div>
    );
  }
  
  const currentThemeConfig = themes[currentTheme as keyof typeof themes];
  
  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
      
      {/* Spline Robot Overlay */}
      <AnimatePresence>
        {showRobot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setShowRobot(false)}
          >
            <motion.div
              className="relative max-w-2xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowRobot(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-dark-200/80 backdrop-blur-md border border-primary/30 rounded-lg text-primary hover:border-primary/50 transition-colors"
                aria-label="Close robot viewer"
              >
                <X size={20} />
              </button>
              <SplineRobot className="w-full h-[400px]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={cn(
          'fixed inset-8 z-[10001] flex flex-col',
          isMaximized ? 'inset-0' : 'lg:inset-16'
        )}
      >
      {/* Terminal Window */}
      <div 
        className="terminal rounded-lg shadow-2xl flex flex-col h-full overflow-hidden"
        style={{
          backgroundColor: currentThemeConfig.colors.background,
          border: `1px solid ${currentThemeConfig.colors.primary}40`,
          boxShadow: `0 0 40px ${currentThemeConfig.colors.primary}20`
        }}
      >
        {/* Terminal Header */}
        <div 
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            backgroundColor: currentThemeConfig.colors.surface,
            borderColor: `${currentThemeConfig.colors.primary}30`
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
                          <div 
                className="flex items-center gap-2 font-mono text-sm"
                style={{ color: currentThemeConfig.colors.primary }}
              >
              <Terminal size={18} />
              <span className="font-bold">shourya@portfolio: ~/portfolio</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 rounded transition-colors"
              style={{
                color: currentThemeConfig.colors.text,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${currentThemeConfig.colors.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Minimize"
            >
              <Minimize2 size={16} />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-2 rounded transition-colors"
              style={{
                color: currentThemeConfig.colors.text,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${currentThemeConfig.colors.primary}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="Maximize"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Terminal Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Output Area */}
          <div 
            ref={outputRef}
            className="flex-1 p-4 overflow-y-auto scrollbar-thin text-sm"
            style={{
              backgroundColor: currentThemeConfig.colors.background,
              color: currentThemeConfig.colors.text
            }}
          >
            {/* Circuit Board Style Banner */}
            <div className="mb-6 text-center">
              <div 
                className="font-mono text-4xl leading-none mb-4 tracking-widest"
                style={{ color: currentThemeConfig.colors.primary }}
              >
                <div 
                  className="font-black uppercase"
                  style={{
                    textShadow: `0 0 20px ${currentThemeConfig.colors.primary}`
                  }}
                >
                  SHOURYA
                </div>
              </div>
              <div 
                className="text-sm font-bold mb-4"
                style={{ color: currentThemeConfig.colors.primary }}
              >
                Portfolio Terminal v1.0
              </div>
            </div>
            
            <AnimatePresence>
              {session.output.map((output: any, index: number) => (
                <motion.div
                  key={output.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-3 whitespace-pre-wrap leading-relaxed text-sm"
                  style={{
                    color: output.type === 'command' ? currentThemeConfig.colors.text :
                           output.type === 'output' ? currentThemeConfig.colors.primary :
                           output.type === 'error' ? '#ff6b6b' :
                           output.type === 'info' ? currentThemeConfig.colors.secondary :
                           currentThemeConfig.colors.text,
                    fontWeight: output.type === 'command' ? 'bold' :
                              output.type === 'output' ? 'medium' :
                              output.type === 'error' ? 'semibold' :
                              output.type === 'info' ? 'semibold' :
                              'normal'
                  }}
                >
                  {output.content}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Input Area */}
          <div 
            className="border-t p-4 relative"
            style={{
              borderColor: `${currentThemeConfig.colors.primary}30`,
              backgroundColor: currentThemeConfig.colors.surface
            }}
          >
            <div className="flex items-center gap-3 font-mono text-sm">
              <span 
                className="shrink-0 font-bold"
                style={{ color: currentThemeConfig.colors.primary }}
              >
                shourya@portfolio:~/portfolio$ 
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none border-none font-medium"
                style={{
                  color: currentThemeConfig.colors.text,
                  caretColor: currentThemeConfig.colors.primary
                }}
                placeholder="Type a command... (try 'help')"
                autoComplete="off"
                spellCheck={false}
              />
              <div 
                className="w-2 h-6 typing-cursor"
                style={{ 
                  backgroundColor: currentThemeConfig.colors.primary,
                  animation: 'blink 1s infinite'
                }}
              ></div>
            </div>
            
            {/* Auto-completion Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div 
                className="absolute bottom-full left-0 right-0 mb-2 rounded-lg border overflow-hidden"
                style={{
                  backgroundColor: currentThemeConfig.colors.surface,
                  borderColor: currentThemeConfig.colors.primary
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className={`px-4 py-2 cursor-pointer font-mono text-sm transition-colors ${
                      index === suggestionIndex ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: index === suggestionIndex 
                        ? `${currentThemeConfig.colors.primary}20` 
                        : 'transparent',
                      color: index === suggestionIndex 
                        ? currentThemeConfig.colors.primary 
                        : currentThemeConfig.colors.text
                    }}
                    onClick={() => applySuggestion(suggestion)}
                    onMouseEnter={() => setSuggestionIndex(index)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default CLI;