import React, { useState, useEffect } from "react";
import employees from "./employeeData"; // adjust path as needed

function AttendancePage({ onBack }) {
  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  // Local attendance state for dropdown changing
  // Keyed by employee _id: status
  const getAttendanceForDate = (selectedDate) => {
    const map = {};
    employees.forEach(emp => {
      const rec = emp.attendanceRecords.find(r => r.date === selectedDate);
      map[emp._id] = rec ? rec.status : "absent";
    });
    return map;
  };

  const [attendance, setAttendance] = useState(getAttendanceForDate(today));

  // Update attendance state when date changes
  useEffect(() => {
    setAttendance(getAttendanceForDate(date));
    // eslint-disable-next-line
  }, [date]);

const handleAttendanceChange = (empId, value) => {
  setAttendance(a => ({ ...a, [empId]: value }));

  // Find the full employee object
  const employee = employees.find(e => e._id === empId);

  // Save to backend
  fetch(`http://localhost:5000/api/attendance/${empId}/update-attendance`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, status: value })
  })
    .then(res => res.json())
    .then(resp => {
      // Optionally update UI or show a toast
      // You can also refetch employee list if you want to always show fresh DB state
    });
};

  return (
    <div>
      {onBack && <button onClick={onBack}>Back</button>}
      <h2>Employee Attendance on {date}</h2>
      <input
        type="date"
        value={date}
        max={today}
        onChange={e => setDate(e.target.value)}
        style={{ margin: "8px", fontSize: "16px" }}
      />
      <table border="1" cellPadding="8" style={{ background: "#fff", marginTop: 10, width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ color: "red", textAlign: "center" }}>
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.empID}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{date}</td>
                <td>
                  <select
                    value={attendance[emp._id] || "absent"}
                    onChange={e => handleAttendanceChange(emp._id, e.target.value)}
                    style={{ fontSize: "16px", minWidth: "115px" }}
                  >
                    <option value="absent">absent</option>
                    <option value="present">present</option>
                    <option value="half day">half day</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendancePage;