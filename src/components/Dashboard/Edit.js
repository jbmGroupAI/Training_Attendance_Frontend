


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Select from "react-select";
// import Creatable from "react-select/creatable";
// import Header from "./Header";
// import config from "../../config.json";
// import "../UI/Edit.css";
// import { customDropdownStyles } from "../UI/Select";

// const Edit = ({ selectedEmployee, setEmployees, setIsEditing }) => {
//   const [formData, setFormData] = useState({
//     projectName: selectedEmployee ? selectedEmployee.projectName : "",
//     trainerName: selectedEmployee ? selectedEmployee.trainerName : "",
//     plantName: selectedEmployee
//       ? selectedEmployee.plantNames.map((plant) => ({
//           value: plant,
//           label: plant,
//         }))
//       : [],
//     plantId: selectedEmployee
//       ? selectedEmployee.plantIds.map((id) => ({
//           value: id,
//           label: id,
//         }))
//       : [],
//     empCodes: selectedEmployee
//       ? selectedEmployee.empCodes.map((empCode) => ({
//           value: empCode,
//           label: `${empCode.empFName} ${empCode.empOnlyId}`,
//         }))
//       : [],
//     date: selectedEmployee
//       ? new Date(selectedEmployee.date).toISOString().split("T")[0]
//       : "",
//     fromTime: selectedEmployee ? selectedEmployee.fromTime : "",
//     toTime: selectedEmployee ? selectedEmployee.toTime : "",
//     facultyMail: selectedEmployee ? selectedEmployee.facultyMail : "",
//     meetingDescription: selectedEmployee
//       ? selectedEmployee.meetingDescription
//       : "",
//     participantEmails: selectedEmployee
//       ? selectedEmployee.participantEmails.map((email) => ({
//           value: email,
//           label: email,
//         }))
//       : [],
//   });

//   const [plantOptions, setPlantOptions] = useState([]);
//   const [plantIds, setPlantIds] = useState([]);
//   const [employeeCodes, setEmployeeCodes] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         `http://fr.thirdeye-ai.com/face/groups/getinfo?groupType=frAttendance&companyId=JBMGroup`
//       )
//       .then((response) => {
//         const { data } = response;
//         setPlantOptions(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching plant data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     const selectedPlants = formData.plantName.map((plant) => plant.value);
//     const filteredIds = plantOptions
//       .filter((plant) => selectedPlants.includes(plant.groupName))
//       .flatMap((plant) => plant.groupMembers.filter((id) => id !== ""));

//     setPlantIds(filteredIds.map((id) => ({ value: id, label: id })));
//   }, [formData.plantName, plantOptions]);

//   useEffect(() => {
//     if (plantIds.length > 0) {
//       const requests = plantIds.map((id) =>
//         axios.get(`http://jbmgroup.fr.thirdeye-ai.com/face/getEmpInfo?companyId=JBMGroup&plantId=${id.value}`)
//       );

//       Promise.all(requests)
//         .then((responses) => {
//           const resCodes = responses.reduce((acc, response) => {
//             return acc.concat(response.data.employeeInfo);
//           }, []);
//           setEmployeeCodes(resCodes);
//         })
//         .catch((error) => {
//           console.error("Error fetching employee data:", error);
//         });
//     } else {
//       setEmployeeCodes([]);
//     }
//   }, [plantIds]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.projectName ||
//       !formData.trainerName ||
//       formData.plantName.length === 0 ||
//       formData.plantId.length === 0 ||
//       !formData.date ||
//       !formData.fromTime ||
//       !formData.toTime ||
//       !formData.facultyMail ||
//       !formData.meetingDescription ||
//       formData.participantEmails?.length === 0
//     ) {
//       return Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "All fields are required.",
//         showConfirmButton: true,
//       });
//     }

