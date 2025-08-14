# CLI Toggle Slider Component

A beautiful, animated toggle slider component for switching between GUI and CLI modes in the portfolio application.

## Features

- **Smooth Animations**: Spring-based animations with Framer Motion
- **Multiple Sizes**: Small, medium, and large variants
- **Customizable**: Show/hide icons and labels
- **Position Options**: Top-right, top-left, bottom-right, bottom-left, center
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Responsive**: Works on all device sizes
- **Modern Design**: Glassmorphism effect with backdrop blur

## Usage

### Basic Usage
```tsx
import CLIToggleSlider from '@/components/CLIToggleSlider';

// Default configuration (top-right, medium size, with icons and label)
<CLIToggleSlider />
```

### Advanced Usage
```tsx
<CLIToggleSlider 
  size="lg"                    // 'sm' | 'md' | 'lg'
  showIcons={false}           // Show/hide Monitor and Terminal icons
  showLabel={false}           // Show/hide "CLI" or "GUI" text
  position="bottom-left"      // Position on screen
  className="custom-class"    // Additional CSS classes
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the toggle slider |
| `showIcons` | `boolean` | `true` | Whether to show Monitor and Terminal icons |
| `showLabel` | `boolean` | `true` | Whether to show the "CLI" or "GUI" text label |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'center'` | `'top-right'` | Position of the toggle on screen |
| `className` | `string` | `''` | Additional CSS classes |

## Design Details

### Visual Elements
- **Toggle Slider**: Animated circular knob that slides between positions
- **Background**: Dark glassmorphism effect with backdrop blur
- **Icons**: Monitor (GUI) and Terminal (CLI) icons from Lucide React
- **Gradient Effect**: Subtle gradient overlay when in CLI mode
- **Hover Effects**: Scale animation and border color changes

### Animations
- **Entrance**: Fade in with scale animation (0.5s delay)
- **Toggle**: Spring-based sliding animation (500 stiffness, 30 damping)
- **Hover**: Scale up to 1.05x
- **Tap**: Scale down to 0.95x
- **Icon Transitions**: Smooth color transitions between active/inactive states

### Accessibility
- Proper ARIA labels that change based on current mode
- Keyboard navigation support
- Focus ring styling
- Screen reader friendly

## Integration

The component automatically integrates with the `useViewMode` hook to manage the application's view mode state. It provides:

- `viewMode`: Current mode ('gui' or 'cli')
- `toggleViewMode`: Function to switch between modes
- Persistent state management

## Styling

The component uses Tailwind CSS classes and follows the portfolio's design system:

- **Colors**: Primary (#00ff88), Secondary (#0099ff), Dark backgrounds
- **Typography**: Monospace font for terminal aesthetic
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle shadows for depth
- **Borders**: Semi-transparent borders with hover effects

## Performance

- Optimized animations using Framer Motion
- Minimal re-renders with proper React patterns
- GPU-accelerated transforms
- Efficient state management 