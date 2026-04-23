const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers/analyticsController');
const { protect, adminData } = require('../middleware/authMiddleware');

router.get('/', protect, adminData, getAnalytics);

module.exports = router;
