import React, { useState } from "react";
import employees from "./employeeData";

function AbsentEmployeesPage({ onBack }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);

  const absentEmployees = employees.filter(emp =>
    emp.attendanceRecords.some(
      rec => rec.date === date && rec.status === "absent"
    )
  );

  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h2>Absent Employees on {date}</h2>
      <input
        type="date"
        value={date}
        max={today}
        onChange={e => setDate(e.target.value)}
        style={{ margin: "10px 0", fontSize: "16px" }}
      />
      <table border="1" cellPadding="8" style={{ background: "#fff", marginTop: 12, width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {absentEmployees.length ? absentEmployees.map(emp =>
            <tr key={emp._id}>
              <td>{emp.empID}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={3} style={{ color: "red", textAlign: "center" }}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AbsentEmployeesPage;