const express = require('express');
const router = express.Router();

/**
 * GET / - Test endpoint to verify API is working
 */
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Test endpoint working correctly',
  });
});

/**
 * Export the router
 */
module.exports = router;
