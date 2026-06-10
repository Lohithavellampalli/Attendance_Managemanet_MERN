import React, { useState, useEffect } from "react";

function AttendancePage({ onBack }) {
  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://attendance-managemanet-mern.onrender.com/api/attendance/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

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
  }, [date, employees]);

   const filteredEmployees = employees.filter(emp => 
      emp.empID?.toLowerCase().includes(search.toLowerCase()) || emp.name?.toLowerCase().includes(search.toLowerCase()) || emp.email?.toLowerCase().includes(search.toLowerCase())
    );

const handleAttendanceChange = (empId, value) => {
  setAttendance(a => ({ ...a, [empId]: value }));

  // Find the full employee object
  const employee = employees.find(e => e._id === empId);

  // Save to backend
  fetch(`https://attendance-managemanet-mern.onrender.com/api/attendance/${empId}/update-attendance`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, status: value })
  })
    .then(res => res.json())
    .then(resp => {
      console.log("Attendance updated:", resp);

      // Optionally update UI or show a toast
      // You can also refetch employee list if you want to always show fresh DB state
    })
    .catch(err => {
      console.error("Failed to update attendance:", err);
    });

};

    return (
  <div
    style={{
      minHeight: "100vh",
      padding: "25px",
      background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
    }}
  >
    {onBack && (
      <button
        onClick={onBack}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>
    )}

    <h2
      style={{
        color: "#1e40af",
        fontSize: "32px",
        marginBottom: "20px",
        fontWeight: "bold",
      }}
    >
      📋 Employee Attendance
    </h2>

    <input
      type="text"
      placeholder="🔍 Search Employee..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        marginRight: "15px",
        padding: "12px",
        fontSize: "16px",
        width: "320px",
        borderRadius: "12px",
        border: "none",
        background: "#fff",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      }}
    />

    <input
      type="date"
      value={date}
      max={today}
      onChange={(e) => setDate(e.target.value)}
      style={{
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #cbd5e1",
      }}
    />

    <table
      style={{
        width: "100%",
        marginTop: "25px",
        borderCollapse: "collapse",
        background: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      }}
    >
      <thead
        style={{
          background: "#2563eb",
          color: "white",
        }}
      >
        <tr>
          <th style={thStyle}>ID</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Attendance</th>
        </tr>
      </thead>

      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              style={{
                color: "red",
                textAlign: "center",
                padding: "20px",
              }}
            >
              No employees found.
            </td>
          </tr>
        ) : (
          filteredEmployees.map((emp) => (
            <tr key={emp._id}>
              <td style={tdStyle}>{emp.empID}</td>
              <td style={tdStyle}>{emp.name}</td>
              <td style={tdStyle}>{emp.email}</td>
              <td style={tdStyle}>{date}</td>

              <td style={tdStyle}>
                <select
                  value={attendance[emp._id] || "absent"}
                  onChange={(e) =>
                    handleAttendanceChange(emp._id, e.target.value)
                  }
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    background: "#f8fafc",
                    cursor: "pointer",
                  }}
                >
                  <option value="present">present</option>
                  <option value="absent">absent</option>
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

//   return (
//     <div>
//       {onBack && <button onClick={onBack}>Back</button>}
//       <h2>Employee Attendance on {date}</h2>
//       <input 
//         type="text"
//         placeholder="Search Employees"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//         style={{
//           margin: "10px", 
//           padding: "12px", 
//           fontSize: "16px", 
//           width: "320px",
//           borderRadius: "10px",
//           border: "none",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
//         }}
//       />
//       <input
//         type="date"
//         value={date}
//         max={today}
//         onChange={e => setDate(e.target.value)}
//         style={{ margin: "8px", fontSize: "16px" }}
//       />
//       <table style={{ 
//         width: "100%",
//         borderCollapse: "collapse",
//         background: "#ffffff",
//         marginTop: 10,
//         borderRadius: "15px",
//         overflow: "hidden",
//         boxShadow: "0 5px 20px rgba(0,0,0,0.15)"
//         }}>
//         <thead 
//         style = {{
//           background: "#2563eb",
//           color: "white"
//         }}>
//           <tr>
//             <th style={thStyle}>ID</th>
//             <th style={thStyle}>Name</th>
//             <th style={thStyle}>Email</th>
//             <th style={thStyle}>Date</th>
//             <th style={thStyle}>Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.length === 0 ? (
//             <tr>
//               <td colSpan={5} style={{ color: "red", textAlign: "center" }}>
//                 No employees found.
//               </td>
//             </tr>
//           ) : (
//             filteredEmployees.map(emp => (
//               <tr key={emp._id}>
//                 <td style={tdStyle}>{emp.empID}</td>
//                 <td style={tdStyle}>{emp.name}</td>
//                 <td style={tdStyle}>{emp.email}</td>
//                 <td style={tdStyle}>{date}</td>
//                 <td style={tdStyle}>
//                   <select
//                     value={attendance[emp._id] || "absent"}
//                     onChange={e => handleAttendanceChange(emp._id, e.target.value)}
//                     style={{ fontSize: "16px", minWidth: "115px" }}
//                   >
//                     <option value="absent">absent</option>
//                     <option value="present">present</option>
//                     <option value="half day">half day</option>
//                   </select>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



const thStyle = {
  padding: "15px",
  textAlign: "left",
  fontSize: "16px"
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #e5e7eb"
};

export default AttendancePage;