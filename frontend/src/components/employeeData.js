// src/components/employeeData.js

const employees = [
  {
    _id: "1",
    empID: "E001",
    name: "John Doe",
    email: "john@example.com",
    attendanceRecords: [
      { date: "2025-07-28", status: "present" },
      { date: "2025-07-27", status: "absent" },
      { date: "2025-07-26", status: "present" }
    ]
  },
  {
    _id: "2",
    empID: "E002",
    name: "Jane Smith",
    email: "jane@example.com",
    attendanceRecords: [
      { date: "2025-07-28", status: "absent" },
      { date: "2025-07-27", status: "present" },
      { date: "2025-07-26", status: "present" }
    ]
  },
  {
    _id: "3",
    empID: "E003",
    name: "Alan Walker",
    email: "alan@example.com",
    attendanceRecords: [
      { date: "2025-07-28", status: "present" },
      { date: "2025-07-27", status: "present" },
      { date: "2025-07-26", status: "absent" }
    ]
  }
];
export default employees;