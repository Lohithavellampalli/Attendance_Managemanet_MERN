// import { useState, useEffect } from "react";
// import AttendanceChart from "./AttendanceChart";
// import Sidebar from "./Sidebar";

// function Dashboard({onLogout}) {
//   const [totalEmployees, setTotalEmployees] = useState(0);
//   const [presentToday, setPresentToday] = useState(0);
//   const [halfDayToday, setHalfDayToday] = useState(0);

//   useEffect(() => {
//     fetch("https://attendance-managemanet-mern.onrender.com/api/attendance/employees")
//       .then((res) => res.json())
//       .then((data) => {
//         setTotalEmployees(data.length);

//         const today = new Date().toISOString().slice(0, 10);

//         let presentCount = 0;
//         let halfDayCount = 0;

//         data.forEach((emp) => {
//           const record = emp.attendanceRecords?.find(
//             (r) => r.date === today
//           );

//           if (record) {
//             if (record.status === "present") {
//               presentCount++;
//             }

//             if (record.status === "half day") {
//               halfDayCount++;
//             }
//           }
//         });

//         setPresentToday(presentCount);
//         setHalfDayToday(halfDayCount);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const absentToday =
//     totalEmployees - presentToday - halfDayToday;

//   const attendanceRate =
//     totalEmployees > 0
//       ? (
//           ((presentToday + halfDayToday * 0.5) /
//             totalEmployees) *
//           100
//         ).toFixed(1)
//       : 0;

//   return (
//     <div style={{ padding: "20px",
//       background: "#f1f5f9",
//       minHeight: "100vh",
//      }}>

//       <button onClick={onLogout} style={{ float: "right", fontSize: "16px", padding: "10px 20px", cursor: "pointer" }}>
//         Logout
//       </button>

//       <h1 style={{ textAlign: "center",
//         color: "#1e293b",
//         fontSize: "38px",
//         fontWeight: "bold",
//        }}>
//         📊 Employee Attendance Dashboard
//       </h1>

//       <h3 style={{ color: "#64748b", textAlign: "center" }}>
//         Welcome, Admin 👋
//       </h3>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-around",
//           marginTop: "30px",
//           flexWrap: "wrap",
//         }}
//       >
//         <div style={{ ...cardStyle, background: "linear-gradient(135deg, #2563eb, #60a5fa)" }}>
//           <h2>{totalEmployees}</h2>
//           <p>Total Employees</p>
//         </div>

//         <div style={{ ...cardStyle, background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
//           <h2>{presentToday}</h2>
//           <p>Present Today</p>
//         </div>

//         <div style={{ ...cardStyle, background: "linear-gradient(135deg, #f59e0b, #fcd34d)" }}>
//           <h2>{halfDayToday}</h2>
//           <p>Half Day Today</p>
//         </div>

//         <div style={{ ...cardStyle, background: "linear-gradient(135deg, #dc2626, #f87171)" }}>
//           <h2>{absentToday}</h2>
//           <p>Absent Today</p>
//         </div>

//         <AttendanceChart
//       present={presentToday}
//       absent={absentToday}
//       halfDay={halfDayToday}
//     />

//         <div style={{ ...cardStyle, background: "linear-gradient(135deg, #7c3aed, #c084fc)" }}>
//           <h2>{attendanceRate}%</h2>
//           <p>Attendance Rate</p>
//         </div>
//       </div>
//       <div style={{
//         padding: "20px",
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
//       }}></div>
//     </div>
    
//   );
// }

// const cardStyle = {
//   width: "220px",
//   padding: "20px",
//   margin: "10px",
//   borderRadius: "15px",
//   boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
//   textAlign: "center",
//   color: "#ffffff",
//   fontWeight: "bold",
//   boxShadow: "20px 20px 60px rgba(0,0,0,0.25), -10px -10px 30px  inset 0 2px 5px rgba(255, 255, 255, 0.3)",
//   transition: "0.3s",
//   cursor: "pointer",
// };

// export default Dashboard;


import { useState, useEffect } from "react";
import AttendanceChart from "./AttendanceChart";

function Dashboard({ onLogout }) {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [halfDayToday, setHalfDayToday] = useState(0);

  useEffect(() => {
    fetch("https://attendance-managemanet-mern.onrender.com/api/attendance/employees")
      .then((res) => res.json())
      .then((data) => {
        setTotalEmployees(data.length);

        const today = new Date().toISOString().slice(0, 10);

        let presentCount = 0;
        let halfDayCount = 0;

        data.forEach((emp) => {
          const record = emp.attendanceRecords?.find(
            (r) => r.date === today
          );

          if (record) {
            if (record.status === "present") presentCount++;
            if (record.status === "half day") halfDayCount++;
          }
        });

        setPresentToday(presentCount);
        setHalfDayToday(halfDayCount);
      })
      .catch((err) => console.log(err));
  }, []);

  const absentToday =
    totalEmployees - presentToday - halfDayToday;

  const attendanceRate =
    totalEmployees > 0
      ? (
          ((presentToday + halfDayToday * 0.5) /
            totalEmployees) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
      }}
    >
      <button
        onClick={onLogout}
        style={{
          float: "right",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#ef4444",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>

      <h1
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "42px",
          marginBottom: "10px",
        }}
      >
        📊 Employee Attendance Dashboard
      </h1>

      <h3
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "40px",
        }}
      >
        Welcome, Admin 👋
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg,#3b82f6,#60a5fa)",
          }}
        >
          <h2>{totalEmployees}</h2>
          <p>Total Employees</p>
        </div>

        <div
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg,#10b981,#34d399)",
          }}
        >
          <h2>{presentToday}</h2>
          <p>Present Today</p>
        </div>

        <div
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg,#f59e0b,#fbbf24)",
          }}
        >
          <h2>{halfDayToday}</h2>
          <p>Half Day Today</p>
        </div>

        <div
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg,#ef4444,#f87171)",
          }}
        >
          <h2>{absentToday}</h2>
          <p>Absent Today</p>
        </div>

        <div
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg,#8b5cf6,#a78bfa)",
          }}
        >
          <h2>{attendanceRate}%</h2>
          <p>Attendance Rate</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "25px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <AttendanceChart
          present={presentToday}
          absent={absentToday}
          halfDay={halfDayToday}
        />
      </div>
    </div>
  );
}

const cardStyle = {
  width: "220px",
  padding: "25px",
  borderRadius: "20px",
  textAlign: "center",
  color: "white",
  fontWeight: "bold",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  cursor: "pointer",
  transition: "0.3s ease",
};

export default Dashboard;