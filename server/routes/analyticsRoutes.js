const express = require('express');
const router = express.Router();
const { getAnalytics, getPublicStats } = require('../controllers/analyticsController');
const { protect, adminData } = require('../middleware/authMiddleware');

// Public route for landing page stats (no auth)
router.get('/public', getPublicStats);

// Protected route for admin dashboard
router.get('/', protect, adminData, getAnalytics);

module.exports = router;
