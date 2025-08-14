import React, { useEffect, useRef } from 'react';

interface SplineViewerProps {
  url: string;
  className?: string;
  style?: React.CSSProperties;
}

const SplineViewer: React.FC<SplineViewerProps> = ({ 
  url, 
  className = "", 
  style = {} 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't load if URL is undefined or invalid
    if (!url || url === 'undefined') {
      return;
    }

    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.39/build/spline-viewer.js';
    script.async = true;
    
    script.onload = () => {
      // Create the spline-viewer element
      if (containerRef.current) {
        const splineViewer = document.createElement('spline-viewer');
        splineViewer.setAttribute('url', url);
        splineViewer.style.width = '100%';
        splineViewer.style.height = '100%';
        splineViewer.style.borderRadius = '12px';
        splineViewer.style.transform = 'scale(1.3)';
        splineViewer.style.transformOrigin = 'center center';
        splineViewer.style.background = 'transparent';
        splineViewer.style.mixBlendMode = 'screen';
        
        // Clear container and append the viewer
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(splineViewer);
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [url]);

  return (
    <div 
      ref={containerRef}
      className={`spline-viewer-container ${className}`}
      style={{
        width: '100%',
        height: '400px',
        minHeight: '400px',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Loading placeholder or error state */}
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/2 to-secondary/2 rounded-xl border border-white/3 backdrop-blur-sm">
        <div className="text-center">
          {!url || url === 'undefined' ? (
            <>
              <div className="w-8 h-8 bg-primary/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm">3D Model Placeholder</p>
              <p className="text-white/40 text-xs mt-1">Add your Spline URL</p>
            </>
          ) : (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-white/60 text-sm">Loading 3D Model...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplineViewer; 