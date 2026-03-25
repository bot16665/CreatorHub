const mongoose = require('mongoose');


const postSchema = new mongoose.Schema(
  {
    // Title of the post - required and trimmed
    title: {
      type: String,
      required: [true, 'Please provide a post title'],
      trim: true,
    },

    // Main content of the post - required
    content: {
      type: String,
      required: [true, 'Please provide post content'],
    },

    // Reference to the User who created this post - required
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must have an author'],
    },

    // Publication status - draft or published
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

/**
 * Create and export the Post model
 */
module.exports = mongoose.model('Post', postSchema);
