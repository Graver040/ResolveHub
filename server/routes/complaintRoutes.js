const express = require('express');
const router = express.Router();
const { getComplaints, createComplaint, updateComplaint, deleteComplaint, addUpdate } = require('../controllers/complaintController');
const { protect, adminData, officerOrAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getComplaints)
  .post(protect, createComplaint);

router.route('/:id')
  .put(protect, officerOrAdmin, updateComplaint)
  .delete(protect, adminData, deleteComplaint);

router.post('/:id/updates', protect, addUpdate);

module.exports = router;
