const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

// Create a new router instance for authentication routes
const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user with name, email, and password
 * Body: { name, email, password }
 * Response: { success, message, token, user }
 */
router.post('/register', registerUser);

/**
 * POST /api/auth/login
 * Login an existing user with email and password
 * Body: { email, password }
 * Response: { success, message, token, user }
 */
router.post('/login', loginUser);

// Export the router to be used in the main server file
module.exports = router;
