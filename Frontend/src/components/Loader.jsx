import React from 'react';

/**
 * Loader Component
 * Displays a centered loading spinner
 */
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="relative w-16 h-16">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-fuchsia-500 animate-spin" />

        {/* Inner rotating ring (slower) */}
        <div className="absolute inset-2 rounded-full border-3 border-transparent border-b-violet-400 animate-spin animation-reverse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />
        </div>
      </div>

      {/* Loading text */}
      <div className="absolute bottom-20 text-center">
        <p className="text-white/70 text-sm font-mono tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

/**
 * Export the Loader component
 */
export default Loader;
