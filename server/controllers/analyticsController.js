const Complaint = require('../models/Complaint');
const Department = require('../models/Department');

// @desc    Get dashboard analytics
// @route   GET /api/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    
    // Status distribution for Pie Chart
    const statusDistribution = [
      { name: 'Pending', value: pendingComplaints },
      { name: 'In Progress', value: inProgressComplaints },
      { name: 'Resolved', value: resolvedComplaints }
    ];

    // Complaints per department for Bar Chart
    const complaintsPerDeptRaw = await Complaint.aggregate([
      { $match: { department: { $ne: null } } },
      { $group: { _id: '$department', count: { $sum: 1 } } }
    ]);

    const populatedDepartments = await Department.populate(complaintsPerDeptRaw, { path: '_id' });

    const complaintsPerDept = populatedDepartments.map(item => ({
      name: item._id ? item._id.name : 'Unknown',
      count: item.count
    }));

    // Most active department
    let mostActiveDept = 'N/A';
    if (complaintsPerDept.length > 0) {
      const max = complaintsPerDept.reduce((prev, current) => (prev.count > current.count) ? prev : current);
      mostActiveDept = max.name;
    }

    // Complaints today
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);
    const complaintsToday = await Complaint.countDocuments({ createdAt: { $gte: startOfDay } });

    // Monthly Complaints (Current Year)
    const currentYear = new Date().getFullYear();
    const monthlyRaw = await Complaint.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          complaints: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = monthlyRaw.map(m => ({
      name: monthNames[m._id - 1],
      complaints: m.complaints
    }));

    res.json({
      overview: {
        total: totalComplaints,
        pending: pendingComplaints,
        inProgress: inProgressComplaints,
        resolved: resolvedComplaints,
        complaintsToday,
        mostActiveDept
      },
      statusDistribution,
      complaintsPerDept,
      monthlyComplaints: monthlyData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAnalytics };
