const Complaint = require('../models/Complaint');

// @desc    Get complaints
// @route   GET /api/complaints
// @access  Private
const getComplaints = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'citizen') {
      query.citizen = req.user.id;
    } else if (req.user.role === 'officer') {
      // Officers see their assigned complaints or all complaints for their department
      query.$or = [
        { assignedOfficer: req.user.id },
        { department: req.user.department }
      ];
    }
    // Admin sees all complaints (query = {})

    const complaints = await Complaint.find(query)
      .populate('citizen', 'name email')
      .populate('department', 'name')
      .populate('assignedOfficer', 'name')
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private (usually citizen)
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority: priority || 'Medium',
      citizen: req.user.id
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update complaint status/assignment
// @route   PUT /api/complaints/:id
// @access  Private (Admin or Officer)
const updateComplaint = async (req, res) => {
  try {
    const { status, department, assignedOfficer, priority } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Checking auth
    if (req.user.role === 'citizen') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    complaint.status = status || complaint.status;
    if (department !== undefined) complaint.department = department;
    if (assignedOfficer !== undefined) complaint.assignedOfficer = assignedOfficer;
    if (priority !== undefined) complaint.priority = priority;

    const updatedComplaint = await complaint.save();
    
    const populated = await Complaint.findById(updatedComplaint._id)
      .populate('citizen', 'name email')
      .populate('department', 'name')
      .populate('assignedOfficer', 'name');

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private/Admin
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await complaint.deleteOne();
    res.json({ message: 'Complaint removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add update to complaint
// @route   POST /api/complaints/:id/updates
// @access  Private
const addUpdate = async (req, res) => {
  try {
    const { message, statusChange } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const update = {
      message,
      author: req.user.id,
      statusChange: statusChange || ''
    };

    complaint.updates.push(update);

    if (statusChange && ['Pending', 'In Progress', 'Resolved'].includes(statusChange)) {
      complaint.status = statusChange;
    }

    const updatedComplaint = await complaint.save();
    
    const populated = await Complaint.findById(updatedComplaint._id)
      .populate('citizen', 'name email')
      .populate('department', 'name')
      .populate('assignedOfficer', 'name')
      .populate('updates.author', 'name role');

    res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getComplaints, createComplaint, updateComplaint, deleteComplaint, addUpdate };
