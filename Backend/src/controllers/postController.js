const Post = require('../models/Post');


const createPost = async (req, res) => {
  try {
    const { title, content, status } = req.body;

    // Create new post with logged-in user as author
    const post = await Post.create({
      title,
      content,
      status,
      author: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message,
    });
  }
};


const getMyPosts = async (req, res) => {
  try {
    // Find all posts by the logged-in user, sorted by newest first
    const posts = await Post.find({ author: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message,
    });
  }
};

/**
 * Get a single post by ID
 * GET /api/posts/:id
 * Access: Private (requires authentication)
 */
const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if logged-in user is the post author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this post',
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message,
    });
  }
};


const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, status } = req.body;

    // Find post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if logged-in user is the post author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }

    // Update post fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.status = status || post.status;

    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error.message,
    });
  }
};


const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Find post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check if logged-in user is the post author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    // Delete the post
    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message,
    });
  }
};

// Export all controller functions
module.exports = {
  createPost,
  getMyPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
