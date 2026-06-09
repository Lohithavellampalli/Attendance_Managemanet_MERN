// const Employee = require('../models/employeeModel');

// // Auto-seed employees if none exist (call in server.js!)
// async function seedEmployees() {
//   const count = await Employee.countDocuments();
//   if (count === 0) {
//     await Employee.insertMany([
//       { empID: 'E001', name: 'John Doe', email: 'john@example.com', attendance: 'absent' },
//       { empID: 'E002', name: 'Jane Smith', email: 'jane@example.com', attendance: 'absent' },
//       { empID: 'E003', name: 'Alan Walker', email: 'alan@example.com', attendance: 'absent' }
//     ]);
//     console.log('Dummy employees seeded.');
//   }else{
//     console.log('Employees already exist, skipping seed.');
//   }
// }
// exports.seedEmployees = seedEmployees;

// // GET: All employees
// exports.getEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch employees' });
//   }
// };

// // POST: Update attendances
// exports.updateAttendance = async (req, res) => {
//   try {
//     const updates = req.body; // array of employees {_id, attendance}
//     for (const emp of updates) {
//       await Employee.findByIdAndUpdate(emp._id, { attendance: emp.attendance });
//     }
//     res.json({ message: 'Attendance updated successfully.' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update attendance' });
//   }
// };



const Employee = require('../models/employeeModel');

// Seed dummy data (run once if collection is empty)
async function seedEmployees() {
  const count = await Employee.countDocuments();
  if (count === 0) {
    await Employee.insertMany([
      {
        empID: 'E001',
        name: 'John Doe',
        email: 'john@example.com',
        attendanceRecords: [
          { date: '2025-07-28', status: 'present' },
          { date: '2025-07-27', status: 'absent' },
          { date: '2025-07-26', status: 'present' }
        ]
      },
      {
        empID: 'E002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        attendanceRecords: [
          { date: '2025-07-28', status: 'absent' },
          { date: '2025-07-27', status: 'present' },
          { date: '2025-07-26', status: 'absent' }
        ]
      },
      {
        empID: 'E003',
        name: 'Alan Walker',
        email: 'alan@example.com',
        attendanceRecords: [
          { date: '2025-07-28', status: 'present' },
          { date: '2025-07-27', status: 'present' },
          { date: '2025-07-26', status: 'absent' }
        ]
      }
    ]);
    console.log('Dummy employees seeded.');
  }else{
    console.log('Employees already exist, skipping seed.');
  }
}
exports.seedEmployees = seedEmployees;

// GET /api/attendance/table?date=YYYY-MM-DD
// Returns [{empID, name, email, attendance: status on that date}]
exports.getAttendanceTable = async (req, res) => {
  try {
    const date = req.query.date;
    const employees = await Employee.find();
    const table = employees.map(emp => {
      const rec = emp.attendanceRecords.find(r => r.date === date);
      return {
        empID: emp.empID,
        name: emp.name,
        email: emp.email,
        attendance: rec ? rec.status : 'absent',
        date: date // or 'unknown'
      };
    });
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch table.' });
  }
};

// GET /api/attendance/present?date=YYYY-MM-DD
// GET /api/attendance/absent?date=YYYY-MM-DD
exports.getEmployeesByStatusForDate = async (req, res) => {
  try {
    const { date, status } = req.query;

    console.log("DATE:", date);
    console.log("STATUS:", status);

    const employees = await Employee.find({
      attendanceRecords: { $elemMatch: { date, status } }
    });

    console.log("ALL EMPLOYEES:", employees)

    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees.' });
  }
};


// Optionally add a way to update/add attendance for a date per employee here!

// In controllers/attendanceController.js
// exports.updateEmployeeAttendance = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { date, status } = req.body;
//     const emp = await Employee.findById(id);

//     if (!emp) return res.status(404).json({ error: 'Employee not found' });

//     // Check if this date already exists
//     const existingIndex = emp.attendanceRecords.findIndex(r => r.date === date);

//     if (existingIndex !== -1) {
//       emp.attendanceRecords[existingIndex].status = status;
//     } else {
//       emp.attendanceRecords.push({ date, status });
//     }
//     await emp.save();
//     res.json({ message: 'Attendance updated.', employee: emp });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update attendance.' });
//   }
// };

exports.updateEmployeeAttendance = async (req, res) => {
  try {
    console.log("PATCH HIT");
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);

    const { id } = req.params;
    const { date, status } = req.body;

    const emp = await Employee.findById(id);

    console.log("EMPLOYEE FOUND:", emp?.name);

    if (!emp) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const existingIndex = emp.attendanceRecords.findIndex(
      r => r.date === date
    );

    console.log("EXISTING INDEX:", existingIndex);

    if (existingIndex !== -1) {
      emp.attendanceRecords[existingIndex].status = status;
    } else {
      emp.attendanceRecords.push({ date, status });
    }

    await emp.save();

    console.log("SAVED SUCCESSFULLY");

    res.json({
      message: "Attendance updated",
      employee: emp
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update attendance" });
  }
};



exports.addEmployee = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { empID, name, email } = req.body;

    const employee = new Employee({
      empID,
      name,
      email,
      attendanceRecords: []
    });

    await employee.save();

    console.log("EMPLOYEE SAVED:", employee);

    res.status(201).json(employee);
  } catch (err) {
    console.log("ADD EMPLOYEE ERROR:", err);
    res.status(500).json({ error: "Failed to add employee" });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete employee" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { empID, name, email } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        empID,
        name,
        email,
      },
      { new: true }
    );

    res.json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};
