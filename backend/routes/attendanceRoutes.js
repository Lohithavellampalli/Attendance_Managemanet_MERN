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

// If you want:
// router.get('/halfday', ...);

module.exports = router;