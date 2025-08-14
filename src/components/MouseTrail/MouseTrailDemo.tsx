import React, { useState } from 'react';
import MouseTrail from './MouseTrail';

interface MouseTrailDemoProps {
  className?: string;
}

const MouseTrailDemo: React.FC<MouseTrailDemoProps> = ({ className = '' }) => {
  const [enabled, setEnabled] = useState(true);
  const [particleSize, setParticleSize] = useState(10);
  const [trailLength, setTrailLength] = useState(50);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [throttleDelay, setThrottleDelay] = useState(20);
  const [glowColor, setGlowColor] = useState('#FFFFFF');
  const [particleColor, setParticleColor] = useState('#FFFFFF');

  const presetConfigs = [
    {
      name: 'Default',
      config: {
        particleSize: 10,
        trailLength: 50,
        animationDuration: 1000,
        throttleDelay: 20,
        glowColor: '#FFFFFF',
        particleColor: '#FFFFFF'
      }
    },
    {
      name: 'Neon Blue',
      config: {
        particleSize: 8,
        trailLength: 40,
        animationDuration: 800,
        throttleDelay: 15,
        glowColor: '#00BFFF',
        particleColor: '#00BFFF'
      }
    },
    {
      name: 'Fire Trail',
      config: {
        particleSize: 12,
        trailLength: 60,
        animationDuration: 1200,
        throttleDelay: 25,
        glowColor: '#FF4500',
        particleColor: '#FFD700'
      }
    },
    {
      name: 'Magic Purple',
      config: {
        particleSize: 6,
        trailLength: 80,
        animationDuration: 600,
        throttleDelay: 10,
        glowColor: '#9370DB',
        particleColor: '#DDA0DD'
      }
    }
  ];

  const applyPreset = (config: typeof presetConfigs[0]['config']) => {
    setParticleSize(config.particleSize);
    setTrailLength(config.trailLength);
    setAnimationDuration(config.animationDuration);
    setThrottleDelay(config.throttleDelay);
    setGlowColor(config.glowColor);
    setParticleColor(config.particleColor);
  };

  return (
    <div className={`relative min-h-screen bg-gray-900 text-white p-8 ${className}`}>
      {/* Mouse Trail Component */}
      <MouseTrail
        enabled={enabled}
        particleSize={particleSize}
        trailLength={trailLength}
        animationDuration={animationDuration}
        throttleDelay={throttleDelay}
        glowColor={glowColor}
        particleColor={particleColor}
      />

      {/* Controls Panel */}
      <div className="fixed top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-6 max-w-sm z-50">
        <h2 className="text-xl font-bold mb-4">Mouse Trail Controls</h2>
        
        {/* Enable/Disable Toggle */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Enable Mouse Trail</span>
          </label>
        </div>

        {/* Preset Configurations */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Presets</h3>
          <div className="grid grid-cols-2 gap-2">
            {presetConfigs.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.config)}
                className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Controls */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Particle Size: {particleSize}px</label>
            <input
              type="range"
              min="4"
              max="20"
              value={particleSize}
              onChange={(e) => setParticleSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Trail Length: {trailLength}</label>
            <input
              type="range"
              min="20"
              max="100"
              value={trailLength}
              onChange={(e) => setTrailLength(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Animation Duration: {animationDuration}ms</label>
            <input
              type="range"
              min="400"
              max="2000"
              step="100"
              value={animationDuration}
              onChange={(e) => setAnimationDuration(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Throttle Delay: {throttleDelay}ms</label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={throttleDelay}
              onChange={(e) => setThrottleDelay(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Glow Color</label>
            <input
              type="color"
              value={glowColor}
              onChange={(e) => setGlowColor(e.target.value)}
              className="w-full h-8 rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Particle Color</label>
            <input
              type="color"
              value={particleColor}
              onChange={(e) => setParticleColor(e.target.value)}
              className="w-full h-8 rounded"
            />
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-4xl mx-auto pt-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          Glowing Particle Trail Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>• Throttled particle generation for performance</li>
              <li>• Smooth fade-out and scale animations</li>
              <li>• Automatic DOM cleanup</li>
              <li>• Customizable colors and sizes</li>
              <li>• Configurable trail length and animation duration</li>
              <li>• Responsive and lightweight</li>
            </ul>
          </div>

          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Current Settings</h3>
            <div className="space-y-2 text-sm">
              <p>Particle Size: {particleSize}px</p>
              <p>Trail Length: {trailLength} particles</p>
              <p>Animation Duration: {animationDuration}ms</p>
              <p>Throttle Delay: {throttleDelay}ms</p>
              <p>Glow Color: {glowColor}</p>
              <p>Particle Color: {particleColor}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-300 mb-4">
            Move your mouse around to see the glowing particle trail effect!
          </p>
          <div className="flex justify-center gap-4">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ 
                backgroundColor: particleColor,
                boxShadow: `0 0 8px 2px ${glowColor}`
              }}
            />
            <span className="text-sm text-gray-400">
              This is how your particles look
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MouseTrailDemo; 