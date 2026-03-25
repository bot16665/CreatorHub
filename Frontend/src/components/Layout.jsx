import React from 'react';
import Navbar from './Navbar';

/**
 * Layout Component
 * Provides consistent layout structure for all pages
 * Includes navbar at the top and content area below
 */
const Layout = ({ children }) => {
  return (
    <div className="layout min-h-screen bg-black flex flex-col relative overflow-hidden">

      {/* Animated neon grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,200,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,200,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Glowing orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-[120px] animate-[spin_20s_linear_infinite] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600 rounded-full opacity-10 blur-[120px] animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-700 rounded-full opacity-5 blur-[160px] pointer-events-none" />

      {/* Navbar - Visible on all pages */}
      <Navbar />

      {/* Main Content Area */}
      <main className="layout-content flex-1 relative z-10">
        <div className="content-container max-w-7xl mx-auto px-6 py-10">
          {/* Page content passed as children */}
          {children}
        </div>
      </main>

      {/* Optional Footer */}
      <footer className="layout-footer relative z-10 border-t border-white/5">
        {/* Top glow line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center gap-3">
          {/* Decorative dots */}
          <span className="w-1 h-1 rounded-full bg-cyan-400/40 shadow-[0_0_4px_rgba(0,255,200,0.6)]" />
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/20">
            &copy; 2026{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent font-bold">
              CreatorHub
            </span>
            . All rights reserved.
          </p>
          <span className="w-1 h-1 rounded-full bg-fuchsia-400/40 shadow-[0_0_4px_rgba(200,0,255,0.6)]" />
        </div>
      </footer>
    </div>
  );
};

/**
 * Export the Layout component
 */
export default Layout;