// import { useState, useEffect } from "react";

// function ManageEmployeesPage({ onBack }) {
//   const [employees, setEmployees] = useState([]);

//   const [newEmployee, setNewEmployee] = useState({
//     id: "",
//     name: "",
//     email: "",
//   });

//   const [editID, setEditID] = useState(null);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = () => {
//     fetch("https://attendance-managemanet-mern.onrender.com/api/attendance/employees")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.log(err));
//   };

//   const addEmployee = async () => {
//     console.log("Edit ID:", editId);
//     if (editId) {
//       const response = await fetch(`https://attendance-managemanet-mern.onrender.com/api/attendance/employees/${editID}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",   
//     },
//     body: JSON.stringify({
//       empID: newEmployee.id,
//       name: newEmployee.name,
//       email: newEmployee.email,
//     }),
//   });

//       if (response.ok) {
//         alert("Employee Updated Successfully");
//         setEditID(null);
//         setNewEmployee({
//           id: "",
//           name: "",
//           email: "",
//         });
//         fetchEmployees(); // Refresh employee list
//         return;
//       }
      
//     }

//     try {
//       const response = await fetch(
//         "https://attendance-managemanet-mern.onrender.com/api/attendance/employee",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             empID: newEmployee.id,
//             name: newEmployee.name,
//             email: newEmployee.email,
//           }),
//         }
//       );

//       if (response.ok) {
//         alert("Employee Added Successfully");

//         setNewEmployee({
//           id: "",
//           name: "",
//           email: "",
//         });

//         fetchEmployees(); // Refresh employee list
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to add employee");
//     }
//   };

//   const editEmployee = (employee) => {
//     setEditID(employee._id);
//     setNewEmployee({
//       id: employee.empID,
//       name: employee.name,
//       email: employee.email,
//     });
//   };

//   const updateEmployee = async () => {
//     if (!newEmployee.id || !newEmployee.name || !newEmployee.email) {
//       alert("Fill all fields");
//       return;
//     }

//     try {
//       const response = await fetch(`https://attendance-managemanet-mern.onrender.com/api/attendance/employees/${editID}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           empID: newEmployee.id,
//           name: newEmployee.name,
//           email: newEmployee.email,
//         }),
//       });

//       if (response.ok) {
//         alert("Employee Updated Successfully");
//         setEditID(null);
//         setNewEmployee({
//           id: "",
//           name: "",
//           email: "",
//         });
//         fetchEmployees(); // Refresh employee list
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to update employee");
//     }
//   };

//   const deleteEmployee = async (id) => {
//     try {
//       const response = await fetch(`https://attendance-managemanet-mern.onrender.com/api/attendance/employees/${id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (data.success) {
//         setEmployees(
//           employees.filter((emp) => emp._id !== id)
//         );
//         alert("Employee Deleted Successfully");
//       } else {
//         alert("Failed to delete employee");
//       }
//     } catch (error) {
//         console.error(error);
//         alert("Failed to delete employee");
//       }
//     }

//   return (
//     <div style={{ padding: "20px" }}>
//       <button onClick={onBack}>Back</button>

//       <h2>Manage Employees</h2>

//       <input
//         placeholder="Employee ID"
//         value={newEmployee.id}
//         onChange={(e) =>
//           setNewEmployee({
//             ...newEmployee,
//             id: e.target.value,
//           })
//         }
//       />

//       <input
//         placeholder="Name"
//         value={newEmployee.name}
//         onChange={(e) =>
//           setNewEmployee({
//             ...newEmployee,
//             name: e.target.value,
//           })
//         }
//       />

//       <input
//         placeholder="Email"
//         value={newEmployee.email}
//         onChange={(e) =>
//           setNewEmployee({
//             ...newEmployee,
//             email: e.target.value,
//           })
//         }
//       />

//       <button onClick={addEmployee}>
//         Add Employee
//       </button>

//       <table border="1" style={{ marginTop: 20 }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp._id}>
//               <td>{emp.empID}</td>
//               <td>{emp.name}</td>
//               <td>{emp.email}</td>
//               <td>
//                 <button onClick={() => editEmployee(emp)}>
//                   Edit
//                 </button>
//               </td>
//               <td>
//                 <button
//                   onClick={() =>
//                     deleteEmployee(emp._id)
//                   }
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ManageEmployeesPage;



// import { useState, useEffect } from "react";

