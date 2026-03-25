import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

/**
 * MyPosts Page Component
 * Displays all posts created by the logged-in user
 */
const MyPosts = () => {
  // Get token from AuthContext
  const { token } = useAuth();

  // Get navigate function for redirecting to edit page
  const navigate = useNavigate();

  // State to store all posts
  const [posts, setPosts] = useState([]);

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // State to manage error messages
  const [error, setError] = useState('');

  /**
   * Fetch all posts created by the logged-in user
   * This runs once when the component mounts
   */
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');

      try {
        // Send GET request to fetch user's posts
        // Authorization header is automatically added by the axios interceptor
        const response = await apiClient.get('/posts');

        // Set posts from response
        setPosts(response.data.data);
      } catch (err) {
        // Show error message from backend or generic error
        const errorMessage =
          err.response?.data?.message || 'Failed to load posts. Please try again.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch posts if token exists
    if (token) {
      fetchPosts();
    }
  }, [token]);

  /**
   * Format date to readable format
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Get first 100 characters of content as preview
   */
  const getContentPreview = (content) => {
    if (content.length > 100) {
      return content.substring(0, 100) + '...';
    }
    return content;
  };

  /**
   * Handle edit button click
   * Navigate to edit page with post ID
   */
  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  /**
   * Handle delete button click
   * Show confirmation and delete post from backend
   */
  const handleDelete = async (postId) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone.'
    );

    // If user cancels, do nothing
    if (!confirmed) {
      return;
    }

    try {
      // Send DELETE request to delete the post
      // Authorization header is automatically added by the axios interceptor
      await apiClient.delete(`/posts/${postId}`);

      // Remove deleted post from UI
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      // Show error message if delete fails
      const errorMessage =
        err.response?.data?.message || 'Failed to delete post. Please try again.';
      alert(errorMessage);
    }
  };

  // Show loading state
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="myposts-container relative z-10 px-4 py-12 max-w-6xl mx-auto">

      {/* Page heading */}
      <h1 className="text-5xl font-black tracking-tighter text-center mb-4 bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,255,200,0.5)] font-[system-ui]">
        My Posts
      </h1>

      {/* Decorative divider */}
      <div className="flex items-center gap-2 mb-10 max-w-sm mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40" />
        <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(200,0,255,1)]" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-40" />
      </div>

      {/* Show error message if there is one */}
      {error && (
        <div className="error-message mb-8 px-4 py-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-sm font-mono tracking-wide shadow-[0_0_12px_rgba(255,0,100,0.3)] flex items-center gap-2">
          <span className="text-red-400">⚠</span>
          {error}
        </div>
      )}

      {/* Show empty state if no posts exist */}
      {posts.length === 0 && !error && (
        <div className="empty-state text-center py-20">
          <div className="relative inline-block p-[1px] rounded-2xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-violet-600 shadow-[0_0_40px_rgba(0,255,200,0.15)]">
            <div className="bg-[#050510] rounded-2xl px-12 py-10">
              <p className="text-white/30 font-mono text-sm tracking-wide mb-4">
                You haven't created any posts yet.
              </p>
              <p>
                <a
                  href="/editor"
                  className="text-cyan-400 hover:text-fuchsia-400 transition-colors duration-300 font-bold font-mono text-sm tracking-[0.15em] uppercase hover:drop-shadow-[0_0_8px_rgba(200,0,255,0.8)] underline underline-offset-4 decoration-dotted"
                >
                  Create your first post →
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Display posts in a grid */}
      {posts.length > 0 && (
        <div className="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="post-card relative p-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/30 to-violet-600/30 hover:from-cyan-400 hover:via-fuchsia-500 hover:to-violet-600 transition-all duration-500 shadow-[0_0_20px_rgba(0,255,200,0.08)] hover:shadow-[0_0_40px_rgba(0,255,200,0.2),0_0_80px_rgba(200,0,255,0.15)] group"
            >
              <div className="bg-[#050510] rounded-2xl p-5 h-full flex flex-col">

                {/* Corner accents */}
                <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/30 group-hover:border-cyan-400 rounded-tl-sm transition-colors duration-500" />
                <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-fuchsia-400/30 group-hover:border-fuchsia-400 rounded-tr-sm transition-colors duration-500" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-fuchsia-400/30 group-hover:border-fuchsia-400 rounded-bl-sm transition-colors duration-500" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/30 group-hover:border-cyan-400 rounded-br-sm transition-colors duration-500" />

                {/* Post Title */}
                <h2 className="post-title text-base font-black tracking-tight text-white/90 font-[system-ui] mb-3 group-hover:text-white transition-colors duration-300">
                  {post.title}
                </h2>

                {/* Post Content Preview */}
                <p className="post-preview text-xs font-mono text-white/30 leading-relaxed flex-1 mb-4">
                  {getContentPreview(post.content)}
                </p>

                {/* Post Metadata */}
                <div className="post-meta flex items-center justify-between mb-4">

                  {/* Status Badge */}
                  <span
                    className={`status-badge status-${post.status} px-2.5 py-1 rounded-md text-[10px] font-black tracking-[0.15em] uppercase font-mono ${
                      post.status === 'published'
                        ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 shadow-[0_0_8px_rgba(0,255,200,0.2)]'
                        : 'bg-violet-950/60 border border-violet-500/40 text-violet-300 shadow-[0_0_8px_rgba(150,0,255,0.2)]'
                    }`}
                  >
                    {post.status}
                  </span>

                  {/* Created Date */}
                  <span className="post-date text-[10px] font-mono text-white/20 tracking-wide">
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="post-actions flex gap-2">
                  <button
                    className="btn-edit flex-1 relative group/btn overflow-hidden rounded-lg py-2 font-black text-xs tracking-[0.15em] uppercase font-mono transition-all duration-300"
                    onClick={() => handleEdit(post._id)}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-600" />
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                    <span className="relative text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">Edit</span>
                  </button>

                  <button
                    className="btn-delete flex-1 relative group/del overflow-hidden rounded-lg py-2 font-black text-xs tracking-[0.15em] uppercase font-mono border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_16px_rgba(255,0,80,0.3)] transition-all duration-300"
                    onClick={() => handleDelete(post._id)}
                  >
                    <span className="absolute inset-0 bg-white/0 group-hover/del:bg-red-950/40 transition-colors duration-300" />
                    <span className="absolute inset-0 -translate-x-full group-hover/del:translate-x-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent transition-transform duration-700 skew-x-12" />
                    <span className="relative text-white/40 group-hover/del:text-red-300 transition-colors duration-300">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Export the MyPosts component
 */
export default MyPosts;