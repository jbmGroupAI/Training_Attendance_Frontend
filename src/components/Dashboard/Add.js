// import config from "../../config.json";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Select from "react-select";

// const Add = ({ employees, setEmployees, setIsAdding }) => {
//   const [projectName, setProjectName] = useState("");
//   const [trainerName, setTrainerName] = useState("");
//   const [venue, setVenue] = useState("");
//   const [plantName, setPlantName] = useState("");
//   const [plantId, setPlantId] = useState("");
//   const [empCodes, setEmpCodes] = useState([]);
//   const [plantOptions, setPlantOptions] = useState([]);
//   const [plantIds, setPlantIds] = useState([]);
//   const [employeeCodes, setEmployeeCodes] = useState([]);
//   const [date, setDate] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toTime, setToTime] = useState("");
//   const [plantCode, setPlantCode] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   useEffect(() => {
//     axios.get(`http://fr.thirdeye-ai.com/face/groups/getinfo?groupType=frAttendance&companyId=JBMGroup`)
//       .then(response => {
//         const { data } = response;
//         setPlantOptions(data);
//       })
//       .catch(error => {
//         console.error('Error fetching plant data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (plantName) {
//       const selectedPlant = plantOptions.find(plant => plant.groupName === plantName);
//       if (selectedPlant) {
//         const filteredIds = selectedPlant.groupMembers.filter(id => id !== "");
//         setPlantIds(filteredIds);
//       }
//     } else {
//       setPlantIds([]);
//     }
//   }, [plantName, plantOptions]);

//   useEffect(() => {
//     if (plantId) {
//       axios.get(`http://jbmgroup.fr.thirdeye-ai.com/face/getEmpInfo?companyId=JBMGroup&plantId=${plantId}`)
//         .then(response => {
//           const { data } = response;
//           setEmployeeCodes(data);
//         })
//         .catch(error => {
//           console.error('Error fetching employee data:', error);
//         });
//     } else {
//       setEmployeeCodes([]);
//     }
//   }, [plantId]);

  
//   const handleEmpCodeChange = (selectedOptions) => {
//     const selectedValues = selectedOptions.map(option => option);
//     setEmpCodes(selectedValues);
    
//     // If only one option is selected, update the selected employee name
//     if (selectedOptions.length === 1) {
//       const selectedEmployeeData = employeeCodes.employeeInfo.find(emp => emp.empOnlyId === selectedOptions[0].value);
//       setSelectedEmployee(selectedEmployeeData ? `${selectedEmployeeData.empFName} - ${selectedOptions[0].value}` : null);
//     } else {
//       setSelectedEmployee(null);
//     }
//   };
  
//   const handleAdd = (e) => {
//   e.preventDefault();

//   if (empCodes.length === 0 || !projectName || !trainerName || !venue || !plantName || !plantId || !date || !fromTime || !toTime || !plantCode) {
//     return Swal.fire({
//       icon: "error",
//       title: "Error!",
//       text: "All fields are required.",
//       showConfirmButton: true,
//     });
//   }

//   // Map selected employee codes to include both code and name
//   // const selectedEmpData = empCodes.map(code => {
//   //   const [empName, empCode] = code.label.split(' - '); // Split name and code
//   //   return { empName, empCode };
//   // });

//   const selectedEmpData = empCodes.map(code => {
//     return code.label;
//   });

//   const id = employees.length + 1;
//   const newEmployee = {
//     id,
//     projectName,
//     trainerName,
//     venue,
//     plantName,
//     plantId,
//     empCodes: selectedEmpData, // Save both name and code
//     date,
//     fromTime,
//     toTime,
//     plantCode,
//   };
//   axios.post(`${config.url}/training`, newEmployee)
//     .then(() => {
//       const updatedEmployees = [...employees, newEmployee];
//       localStorage.setItem("employees_data", JSON.stringify(updatedEmployees));
//       setEmployees(updatedEmployees);
//       setIsAdding(false);

//       Swal.fire({
//         icon: "success",
//         title: "Added!",
//         text: `${projectName}'s data has been Added.`,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     })
//     .catch(error => {
//       console.error('Error adding new employee:', error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to add new employee.",
//         showConfirmButton: true,
//       });
//     });
// };


