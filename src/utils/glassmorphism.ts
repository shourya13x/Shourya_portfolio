// Glassmorphism Design System
export const glassmorphism = {
  // Light glassmorphism for subtle elements
  light: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: `
      0 4px 16px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.05)
    `
  },

  // Medium glassmorphism for main containers
  medium: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `
  },

  // Strong glassmorphism for prominent elements
  strong: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: `
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15)
    `
  },

  // Accent glassmorphism for active/highlighted elements
  accent: (color: string = 'rgba(16, 185, 129, 0.15)') => ({
    background: color,
    backdropFilter: 'blur(15px)',
    border: `1px solid ${color.replace('0.15', '0.3')}`,
    boxShadow: `
      0 0 24px ${color.replace('0.15', '0.25')},
      0 4px 16px ${color.replace('0.15', '0.15')},
      inset 0 1px 0 ${color.replace('0.15', '0.2')}
    `
  }),

  // Hover effects
  hover: {
    transform: 'translateY(-2px)',
    boxShadow: `
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15)
    `
  },

  // Animated shimmer effect
  shimmer: {
    background: `
      linear-gradient(45deg, 
        transparent 30%, 
        rgba(255, 255, 255, 0.1) 50%, 
        transparent 70%
      )
    `,
    backgroundSize: '200% 200%',
    animation: 'shimmer 3s ease-in-out infinite'
  },

  // Gradient overlay for depth
  gradientOverlay: {
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.1) 0%, 
        rgba(255, 255, 255, 0.05) 50%, 
        rgba(255, 255, 255, 0.02) 100%
      )
    `
  }
};

// CSS animations for glassmorphism effects
export const glassmorphismAnimations = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes glassFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  @keyframes glassGlow {
    0%, 100% { 
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    50% { 
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
  }
`;

// Utility function to apply glassmorphism styles
export const applyGlassmorphism = (variant: keyof typeof glassmorphism, customColor?: string) => {
  const baseStyle = glassmorphism[variant];
  
  if (variant === 'accent' && customColor) {
    return glassmorphism.accent(customColor);
  }
  
  return {
    ...baseStyle,
    isolation: 'isolate' as const
  };
};

// Predefined glassmorphism components
export const glassmorphismComponents = {
  card: applyGlassmorphism('medium'),
  button: applyGlassmorphism('light'),
  navigation: applyGlassmorphism('medium'),
  modal: applyGlassmorphism('strong'),
  active: applyGlassmorphism('accent'),
  hover: glassmorphism.hover
};
