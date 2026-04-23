const express = require('express');
const router = express.Router();
const { getUsers, updateUser, deleteUser, getOfficersByDepartment, getAllOfficersWithTaskCount } = require('../controllers/userController');
const { protect, adminData, officerOrAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, adminData, getUsers);

router.route('/:id')
  .put(protect, adminData, updateUser)
  .delete(protect, adminData, deleteUser);

// static routes MUST come before dynamic routes
router.get('/officers/all', protect, adminData, getAllOfficersWithTaskCount);

router.get('/officers/:departmentId', protect, officerOrAdmin, getOfficersByDepartment);

module.exports = router;
