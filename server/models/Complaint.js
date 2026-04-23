const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  message: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  statusChange: { type: String, enum: ['Pending', 'In Progress', 'Resolved', ''], default: '' }
}, { timestamps: true });

const complaintSchema = new mongoose.Schema({
  complaintId: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null
  },
  assignedOfficer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  dueDate: {
    type: Date,
    default: null
  },
  updates: [updateSchema]
}, { timestamps: true });

complaintSchema.pre('save', function (next) {
  if (!this.complaintId) {

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.complaintId = `CMP-${randomNum}`;
  }
  if (!this.dueDate) {

    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    this.dueDate = new Date(Date.now() + sevenDays);
  }
  next();
});

module.exports = mongoose.model('Complaint', complaintSchema);
