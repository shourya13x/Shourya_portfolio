# Floating Action Button (FAB)

A modern, animated floating action button that serves as a central navigation point for the portfolio. The FAB provides quick access to all major sections of the portfolio with a beautiful, futuristic design that matches the overall aesthetic.

## Features

- **Central Navigation**: Single button access to all portfolio sections
- **Smooth Animations**: Framer Motion powered animations with staggered reveals
- **Active State Tracking**: Highlights the current section
- **CLI Mode Toggle**: Quick access to switch between GUI and CLI modes
- **Responsive Design**: Works seamlessly on all device sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Click Outside to Close**: Intuitive UX with click-outside-to-close functionality

## Navigation Items

The FAB includes navigation to all major portfolio sections:

1. **Home** - Hero section
2. **About** - About section
3. **GitHub** - GitHub contributions
4. **Expertise** - Technical expertise
5. **Projects** - Portfolio projects
6. **Experience** - Work experience
7. **Contact** - Contact form
8. **CLI Mode** - Toggle between GUI and CLI interfaces

## Design Features

- **Portfolio Theme Integration**: Matches the main emerald green (#00ff88) color scheme
- **Advanced Glassmorphism**: Semi-transparent backdrop with 20px blur and layered shadows
- **Dynamic Gradient**: Emerald to dark emerald gradient with glow effects
- **Matrix-Style Animations**: Pulse, glow, and particle effects with spring physics
- **Sophisticated Hover States**: Multi-layered scale and shadow transitions
- **Smooth Spring Animations**: Physics-based animations for natural feel
- **Themed Backdrop**: Subtle radial gradient backdrop when menu is open

## Usage

```tsx
import FloatingActionButton from '@/components/FloatingActionButton';

// In your component
<FloatingActionButton
  viewMode={viewMode}
  onCLIToggle={toggleViewMode}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onCLIToggle` | `() => void` | `undefined` | Callback function to toggle CLI mode |
| `viewMode` | `'gui' \| 'cli'` | `'gui'` | Current view mode (FAB is hidden in CLI mode) |

## Technical Details

- **Position**: Fixed to bottom-right corner (bottom-6 right-6)
- **Z-Index**: 50 (high priority for overlay)
- **Animation Library**: Framer Motion
- **Icons**: Lucide React icons
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **State Management**: Local state for menu open/close and active section

## Accessibility

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- High contrast colors for visibility
- Semantic HTML structure

## Performance

- Optimized animations with GPU acceleration
- Efficient re-renders with proper dependency arrays
- Minimal DOM manipulation
- Smooth 60fps animations
