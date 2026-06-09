// import React, { useState } from "react";
// import AttendancePage from "./components/AttendancePage";

// function App() {
//   const [showAttendance, setShowAttendance] = useState(false);

//   return (
//     <div>
//       {!showAttendance ? (
//         <div style={{
//           display: "flex", alignItems: "center", justifyContent: "center",
//           height: "100vh"
//         }}>
//           <button
//             onClick={() => setShowAttendance(true)}
//             style={{ fontSize: "22px", padding: "16px 40px", cursor: "pointer" }}
//           >
//             Employee Attendance
//           </button>
//         </div>
//       ) : (
//         <AttendancePage />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import AttendancePage from "./components/AttendancePage";
import PresentEmployeesPage from "./components/PresentEmployeesPage";
import AbsentEmployeesPage from "./components/AbsentEmployeesPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ManageEmployeesPage from "./components/ManageEmployeesPage";
import HalfDayEmployeesPage from "./components/HalfDayEmployeesPage";
import MonthlyReportPage from "./components/MonthlyReportPage";
import Sidebar from "./components/Sidebar";

function App() {
  const [view, setView] = useState("login");
  const [showReport, setShowReport] = useState(false);

  return (
  <div>

    {view === "login" && (
      <LoginPage onLogin={() => setView("main")} />
    )}

    {view !== "login" && (
      <div style={{ display: "flex" }}>

        <Sidebar setView={setView} />

        <div style={{ flex: 1, padding: "20px" }}>

          {view === "main" && (
            <Dashboard onLogout={() => setView("login")} />
          )}

          {view === "attendance" && (
            <AttendancePage />
          )}

          {view === "present" && (
            <PresentEmployeesPage />
          )}

          {view === "absent" && (
            <AbsentEmployeesPage />
          )}

          {view === "employees" && (
            <ManageEmployeesPage />
          )}

          {view === "halfday" && (
            <HalfDayEmployeesPage />
          )}

          {view === "monthlyReport" && (
            <MonthlyReportPage />
          )}

        </div>

      </div>
    )}

  </div>
);
}
export default App;
