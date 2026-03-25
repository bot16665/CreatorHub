import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../api/axios';
import { useAuth } from '../context/AuthContext';

/**
 * Post Editor Page Component
 * Allows users to create new posts
 */
const Editor = () => {
  // Get token from AuthContext (for authorization)
  const { token } = useAuth();

  // Get navigate function to redirect after successful post creation
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
  });

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // State to manage AI prompt input
  const [aiPrompt, setAiPrompt] = useState('');

  // State to manage AI generation loading status
  const [aiLoading, setAiLoading] = useState(false);

  // State to track AI request cooldown (prevent rate limiting)
  const [aiCooldown, setAiCooldown] = useState(false);

  // State to show cooldown countdown timer
  const [cooldownTime, setCooldownTime] = useState(0);

  // State to manage error messages
  const [error, setError] = useState('');

  // State to manage success message
  const [success, setSuccess] = useState('');

  /**
   * Handle AI content generation
   * Send prompt to backend AI API and fill content textarea
   * Includes cooldown to prevent rate limiting
   */
  const handleGenerateWithAI = async () => {
    // Check if cooldown is still active
    if (aiCooldown) {
      toast.error(`Please wait ${cooldownTime}s before generating again`);
      return;
    }

    // Validate that AI prompt is provided
    if (!aiPrompt.trim()) {
      toast.error('Please enter a prompt for AI generation');
      return;
    }

    setAiLoading(true);

    try {
      // Send POST request to AI generation endpoint
      // Authorization header is automatically added by axios interceptor
      const response = await apiClient.post('/ai/generate', {
        prompt: aiPrompt,
      });

      // Extract generated text from response
      const generatedText = response.data.data.generatedText;

      // Fill the content textarea with generated text
      setFormData({
        ...formData,
        content: generatedText,
      });

      // Show success message
      toast.success('Content generated successfully!');

      // Clear AI prompt after successful generation
      setAiPrompt('');

      // Set cooldown (3 seconds to prevent rate limiting)
      setAiCooldown(true);
      setCooldownTime(3);

      // Countdown timer
      const cooldownInterval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownInterval);
            setAiCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      // Log error for debugging
      console.error('AI Generation error:', err);

      // Show error message
      const errorMessage =
        err.response?.data?.message || 'Failed to generate content. Please try again.';
      toast.error(errorMessage);
    } finally {
      setAiLoading(false);
    }
  };

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
    // Clear error and success messages when user starts typing
    setError('');
    setSuccess('');
  };

  /**
   * Handle form submission
   * Send POST request to create a new post
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that required fields are filled
    if (!formData.title || !formData.content) {
      setError('Please fill in title and content');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Send POST request to create post
      // The authorization header is automatically added by the axios interceptor
      const response = await apiClient.post('/posts', formData);

      // Show success message
      setSuccess('Post created successfully!');

      // Reset form
      setFormData({
        title: '',
        content: '',
        status: 'draft',
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      // Show error message from backend or generic error
      const errorMessage =
        err.response?.data?.message || 'Failed to create post. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editor-container min-h-screen flex items-center justify-center px-4 py-12">
      <div className="editor-form relative z-10 w-full max-w-2xl">

        {/* Card with glowing border */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-violet-600 shadow-[0_0_60px_rgba(0,255,200,0.25),0_0_120px_rgba(200,0,255,0.15)]">
          <div className="bg-[#050510] rounded-2xl p-8 backdrop-blur-xl">

            {/* Corner accents */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm" />
            <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-fuchsia-400 rounded-tr-sm" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-fuchsia-400 rounded-bl-sm" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-sm" />

            {/* Header */}
            <h1 className="text-4xl font-black text-center mb-8 tracking-tighter bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,200,0.5)] font-[system-ui]">
              Create New Post
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
              <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(200,0,255,1)]" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50" />
            </div>

            {/* Show error message if there is one */}
            {error && (
              <div className="error-message mb-6 px-4 py-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-sm font-mono tracking-wide shadow-[0_0_12px_rgba(255,0,100,0.3)] flex items-center gap-2">
                <span className="text-red-400">⚠</span>
                {error}
              </div>
            )}

            {/* Show success message if post was created */}
            {success && (
              <div className="success-message mb-6 px-4 py-3 rounded-lg bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 text-sm font-mono tracking-wide shadow-[0_0_12px_rgba(0,255,200,0.3)] flex items-center gap-2">
                <span className="text-cyan-400">✓</span>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title Input */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="title"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 font-mono"
                >
                  ◈ Post Title
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    disabled={loading}
                    className="relative w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-cyan-400/60 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(0,255,200,0.15),inset_0_0_20px_rgba(0,255,200,0.05)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* AI Prompt Input */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="aiPrompt"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-violet-400 font-mono"
                >
                  ✨ AI Content Generator
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <input
                    type="text"
                    id="aiPrompt"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Enter prompt for AI (e.g., 'Write a blog post about web development')"
                    disabled={aiLoading}
                    className="relative w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-violet-400/60 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(150,0,255,0.15),inset_0_0_20px_rgba(150,0,255,0.05)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* AI Generate Button */}
              <button
                type="button"
                onClick={handleGenerateWithAI}
                disabled={aiLoading || aiCooldown}
                className="w-full relative group overflow-hidden rounded-lg py-3 font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                <span className="relative text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  {aiLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </span>
                  ) : aiCooldown ? (
                    <span className="flex items-center justify-center gap-2">
                      ⏱️ Wait {cooldownTime}s...
                    </span>
                  ) : (
                    '✨ Generate with AI'
                  )}
                </span>
              </button>

              {/* Content Input */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="content"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-fuchsia-400 font-mono"
                >
                  ◈ Post Content
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter your post content here..."
                    rows="10"
                    disabled={loading}
                    className="relative w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-fuchsia-400/60 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(200,0,255,0.15),inset_0_0_20px_rgba(200,0,255,0.05)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed resize-none"
                  />
                </div>
              </div>

              {/* Status Select */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="status"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-violet-400 font-mono"
                >
                  ◈ Post Status
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={loading}
                    className="relative w-full bg-[#050510] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-violet-400/60 focus:shadow-[0_0_20px_rgba(150,0,255,0.15)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
                  >
                    <option value="draft" className="bg-[#050510] text-white/70">Draft</option>
                    <option value="published" className="bg-[#050510] text-white/70">Published</option>
                  </select>
                  {/* Custom select arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-violet-400 text-xs">▾</div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden rounded-lg py-3.5 font-black text-sm tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600" />
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                <span className="relative text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Post...
                    </span>
                  ) : (
                    'Create Post →'
                  )}
                </span>
              </button>
            </form>

            {/* Bottom divider */}
            <div className="flex items-center gap-2 mt-8 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Link back to dashboard */}
            <p className="text-center text-white/30 text-sm font-mono">
              <a
                href="/dashboard"
                className="text-cyan-400 hover:text-fuchsia-400 transition-colors duration-300 font-bold tracking-wide hover:drop-shadow-[0_0_8px_rgba(200,0,255,0.8)] underline underline-offset-4 decoration-dotted"
              >
                ← Back to Dashboard
              </a>
            </p>

          </div>
        </div>

        {/* Bottom glow reflection */}
        <div className="mt-2 mx-8 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent blur-sm" />
      </div>
    </div>
  );
};

/**
 * Export the Editor component
 */
export default Editor;