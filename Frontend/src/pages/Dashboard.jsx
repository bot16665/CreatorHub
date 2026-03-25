import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Dashboard Page Component
 * Shows user information and allows logout
 */
const Dashboard = () => {
  // Get user and logout function from AuthContext
  const { user, logout } = useAuth();

  // Get navigate function to redirect after logout
  const navigate = useNavigate();

  /**
   * Handle logout
   * Clear authentication and redirect to login page
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * Navigate to editor page
   */
  const goToEditor = () => {
    navigate('/editor');
  };

  /**
   * Navigate to my posts page
   */
  const goToMyPosts = () => {
    navigate('/myposts');
  };

  return (
    <div className="dashboard-container min-h-screen flex items-center justify-center px-4 py-12">
      <div className="dashboard-content relative z-10 w-full max-w-lg space-y-6">

        {/* Welcome message with user name */}
        <h1 className="text-5xl font-black tracking-tighter text-center bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,200,0.5)] font-[system-ui]">
          Welcome, {user?.name}!
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,255,200,1)]" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-40" />
        </div>

        {/* User Information Card */}
        <div className="user-info card relative p-[1px] rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-violet-600 shadow-[0_0_40px_rgba(0,255,200,0.2),0_0_80px_rgba(200,0,255,0.15)]">
          <div className="bg-[#050510] rounded-2xl p-6 backdrop-blur-xl">

            {/* Corner accents */}
            <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-fuchsia-400 rounded-tr-sm" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-fuchsia-400 rounded-bl-sm" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br-sm" />

            <h2 className="text-xs font-black tracking-[0.25em] uppercase font-mono text-white/40 mb-5">
              ◈ Your Profile
            </h2>

            <div className="info-item flex items-center justify-between py-3 border-b border-white/5">
              <label className="text-xs font-bold tracking-[0.2em] uppercase font-mono text-cyan-400">Name</label>
              <p className="text-sm font-mono text-white/80">{user?.name}</p>
            </div>

            <div className="info-item flex items-center justify-between py-3">
              <label className="text-xs font-bold tracking-[0.2em] uppercase font-mono text-fuchsia-400">Email</label>
              <p className="text-sm font-mono text-white/80">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Create Post Button */}
        <button
          onClick={goToEditor}
          className="create-post-btn w-full relative group overflow-hidden rounded-lg py-3.5 font-black text-sm tracking-[0.25em] uppercase transition-all duration-300"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600" />
          <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
          <span className="relative text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            Create New Post →
          </span>
        </button>

        {/* View My Posts Button */}
        <button
          onClick={goToMyPosts}
          className="my-posts-btn w-full relative group overflow-hidden rounded-lg py-3.5 font-black text-sm tracking-[0.25em] uppercase transition-all duration-300 border border-white/10 hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(200,0,255,0.25)]"
        >
          <span className="absolute inset-0 bg-white/0 group-hover:bg-fuchsia-950/40 transition-colors duration-300" />
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent transition-transform duration-700 skew-x-12" />
          <span className="relative text-white/50 group-hover:text-fuchsia-300 transition-colors duration-300 font-mono">
            View My Posts
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="logout-btn w-full relative group overflow-hidden rounded-lg py-3.5 font-black text-sm tracking-[0.25em] uppercase transition-all duration-300 border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(255,0,80,0.25)]"
        >
          <span className="absolute inset-0 bg-white/0 group-hover:bg-red-950/40 transition-colors duration-300" />
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent transition-transform duration-700 skew-x-12" />
          <span className="relative text-white/30 group-hover:text-red-300 transition-colors duration-300 font-mono">
            Logout
          </span>
        </button>

      </div>
    </div>
  );
};

/**
 * Export the Dashboard component
 */
export default Dashboard;