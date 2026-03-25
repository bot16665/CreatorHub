import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar Component
 * Navigation bar with links and logout functionality
 * Shows different links based on authentication status
 */
const Navbar = () => {
  // Get authentication state from AuthContext
  const { user, token, logout } = useAuth();

  // Get navigate function for redirecting after logout
  const navigate = useNavigate();

  /**
   * Handle logout
   * Clear authentication and redirect to login page
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar relative z-50 bg-[#050510]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(0,255,200,0.08),0_0_60px_rgba(200,0,255,0.05)]">

      {/* Top neon accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* App Name */}
        <div className="navbar-brand">
          <Link
            to="/"
            className="brand-link text-2xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,255,200,0.5)] hover:drop-shadow-[0_0_20px_rgba(200,0,255,0.8)] transition-all duration-300 font-[system-ui]"
          >
            CreatorHub
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-menu">
          {!token ? (
            // Show these links when user is NOT logged in
            <div className="navbar-links flex items-center gap-3">
              <Link
                to="/login"
                className="nav-link px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase font-mono text-white/50 hover:text-cyan-300 hover:drop-shadow-[0_0_8px_rgba(0,255,200,0.8)] transition-all duration-300"
              >
                Login
              </Link>

              {/* Register as gradient button */}
              <Link
                to="/register"
                className="nav-link relative group overflow-hidden px-5 py-2 rounded-lg text-xs font-black tracking-[0.2em] uppercase font-mono text-white"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600" />
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                <span className="relative drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">Register</span>
              </Link>
            </div>
          ) : (
            // Show these links and buttons when user IS logged in
            <div className="navbar-links flex items-center gap-1">
              <Link
                to="/dashboard"
                className="nav-link px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase font-mono text-white/40 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg hover:drop-shadow-[0_0_8px_rgba(0,255,200,0.6)] transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/editor"
                className="nav-link px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase font-mono text-white/40 hover:text-fuchsia-300 hover:bg-fuchsia-500/10 rounded-lg hover:drop-shadow-[0_0_8px_rgba(200,0,255,0.6)] transition-all duration-300"
              >
                Create Post
              </Link>
              <Link
                to="/myposts"
                className="nav-link px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase font-mono text-white/40 hover:text-violet-300 hover:bg-violet-500/10 rounded-lg hover:drop-shadow-[0_0_8px_rgba(150,0,255,0.6)] transition-all duration-300"
              >
                My Posts
              </Link>

              {/* Divider */}
              <div className="w-px h-5 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-2" />

              {/* Display logged-in user name */}
              <span className="user-greeting text-xs font-mono tracking-wide text-white/30 px-2">
                ◈ <span className="text-cyan-400 font-bold">{user?.name}</span>
              </span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="nav-logout-btn relative group overflow-hidden ml-2 px-4 py-2 rounded-lg text-xs font-black tracking-[0.2em] uppercase font-mono text-white/60 border border-white/10 hover:border-red-500/50 hover:text-red-300 hover:bg-red-950/40 hover:shadow-[0_0_16px_rgba(255,0,80,0.3)] transition-all duration-300"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent transition-transform duration-700 skew-x-12" />
                <span className="relative">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom subtle glow line */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
    </nav>
  );
};

/**
 * Export the Navbar component
 */
export default Navbar;