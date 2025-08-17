import React, { useState } from 'react';
import { Settings, Zap, Monitor, Smartphone } from 'lucide-react';
import { useLocalStorage } from '@/hooks';
import { cn } from '@/utils';

interface PerformanceSettings {
  enableAnimations: boolean;
  enableMouseTrail: boolean;
  enableFallingBinary: boolean;
  enableHeavyEffects: boolean;
  performanceMode: 'auto' | 'high' | 'balanced' | 'performance';
}

const PerformanceSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const defaultSettings: PerformanceSettings = {
    enableAnimations: true,
    enableMouseTrail: true,
    enableFallingBinary: true,
    enableHeavyEffects: true,
    performanceMode: 'auto'
  };
  
  const [settings, setSettings] = useLocalStorage<PerformanceSettings>('performance-settings', defaultSettings);
  
  const [deviceInfo] = useState({
    cores: navigator.hardwareConcurrency || 4,
    memory: (performance as any)?.memory?.jsHeapSizeLimit ? 
      Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024) : 0,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  });

  const presets = {
    auto: { name: 'Auto', description: 'Automatically optimized for your device' },
    high: { name: 'High Quality', description: 'Maximum visual effects and animations' },
    balanced: { name: 'Balanced', description: 'Good balance of performance and visuals' },
    performance: { name: 'Performance', description: 'Optimized for smooth performance' }
  };

  const applyPreset = (preset: keyof typeof presets) => {
    const presetSettings = {
      auto: {
        enableAnimations: true,
        enableMouseTrail: !deviceInfo.isMobile,
        enableFallingBinary: !deviceInfo.isMobile,
        enableHeavyEffects: deviceInfo.cores >= 4,
        performanceMode: 'auto' as const
      },
      high: {
        enableAnimations: true,
        enableMouseTrail: true,
        enableFallingBinary: true,
        enableHeavyEffects: true,
        performanceMode: 'high' as const
      },
      balanced: {
        enableAnimations: true,
        enableMouseTrail: true,
        enableFallingBinary: false,
        enableHeavyEffects: false,
        performanceMode: 'balanced' as const
      },
      performance: {
        enableAnimations: false,
        enableMouseTrail: false,
        enableFallingBinary: false,
        enableHeavyEffects: false,
        performanceMode: 'performance' as const
      }
    };

    setSettings(presetSettings[preset]);
  };

  const toggleSetting = (key: keyof PerformanceSettings) => {
    setSettings((prev: PerformanceSettings) => ({
      ...prev,
      [key]: !prev[key],
      performanceMode: 'auto' // Reset to auto when manually changing settings
    }));
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 p-3 bg-dark-200/80 backdrop-blur-md border border-primary/20 rounded-full text-primary hover:bg-primary/10 transition-all duration-300"
        aria-label="Performance Settings"
      >
        <Settings size={20} />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div
            className="fixed bottom-20 right-4 z-50 w-80 max-w-[90vw] bg-dark-200/95 backdrop-blur-md border border-primary/20 rounded-xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap size={20} className="text-primary" />
                Performance Settings
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Device Info */}
            <div className="mb-4 p-3 bg-dark-300/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {deviceInfo.isMobile ? <Smartphone size={16} /> : <Monitor size={16} />}
                <span className="text-sm text-white/80">
                  {deviceInfo.isMobile ? 'Mobile Device' : 'Desktop Device'}
                </span>
              </div>
              <div className="text-xs text-white/60 space-y-1">
                <div>CPU Cores: {deviceInfo.cores}</div>
                {deviceInfo.memory > 0 && <div>Memory: {deviceInfo.memory}MB</div>}
              </div>
            </div>

            {/* Performance Presets */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white/90 mb-2">Performance Mode</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key as keyof typeof presets)}
                    className={cn(
                      'p-2 rounded-lg text-xs text-left transition-all duration-200',
                      settings.performanceMode === key
                        ? 'bg-primary/20 border border-primary/40 text-primary'
                        : 'bg-dark-300/50 border border-white/10 text-white/70 hover:bg-dark-300/80'
                    )}
                  >
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-white/50">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Settings */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white/90">Individual Settings</h4>
              
              {Object.entries({
                enableAnimations: 'Animations',
                enableMouseTrail: 'Mouse Trail',
                enableFallingBinary: 'Falling Binary',
                enableHeavyEffects: 'Heavy Effects'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-white/80">{label}</span>
                  <button
                    onClick={() => toggleSetting(key as keyof PerformanceSettings)}
                    className={cn(
                      'w-12 h-6 rounded-full transition-all duration-300 relative',
                      settings[key as keyof PerformanceSettings]
                        ? 'bg-primary'
                        : 'bg-white/20'
                    )}
                  >
                    <div
                      className={cn(
                        'w-5 h-5 bg-white rounded-full transition-all duration-300 absolute top-0.5',
                        settings[key as keyof PerformanceSettings]
                          ? 'left-6'
                          : 'left-0.5'
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Reset Button */}
            <button
              onClick={() => applyPreset('auto')}
              className="w-full mt-4 p-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm hover:bg-primary/20 transition-colors"
            >
              Reset to Auto
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PerformanceSettings;

