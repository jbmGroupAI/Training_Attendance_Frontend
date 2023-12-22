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
    <>
      <div></div>
      <div className="container m-5 p-5">
        <form onSubmit={handleAdd}>
          <h2>Add Training</h2>
          <div className="bg-white p-5 rounded-4 border">
            <div className="d-flex gap-2 my-3">
              <div className="col">
                <label className="label" htmlFor="projectName">
                  Training Topic
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
                  Trainer Name
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
              <div className="col">
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
              </div>
              <div className="col">
                <label htmlFor="plantCode" className="label">Plant Code</label>
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
