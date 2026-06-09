import {
  FaChartBar,
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaFileAlt,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar({ setView }) {
  return (
    <div
      style={{
        width: "250px",
        background: "linear-gradient(180deg, #0f172a, #1e3a8a)",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        boxShadow: "5px 0 20px rgba(0,0,0,0.3)",
      }}
    >
      <h2>📊 Attendance Pro</h2>

      <p onClick={() => setView("main")} style={{ cursor: "pointer" }}>
         Dashboard
      </p>

      <p onClick={() => setView("attendance")} style={{ cursor: "pointer" }}>
        Employees Attendance
      </p>

      <p onClick={() => setView("present")} style={{ cursor: "pointer" }}>
        Present Employees
      </p>

      <p onClick={() => setView("absent")} style={{ cursor: "pointer" }}>
        Absent Employees
      </p>

      <p onClick={() => setView("halfday")} style={{ cursor: "pointer" }}>
        Half Day Employees
      </p>

      <p onClick={() => setView("employees")} style={{ cursor: "pointer" }}>
        Manage Employees
      </p>

      <p onClick={() => setView("monthlyReport")} style={{ cursor: "pointer" }}>
        Employee Reports
      </p>

      <p onClick={() => setView("login")} style={{ cursor: "pointer" }}>
        Logout
      </p>
    </div>
  );
}

const menuItem = {
  padding: "15px",
  marginTop: "10px",
  cursor: "pointer",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  borderRadius: "8px",
};

export default Sidebar;