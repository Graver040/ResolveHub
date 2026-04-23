const express = require('express');
const router = express.Router();
const { getUsers, updateUser, deleteUser, getOfficersByDepartment } = require('../controllers/userController');
const { protect, adminData, officerOrAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, adminData, getUsers);

router.route('/:id')
  .put(protect, adminData, updateUser)
  .delete(protect, adminData, deleteUser);

router.get('/officers/:departmentId', protect, officerOrAdmin, getOfficersByDepartment);
// also allow admin to fetch officers for assignment mapping
router.get('/officers/all', protect, adminData, async (req, res) => {
    const User = require('../models/User');
    const officers = await User.find({ role: { $in: ['officer', 'admin']} }).select('-password').populate('department', 'name');
    res.json(officers);
});

module.exports = router;
