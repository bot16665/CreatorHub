const express = require('express');
const router = express.Router();
const {
  createPost,
  getMyPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

/**
 * POST / - Create a new post
 * Access: Private (requires authentication)
 */
router.post('/', protect, createPost);

/**
 * GET / - Get all posts created by the logged-in user
 * Access: Private (requires authentication)
 */
router.get('/', protect, getMyPosts);

/**
 * GET /:id - Get a single post by ID
 * Access: Private (requires authentication)
 */
router.get('/:id', protect, getSinglePost);

/**
 * PUT /:id - Update a post by ID
 * Access: Private (requires authentication)
 */
router.put('/:id', protect, updatePost);

/**
 * DELETE /:id - Delete a post by ID
 * Access: Private (requires authentication)
 */
router.delete('/:id', protect, deletePost);

/**
 * Export the router
 */
module.exports = router;