//     const updatedFormData = {
//       ...formData,
//       plantName: formData.plantName.map((plant) => plant.value),
//       plantId: formData.plantId.map((id) => id.value),
//       empCodes: formData.empCodes.map((code) => code.value),
//       participantEmails: formData.participantEmails.map((email) => email.value),
//     };

//     try {
//       const response = await axios.put(
//         `${config.url}/training/${selectedEmployee._id}`,
//         updatedFormData
//       );
//       const updatedData = response.data;

//       setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
//           employee._id === selectedEmployee._id ? { ...employee, ...updatedData } : employee
//         )
//       );

//       setIsEditing(false);

//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: `${formData.projectName}'s data has been updated.`,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to update employee data.",
//         showConfirmButton: true,
//       });
//     }
//   };

//   return (
//     <div className="container-fluid p-0">
//       <Header setIsEditing={setIsEditing} handleChangeDateRange={() => {}} />
//       <div className="mx-5 my-3">
//         <form onSubmit={handleUpdate}>
//           <h5>Edit Meeting</h5>
//           <div className="bg-white p-5 rounded-4 border">
//             <div className="d-flex justify-content-between flex-wrap gap-2">
//               <div className="col-lg-3">
//                 <label className="label" htmlFor="projectName">
//                   Project Name
//                 </label>
//                 <input
//                   type="text"
//                   className="input-field"
//                   id="projectName"
//                   value={formData.projectName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, projectName: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-lg-2">
//                 <label className="label" htmlFor="trainerName">
//                   Trainer Name
//                 </label>
//                 <input
//                   type="text"
//                   className="input-field"
//                   id="trainerName"
//                   value={formData.trainerName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, trainerName: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="col-lg-5">
//                 <label className="label" htmlFor="facultyMail">
//                   Faculty Mail
//                 </label>
//                 <input
//                   type="email"
//                   className="input-field"
//                   id="facultyMail"
//                   value={formData.facultyMail}
//                   onChange={(e) =>
//                     setFormData({ ...formData, facultyMail: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="col-lg-5">
//                 <label className="label" htmlFor="date">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   className="input-field"
//                   id="date"
//                   value={formData.date}
//                   onChange={(e) =>
//                     setFormData({ ...formData, date: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-lg-3">
//                 <label className="label" htmlFor="fromTime">
//                   From Time
//                 </label>
//                 <input
//                   type="time"
//                   className="input-field"
//                   id="fromTime"
//                   value={formData.fromTime}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fromTime: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-lg-3">
//                 <label className="label" htmlFor="toTime">
//                   To Time
//                 </label>
//                 <input
//                   type="time"
//                   className="input-field"
//                   id="toTime"
//                   value={formData.toTime}
//                   onChange={(e) =>
//                     setFormData({ ...formData, toTime: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-lg-4">
//                 <label className="label" htmlFor="plantName">
//                   Venue
//                 </label>
//                 <Select
//                   id="plantName"
//                   value={formData.plantName}
//                   onChange={(options) =>
//                     setFormData({ ...formData, plantName: options })
//                   }
//                   options={plantOptions.map((plant) => ({
//                     value: plant.groupName,
//                     label: plant.groupName,
//                   }))}
//                   styles={customDropdownStyles}
//                   isMulti
//                 />
//               </div>

//               <div className="col-lg-4">
//                 <label className="label" htmlFor="plantId">
//                   Plant ID
//                 </label>
//                 <Select
//                   id="plantId"
//                   value={formData.plantId}
//                   onChange={(options) =>
//                     setFormData({ ...formData, plantId: options })
//                   }
//                   options={plantIds}
//                   styles={customDropdownStyles}
//                   isMulti
//                 />
//               </div>