//   return (
//     <div className="container m-5 p-5">
//       <form onSubmit={handleAdd}>
//         <h2>Add Training</h2>
//         <div className="bg-white p-5 rounded-4 border">
//           <div className="d-flex gap-2 my-3">
//             <div className="col">
//               <label className="label" htmlFor="projectName">
//                 Title
//               </label>
//               <input
//                 id="projectName"
//                 type="text"
//                 name="projectName"
//                 value={projectName}
//                 onChange={e => setProjectName(e.target.value)}
//                 className="login-input"
//               />
//             </div>
//             <div className="col">
//               <label className="label" htmlFor="trainerName">
//                 Faculty Name
//               </label>
//               <input
//                 id="trainerName"
//                 type="text"
//                 name="trainerName"
//                 value={trainerName}
//                 onChange={e => setTrainerName(e.target.value)}
//                 className="login-input"
//               />
//             </div>
//             <div className="col">
//               <label htmlFor="venue" className="label">
//                 Venue
//               </label>
//               <input
//                 id="venue"
//                 type="text"
//                 name="venue"
//                 value={venue}
//                 onChange={e => setVenue(e.target.value)}
//                 className="login-input"
//               />
//             </div>
//           </div>
//           <div className="col">
//             <label htmlFor="plantCode" className="label">Plant Code</label>
//             <input
//               id="plantCode"
//               type="number"
//               name="plantCode"
//               value={plantCode}
//               onChange={e => setPlantCode(e.target.value)}
//               className="login-input"
//             />
//           </div>

//           <div className="d-flex gap-2 my-2">
//             <div className="col">
//               <label htmlFor="date" className="label">Date</label>
//               <input
//                 id="date"
//                 type="date"
//                 name="date"
//                 value={date}
//                 onChange={e => setDate(e.target.value)}
//                 className="date-picker"
//               />
//             </div>
//             <div className="col">
//               <label htmlFor="fromTime" className="label">From Time:</label>
//               <input
//                 id="fromTime"
//                 type="time"
//                 value={fromTime}
//                 onChange={e => setFromTime(e.target.value)}
//                 className="date-picker"
//               />
//             </div>
//             <div className="col">
//               <label htmlFor="toTime" className="label">To Time:</label>
//               <input
//                 id="toTime"
//                 type="time"
//                 value={toTime}
//                 onChange={e => setToTime(e.target.value)}
//                 className="date-picker"
//               />
//             </div>
//           </div>

//           <div className="d-flex gap-2 my-3">
//             <div className="col">
//               <label className="label" htmlFor="plantName">
//                 Plant Name
//               </label>
//               <select
//                 id="plantName"
//                 value={plantName}
//                 onChange={e => setPlantName(e.target.value)}
//                 className="login-input"
//               >
//                 <option value="">Select Plant Name</option>
//                 {plantOptions.map(plant => (
//                   <option key={plant._id} value={plant.groupName}>{plant.groupName}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="col">
//               <label className="label" htmlFor="plantId">
//                 Plant ID
//               </label>
//               <select
//                 id="plantId"
//                 value={plantId}
//                 onChange={e => setPlantId(e.target.value)}
//                 className="login-input"
//               >
//                 <option value="">Select Plant ID</option>
//                 {plantIds.map(id => (
//                   <option key={id} value={id}>{id}</option>
//                 ))}
//               </select>
//             </div>
            
//           </div>
//           <div className="col">
//               <label htmlFor="empCode" className="label">
//                 Employee Code
//               </label>
//               <Select
//                 id="empCode"
//                 value={empCodes.map(code => ({ value: code.value, label: code.label }))}
//                 //value={selectedEmployee ? [{ value: selectedEmployee, label: selectedEmployee }] : []}
//                 onChange={handleEmpCodeChange}
//                 options={employeeCodes?.employeeInfo?.map(emp => ({ value: emp.empOnlyId, label: `${emp.empFName} - ${emp.empOnlyId}` }))}
//                 // options={employeeCodes?.employeeInfo?.map(emp => ({ value: emp.empOnlyId, label: `${emp.empOnlyId} - ${emp.empFName}` }))}
//                 isMulti
//                 className="login-input"
//               />
//             </div>
//           {/* </div> */}

//           <div className="d-flex justify-content-between mt-5">
//             <div className="">
//               <input
//                 className="btn-schedule"
//                 type="button"
//                 value="Cancel"
//                 onClick={() => setIsAdding(false)}
//               />
//             </div>
//             <div className="">
//               <input type="submit" value="Add" className="btn-login" />
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Add;

