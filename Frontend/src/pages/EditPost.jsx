import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

/**
 * EditPost Page Component
 * Allows users to edit existing posts
 */
const EditPost = () => {
  // Get post ID from URL params
  const { id } = useParams();

  // Get token from AuthContext (for authorization)
  const { token } = useAuth();

  // Get navigate function to redirect after successful update
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
  });

  // State to manage loading status for fetching post
  const [fetchingPost, setFetchingPost] = useState(true);

  // State to manage loading status for submitting form
  const [submitting, setSubmitting] = useState(false);

  // State to manage error messages
  const [error, setError] = useState('');

  // State to manage success message
  const [success, setSuccess] = useState('');

  /**
   * Fetch post data on component mount
   * This populates the form with existing post data
   */
  useEffect(() => {
    const fetchPost = async () => {
      setFetchingPost(true);
      setError('');

      try {
        // Send GET request to fetch the post by ID
        // Authorization header is automatically added by the axios interceptor
        const response = await apiClient.get(`/posts/${id}`);

        // Pre-populate form with post data
        const post = response.data.data;
        setFormData({
          title: post.title,
          content: post.content,
          status: post.status,
        });
      } catch (err) {
        // Show error message from backend or generic error
        const errorMessage =
          err.response?.data?.message || 'Failed to load post. Please try again.';
        setError(errorMessage);
      } finally {
        setFetchingPost(false);
      }
    };

    // Only fetch if token exists and ID is available
    if (token && id) {
      fetchPost();
    }
  }, [id, token]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that required fields are filled
    if (!formData.title || !formData.content) {
      setError('Please fill in title and content');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Send PUT request to update post
      // Authorization header is automatically added by the axios interceptor
      const response = await apiClient.put(`/posts/${id}`, formData);

      // Show success message
      setSuccess('Post updated successfully!');

      // Redirect to my posts page after 2 seconds
      setTimeout(() => {
        navigate('/myposts');
      }, 2000);
    } catch (err) {
      // Show error message from backend or generic error
      const errorMessage =
        err.response?.data?.message || 'Failed to update post. Please try again.';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading state while fetching post
  if (fetchingPost && !formData.title) {
    return <Loader />;
  }

  return (
    <div className="editor-container min-h-screen flex items-center justify-center px-4 py-12">
      <div className="editor-form relative z-10 w-full max-w-2xl">

        {/* Card with glowing border */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 shadow-[0_0_60px_rgba(150,0,255,0.25),0_0_120px_rgba(0,255,200,0.15)]">
          <div className="bg-[#050510] rounded-2xl p-8 backdrop-blur-xl">

            {/* Corner accents */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-violet-400 rounded-tl-sm" />
            <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-violet-400 rounded-br-sm" />

            {/* Header */}
            <h1 className="text-4xl font-black text-center mb-8 tracking-tighter bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(150,0,255,0.5)] font-[system-ui]">
              Edit Post
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

            {/* Show success message if post was updated */}
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
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-violet-400 font-mono"
                >
                  ◈ Post Title
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter post title"
                    disabled={submitting}
                    className="relative w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-violet-400/60 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(150,0,255,0.15),inset_0_0_20px_rgba(150,0,255,0.05)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Content Input */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="content"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-fuchsia-400 font-mono"
                >
                  ◈ Post Content
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter your post content here..."
                    rows="10"
                    disabled={submitting}
                    className="relative w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 font-mono text-sm focus:outline-none focus:border-fuchsia-400/60 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(200,0,255,0.15),inset_0_0_20px_rgba(200,0,255,0.05)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed resize-none"
                  />
                </div>
              </div>

              {/* Status Select */}
              <div className="form-group space-y-2">
                <label
                  htmlFor="status"
                  className="block text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 font-mono"
                >
                  ◈ Post Status
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={submitting}
                    className="relative w-full bg-[#050510] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_20px_rgba(0,255,200,0.15)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer"
                  >
                    <option value="draft" className="bg-[#050510] text-white/70">Draft</option>
                    <option value="published" className="bg-[#050510] text-white/70">Published</option>
                  </select>
                  {/* Custom select arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400 text-xs">▾</div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full relative group overflow-hidden rounded-lg py-3.5 font-black text-sm tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                <span className="relative text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Updating Post...
                    </span>
                  ) : (
                    'Update Post →'
                  )}
                </span>
              </button>
            </form>

            {/* Bottom divider */}
            <div className="flex items-center gap-2 mt-8 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Link back to my posts */}
            <p className="text-center text-white/30 text-sm font-mono">
              <a
                href="/myposts"
                className="text-violet-400 hover:text-cyan-400 transition-colors duration-300 font-bold tracking-wide hover:drop-shadow-[0_0_8px_rgba(0,255,200,0.8)] underline underline-offset-4 decoration-dotted"
              >
                ← Back to My Posts
              </a>
            </p>

          </div>
        </div>

        {/* Bottom glow reflection */}
        <div className="mt-2 mx-8 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent blur-sm" />
      </div>
    </div>
  );
};

/**
 * Export the EditPost component
 */
export default EditPost;