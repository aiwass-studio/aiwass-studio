import React from 'react';

interface AiwassLogoProps {
  className?: string;
  variant?: 0 | 1 | 2;
}

export const AiwassLogo: React.FC<AiwassLogoProps> = ({ className = '', variant = 0 }) => {
  const maskStyle = {
    mask: 'url(/assets/aiwass-logotipo.svg) no-repeat center / contain',
    WebkitMask: 'url(/assets/aiwass-logotipo.svg) no-repeat center / contain',
  };

  // Base layout: maintains the aspect ratio of the logotipo (38100 x 16301.38)
  const baseClasses = `relative inline-block aspect-[381/163] ${className}`;

  if (variant === 1) {
    // Variant 1: Pulse/Flicker Variant (CRT scanline style)
    return (
      <div className={baseClasses}>
        <div 
          className="w-full h-full bg-current opacity-40 animate-pulse"
          style={maskStyle}
        />
      </div>
    );
  }

  if (variant === 2) {
    // Variant 2: Slanted / Chromatic Aberration Glitched Offset
    return (
      <div className={`${baseClasses} skew-x-[-12deg]`}>
        {/* Purple layer offset */}
        <div 
          className="absolute inset-0 bg-aiwass-purple opacity-80 translate-x-[-3px] translate-y-[1px]"
          style={maskStyle}
        />
        {/* Red layer offset */}
        <div 
          className="absolute inset-0 bg-aiwass-red opacity-80 translate-x-[3px] translate-y-[-1px]"
          style={maskStyle}
        />
        {/* Main layer */}
        <div 
          className="absolute inset-0 bg-current opacity-90"
          style={maskStyle}
        />
      </div>
    );
  }

  // Default Variant 0: Solid
  return (
    <div className={baseClasses}>
      <div 
        className="w-full h-full bg-current"
        style={maskStyle}
      />
    </div>
  );
};

export default AiwassLogo;

