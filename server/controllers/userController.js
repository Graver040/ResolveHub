const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('department', 'name');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user role/department
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const { role, department } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.role = role || user.role;
      if (department !== undefined) {
        user.department = department === '' ? null : department;
      }

      const updatedUser = await user.save();
      
      const populatedUser = await User.findById(updatedUser._id).select('-password').populate('department', 'name');
      res.json(populatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get officers by department
// @route   GET /api/users/officers/:departmentId
// @access  Private
const getOfficersByDepartment = async (req, res) => {
  try {
    const officers = await User.find({ 
      department: req.params.departmentId,
      role: { $in: ['officer', 'admin'] }
    }).select('-password');
    res.json(officers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUsers, updateUser, deleteUser, getOfficersByDepartment };
