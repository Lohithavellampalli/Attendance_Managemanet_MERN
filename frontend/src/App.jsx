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

function App() {
  const [view, setView] = useState("main");

  return (
    <div>
      {view === "main" && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", height: "100vh"
        }}>
          <button style={{ fontSize: 22, margin: 10 }} onClick={() => setView("attendance")}>Employee Attendance</button>
          <button style={{ fontSize: 22, margin: 10 }} onClick={() => setView("present")}>Employee Present</button>
          <button style={{ fontSize: 22, margin: 10 }} onClick={() => setView("absent")}>Employee Absent</button>
        </div>
      )}
      {view === "attendance" && <AttendancePage onBack={() => setView("main")} />}
      {view === "present" && <PresentEmployeesPage onBack={() => setView("main")} />}
      {view === "absent" && <AbsentEmployeesPage onBack={() => setView("main")} />}
    </div>
  );
}
export default App;
