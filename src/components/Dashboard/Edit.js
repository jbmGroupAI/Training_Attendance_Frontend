import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import Header from "./Header";
import config from "../../config.json";
import "../UI/Edit.css";

const Edit = ({ selectedEmployee, setEmployees, setIsEditing }) => {
  const [formData, setFormData] = useState({
    projectName: selectedEmployee ? selectedEmployee.projectName : "",
    trainerName: selectedEmployee ? selectedEmployee.trainerName : "",
    plantName: selectedEmployee ? selectedEmployee.plantName : "",
    plantId: selectedEmployee ? selectedEmployee.plantId : "",
    empCodes: selectedEmployee
      ? selectedEmployee.empCodes.map((empCode) => ({
          value: empCode,
          label: empCode,
        }))
      : [],
    date: selectedEmployee ? selectedEmployee.date : "",
    fromTime: selectedEmployee ? selectedEmployee.fromTime : "",
    toTime: selectedEmployee ? selectedEmployee.toTime : "",
    facultyMail: selectedEmployee ? selectedEmployee.facultyMail : "", // Add faculty mail
    meetingDescription: selectedEmployee
      ? selectedEmployee.meetingDescription
      : "", // Add meeting description
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
    if (formData.plantName) {
      const selectedPlant = plantOptions.find(
        (plant) => plant.groupName === formData.plantName
      );
      if (selectedPlant) {
        const filteredIds = selectedPlant.groupMembers.filter((id) => id !== "");
        setPlantIds(filteredIds);
      }
    } else {
      setPlantIds([]);
    }
  }, [formData.plantName, plantOptions]);

  useEffect(() => {
    if (formData.plantId) {
      axios
        .get(
          `http://jbmgroup.fr.thirdeye-ai.com/face/getEmpInfo?companyId=JBMGroup&plantId=${formData.plantId}`
        )
        .then((response) => {
          const { data } = response;
          setEmployeeCodes(data);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    } else {
      setEmployeeCodes([]);
    }
  }, [formData.plantId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !formData.projectName ||
      !formData.trainerName ||
      !formData.plantName ||
      !formData.plantId ||
      !formData.date ||
      !formData.fromTime ||
      !formData.toTime ||
      !formData.facultyMail || // Check if faculty mail is provided
      !formData.meetingDescription // Check if meeting description is provided
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }
    formData.empCodes= formData.empCodes?.map((code) => code.value)
    console.log('jjh',selectedEmployee.id)
    try {
      console.log('jjh',selectedEmployee.id, formData)
      // return;
      const response = await axios.put(
        `${config.url}/training/${selectedEmployee._id}`,
        formData
      );
      const updatedData = response.data;

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === selectedEmployee.id ? { ...employee, ...updatedData } : employee
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
      <div className="container">
      <form onSubmit={handleUpdate}>
        <div className="bg-white p-5 rounded-4 border">
        <h1>Edit Meeting</h1>
        {/* Project Name */}
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            value={formData.projectName}
            onChange={(e) =>
              setFormData({ ...formData, projectName: e.target.value })
            }
          />
        </div>

        {/* Trainer Name */}
        <div className="form-group">
          <label htmlFor="trainerName">Trainer Name</label>
          <input
            type="text"
            className="form-control"
            id="trainerName"
            value={formData.trainerName}
            onChange={(e) =>
              setFormData({ ...formData, trainerName: e.target.value })
            }
          />
        </div>

        {/* Plant Name */}
        <div className="form-group">
          <label htmlFor="plantName">Plant Name</label>
          <Select
            value={{ value: formData.plantName, label: formData.plantName }}
            onChange={(option) =>
              setFormData({ ...formData, plantName: option.value })
            }
            options={plantOptions.map((plant) => ({
              value: plant.groupName,
              label: plant.groupName,
            }))}
          />
        </div>

        {/* Plant ID */}
        <div className="form-group">
          <label htmlFor="plantId">Plant ID</label>
          <Select
            value={{ value: formData.plantId, label: formData.plantId }}
            onChange={(option) =>
              setFormData({ ...formData, plantId: option.value })
            }
            options={plantIds.map((id) => ({ value: id, label: id }))}
          />
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
          />
        </div>

        {/* From Time */}
        <div className="form-group">
          <label htmlFor="fromTime">From Time</label>
          <input
            type="time"
            className="form-control"
            id="fromTime"
            value={formData.fromTime}
            onChange={(e) =>
              setFormData({ ...formData, fromTime: e.target.value })
            }
          />
        </div>

        {/* To Time */}
        <div className="form-group">
          <label htmlFor="toTime">To Time</label>
          <input
            type="time"
            className="form-control"
            id="toTime"
            value={formData.toTime}
            onChange={(e) =>
              setFormData({ ...formData, toTime: e.target.value })
            }
          />
        </div>

        {/* Faculty Mail */}
        <div className="form-group">
          <label htmlFor="facultyMail">Faculty Mail</label>
          <input
            type="email"
            className="form-control"
            id="facultyMail"
            value={formData.facultyMail}
            onChange={(e) =>
              setFormData({ ...formData, facultyMail: e.target.value })
            }
          />
        </div>

        {/* Meeting Description */}
        <div className="form-group">
          <label htmlFor="meetingDescription">Meeting Description</label>
          <input
            type="text"
            className="form-control"
            id="meetingDescription"
            value={formData.meetingDescription}
            onChange={(e) =>
              setFormData({ ...formData, meetingDescription: e.target.value })
            }
          />
        </div>

        {/* Participants List */}
        <div className="form-group">
          <label htmlFor="participantsList">Participants List</label>
          <Select
            value={formData.empCodes}
            onChange={(selectedOptions) =>
              setFormData({ ...formData, empCodes: selectedOptions })
            }
            options={employeeCodes?.employeeInfo?.map((emp) => ({
              value: emp.empOnlyId,
              label: `${emp.empFName} - ${emp.empOnlyId}`,
            }))}
            isMulti
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Update
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Edit;



// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import config from "../../config.json";
// import "../UI/Edit.css"; 
// import Header from "./Header"; 

// const Edit = ({ selectedEmployee, setEmployees, setIsEditing }) => {
//   const [formData, setFormData] = useState(selectedEmployee || { // Initialize formData with selectedEmployee data
//     projectName: '',
//     trainerName: '',
//     venue: '',
//     plantCode: '',
//     date: '',
//     fromTime: '',
//     toTime: ''
//   });
// console.log("teyyye",formData)
// useEffect(() => {
//   if (selectedEmployee) {
//     setFormData({
//       projectName: selectedEmployee.projectName || '',
//       trainerName: selectedEmployee.trainerName || '',
//       plantName: selectedEmployee.plantName || '',
//       plantId: selectedEmployee.plantId || '',
//       date: new Date(selectedEmployee.date) || '',
//       fromTime: selectedEmployee.fromTime || '',
//       toTime: selectedEmployee.toTime || ''
//     });
//   }
// }, [selectedEmployee]);

// // Added formData to the dependency array

// console.log("selectedEmployee:", selectedEmployee);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     if (!formData.projectName || !formData.trainerName || !formData.plantName || !formData.plantId || !formData.date || !formData.fromTime || !formData.toTime) {
//       return Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'All fields are required.',
//         showConfirmButton: true,
//       });
//     }

//     try {
//       const response = await axios.put(`${config.url}/training/${selectedEmployee._id}`, formData);
//       const updatedData = response.data; // Assuming the response contains the updated data

//       console.log("ewer",response)

//       setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
//           employee._id === selectedEmployee._id ? { ...employee, ...updatedData } : employee
//         )
//       );

//       setIsEditing(false);

//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: `${formData.projectName}'s data has been updated.`,
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     } catch (error) {
//       console.error('Error updating employee:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Failed to update employee data.',
//         showConfirmButton: true,
//       });
//     }
//   };

//   return (
//     <div className="full-page-container m-5 p-5">
//        <Header setIsEditing={setIsEditing} handleChangeDateRange={() => {}} />
//       <form onSubmit={handleUpdate}>
//         <h1>Edit Meeting</h1>
//         <label htmlFor="projectName">Training Topic</label>
//         <input
//           id="projectName"
//           type="text"
//           name="projectName"
//           value={formData.projectName}
//           onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
//         />
//         <label htmlFor="trainerName"> Faculty Name</label>
//         <input
//           id="trainerName"
//           type="text"
//           name="trainerName"
//           value={formData.trainerName}
//           onChange={(e) => setFormData({ ...formData, trainerName: e.target.value })}
//         />
//         <label htmlFor="venue">Venue</label>
//         <input
//           id="plantName"
//           type="text"
//           name="plantName"
//           value={formData.plantName}
//           onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
//         />
//         <label htmlFor="plantCode">Plant ID</label>
//         <input
//           id="plantId"
//           type="number"
//           name="plantId"
//           value={formData.plantId}
//           onChange={(e) => setFormData({ ...formData, plantId: e.target.value })}
//         />
//         <label htmlFor="date">Date</label>
//         <input
//           id="date"
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//         />



//         <label htmlFor="fromTime">From Time:</label>
//         <input
//           id="fromTime"
//           type="time"
//           value={formData.fromTime}
//           onChange={(e) => setFormData({ ...formData, fromTime: e.target.value })}
//         />
//         <label htmlFor="toTime">To Time:</label>
//         <input
//           id="toTime"
//           type="time"
//           value={formData.toTime}
//           onChange={(e) => setFormData({ ...formData, toTime: e.target.value })}
//         />
//         <div style={{ marginTop: '30px' }}>
//           <input type="submit" value="Update" />
//           <input
//             style={{ marginLeft: '12px' }}
//             className="muted-button"
//             type="button"
//             value="Cancel"
//             onClick={() => setIsEditing(false)}
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Edit;