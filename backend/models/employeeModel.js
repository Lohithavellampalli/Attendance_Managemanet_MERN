// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//   empID: { type: String},
//   name: { type: String, required: true },
//   email: { type: String, required: true },  // <-- ADD THIS LINE
//   attendance: {
//     type: String,
//     enum: ['absent', 'present', 'half day'],
//     default: 'absent'
//   }
// });

// const Employee = mongoose.model('Employee', employeeSchema);
// module.exports = Employee;


// src/models/employeeModel.js or backend/models/employeeModel.js

const mongoose = require('mongoose');

// // Schema for an attendance record (date + status for that date)
// const attendanceEntrySchema = new mongoose.Schema({
//   date: { type: String, required: true }, // e.g. "2025-07-28"
//   status: {
//     type: String,
//     required: true,
//     enum: ['present', 'absent', 'half day']
//   }
// }, { _id: false });

const employeeSchema = new mongoose.Schema({
  empID: { type: String, required: true },
  name:  { type: String, required: true },
  email: { type: String, required: true },
  attendanceRecords: [
    {
      date: String,
      status: {
        type: String,
        enum: ['present', 'absent', 'half day']
      }
    }
  ]
  // You may add more fields as needed
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;