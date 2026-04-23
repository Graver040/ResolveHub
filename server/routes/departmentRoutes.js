const express = require('express');
const router = express.Router();
const { getDepartments, createDepartment, deleteDepartment } = require('../controllers/departmentController');
const { protect, adminData } = require('../middleware/authMiddleware');

router.route('/')
  .get(getDepartments) // public or protect depending, let's keep it open for assigning complaints
  .post(protect, adminData, createDepartment);

router.route('/:id')
  .delete(protect, adminData, deleteDepartment);

module.exports = router;
