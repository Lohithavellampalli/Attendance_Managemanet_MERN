// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import { saveAs} from "file-saver";

// function MonthlyReportPage({ onBack }) {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/attendance/employees")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data));
//   }, []);

//   const downloadExcel = () => {
//   const reportData = employees.map((emp) => ({
//     EmployeeID: emp.empID,
//     Name: emp.name,
//     PresentDays:
//       emp.attendanceRecords?.filter(
//         (r) => r.status === "present"
//       ).length || 0,

//     AbsentDays:
//       emp.attendanceRecords?.filter(
//         (r) => r.status === "absent"
//       ).length || 0,

//     HalfDays:
//       emp.attendanceRecords?.filter(
//         (r) => r.status === "half day"
//       ).length || 0,
//   }));

//   const worksheet =
//     XLSX.utils.json_to_sheet(reportData);

//   const workbook =
//     XLSX.utils.book_new();

//   XLSX.utils.book_append_sheet(
//     workbook,
//     worksheet,
//     "Attendance Report"
//   );

//   const excelBuffer =
//     XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//   const fileData = new Blob(
//     [excelBuffer],
//     {
//       type:
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     }
//   );

//   saveAs(
//     fileData,
//     "Attendance_Report.xlsx"
//   );
// };

//   return (
//     <div style={{ padding: "20px" }}>
//       <button onClick={onBack}>Back</button>
//       <button onClick={downloadExcel}>Download Excel</button>

//       <h2>Monthly Attendance Report</h2>

//       <table border="1" cellPadding="8" style={{ width: "100%" }}>
//         <thead>
//           <tr>
//             <th>Employee ID</th>
//             <th>Name</th>
//             <th>Present Days</th>
//             <th>Absent Days</th>
//             <th>Half Days</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employees.map((emp) => {
//             const present =
//               emp.attendanceRecords?.filter(
//                 (r) => r.status === "present"
//               ).length || 0;

//             const absent =
//               emp.attendanceRecords?.filter(
//                 (r) => r.status === "absent"
//               ).length || 0;

//             const halfDay =
//               emp.attendanceRecords?.filter(
//                 (r) => r.status === "half day"
//               ).length || 0;

//             return (
//               <tr key={emp._id}>
//                 <td>{emp.empID}</td>
//                 <td>{emp.name}</td>
//                 <td>{present}</td>
//                 <td>{absent}</td>
//                 <td>{halfDay}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default MonthlyReportPage;



import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function MonthlyReportPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/attendance/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const downloadExcel = () => {
    const reportData = employees.map((emp) => ({
      EmployeeID: emp.empID,
      Name: emp.name,
      PresentDays:
        emp.attendanceRecords?.filter(
          (r) => r.status === "present"
        ).length || 0,

      AbsentDays:
        emp.attendanceRecords?.filter(
          (r) => r.status === "absent"
        ).length || 0,

      HalfDays:
        emp.attendanceRecords?.filter(
          (r) => r.status === "half day"
        ).length || 0,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(reportData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance Report"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      fileData,
      "Attendance_Report.xlsx"
    );
  };

  const totalEmployees = employees.length;

  const totalPresent = employees.reduce(
    (sum, emp) =>
      sum +
      (emp.attendanceRecords?.filter(
        (r) => r.status === "present"
      ).length || 0),
    0
  );

  const totalAbsent = employees.reduce(
    (sum, emp) =>
      sum +
      (emp.attendanceRecords?.filter(
        (r) => r.status === "absent"
      ).length || 0),
    0
  );

  const totalHalfDay = employees.reduce(
    (sum, emp) =>
      sum +
      (emp.attendanceRecords?.filter(
        (r) => r.status === "half day"
      ).length || 0),
    0
  );

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#eff6ff,#f8fafc)",
      }}
    >
      <h1
        style={{
          color: "#1e293b",
          marginBottom: "20px",
        }}
      >
        📊 Monthly Attendance Report
      </h1>

      <button
        onClick={downloadExcel}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        📥 Download Excel
      </button>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle("#3b82f6")}>
          <h2>{totalEmployees}</h2>
          <p>Total Employees</p>
        </div>

        <div style={cardStyle("#22c55e")}>
          <h2>{totalPresent}</h2>
          <p>Present Days</p>
        </div>

        <div style={cardStyle("#ef4444")}>
          <h2>{totalAbsent}</h2>
          <p>Absent Days</p>
        </div>

        <div style={cardStyle("#f59e0b")}>
          <h2>{totalHalfDay}</h2>
          <p>Half Days</p>
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <thead
          style={{
            background:
              "linear-gradient(90deg,#2563eb,#1d4ed8)",
            color: "white",
          }}
        >
          <tr>
            <th style={thStyle}>Employee ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Present</th>
            <th style={thStyle}>Absent</th>
            <th style={thStyle}>Half Day</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => {
            const present =
              emp.attendanceRecords?.filter(
                (r) => r.status === "present"
              ).length || 0;

            const absent =
              emp.attendanceRecords?.filter(
                (r) => r.status === "absent"
              ).length || 0;

            const halfDay =
              emp.attendanceRecords?.filter(
                (r) => r.status === "half day"
              ).length || 0;

            return (
              <tr key={emp._id}>
                <td style={tdStyle}>{emp.empID}</td>
                <td style={tdStyle}>{emp.name}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: "#dcfce7",
                      color: "#15803d",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {present}
                  </span>
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: "#fee2e2",
                      color: "#dc2626",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {absent}
                  </span>
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#d97706",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {halfDay}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const cardStyle = (color) => ({
  background: color,
  color: "white",
  padding: "20px",
  borderRadius: "15px",
  minWidth: "220px",
  textAlign: "center",
  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
});

const thStyle = {
  padding: "15px",
  textAlign: "left",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #e5e7eb",
};

export default MonthlyReportPage;