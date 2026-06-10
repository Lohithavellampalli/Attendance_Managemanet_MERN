// import { useState, useEffect } from "react";

// function HalfDayEmployeesPage({ onBack }) {
//   const today = new Date().toISOString().slice(0, 10);

//   const [date, setDate] = useState(today);
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     fetch(
//       `https://attendance-managemanet-mern.onrender.com/api/attendance/halfday?date=${date}`
//     )
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.log(err));
//   }, [date]);

//   return (
//     <div>
//       <button onClick={onBack}>Back</button>

//       <h2>Half Day Employees on {date}</h2>

//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employees.length > 0 ? (
//             employees.map((emp) => (
//               <tr key={emp._id}>
//                 <td>{emp.empID}</td>
//                 <td>{emp.name}</td>
//                 <td>{emp.email}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">
//                 No Half Day Employees Found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default HalfDayEmployeesPage;









import { useState, useEffect } from "react";

function HalfDayEmployeesPage({ onBack }) {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(
      `https://attendance-managemanet-mern.onrender.com/api/attendance/halfday?date=${date}`
    )
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
  }, [date]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "25px",
        background:
          "linear-gradient(135deg, #fff7ed, #ffedd5)",
      }}
    >
      <h2
        style={{
          color: "#ea580c",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        🟠 Half Day Employees on {date}
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
            background: "#f97316",
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
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td style={tdStyle}>{emp.empID}</td>
                <td style={tdStyle}>{emp.name}</td>
                <td style={tdStyle}>{emp.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#ea580c",
                  fontWeight: "bold",
                }}
              >
                No Half Day Employees Found
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

export default HalfDayEmployeesPage;