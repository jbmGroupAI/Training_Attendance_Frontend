import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;

  const [projectName, setProjectName] = useState(selectedEmployee.projectName);
  const [trainerName, setTrainerName] = useState(selectedEmployee.trainerName);
  const [venue, setVenue] = useState(selectedEmployee.venue);
  const [plantCode, setPlantCode] = useState(selectedEmployee.plantCode);
  const [date, setDate] = useState(selectedEmployee.date);
  const [fromTime, setFromTime] = useState(selectedEmployee.fromTime);
  const [toTime, setToTime] = useState(selectedEmployee.toTime);

  const handleUpdate = e => {
    e.preventDefault();

    if (!projectName || !trainerName || !venue || !plantCode || !date || !fromTime || !toTime) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedEmployee = {
      id,
      projectName,
      trainerName,
      venue,
      plantCode,
      date,
      fromTime,
      toTime,
    };

    const updatedEmployees = employees.map(employee => 
      employee.id === id ? updatedEmployee : employee
    );

    localStorage.setItem('employees_data', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${updatedEmployee.projectName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Meeting</h1>
        <label htmlFor="projectName">Project Name</label>
        <input
          id="projectName"
          type="text"
          name="projectName"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
        />
        <label htmlFor="trainerName">Trainer Name</label>
        <input
          id="trainerName"
          type="text"
          name="trainerName"
          value={trainerName}
          onChange={e => setTrainerName(e.target.value)}
        />
        <label htmlFor="venue">Venue</label>
        <input
          id="venue"
          type="text"
          name="venue"
          value={venue}
          onChange={e => setVenue(e.target.value)}
        />
        <label htmlFor="plantCode">Plant Code</label>
        <input
          id="plantCode"
          type="number"
          name="plantCode"
          value={plantCode}
          onChange={e => setPlantCode(e.target.value)}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <label htmlFor="fromTime">From Time:</label>
        <input
          id="fromTime"
          type="time"
          value={fromTime}
          onChange={e => setFromTime(e.target.value)}
        />
        <label htmlFor="toTime">To Time:</label>
        <input
          id="toTime"
          type="time"
          value={toTime}
          onChange={e => setToTime(e.target.value)}
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
