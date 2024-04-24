import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import Header from "./Header";
import config from "../../config.json";
import "../UI/Edit.css";
import { customDropdownStyles } from "../UI/Select";

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
    facultyMail: selectedEmployee ? selectedEmployee.facultyMail : "",
    meetingDescription: selectedEmployee
      ? selectedEmployee.meetingDescription
      : "",
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
        const filteredIds = selectedPlant.groupMembers.filter(
          (id) => id !== ""
        );
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
      !formData.facultyMail ||
      !formData.meetingDescription
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }
    formData.empCodes = formData.empCodes?.map((code) => code.value);
    console.log("jjh", selectedEmployee.id);
    try {
      console.log("jjh", selectedEmployee.id, formData);
      // return;
      const response = await axios.put(
        `${config.url}/training/${selectedEmployee._id}`,
        formData
      );
      const updatedData = response.data;

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === selectedEmployee.id
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
            {/* Project Name */}
            <div className="d-flex justify-content-between flex-wrap gap-2">
            <div className="col-lg-3">
              <label className="label" htmlFor="projectName">Project Name</label>
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

            {/* Trainer Name */}
            <div className="col-lg-2">
              <label className="label" htmlFor="trainerName">Trainer Name</label>
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

            {/* Plant Name */}
            <div className="col-lg-3">
              <label className="label" htmlFor="plantName">Plant Name</label>
              <Select
                value={{ value: formData.plantName, label: formData.plantName }}
                onChange={(option) =>
                  setFormData({ ...formData, plantName: option.value })
                }
                options={plantOptions.map((plant) => ({
                  value: plant.groupName,
                  label: plant.groupName,
                }))}
                styles={customDropdownStyles}
              />
            </div>

            {/* Plant ID */}
            <div className="col-lg-3">
              <label className="label" htmlFor="plantId">Plant ID</label>
              <Select
                value={{ value: formData.plantId, label: formData.plantId }}
                onChange={(option) =>
                  setFormData({ ...formData, plantId: option.value })
                }
                options={plantIds.map((id) => ({ value: id, label: id }))}
                styles={customDropdownStyles}
              />
            </div>

            {/* Date */}
            <div className="col-lg-5">
              <label className="label" htmlFor="date">Date</label>
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

            {/* From Time */}
            <div className="col-lg-3">
              <label className="label" htmlFor="fromTime">From Time</label>
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

            {/* To Time */}
            <div className="col-lg-3">
              <label className="label" htmlFor="toTime">To Time</label>
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

            {/* Faculty Mail */}
            <div className="col-lg-5">
              <label className="label" htmlFor="facultyMail">Faculty Mail</label>
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

            {/* Meeting Description */}
            <div className="col-lg-6">
              <label className="label" htmlFor="meetingDescription">Meeting Description</label>
              <input
                type="text"
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

            {/* Participants List */}
            <div className="col-lg-12">
              <label className="label" htmlFor="participantsList">Participants List</label>
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
                styles={customDropdownStyles}
              />
            </div>
            </div>
            <div className="d-flex flex-wrap justify-content-between">
              {/* Cancel Button */}
              <button
                type="button"
                className="btn-schedule"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              {/* Submit Button */}
              <button type="submit" className="btn-login">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