//               <div className="col-lg-5 my-2">
//                 <label htmlFor="empCodes" className="label">
//                   Participants List
//                 </label>
//                 <Select
//                   id="empCodes"
//                   value={formData.empCodes}
//                   styles={customDropdownStyles}
//                   onChange={(options) =>
//                     setFormData({ ...formData, empCodes: options })
//                   }
//                   options={
//                     Array.isArray(employeeCodes)
//                       ? employeeCodes.map((emp) => ({
//                           value: emp.empOnlyId,
//                           label: `${emp.empFName} - ${emp.empOnlyId}`,
//                         }))
//                       : []
//                   }
//                   isMulti
//                 />
//               </div>

//               <div className="col-lg-5">
//                 <label className="label" htmlFor="meetingDescription">
//                   Meeting Description
//                 </label>
//                 <textarea
//                   className="input-field"
//                   id="meetingDescription"
//                   value={formData.meetingDescription}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       meetingDescription: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="col-lg-5">
//                 <label className="label" htmlFor="participantEmails">
//                   Participant Emails
//                 </label>
//                 <Creatable
//                   value={formData.participantEmails}
//                   onChange={(options) =>
//                     setFormData({ ...formData, participantEmails: options })
//                   }
//                   isMulti
//                   styles={customDropdownStyles}
//                 />
//               </div>
//             </div>

//             <div className="mt-3">
//               <button type="submit" className="btn btn-primary">
//                 Update
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary ms-2"
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Edit;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Select from "react-select";
// import Creatable from "react-select/creatable";
// import Header from "./Header";
// import config from "../../config.json";
// import "../UI/Edit.css";
// import { customDropdownStyles } from "../UI/Select";

// const Edit = ({ selectedEmployee, setEmployees, setIsEditing }) => {
//   const [formData, setFormData] = useState({
//     projectName: selectedEmployee ? selectedEmployee.projectName : "",
//     trainerName: selectedEmployee ? selectedEmployee.trainerName : "",
//     plantName: selectedEmployee
//       ? selectedEmployee.plantNames?.map((plant) => ({
//           value: plant,
//           label: plant,
//         }))
//       : [],
//     plantId: selectedEmployee
//       ? selectedEmployee.plantIds?.map((id) => ({
//           value: id,
//           label: id,
//         }))
//       : [],
//     empCodes: selectedEmployee
//       ? selectedEmployee.empCodes?.map((empCode) => ({
//           value: empCode,
//           label: `${empCode.empFName} ${empCode.empOnlyId}`,
//         }))
//       : [],
//     date: selectedEmployee
//       ? new Date(selectedEmployee.date).toISOString().split("T")[0]
//       : "",
//     fromTime: selectedEmployee ? selectedEmployee.fromTime : "",
//     toTime: selectedEmployee ? selectedEmployee.toTime : "",
//     facultyMail: selectedEmployee ? selectedEmployee.facultyMail : "",
//     meetingDescription: selectedEmployee
//       ? selectedEmployee.meetingDescription
//       : "",
//     participantEmails: selectedEmployee
//       ? selectedEmployee.participantEmails?.map((email) => ({
//           value: email,
//           label: email,
//         }))
//       : [],
//     trainingLink: selectedEmployee ? selectedEmployee.trainingLink : ""
//   });

//   const [plantOptions, setPlantOptions] = useState([]);
//   const [plantIds, setPlantIds] = useState([]);
//   const [employeeCodes, setEmployeeCodes] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         `http://fr.thirdeye-ai.com/face/groups/getinfo?groupType=frAttendance&companyId=JBMGroup`
//       )
//       .then((response) => {
//         const { data } = response;
//         setPlantOptions(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching plant data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     const selectedPlants = formData.plantName.map((plant) => plant.value);
//     const filteredIds = plantOptions
//       .filter((plant) => selectedPlants.includes(plant.groupName))
//       .flatMap((plant) => plant.groupMembers.filter((id) => id !== ""));

//     setPlantIds(filteredIds.map((id) => ({ value: id, label: id })));
//   }, [formData.plantName, plantOptions]);