import config from "../../config.json";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [projectName, setProjectName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [plantName, setPlantName] = useState("");
  const [plantId, setPlantId] = useState("");
  const [empCodes, setEmpCodes] = useState([]);
  const [plantOptions, setPlantOptions] = useState([]);
  const [plantIds, setPlantIds] = useState([]);
  const [employeeCodes, setEmployeeCodes] = useState([]);
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://fr.thirdeye-ai.com/face/groups/getinfo?groupType=frAttendance&companyId=JBMGroup`)
      .then(response => {
        const { data } = response;
        setPlantOptions(data);
      })
      .catch(error => {
        console.error('Error fetching plant data:', error);
      });
  }, []);

  useEffect(() => {
    if (plantName) {
      const selectedPlant = plantOptions.find(plant => plant.groupName === plantName);
      if (selectedPlant) {
        const filteredIds = selectedPlant.groupMembers.filter(id => id !== "");
        setPlantIds(filteredIds);
      }
    } else {
      setPlantIds([]);
    }
  }, [plantName, plantOptions]);

  useEffect(() => {
    if (plantId) {
      axios.get(`http://jbmgroup.fr.thirdeye-ai.com/face/getEmpInfo?companyId=JBMGroup&plantId=${plantId}`)
        .then(response => {
          const { data } = response;
          setEmployeeCodes(data);
        })
        .catch(error => {
          console.error('Error fetching employee data:', error);
        });
    } else {
      setEmployeeCodes([]);
    }
  }, [plantId]);

  
  const handleEmpCodeChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option);
    setEmpCodes(selectedValues);
    
    // If only one option is selected, update the selected employee name
    if (selectedOptions.length === 1) {
      const selectedEmployeeData = employeeCodes.employeeInfo.find(emp => emp.empOnlyId === selectedOptions[0].value);
      setSelectedEmployee(selectedEmployeeData ? `${selectedEmployeeData.empFName} - ${selectedOptions[0].value}` : null);
    } else {
      setSelectedEmployee(null);
    }
  };
  
  const handleAdd = (e) => {
    e.preventDefault();

    if (empCodes.length === 0 || !projectName || !trainerName || !plantName || !plantId || !date || !fromTime || !toTime) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const selectedEmpData = empCodes.map(code => {
      return code.label;
    });

    const id = employees.length + 1;
    const newEmployee = {
      id,
      projectName,
      trainerName,
      plantName,
      plantId,
      empCodes: selectedEmpData,
      date,
      fromTime,
      toTime,
    };
    axios.post(`${config.url}/training`, newEmployee)
      .then(() => {
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
      })
      .catch(error => {
        console.error('Error adding new employee:', error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to add new employee.",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="container m-5 p-5">
      <form onSubmit={handleAdd}>
        <h2>Add Training</h2>
        <div className="bg-white p-5 rounded-4 border">
          <div className="d-flex gap-2 my-3">
            <div className="col">
              <label className="label" htmlFor="projectName">
                Title
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
                Faculty Name
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
          </div>
          <div className="d-flex gap-2 my-2">
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
          </div>

          <div className="d-flex gap-2 my-3">
            <div className="col">
              <label className="label" htmlFor="plantName">
                Venue
              </label>
              <select
                id="plantName"
                value={plantName}
                onChange={e => setPlantName(e.target.value)}
                className="login-input"
              >
                <option value="">Select Venue</option>
                {plantOptions.map(plant => (
                  <option key={plant._id} value={plant.groupName}>{plant.groupName}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="label" htmlFor="plantId">
                Plant Code
              </label>
              <select
                id="plantId"
                value={plantId}
                onChange={e => setPlantId(e.target.value)}
                className="login-input"
              >
                <option value="">Select Plant Code</option>
                {plantIds.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="col">
            <label htmlFor="empCode" className="label">
              Participants List
            </label>
            <Select
              id="empCode"
              value={empCodes.map(code => ({ value: code.value, label: code.label }))}
              onChange={handleEmpCodeChange}
              options={employeeCodes?.employeeInfo?.map(emp => ({ value: emp.empOnlyId, label: `${emp.empFName} - ${emp.empOnlyId}` }))}
              isMulti
              className="login-input"
            />
          </div>

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
              <input type="submit" value="Add" className="btn-login" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;

