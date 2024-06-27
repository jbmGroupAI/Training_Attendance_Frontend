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
          value: empCode.empOnlyId,
          label: `${empCode.empFName} ${empCode.empOnlyId}`,
          empFName: empCode.empFName,
          empOnlyId: empCode.empOnlyId,
          plantIds: empCode.plantIds,
          _id: empCode._id,
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
    trainingLink: selectedEmployee ? selectedEmployee.trainingLink : "",
  });

  const [plantOptions, setPlantOptions] = useState([]);
  const [plantIds, setPlantIds] = useState([]);
  const [employeeCodes, setEmployeeCodes] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    // Fetch plant data
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

    // Fetch project names data
    axios
      .get(`${config.url}/topics`)
      .then((response) => {
        const projectData = response.data.map((project) => ({
          value: project.name,
          label: project.name,
        }));
        setProjectOptions(projectData);
      })
      .catch((error) => {
        console.error("Error fetching project names:", error);
      });
  }, []);

  useEffect(() => {
    // Handle plant IDs update
    const selectedPlants = formData.plantName.map((plant) => plant.value);
    const filteredIds = plantOptions
      .filter((plant) => selectedPlants.includes(plant.groupName))
      .flatMap((plant) => plant.groupMembers.filter((id) => id !== ""));

    setPlantIds(filteredIds.map((id) => ({ value: id, label: id })));
  }, [formData.plantName, plantOptions]);

  useEffect(() => {
    // Handle employee codes update
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
      participantEmails: formData.empCodes.map((code) => {
        const employee = employeeCodes.find(
          (emp) => emp.empOnlyId === code.empOnlyId
        );
        return employee ? employee?.userInfo?.email : code.empOnlyId;
      }),
    };
    console.log("updatedData", updatedFormData)
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

  const handleProjectNameUpdate = async (newValue) => {
    try {
      const response = await axios.post(`${config.url}/topics`, {
        name: newValue,
      });

      // Update projectOptions state with new project
      const newProject = {
        value: response.data._id,
        label: response.data.projectName,
      };
      setProjectOptions([...projectOptions, newProject]);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${newValue} added successfully.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding project:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add project.",
        showConfirmButton: true,
      });
    }
  };

  const handleEmpCodesChange = (selectedOptions) => {
    const updatedEmpCodes = selectedOptions || [];
  
    const updatedParticipantEmails = updatedEmpCodes.map((option) => {
      const employee = employeeCodes.find(
        (emp) => emp.empOnlyId === option.value
      );
      return {
        // value: employee ? employee.email : option.value,
        // label: employee ? employee.email : option.label,
        value: employee?.userInfo?.email, label: employee?.userInfo?.email,
      };
    });
    console.log("empcodes", updatedEmpCodes, selectedOptions)
    setFormData({
      ...formData,
      empCodes: updatedEmpCodes,
      participantEmails: updatedParticipantEmails,
    });
  };

  return (
    <div className="container-fluid p-0">
      {/* <Header setIsEditing={setIsEditing} handleChangeDateRange={() => {}} /> */}
      <div className="mx-5 my-3">
        <form onSubmit={handleUpdate}>
          <h5>Edit Meeting</h5>
          <div className="bg-white p-5 rounded-4 border">
            <div className="d-flex justify-content-between flex-wrap gap-2">
              <div className="col-lg-3">
                <label className="label" htmlFor="projectName">
                  Project Name
                </label>
                <Select
                  id="projectName"
                  value={{
                    value: formData.projectName,
                    label: formData.projectName,
                  }}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      projectName: selectedOption.value,
                    })
                  }
                  options={projectOptions}
                  styles={customDropdownStyles}
                  isClearable
                  onCreateOption={handleProjectNameUpdate}
                />
              </div>

              <div className="col-lg-3">
                <label className="label" htmlFor="trainerName">
                  Trainer Name
                </label>
                <input
                  className="input-field"
                  id="trainerName"
                  type="text"
                  value={formData.trainerName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trainerName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-lg-3">
                <label className="label" htmlFor="plantName">
                  Plant Names
                </label>
                <Select
                  id="plantName"
                  value={formData.plantName}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      plantName: selectedOptions || [],
                    })
                  }
                  options={plantOptions.map((plant) => ({
                    value: plant.groupName,
                    label: plant.groupName,
                  }))}
                  styles={customDropdownStyles}
                  isMulti
                />
              </div>

              <div className="col-lg-2">
                <label className="label" htmlFor="plantId">
                  Plant IDs
                </label>
                <Select
                  id="plantId"
                  value={formData.plantId}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      plantId: selectedOptions || [],
                    })
                  }
                  options={plantIds}
                  styles={customDropdownStyles}
                  isMulti
                />
              </div>
            </div>

            <div className="d-flex justify-content-between flex-wrap mt-2 gap-2">
              <div className="col-lg-2">
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-lg-2">
                <label className="label" htmlFor="fromTime">
                  From Time
                </label>
                <input
                  type="time"
                  className="input-field"
                  id="fromTime"
                  value={formData.fromTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fromTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-lg-2">
                <label className="label" htmlFor="toTime">
                  To Time
                </label>
                <input
                  type="time"
                  className="input-field"
                  id="toTime"
                  value={formData.toTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      toTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-lg-2">
                <label className="label" htmlFor="facultyMail">
                  Faculty Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  id="facultyMail"
                  value={formData.facultyMail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      facultyMail: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="d-flex justify-content-between flex-wrap mt-2 gap-2">
              <div className="col-lg-4">
                <label className="label" htmlFor="meetingDescription">
                  Meeting Description
                </label>
                <textarea
                  className="input-field"
                  id="meetingDescription"
                  rows="3"
                  value={formData.meetingDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      meetingDescription: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-lg-4">
                <label className="label" htmlFor="empCodes">
                  Participant List
                </label>
                <Select
                  id="empCodes"
                  value={formData.empCodes}
                  onChange={handleEmpCodesChange}
                  options={employeeCodes.map((employee) => ({
                    value: employee.empOnlyId,
                    label: `${employee.empFName} ${employee.empOnlyId}`,
                    empFName: employee.empFName,
                    empOnlyId: employee.empOnlyId,
                    plantIds: employee.plant,
                    _id: employee._id,
                  }))}
                  styles={customDropdownStyles}
                  isMulti
                />
              </div>
            </div>

            <div className="d-flex justify-content-between flex-wrap mt-2 gap-2">
              <div className="col-lg-4">
                <label className="label" htmlFor="participantEmails">
                  Participant Emails
                </label>
                <Select
                  id="participantEmails"
                  value={formData.participantEmails}
                  onChange={(selectedOptions) =>
                    setFormData({
                      ...formData,
                      participantEmails: selectedOptions || [],
                    })
                  }
                  options={formData.empCodes.map((employee) => {
                    const empData = employeeCodes.find(
                      (emp) => emp.empOnlyId === employee.value
                    );
                    console.log("empdata",empData,empData?.userInfo?.email)
                    return {
                      value: empData?.userInfo?.email ,
                      label: empData?.userInfo?.email ,
                    };
                  })}
                  styles={customDropdownStyles}
                  isMulti
                />
              </div>
            </div>

            <div className="d-flex justify-content-between flex-wrap mt-2 gap-2">
              <div className="col-lg-4">
                <label className="label" htmlFor="trainingLink">
                  Training Link
                </label>
                <input
                  type="url"
                  className="input-field"
                  id="trainingLink"
                  value={formData.trainingLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trainingLink: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end gap-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
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