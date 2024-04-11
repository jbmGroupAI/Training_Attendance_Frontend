import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from "../../config.json";

const Edit = ({ selectedEmployee, setEmployees, setIsEditing }) => {
  const [formData, setFormData] = useState(selectedEmployee || { // Initialize formData with selectedEmployee data
    projectName: '',
    trainerName: '',
    venue: '',
    plantCode: '',
    date: '',
    fromTime: '',
    toTime: ''
  });
console.log("teyyye",formData)
useEffect(() => {
  if (selectedEmployee) {
    setFormData({
      projectName: selectedEmployee.projectName || '',
      trainerName: selectedEmployee.trainerName || '',
      venue: selectedEmployee.venue || '',
      plantCode: selectedEmployee.plantCode || '',
      date: selectedEmployee.date || '',
      fromTime: selectedEmployee.fromTime || '',
      toTime: selectedEmployee.toTime || ''
    });
  }
}, [selectedEmployee]);

// Added formData to the dependency array

console.log("selectedEmployee:", selectedEmployee);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.projectName || !formData.trainerName || !formData.venue || !formData.plantCode || !formData.date || !formData.fromTime || !formData.toTime) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    try {
      const response = await axios.put(`${config.url}/training/${selectedEmployee._id}`, formData);
      const updatedData = response.data; // Assuming the response contains the updated data

      console.log("ewer",response)

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === selectedEmployee._id ? { ...employee, ...updatedData } : employee
        )
      );

      setIsEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: `${formData.projectName}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error updating employee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update employee data.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Meeting</h1>
        <label htmlFor="projectName">Training Topic</label>
        <input
          id="projectName"
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
        />
        <label htmlFor="trainerName">Trainer Name</label>
        <input
          id="trainerName"
          type="text"
          name="trainerName"
          value={formData.trainerName}
          onChange={(e) => setFormData({ ...formData, trainerName: e.target.value })}
        />
        <label htmlFor="venue">Venue</label>
        <input
          id="venue"
          type="text"
          name="venue"
          value={formData.venue}
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
        />
        <label htmlFor="plantCode">Plant Code</label>
        <input
          id="plantCode"
          type="number"
          name="plantCode"
          value={formData.plantCode}
          onChange={(e) => setFormData({ ...formData, plantCode: e.target.value })}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <label htmlFor="fromTime">From Time:</label>
        <input
          id="fromTime"
          type="time"
          value={formData.fromTime}
          onChange={(e) => setFormData({ ...formData, fromTime: e.target.value })}
        />
        <label htmlFor="toTime">To Time:</label>
        <input
          id="toTime"
          type="time"
          value={formData.toTime}
          onChange={(e) => setFormData({ ...formData, toTime: e.target.value })}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
