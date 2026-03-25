const express = require('express');
const router = express.Router();
const { generateContent, generateContentAdvanced } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

/**
 * POST /api/ai/generate
 * Generate content using OpenAI API (basic version)
 * Access: Private (requires authentication)
 * Body: { prompt }
 * Returns: { success, message, data }
 */
router.post('/generate', protect, generateContent);

/**
 * POST /api/ai/generate-advanced
 * Generate content using OpenAI API (with custom options)
 * Access: Private (requires authentication)
 * Body: { prompt, model, maxTokens, temperature }
 * Returns: { success, message, data }
 */
router.post('/generate-advanced', protect, generateContentAdvanced);

/**
 * Export the router to be used in the main server file
 */
module.exports = router;
