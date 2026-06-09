// import { useState } from "react";

// function LoginPage({onLogin}) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (username === "admin" && password === "admin123") {
//       onLogin();
//     } else {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Admin Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <br />
//         <br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <br />
//         <br />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;


import { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a, #1e3a8a, #2563eb)",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(15px)",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.4)",
          textAlign: "center",
          color: "white",
          transform: "perspective(1000px) rotateX(5deg)",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "15px",
          }}
        >
          📊
        </div>

        <h1
          style={{
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          Attendance Pro
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "30px",
          }}
        >
          Admin Login Portal
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#3b82f6,#06b6d4)",
              color: "white",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow:
                "0 15px 30px rgba(59,130,246,0.5)",
            }}
          >
            🚀 Login
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            color: "#cbd5e1",
            fontSize: "14px",
          }}
        >
          Employee Attendance Management System
        </p>
      </div>
    </div>
  );
}

export default LoginPage;