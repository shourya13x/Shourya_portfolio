# MouseTrail Component

A React component that creates a glowing particle trail effect following the mouse cursor. This component provides a customizable, performant mouse trail animation with smooth fade-out and scale effects.

## Features

- **Throttled Performance**: Particle generation is throttled to prevent performance degradation
- **Smooth Animations**: Particles fade out and scale down over a configurable duration
- **Automatic Cleanup**: DOM elements are automatically removed after animation completion
- **Customizable**: Fully configurable colors, sizes, timing, and trail length
- **Responsive**: Works across different screen sizes and devices
- **Lightweight**: Minimal impact on performance with efficient DOM management

## Usage

### Basic Usage

```tsx
import MouseTrail from '@/components/MouseTrail';

function App() {
  return (
    <div>
      <MouseTrail />
      {/* Your app content */}
    </div>
  );
}
```

### With Custom Configuration

```tsx
import MouseTrail from '@/components/MouseTrail';

function App() {
  return (
    <div>
      <MouseTrail
        enabled={true}
        particleSize={12}
        trailLength={60}
        animationDuration={1200}
        throttleDelay={25}
        glowColor="#FF4500"
        particleColor="#FFD700"
      />
      {/* Your app content */}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Whether the mouse trail effect is active |
| `particleSize` | `number` | `10` | Size of each particle in pixels |
| `trailLength` | `number` | `50` | Maximum number of particles in the trail |
| `animationDuration` | `number` | `1000` | Duration of particle animation in milliseconds |
| `throttleDelay` | `number` | `20` | Minimum delay between particle creation in milliseconds |
| `glowColor` | `string` | `'#FFFFFF'` | Color of the particle glow effect |
| `particleColor` | `string` | `'#FFFFFF'` | Color of the particle itself |

## Implementation Details

### Core Logic

1. **Event Handling**: Listens to `mousemove` events with throttling to prevent excessive particle creation
2. **Particle Creation**: Creates DOM elements (divs) positioned absolutely at mouse coordinates
3. **Animation**: Uses CSS transitions for smooth fade-out and scale animations
4. **Cleanup**: Automatically removes particles from DOM after animation completion
5. **Performance**: Limits the number of active particles to prevent memory issues

### Performance Optimizations

- **Throttling**: Particle creation is throttled to prevent excessive DOM manipulation
- **DOM Pooling**: Particles are reused and cleaned up efficiently
- **Passive Event Listeners**: Uses passive event listeners for better scroll performance
- **RequestAnimationFrame**: Uses RAF for smooth animations
- **Memory Management**: Automatic cleanup prevents memory leaks

### CSS Styling

Particles are styled with:
- `position: fixed` for absolute positioning
- `border-radius: 50%` for circular shape
- `box-shadow` for glow effect
- `pointer-events: none` to prevent interference
- CSS transitions for smooth animations

## Demo Component

The `MouseTrailDemo` component provides an interactive demo with:
- Real-time configuration controls
- Preset configurations (Default, Neon Blue, Fire Trail, Magic Purple)
- Live preview of particle appearance
- Performance monitoring

## Browser Compatibility

- Modern browsers with CSS transitions support
- Requires `requestAnimationFrame` API
- Works with React 16.8+ (uses hooks)

## Performance Considerations

- **Throttle Delay**: Adjust based on device performance (lower for high-end devices)
- **Trail Length**: Keep reasonable limits to prevent memory issues
- **Animation Duration**: Longer durations create smoother effects but use more resources
- **Particle Size**: Larger particles are more visible but may impact performance

## Customization Examples

### Neon Blue Trail
```tsx
<MouseTrail
  particleSize={8}
  trailLength={40}
  animationDuration={800}
  throttleDelay={15}
  glowColor="#00BFFF"
  particleColor="#00BFFF"
/>
```

### Fire Trail
```tsx
<MouseTrail
  particleSize={12}
  trailLength={60}
  animationDuration={1200}
  throttleDelay={25}
  glowColor="#FF4500"
  particleColor="#FFD700"
/>
```

### Magic Purple Trail
```tsx
<MouseTrail
  particleSize={6}
  trailLength={80}
  animationDuration={600}
  throttleDelay={10}
  glowColor="#9370DB"
  particleColor="#DDA0DD"
/>
```

## Troubleshooting

### Performance Issues
- Increase `throttleDelay` to reduce particle creation frequency
- Decrease `trailLength` to limit the number of active particles
- Reduce `particleSize` for less resource-intensive rendering

### Visual Issues
- Ensure `glowColor` and `particleColor` have sufficient contrast
- Adjust `animationDuration` for desired visual effect
- Check that the component is not being blocked by other elements

### Cursor Issues
- The component hides the default cursor (`cursor: none`)
- Ensure the component is properly cleaned up when disabled
- Check for conflicts with other cursor-related CSS 