// function ManageEmployeesPage({ onBack }) {
//   const [employees, setEmployees] = useState([]);

//   const [newEmployee, setNewEmployee] = useState({
//     id: "",
//     name: "",
//     email: "",
//   });

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = () => {
//     fetch("https://attendance-managemanet-mern.onrender.com/api/attendance/employees")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data))
//       .catch((err) => console.log(err));
//   };

//   const addEmployee = async () => {
//     if (
//       !newEmployee.id ||
//       !newEmployee.name ||
//       !newEmployee.email
//     ) {
//       alert("Fill all fields");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://attendance-managemanet-mern.onrender.com/api/attendance/employee",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             empID: newEmployee.id,
//             name: newEmployee.name,
//             email: newEmployee.email,
//           }),
//         }
//       );

//       if (response.ok) {
//         alert("Employee Added Successfully");

//         setNewEmployee({
//           id: "",
//           name: "",
//           email: "",
//         });

//         fetchEmployees();
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to add employee");
//     }
//   };

//   const deleteEmployee = async (id) => {
//     try {
//       const response = await fetch(
//         `https://attendance-managemanet-mern.onrender.com/api/attendance/employees/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();

//       if (data.success) {
//         setEmployees(
//           employees.filter((emp) => emp._id !== id)
//         );

//         alert("Employee Deleted Successfully");
//       } else {
//         alert("Failed to delete employee");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete employee");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <button onClick={onBack}>Back</button>

//       <h2>Manage Employees</h2>

//       <input
//         placeholder="Employee ID"
//         value={newEmployee.id}
//         onChange={(e) =>
//           setNewEmployee({
//             ...newEmployee,
//             id: e.target.value,
//           })
//         }
//       />

//       <input
//         placeholder="Name"
//         value={newEmployee.name}
//         onChange={(e) =>
//           setNewEmployee({
//             ...newEmployee,
//             name: e.target.value,
//           })
//         }
//       />

//       <input
//         placeholder="Email"
//         value={newEmployee.email}
//         onChange={(e) =>
//           setNewEmployee({
//             ...newEmployee,
//             email: e.target.value,
//           })
//         }
//       />

//       <button onClick={addEmployee}>
//         Add Employee
//       </button>

//       <table border="1" style={{ marginTop: 20 }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp._id}>
//               <td>{emp.empID}</td>
//               <td>{emp.name}</td>
//               <td>{emp.email}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     deleteEmployee(emp._id)
//                   }
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ManageEmployeesPage;


import { useState, useEffect } from "react";

function ManageEmployeesPage({ onBack }) {
  const [employees, setEmployees] = useState([]);

  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch("https://attendance-managemanet-mern.onrender.com/api/attendance/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
  };

  const addEmployee = async () => {
    if (
      !newEmployee.id ||
      !newEmployee.name ||
      !newEmployee.email
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://attendance-managemanet-mern.onrender.com/api/attendance/employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            empID: newEmployee.id,
            name: newEmployee.name,
            email: newEmployee.email,
          }),
        }
      );

      if (response.ok) {
        alert("Employee Added Successfully");

        setNewEmployee({
          id: "",
          name: "",
          email: "",
        });

        fetchEmployees();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add employee");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(
        `https://attendance-managemanet-mern.onrender.com/api/attendance/employees/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setEmployees(
          employees.filter((emp) => emp._id !== id)
        );

        alert("Employee Deleted Successfully");
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "25px",
        background:
          "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
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
        👥 Manage Employees
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Employee ID"
          value={newEmployee.id}
          onChange={(e) =>
            setNewEmployee({
              ...newEmployee,
              id: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          placeholder="Employee Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({
              ...newEmployee,
              name: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          placeholder="Email Address"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({
              ...newEmployee,
              email: e.target.value,
            })
          }
          style={inputStyle}
        />

        <button
          onClick={addEmployee}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#22c55e",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Add Employee
        </button>
      </div>

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
            background: "#2563eb",
            color: "white",
          }}
        >
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td style={tdStyle}>{emp.empID}</td>
              <td style={tdStyle}>{emp.name}</td>
              <td style={tdStyle}>{emp.email}</td>

              <td style={tdStyle}>
                <button
                  onClick={() =>
                    deleteEmployee(emp._id)
                  }
                  style={{
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#ef4444",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  marginRight: "10px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #e5e7eb",
};

export default ManageEmployeesPage;