import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../api/axios';
import { useAuth } from '../context/AuthContext';

/**
 * Register Page Component
 * Allows new users to create an account
 */
const Register = () => {
  // Get the login function from AuthContext
  const { login } = useAuth();

  // Get the navigate function to redirect after successful registration
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // State to manage error messages
  const [error, setError] = useState('');

  /**
   * Handle input change
   * Update formData as user types
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    setError('');
  };

  /**
   * Handle form submission
   * Send registration request to backend
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send POST request to register endpoint
      const response = await apiClient.post('/auth/register', formData);

      // Destructure token and user from response
      const { token, user } = response.data;

      // Save token and user to AuthContext
      login(user, token);

      // Show success notification
      toast.success('Account created successfully');

      // Redirect to home or dashboard
      navigate('/');
    } catch (err) {
      // Show error message from backend or generic error
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container min-h-screen bg-black flex items-center justify-center overflow-hidden relative">

      {/* Animated neon grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,200,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,200,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />

      {/* Glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500 rounded-full opacity-10 blur-[120px] animate-[spin_20s_linear_infinite]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600 rounded-full opacity-10 blur-[120px] animate-[spin_15s_linear_infinite_reverse]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-700 rounded-full opacity-5 blur-[160px]" />

      <div className="register-form relative z-10 w-full max-w-md mx-4">

        {/* Card with glowing border */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_60px_rgba(200,0,255,0.3),0_0_120px_rgba(0,255,200,0.2)]">
          <div className="bg-[#050510] rounded-2xl p-8 backdrop-blur-xl">

            {/* Corner accents */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-violet-400 rounded-tl-sm" />
            <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-violet-400 rounded-br-sm" />

            {/* Header */}
            <h1 className="text-5xl font-black text-center mb-8 tracking-tighter bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(200,0,255,0.6)] font-[system-ui]">
              CREATE ACCOUNT
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50" />
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(200,0,255,1)]" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            </div>

            {/* Show error message if there is one */}
            {error && (
              <div className="error-message mb-6 px-4 py-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-sm font-mono tracking-wide shadow-[0_0_12px_rgba(255,0,100,0.3)] flex items-center gap-2">
                <span className="text-red-400">⚠</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name Input */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="name"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-violet-400 font-mono"
                >
                  ◈ Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    disabled={loading}
                    className="relative w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-violet-400/60 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(150,0,255,0.15),inset_0_0_20px_rgba(150,0,255,0.05)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 font-mono"
                >
                  ◈ Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    disabled={loading}
                    className="relative w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(0,255,200,0.15),inset_0_0_20px_rgba(0,255,200,0.05)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-fuchsia-400 font-mono"
                >
                  ◈ Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    disabled={loading}
                    className="relative w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-fuchsia-400/60 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(200,0,255,0.15),inset_0_0_20px_rgba(200,0,255,0.05)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group mt-2 overflow-hidden rounded-lg py-3.5 font-black text-sm tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                <span className="relative text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    'Register →'
                  )}
                </span>
              </button>
            </form>

            {/* Bottom divider */}
            <div className="flex items-center gap-2 mt-8 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Link to login page */}
            <p className="text-center text-white/30 text-sm font-mono">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-fuchsia-400 hover:text-cyan-400 transition-colors duration-300 font-bold tracking-wide hover:drop-shadow-[0_0_8px_rgba(0,255,200,0.8)] underline underline-offset-4 decoration-dotted"
              >
                Login here
              </a>
            </p>

          </div>
        </div>

        {/* Bottom glow reflection */}
        <div className="mt-2 mx-8 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent blur-sm" />
      </div>
    </div>
  );
};

/**
 * Export the Register component
 */
export default Register;