//   useEffect(() => {
//     if (plantIds.length > 0) {
//       const requests = plantIds.map((id) =>
//         axios.get(
//           `http://jbmgroup.fr.thirdeye-ai.com/face/getEmpInfo?companyId=JBMGroup&plantId=${id.value}`
//         )
//       );

//       Promise.all(requests)
//         .then((responses) => {
//           const resCodes = responses.reduce((acc, response) => {
//             return acc.concat(response.data.employeeInfo);
//           }, []);
//           setEmployeeCodes(resCodes);
//         })
//         .catch((error) => {
//           console.error("Error fetching employee data:", error);
//         });
//     } else {
//       setEmployeeCodes([]);
//     }
//   }, [plantIds]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.projectName ||
//       !formData.trainerName ||
//       formData.plantName.length === 0 ||
//       formData.plantId.length === 0 ||
//       !formData.date ||
//       !formData.fromTime ||
//       !formData.toTime ||
//       !formData.facultyMail ||
//       !formData.meetingDescription ||
//       formData.participantEmails?.length === 0
//     ) {
//       return Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "All fields are required.",
//         showConfirmButton: true,
//       });
//     }

//     const updatedFormData = {
//       ...formData,
//       plantName: formData.plantName.map((plant) => plant.value),
//       plantId: formData.plantId.map((id) => id.value),
//       empCodes: formData.empCodes.map((code) => code.value),
//       participantEmails: formData.participantEmails.map((email) => email.value),
//     };

//     try {
//       const response = await axios.put(
//         `${config.url}/training/${selectedEmployee._id}`,
//         updatedFormData
//       );
//       const updatedData = response.data;

//       setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
//           employee._id === selectedEmployee._id
//             ? { ...employee, ...updatedData }
//             : employee
//         )
//       );

//       setIsEditing(false);

//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: `${formData.projectName}'s data has been updated.`,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to update employee data.",
//         showConfirmButton: true,
//       });
//     }
//   };

//   return (
//     <div className="container-fluid p-0">
//       <Header setIsEditing={setIsEditing} handleChangeDateRange={() => {}} />
//       <div className="mx-5 my-3">
//         <form onSubmit={handleUpdate}>
//           <h5>Edit Meeting</h5>
//           <div className="bg-white p-5 rounded-4 border">
//             <div className="d-flex justify-content-between flex-wrap gap-2">
//               <div className="col-lg-3">
//                 <label className="label" htmlFor="projectName">
//                   Project Name
//                 </label>
//                 <input
//                   type="text"
//                   className="input-field"
//                   id="projectName"
//                   value={formData.projectName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, projectName: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-lg-2">
//                 <label className="label" htmlFor="trainerName">
//                   Trainer Name
//                 </label>
//                 <input
//                   type="text"
//                   className="input-field"
//                   id="trainerName"
//                   value={formData.trainerName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, trainerName: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="col-lg-5">
//                 <label className="label" htmlFor="facultyMail">
//                   Faculty Mail
//                 </label>
//                 <input
//                   type="email"
//                   className="input-field"
//                   id="facultyMail"
//                   value={formData.facultyMail}
//                   onChange={(e) =>
//                     setFormData({ ...formData, facultyMail: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="col-lg-5">
//                 <label className="label" htmlFor="date">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   className="input-field"
//                   id="date"
//                   value={formData.date}
//                   onChange={(e) =>
//                     setFormData({ ...formData, date: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-lg-3">
//                 <label className="label" htmlFor="fromTime">
//                   From Time
//                 </label>
//                 <input
//                   type="time"
//                   className="input-field"
//                   id="fromTime"
//                   value={formData.fromTime}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fromTime: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-lg-3">
//                 <label className="label" htmlFor="toTime">
//                   To Time
//                 </label>
//                 <input
//                   type="time"
//                   className="input-field"
//                   id="toTime"
//                   value={formData.toTime}
//                   onChange={(e) =>
//                     setFormData({ ...formData, toTime: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="col-lg-4">
//                 <label className="label" htmlFor="plantName">
//                   Venue
//                 </label>
//                 <Select
//                   id="plantName"
//                   value={formData.plantName}
//                   onChange={(options) =>
//                     setFormData({ ...formData, plantName: options })
//                   }
//                   options={plantOptions.map((plant) => ({
//                     value: plant.groupName,
//                     label: plant.groupName,
//                   }))}
//                   styles={customDropdownStyles}
//                   isMulti
//                 />
//               </div>

