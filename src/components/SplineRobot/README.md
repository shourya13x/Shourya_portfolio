# SplineRobot Component

A React component that embeds a 3D Spline robot viewer in your portfolio.

## Features

- **Interactive 3D Model**: Displays a custom 3D robot created with Spline
- **Responsive Design**: Adapts to different screen sizes
- **Loading State**: Shows a loading spinner while the 3D model loads
- **Smooth Animations**: Uses Framer Motion for smooth entrance animations
- **Custom Styling**: Matches the portfolio's design system with glowing borders and shadows

## Usage

### In Hero Section (GUI Mode)
The robot is automatically displayed at the beginning of the portfolio in GUI mode.

### In CLI Mode
Use the `robot` command to view the 3D robot in a modal overlay.

```bash
robot    # Show the 3D Spline robot
close    # Close the robot viewer
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |

## Technical Details

- **Spline Viewer**: Uses `@splinetool/viewer@1.10.39`
- **3D Model URL**: `https://prod.spline.design/piGKhdki-YX8uQ-t/scene.splinecode`
- **Loading**: Dynamic script loading with cleanup on unmount
- **Styling**: Custom CSS with portfolio theme colors

## Integration

The component is integrated into:
- **Hero Section**: Displays prominently at the top of the portfolio
- **CLI Interface**: Available via the `robot` command
- **Auto-completion**: Included in CLI suggestions

## Dependencies

- React
- Framer Motion
- Spline Viewer (loaded dynamically)

## Browser Support

Requires modern browsers with WebGL support for optimal 3D rendering performance. 