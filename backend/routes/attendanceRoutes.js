// const express = require('express');
// const router = express.Router();
// const attendanceController = require('../controllers/attendanceController');


// router.get('/', attendanceController.getEmployees);
// router.post('/update', attendanceController.updateAttendance);

// module.exports = router;


const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/table', attendanceController.getAttendanceTable);

router.get('/present', (req, res) =>
  attendanceController.getEmployeesByStatusForDate({ ...req, query: { ...req.query, status: 'present' } }, res)
);

router.get('/absent', (req, res) =>
  attendanceController.getEmployeesByStatusForDate({ ...req, query: { ...req.query, status: 'absent' } }, res)
);

// In routes/attendanceRoutes.js
router.patch('/:id/update-attendance', attendanceController.updateEmployeeAttendance);

router.post('/employee', attendanceController.addEmployee);

router.get('/employees', attendanceController.getAllEmployees);

router.delete('/employees/:id', attendanceController.deleteEmployee);

router.get('/halfday', (req, res) =>
  attendanceController.getEmployeesByStatusForDate({ ...req, query: { ...req.query, status: 'half day' } }, res)
);

router.put('/employees/:id', attendanceController.updateEmployee);

module.exports = router;