//               <div className="col-lg-4">
//                 <label className="label" htmlFor="plantId">
//                   Plant ID
//                 </label>
//                 <Select
//                   id="plantId"
//                   value={formData.plantId}
//                   onChange={(options) =>
//                     setFormData({ ...formData, plantId: options })
//                   }
//                   options={plantIds}
//                   styles={customDropdownStyles}
//                   isMulti
//                 />
//               </div>

//               <div className="col-lg-5 my-2">
//                 <label htmlFor="empCodes" className="label">
//                   Participants List
//                 </label>
//                 <Select
//                   id="empCodes"
//                   value={formData.empCodes}
//                   styles={customDropdownStyles}
//                   onChange={(options) =>
//                     setFormData({ ...formData, empCodes: options })
//                   }
//                   options={
//                     Array.isArray(employeeCodes)
//                       ? employeeCodes.map((emp) => ({
//                           value: emp.empOnlyId,
//                           label: `${emp.empFName} - ${emp.empOnlyId}`,
//                         }))
//                       : []
//                   }
//                   isMulti
//                 />
//               </div>

//               <div className="col-lg-5">
//                 <label className="label" htmlFor="participantEmails">
//                   Participant Emails
//                 </label>
//                 <Creatable
//                   value={formData.participantEmails}
//                   onChange={(options) =>
//                     setFormData({ ...formData, participantEmails: options })
//                   }
//                   isMulti
//                   styles={customDropdownStyles}
//                 />
//               </div>

//               <div className="col-lg-5 my-3">
//                 <label className="label" htmlFor="trainingLink">
//                   Training Link (Optional)
//                 </label>
//                 <input
//                   id="trainingLink"
//                   type="text"
//                   name="trainingLink"
//                   value={formData.trainingLink}
//                   onChange={(e) =>
//                     setFormData({ ...formData, trainingLink: e.target.value })
//                   }
//                   className="input-field"
//                 />
//               </div>

//               <div className="col-lg-5">
//                 <label className="label" htmlFor="meetingDescription">
//                   Meeting Description
//                 </label>
//                 <textarea
//                   className="input-field"
//                   id="meetingDescription"
//                   value={formData.meetingDescription}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       meetingDescription: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="mt-3">
//               <button type="submit" className="btn btn-primary">
//                 Update
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary ms-2"
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Edit;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import Creatable from "react-select/creatable";
import Header from "./Header";
import config from "../../config.json";
import "../UI/Edit.css";
import { customDropdownStyles } from "../UI/Select";

