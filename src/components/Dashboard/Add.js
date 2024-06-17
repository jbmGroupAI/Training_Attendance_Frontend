import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import Creatable from 'react-select/creatable';
import Header from "./Header";
import config from "../../config.json";
import "../UI/Add.css";
import { useNavigate } from "react-router-dom";
import { customDropdownStyles } from "../UI/Select";

const Add = () => {
  const [projectName, setProjectName] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [plantNames, setPlantNames] = useState([]);
  const [plantIds, setPlantIds] = useState([]);
  const [empCodes, setEmpCodes] = useState([]);
  const [plantOptions, setPlantOptions] = useState([]);
  const [employeeCodes, setEmployeeCodes] = useState([]);
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [facultyMail, setFacultyMail] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [participantEmails, setParticipantEmails] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

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
    if (plantIds.length > 0) {
      const requests = plantIds.map((id) =>
        axios.get(`http://jbmgroup.fr.thirdeye-ai.com/face/getEmpInfo?companyId=JBMGroup&plantId=${id.value}`)
      );

      Promise.all(requests)
        .then((responses) => {
          const resCodes = responses.reduce((acc, response) => {
            return acc.concat(response.data);
          }, []);
          let allEmpCodes = resCodes.reduce((acc, response) => {
            return acc.concat(response.employeeInfo);
          }, []);
          setEmployeeCodes(allEmpCodes);
        })
        .catch((error) => {
          console.error('Error fetching employee data:', error);
        });
    } else {
      setEmployeeCodes([]);
    }
  }, [plantIds]);
  // console.log("selected", selectedEmployee)
  const handleEmpCodeChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => {
      const selectedEmployeeData = employeeCodes.find(
        (emp) => emp.empOnlyId === option.value
      );
      return {
        value: option.value,
        empFName: selectedEmployeeData.empFName,
        label: `${selectedEmployeeData.empFName} - ${option.value}`,
        plant:  selectedEmployeeData.plant
      };
    });
    setEmpCodes(selectedValues);

    const selectedEmails = selectedValues.map((option) => {
      const selectedEmployeeData = employeeCodes.find(
        (emp) => emp.empOnlyId === option.value
      );
      return selectedEmployeeData?.userInfo?.email
        ? { value: selectedEmployeeData.userInfo.email, label: selectedEmployeeData.userInfo.email }
        : null;
    }).filter(email => email !== null);

    setParticipantEmails(selectedEmails);

    if (selectedValues.length === 1) {
      const selectedEmployeeData = employeeCodes.find(
        (emp) => emp.empOnlyId === selectedValues[0].value
      );
      setSelectedEmployee(
        selectedEmployeeData
          ? `${selectedEmployeeData.empFName} - ${selectedValues[0].value}`
          : null
      );
    } else {
      setSelectedEmployee(null);
    }
  };

  const handleParticipantEmailChange = (selectedOptions) => {
    setParticipantEmails(selectedOptions);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      empCodes.length === 0 ||
      !projectName ||
      !trainerName ||
      plantNames.length === 0 ||
      plantIds.length === 0 ||
      !date ||
      !fromTime ||
      !toTime ||
      !facultyMail ||
      !meetingDescription ||
      participantEmails.length === 0
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }
    console.log("empcodes", empCodes)
    const selectedEmpData = empCodes.map((code) => ({
      empOnlyId: code.value,
      empFName: code.empFName,
      plantIds:code.plant
    }));

    const newEmployee = {
      projectName,
      trainerName,
      plantNames: plantNames.map(name => name.value),
      plantIds: plantIds.map(id => id.value),
      empCodes: selectedEmpData,
      date,
      fromTime,
      toTime,
      facultyMail,
      meetingDescription,
      participantEmails: participantEmails.map(email => email.value),
    };
    console.log("new,", newEmployee)
    try {
      const response = await axios.post(`${config.url}/training`, newEmployee);

      if (response.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Added!",
          text: `${projectName}'s data has been Added.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      } else {
        throw new Error('Failed to create meeting');
      }
    } catch (error) {
      console.error("Error adding new employee:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add new employee.",
        showConfirmButton: true,
      });
    }
  };

  const handleVanueChange = (selectedValue) => {
    setPlantNames(selectedValue)
    if (selectedValue.length > 0) {
      const selectedPlantNames = selectedValue.map(name => name.value);
      const selectedPlantIds = plantOptions
        .filter(plant => selectedPlantNames.includes(plant.groupName))
        .reduce((acc, curr) => acc.concat(curr.groupMembers.filter(id => id !== "")), []);
      setPlantIds(selectedPlantIds.map(id => ({ value: id, label: id })));
    } else {
      setPlantIds([]);
    }
  }

  return (
    <div className="container-fluid p-0">
      <Header handleChangeDateRange={() => { }} />
      <div className="container mt-4">
        <form onSubmit={handleAdd}>
          <div><h5>Training Schedule</h5></div>
          <div className="bg-white px-5 py-2 my-4 rounded-4 border">
            <div className="d-flex justify-content-between my-3 p-0 m-0">
              <div className="col-lg-4">
                <label className="label" htmlFor="projectName">
                  Training Topic
                </label>
                <input
                  id="projectName"
                  type="text"
                  name="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="col-lg-3">
                <label className="label" htmlFor="trainerName">
                  Faculty Name
                </label>
                <input
                  id="trainerName"
                  type="text"
                  name="trainerName"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="col-lg-4">
                <label className="label" htmlFor="facultyMail">
                  Faculty Email
                </label>
                <input
                  id="facultyMail"
                  type="email"
                  name="facultyMail"
                  value={facultyMail}
                  onChange={(e) => setFacultyMail(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div className="col-lg-5">
                <label htmlFor="date" className="label">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  className="date-picker"
                />
              </div>
              <div className="col-lg-3">
                <label htmlFor="fromTime" className="label">
                  From Time:
                </label>
                <input
                  id="fromTime"
                  type="time"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  className="date-picker"
                />
              </div>
              <div className="col-lg-3">
                <label htmlFor="toTime" className="label">
                  To Time:
                </label>
                <input
                  id="toTime"
                  type="time"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  className="date-picker"
                />
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-between my-3">
              <div className="col-lg-4">
                <label className="label" htmlFor="plantName">
                  Venue
                </label>
                <Select
                  id="plantName"
                  value={plantNames}
                  onChange={handleVanueChange}
                  options={plantOptions.map((plant) => ({
                    value: plant.groupName,
                    label: plant.groupName,
                  }))}
                  isMulti
                />
              </div>
              <div className="col-lg-4">
                <label className="label" htmlFor="plantId">
                  Plant ID
                </label>
                <Select
                  id="plantId"
                  value={plantIds}
                  onChange={setPlantIds}
                  options={plantIds}
                  isMulti
                />
              </div>
            </div>

            <div className="col-lg-12 my-2">
              <label htmlFor="empCode" className="label">
                Participants List
              </label>
              <Select
                id="empCode"
                value={empCodes}
                styles={customDropdownStyles}
                onChange={handleEmpCodeChange}
                options={employeeCodes?.map((emp) => ({
                  value: emp.empOnlyId,
                  label: `${emp.empFName} - ${emp.empOnlyId}`,
                }))}
                isMulti
              />
            </div>

            <div className="my-3">
              <label className="label" htmlFor="participantEmails">
                Participant Emails
              </label>
              <Creatable
                id="participantEmails"
                value={participantEmails}
                onChange={handleParticipantEmailChange}
                options={employeeCodes?.map((employee) => ({
                  value: employee.userInfo?.email || '',
                  label: employee.userInfo?.email || '',
                })).filter((option) => option.value)}
                isMulti
                closeMenuOnSelect={false}
                className="select-field"
                styles={customDropdownStyles}
                placeholder="Enter or Select Participant Emails"
                isDisabled={selectedEmployee !== null && empCodes.length === 1}
              />
            </div>

            <div className="my-3">
              <label className="label" htmlFor="meetingDescription">
                Description
              </label>
              <textarea
                id="meetingDescription"
                name="meetingDescription"
                value={meetingDescription}
                onChange={(e) => setMeetingDescription(e.target.value)}
                className="input-field textarea"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between my-2">
            <div className="">
              <input
                className="btn-schedule"
                type="button"
                value="Cancel"
                onClick={() => navigate('/')}
              />
            </div>
            <div className="">
              <input type="submit" value="Add" className="btn-login" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
