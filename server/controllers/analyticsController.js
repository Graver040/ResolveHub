const Complaint = require('../models/Complaint');
const Department = require('../models/Department');
const User = require('../models/User');

// @desc    Get dashboard analytics
// @route   GET /api/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    
    const allDepartments = await Department.find();

    // Calculate per-department metrics first
    const deptStats = await Promise.all(allDepartments.map(async (dept) => {
      const [totalCount, resolvedCount, officerCount] = await Promise.all([
        Complaint.countDocuments({ department: dept._id }),
        Complaint.countDocuments({ department: dept._id, status: 'Resolved' }),
        User.countDocuments({ department: dept._id, role: { $in: ['officer', 'admin'] } })
      ]);
      
      const rate = totalCount > 0 ? ((resolvedCount / totalCount) * 100).toFixed(1) : 0;
      return {
        _id: dept._id,
        name: dept.name,
        totalCases: totalCount,
        resolvedCases: resolvedCount,
        officerCount: officerCount,
        resolutionRate: parseFloat(rate)
      };
    }));

    // Derive Most Active and Best Performer
    let mostActiveDept = 'N/A';
    let bestPerformer = { name: 'N/A', rate: 0 };
    
    if (deptStats && deptStats.length > 0) {
      // Most Active (by total cases)
      const maxCases = deptStats.reduce((prev, current) => (prev.totalCases > current.totalCases) ? prev : current);
      mostActiveDept = maxCases.totalCases > 0 ? maxCases.name : 'N/A';
      
      // Best Performer (by resolution rate)
      const maxRate = deptStats.reduce((prev, current) => (prev.resolutionRate > current.resolutionRate) ? prev : current);
      if (maxRate.totalCases > 0) {
        bestPerformer = { name: maxRate.name, rate: maxRate.resolutionRate };
      }
    }

    // Status distribution for Pie Chart
    const statusDistribution = [
      { name: 'Pending', value: pendingComplaints },
      { name: 'In Progress', value: inProgressComplaints },
      { name: 'Resolved', value: resolvedComplaints }
    ];

    // Complaints per category (Real categories from the form)
    const categoryDistributionRaw = await Complaint.aggregate([
      { $group: { _id: '$category', value: { $sum: 1 } } }
    ]);
    const categoryDistribution = categoryDistributionRaw.map(item => ({
      name: item._id || 'Uncategorized',
      value: item.value
    }));

    // Complaints today
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);
    const complaintsToday = await Complaint.countDocuments({ createdAt: { $gte: startOfDay } });

    // Resolution Rate
    const resolutionRate = totalComplaints > 0 ? ((resolvedComplaints / totalComplaints) * 100).toFixed(1) : 0;

    // Calculate Average Response Time
    const complaintsWithUpdates = await Complaint.find({ "updates.0": { $exists: true } }).select('createdAt updates');
    let totalResponseTime = 0;
    let count = 0;

    complaintsWithUpdates.forEach(complaint => {
      const firstUpdate = complaint.updates.find(u => u.statusChange && u.statusChange !== '');
      if (firstUpdate) {
        const diff = firstUpdate.createdAt - complaint.createdAt; // in ms
        totalResponseTime += diff;
        count++;
      }
    });

    const avgResponseTimeHours = count > 0 ? (totalResponseTime / (count * 3600000)).toFixed(1) : null;
    const avgResponseTimeStr = avgResponseTimeHours ? `${avgResponseTimeHours}h` : 'N/A';

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
          complaints: { $sum: 1 },
          resolved: {
            $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] }
          }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = monthlyRaw.map(m => ({
      name: monthNames[m._id - 1],
      complaints: m.complaints,
      resolved: m.resolved
    }));

    const recentComplaints = await Complaint.find()
      .populate('department', 'name')
      .populate('citizen', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    // Assigned today
    const assignedToday = await Complaint.countDocuments({ 
      assignedOfficer: { $ne: null }, 
      updatedAt: { $gte: startOfDay } 
    });

    // Total Staff Count
    const totalStaffCount = await User.countDocuments({ role: { $in: ['officer', 'admin'] } });
    const activeComplaintsCount = await Complaint.countDocuments({ status: { $ne: 'Resolved' } });

    res.json({
      overview: {
        total: totalComplaints,
        pending: pendingComplaints,
        inProgress: inProgressComplaints,
        resolved: resolvedComplaints,
        complaintsToday,
        assignedToday,
        totalStaffCount,
        activeComplaintsCount,
        bestPerformer,
        mostActiveDept,
        resolutionRate,
        avgResponseTime: avgResponseTimeStr,
        satisfactionScore: 'N/A' 
      },
      statusDistribution,
      categoryDistribution,
      complaintsPerDept: deptStats,
      monthlyComplaints: monthlyData,
      recentComplaints
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get public stats for landing page (no auth required)
// @route   GET /api/analytics/public
// @access  Public
const getPublicStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const resolutionRate = totalComplaints > 0 ? ((resolvedComplaints / totalComplaints) * 100).toFixed(1) : 0;

    // Average Response Time
    const complaintsWithUpdates = await Complaint.find({ "updates.0": { $exists: true } }).select('createdAt updates');
    let totalResponseTime = 0;
    let count = 0;

    complaintsWithUpdates.forEach(complaint => {
      const firstUpdate = complaint.updates.find(u => u.statusChange && u.statusChange !== '');
      if (firstUpdate) {
        const diff = firstUpdate.createdAt - complaint.createdAt;
        totalResponseTime += diff;
        count++;
      }
    });

    const avgResponseTimeHours = count > 0 ? (totalResponseTime / (count * 3600000)).toFixed(1) : null;
    const avgResponseTimeStr = avgResponseTimeHours ? `${avgResponseTimeHours}h` : 'N/A';

    // Category distribution
    const categoryDistributionRaw = await Complaint.aggregate([
      { $group: { _id: '$category', value: { $sum: 1 } } }
    ]);
    const categoryDistribution = categoryDistributionRaw.map(item => ({
      name: item._id || 'Uncategorized',
      value: item.value
    }));

    res.json({
      overview: {
        total: totalComplaints,
        resolved: resolvedComplaints,
        resolutionRate,
        avgResponseTime: avgResponseTimeStr
      },
      categoryDistribution
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAnalytics, getPublicStats };