const Edit = ({ selectedEmployee, setEmployees, setIsEditing }) => {
  const [formData, setFormData] = useState({
    projectName: selectedEmployee ? selectedEmployee.projectName : "",
    trainerName: selectedEmployee ? selectedEmployee.trainerName : "",
    plantName: selectedEmployee
      ? selectedEmployee.plantNames?.map((plant) => ({
          value: plant,
          label: plant,
        }))
      : [],
    plantId: selectedEmployee
      ? selectedEmployee.plantIds?.map((id) => ({
          value: id,
          label: id,
        }))
      : [],
    empCodes: selectedEmployee
      ? selectedEmployee.empCodes?.map((empCode) => ({
          value: empCode.empOnlyId.empOnlyId || empCode.empOnlyId,
          label: `${empCode.empFName} ${empCode.empOnlyId.empOnlyId || empCode.empOnlyId}`,
          empFName: empCode.empFName,
          empOnlyId: empCode.empOnlyId.empOnlyId || empCode.empOnlyId,
          plantIds: empCode.empOnlyId.plantIds || empCode.plantIds,
          _id: empCode.empOnlyId._id,
        }))
      : [],
    date: selectedEmployee
      ? new Date(selectedEmployee.date).toISOString().split("T")[0]
      : "",
    fromTime: selectedEmployee ? selectedEmployee.fromTime : "",
    toTime: selectedEmployee ? selectedEmployee.toTime : "",
    facultyMail: selectedEmployee ? selectedEmployee.facultyMail : "",
    meetingDescription: selectedEmployee
      ? selectedEmployee.meetingDescription
      : "",
    participantEmails: selectedEmployee
      ? selectedEmployee.participantEmails?.map((email) => ({
          value: email,
          label: email,
        }))
      : [],
    trainingLink: selectedEmployee ? selectedEmployee.trainingLink : ""
  });

  const [plantOptions, setPlantOptions] = useState([]);
  const [plantIds, setPlantIds] = useState([]);
  const [employeeCodes, setEmployeeCodes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://fr.thirdeye-ai.com/face/groups/getinfo?groupType=frAttendance&companyId=JBMGroup`
      )
      .then((response) => {
        const { data } = response;
        setPlantOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching plant data:", error);
      });
  }, []);

  useEffect(() => {
    const selectedPlants = formData.plantName.map((plant) => plant.value);
    const filteredIds = plantOptions
      .filter((plant) => selectedPlants.includes(plant.groupName))
      .flatMap((plant) => plant.groupMembers.filter((id) => id !== ""));

    setPlantIds(filteredIds.map((id) => ({ value: id, label: id })));
  }, [formData.plantName, plantOptions]);

  useEffect(() => {
    if (plantIds.length > 0) {
      const requests = plantIds.map((id) =>
        axios.get(
          `http://jbmgroup.fr.thirdeye-ai.com/face/getEmpInfo?companyId=JBMGroup&plantId=${id.value}`
        )
      );

      Promise.all(requests)
        .then((responses) => {
          const resCodes = responses.reduce((acc, response) => {
            return acc.concat(response.data.employeeInfo);
          }, []);
          setEmployeeCodes(resCodes);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    } else {
      setEmployeeCodes([]);
    }
  }, [plantIds]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !formData.projectName ||
      !formData.trainerName ||
      formData.plantName.length === 0 ||
      formData.plantId.length === 0 ||
      !formData.date ||
      !formData.fromTime ||
      !formData.toTime ||
      !formData.facultyMail ||
      !formData.meetingDescription ||
      formData.participantEmails?.length === 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const updatedFormData = {
      ...formData,
      plantName: formData.plantName.map((plant) => plant.value),
      plantId: formData.plantId.map((id) => id.value),
      empCodes: formData.empCodes.map((code) => ({
        empOnlyId: code.empOnlyId,
        empFName: code.empFName,
        plantIds: code.plantIds,
        _id: code._id,
      })),
      participantEmails: formData.participantEmails.map((email) => email.value),
    };

    try {
      const response = await axios.put(
        `${config.url}/training/${selectedEmployee._id}`,
        updatedFormData
      );
      const updatedData = response.data;

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === selectedEmployee._id
            ? { ...employee, ...updatedData }
            : employee
        )
      );

      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${formData.projectName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update employee data.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container-fluid p-0">
      <Header setIsEditing={setIsEditing} handleChangeDateRange={() => {}} />
      <div className="mx-5 my-3">
        <form onSubmit={handleUpdate}>
          <h5>Edit Meeting</h5>
          <div className="bg-white p-5 rounded-4 border">
            <div className="d-flex justify-content-between flex-wrap gap-2">
              <div className="col-lg-3">
                <label className="label" htmlFor="projectName">
                  Project Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                />
              </div>

              <div className="col-lg-2">
                <label className="label" htmlFor="trainerName">
                  Trainer Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  id="trainerName"
                  value={formData.trainerName}
                  onChange={(e) =>
                    setFormData({ ...formData, trainerName: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-5">
                <label className="label" htmlFor="facultyMail">
                  Faculty Mail
                </label>
                <input
                  type="email"
                  className="input-field"
                  id="facultyMail"
                  value={formData.facultyMail}
                  onChange={(e) =>
                    setFormData({ ...formData, facultyMail: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-5">
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>

              <div className="col-lg-3">
                <label className="label" htmlFor="fromTime">
                  From Time
                </label>
                <input
                  type="time"
                  className="input-field"
                  id="fromTime"
                  value={formData.fromTime}
                  onChange={(e) =>
                    setFormData({ ...formData, fromTime: e.target.value })
                  }
                />
              </div>

              <div className="col-lg-3">
                <label className="label" htmlFor="toTime">
                  To Time
                </label>
                <input
                  type="time"
                  className="input-field"
                  id="toTime"
                  value={formData.toTime}
                  onChange={(e) =>
                    setFormData({ ...formData, toTime: e.target.value })
                  }
                />
              </div>

              <div className="col-lg-5">
                <label className="label" htmlFor="plantName">
                  Plant Name
                </label>
                <Select
                  id="plantName"
                  value={formData.plantName}
                  onChange={(options) =>
                    setFormData({ ...formData, plantName: options })
                  }
                  options={plantOptions.map((plant) => ({
                    value: plant.groupName,
                    label: plant.groupName,
                  }))}
                  styles={customDropdownStyles}
                  isMulti
                />
              </div>

              <div className="col-lg-4">
                <label className="label" htmlFor="plantId">
                  Plant ID
                </label>
                <Select
                  id="plantId"
                  value={formData.plantId}
                  onChange={(options) =>
                    setFormData({ ...formData, plantId: options })
                  }
                  options={plantIds}
                  styles={customDropdownStyles}
                  isMulti
                />
              </div>

              <div className="col-lg-5 my-2">
                <label htmlFor="empCodes" className="label">
                  Participants List
                </label>
                <Select
                  id="empCodes"
                  value={formData.empCodes}
                  styles={customDropdownStyles}
                  onChange={(options) =>
                    setFormData({ ...formData, empCodes: options })
                  }
                  options={
                    Array.isArray(employeeCodes)
                      ? employeeCodes.map((emp) => ({
                          value: emp.empOnlyId.empOnlyId || emp.empOnlyId,
                          label: `${emp.empFName} - ${
                            emp.empOnlyId.empOnlyId || emp.empOnlyId
                          }`,
                          empFName: emp.empFName,
                          empOnlyId: emp.empOnlyId.empOnlyId || emp.empOnlyId,
                          plantIds: emp.empOnlyId.plantIds || emp.plantIds,
                          _id: emp.empOnlyId._id,
                        }))
                      : []
                  }
                  isMulti
                />
              </div>

              <div className="col-lg-5">
                <label className="label" htmlFor="participantEmails">
                  Participant Emails
                </label>
                <Creatable
                  value={formData.participantEmails}
                  onChange={(options) =>
                    setFormData({ ...formData, participantEmails: options })
                  }
                  isMulti
                  styles={customDropdownStyles}
                />
              </div>

              <div className="col-lg-5 my-3">
                <label className="label" htmlFor="trainingLink">
                  Training Link (Optional)
                </label>
                <input
                  id="trainingLink"
                  type="text"
                  name="trainingLink"
                  value={formData.trainingLink}
                  onChange={(e) =>
                    setFormData({ ...formData, trainingLink: e.target.value })
                  }
                  className="input-field"
                />
              </div>

              <div className="col-lg-5">
                <label className="label" htmlFor="meetingDescription">
                  Meeting Description
                </label>
                <textarea
                  className="input-field"
                  id="meetingDescription"
                  value={formData.meetingDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meetingDescription: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
