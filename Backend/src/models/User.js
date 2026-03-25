const mongoose = require('mongoose');

// Define the User schema with proper validation and constraints
const userSchema = new mongoose.Schema(
  {
    // User's full name - required field
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },

    // User's email address - required, unique, and converted to lowercase
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },

    // User's password - required with minimum length validation
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false // Don't return password by default in queries
    }
  },
  {
    // Enable automatic timestamps (createdAt and updatedAt)
    timestamps: true
  }
);

// Create and export the User model based on the schema
module.exports = mongoose.model('User', userSchema);
