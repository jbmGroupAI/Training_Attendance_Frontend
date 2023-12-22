import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import config from "../../config.json";
const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [projectName, setProjectName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [venue, setVenue] = useState("");
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
    let res = axios.post(`${config.url}/training`, newEmployee);
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
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Training</h1>
        <label htmlFor="projectName">Training Topic</label>
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
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
