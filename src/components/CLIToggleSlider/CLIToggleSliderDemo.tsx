import React from 'react';
import CLIToggleSlider from './CLIToggleSlider';

const CLIToggleSliderDemo: React.FC = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Main toggle slider (top-right) */}
      <div className="pointer-events-auto">
        <CLIToggleSlider />
      </div>
      
      {/* Demo variations - only show in development */}
      {import.meta.env?.DEV && (
        <>
          {/* Small toggle without icons */}
          <div className="pointer-events-auto">
            <CLIToggleSlider 
              size="sm" 
              showIcons={false} 
              position="top-left"
            />
          </div>
          
          {/* Large toggle without label */}
          <div className="pointer-events-auto">
            <CLIToggleSlider 
              size="lg" 
              showLabel={false} 
              position="bottom-right"
            />
          </div>
          
          {/* Medium toggle with all features */}
          <div className="pointer-events-auto">
            <CLIToggleSlider 
              size="md" 
              position="bottom-left"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CLIToggleSliderDemo; 