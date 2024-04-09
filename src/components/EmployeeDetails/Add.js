// import React, { useState } from 'react';
// import Swal from 'sweetalert2';

// const Add = ({ employees, setEmployees, setIsAdding }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [salary, setSalary] = useState('');
//   const [date, setDate] = useState('');

//   const handleAdd = e => {
//     e.preventDefault();

//     if (!firstName || !lastName || !email || !salary || !date) {
//       return Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'All fields are required.',
//         showConfirmButton: true,
//       });
//     }

//     const id = employees.length + 1;
//     const newEmployee = {
//       id,
//       firstName,
//       lastName,
//       email,
//       salary,
//       date,
//     };

//     employees.push(newEmployee);
//     localStorage.setItem('employees_data', JSON.stringify(employees));
//     setEmployees(employees);
//     setIsAdding(false);

//     Swal.fire({
//       icon: 'success',
//       title: 'Added!',
//       text: `${firstName} ${lastName}'s data has been Added.`,
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };

//   return (
//     <div className="small-container">
//       <form onSubmit={handleAdd}>
//         <h1>Add Employee</h1>
//         <label htmlFor="firstName">First Name</label>
//         <input
//           id="firstName"
//           type="text"
//           name="firstName"
//           value={firstName}
//           onChange={e => setFirstName(e.target.value)}
//         />
//         <label htmlFor="lastName">Last Name</label>
//         <input
//           id="lastName"
//           type="text"
//           name="lastName"
//           value={lastName}
//           onChange={e => setLastName(e.target.value)}
//         />
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           name="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//         />
//         <label htmlFor="salary">Salary ($)</label>
//         <input
//           id="salary"
//           type="number"
//           name="salary"
//           value={salary}
//           onChange={e => setSalary(e.target.value)}
//         />
//         <label htmlFor="date">Date</label>
//         <input
//           id="date"
//           type="date"
//           name="date"
//           value={date}
//           onChange={e => setDate(e.target.value)}
//         />
//         <div style={{ marginTop: '30px' }}>
//           <input type="submit" value="Add" />
//           <input
//             style={{ marginLeft: '12px' }}
//             className="muted-button"
//             type="button"
//             value="Cancel"
//             onClick={() => setIsAdding(false)}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Add;

import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import config from "../../config.json";
const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [projectName, setProjectName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [venue, setVenue] = useState("");
  const [email,setEmail]=useState('')
  const [plantCode, setPlantCode] = useState("");
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState(""); // Added fromTime state
  const [toTime, setToTime] = useState(""); // Added toTime state
  

  const handleAdd = (e) => {
    e.preventDefault();

    if (
      !projectName ||
      !trainerName ||
      !venue ||
      !plantCode ||
      !date ||
      !fromTime ||
      !toTime
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      projectName,
      trainerName,
      venue,
      plantCode,
      date,
      fromTime,
      toTime,
    };
    // let res = axios.post(`${config.url}/training`, newEmployee);
    const updatedEmployees = [...employees, newEmployee];
    localStorage.setItem("employees_data", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${projectName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <div></div>
      <div className="container m-5 p-5">
        <form onSubmit={handleAdd}>
          <h2>Add Employee </h2>
          <div className="bg-white p-5 rounded-4 border">
            <div className="d-flex gap-2 my-3">
              <div className="col">
                <label className="label" htmlFor="projectName">
                  Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  name="projectName"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  className="login-input"
                />
              </div>
              <div className="col">
                <label className="label" htmlFor="trainerName">
                  Designation
                </label>
                <input
                   id="trainerName"
                   type="text"
                   name="trainerName"
                   value={trainerName}
                   onChange={e => setTrainerName(e.target.value)}
                  className="login-input"
                />
              </div>
              {/* <div className="col">
                <label htmlFor="venue" className="label">
                  Venue
                </label>
                <input
                  id="venue"
                  type="text"
                  name="venue"
                  value={venue}
                  onChange={e => setVenue(e.target.value)}
                  className="login-input"
                />
              </div> */}
              <div className="col">
                <label htmlFor="venue" className="label">
                  Emp Email
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={e => setVenue(e.target.email)}
                  className="login-input"
                />
              </div>
              <div className="col">
                <label htmlFor="plantCode" className="label">Emp Id</label>
                <input
                  id="plantCode"
                  type="number"
                  name="plantCode"
                  value={plantCode}
                  onChange={e => setPlantCode(e.target.value)}
                  className="login-input"
                />
              </div>
            </div>
            {/* <div className="d-flex gap-2 my-2">
              <div className="col">
              <label htmlFor="date" className="label">Date</label>
              <input
                 id="date"
                 type="date"
                 name="date"
                 value={date}
                 onChange={e => setDate(e.target.value)}
                className="date-picker"
              />
              </div>
              <div className="col">
              <label htmlFor="fromTime" className="label">From Time:</label>
              <input
                id="fromTime"
                type="time"
                value={fromTime}
                onChange={e => setFromTime(e.target.value)}
                className="date-picker"
              />
              </div>
              <div className="col">
              <label htmlFor="toTime" className="label">To Time:</label>
              <input
                id="toTime"
                type="time"
                value={toTime}
                onChange={e => setToTime(e.target.value)}
                className="date-picker"
              />
              </div>
              </div> */}

              <div className="d-flex justify-content-between mt-5">
              <div className="">
                <input
                  className="btn-schedule"
                  type="button"
                  value="Cancel"
                  onClick={() => setIsAdding(false)}
                />
              </div>
              <div className="">
                <input type="submit" value="Add" className="btn-login"/>
                </div>
                
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
