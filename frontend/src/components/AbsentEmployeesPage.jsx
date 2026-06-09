// import React, { useState, useEffect } from "react";

// function AbsentEmployeesPage({ onBack }) {
//   const today = new Date().toISOString().slice(0, 10);
//   const [date, setDate] = useState(today);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/attendance/employees");
//         const data = await response.json();
//         setEmployees(data);
//       } catch (error) {
//         console.error("Failed to fetch employees:", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   console.log("Selected Date:", date);

//   employees.forEach(emp => {
//     emp.attendanceRecords.forEach(rec => {
//       console.log(`Employee: ${emp.name}, Date: ${rec.date}, Status: ${rec.status}`);
//     });

//   });

//   const absentEmployees = employees.filter(emp =>
//     emp.attendanceRecords.some(
//       rec => rec.date.slice(0,10) === date && rec.status === "absent"
//     )
//   );

//   console.log("Selected Date:", date);

//   employees.forEach(emp => {
//     console.log(emp.name, JSON.stringify(emp.attendanceRecords, null, 2));
//   });

//   console.log("Selected Date:", date);
//   console.log("All Employees:", employees);
//   console.log("Absent Employees:", absentEmployees);

//   return (
//     <div>
//       <button onClick={onBack}>Back</button>
//       <h2>Absent Employees on {date}</h2>
//       <input
//         type="date"
//         value={date}
//         max={today}
//         onChange={e => setDate(e.target.value)}
//         style={{ margin: "10px 0", fontSize: "16px" }}
//       />
//       <table border="1" cellPadding="8" style={{ background: "#fff", marginTop: 12, width: "100%" }}>
//         <thead>
//           <tr>
//             <th>ID</th><th>Name</th><th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {absentEmployees.length ? absentEmployees.map(emp =>
//             <tr key={emp._id}>
//               <td>{emp.empID}</td>
//               <td>{emp.name}</td>
//               <td>{emp.email}</td>
//             </tr>
//           ) : (
//             <tr>
//               <td colSpan={3} style={{ color: "red", textAlign: "center" }}>No employees found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AbsentEmployeesPage;








import React, { useState, useEffect } from "react";

function AbsentEmployeesPage({ onBack }) {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/attendance/employees"
        );
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const absentEmployees = employees.filter((emp) =>
    emp.attendanceRecords.some(
      (rec) =>
        rec.date.slice(0, 10) === date &&
        rec.status === "absent"
    )
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "25px",
        background:
          "linear-gradient(135deg, #fef2f2, #fee2e2)",
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#dc2626",
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
          color: "#b91c1c",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        ❌ Absent Employees on {date}
      </h2>

      <input
        type="date"
        value={date}
        max={today}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          background: "#ffffff",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <thead
          style={{
            background: "#dc2626",
            color: "white",
          }}
        >
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
          </tr>
        </thead>

        <tbody>
          {absentEmployees.length ? (
            absentEmployees.map((emp) => (
              <tr key={emp._id}>
                <td style={tdStyle}>{emp.empID}</td>
                <td style={tdStyle}>{emp.name}</td>
                <td style={tdStyle}>{emp.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                style={{
                  color: "#dc2626",
                  textAlign: "center",
                  padding: "20px",
                  fontWeight: "bold",
                }}
              >
                No Absent Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "15px",
  textAlign: "left",
  fontSize: "16px",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #e5e7eb",
};

export default AbsentEmployeesPage;