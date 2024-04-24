import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { saveAs } from "file-saver";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Test from "./Test";
import moment from "moment";
import { expandCustomStyles } from "../UI/Table";


function ExpandedComponent({ data, empCodes, plantId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  const date = moment(data.date).format("YYYY-MM-DD");
  const startTime = `${date}T${data.fromTime}:00.000Z`;
  const endTime = date + "T" + data?.toTime + ":00.000Z";

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://fr.thirdeye-ai.com/face/getFaceInfo",
          {
            params: {
              plantId: plantId,
              startDate: startTime,
              endDate: endTime,
              companyId: "JBMGroup",
              camId: "TrainingProgram",
            },
          }
        );

        setEmployeeData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch attendance data");
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const columns = [
    {
      name: "Participant List",
      selector: (row) => `${row.empFName[0]} - ${row.empOnlyId}`,
    },
    {
      name: "Plant ID",
      selector: (row) => (row.empPlantId ? row.empPlantId : ""),
    },
    {
      name: "Designation",
      selector: (row) => (row.department ? row.department : ""),
    },
    {
      name: "Punch In",
      selector: (row) =>
        row.timeInfo && row.timeInfo.length > 0
          ? formatTime(row.timeInfo[0].time)
          : "",
    },
    {
      name: "Punch Out",
      selector: (row) =>
        row.timeInfo && row.timeInfo.length > 0
          ? formatTime(row.timeInfo[row.timeInfo.length - 1].time)
          : "",
    },
    {
      name: "Category",
      selector: (row) => (row.planned ? "Planned" : "Unplanned"),
    },
  ];

  function formatTime(date) {
    const dateTime = new Date(date);
    dateTime.setHours(dateTime.getHours() - 5);
    dateTime.setMinutes(dateTime.getMinutes() - 30);

    // Format the time as desired (e.g., HH:mm)
    const formattedTime = `${dateTime.getHours()}:${String(
      dateTime.getMinutes()
    ).padStart(2, "0")}`;

    return formattedTime;
  }

  const employeeMap = {};

  empCodes.forEach((emp) => {
    const [fName, empOnlyId] = emp.split(" - ");
    employeeMap[empOnlyId] = {
      empFName: [fName],
      empOnlyId,
      _id: `${fName}_${empOnlyId}`,
      planned: true,
    };
  });

  employeeData.forEach((emp) => {
    if (!employeeMap[emp.empOnlyId]) {
      emp.planned = false;
    } else {
      emp.planned = true;
    }
    employeeMap[emp.empOnlyId] = emp;
  });

  const finalData = Object.values(employeeMap);

  

  return (
    <>
      <DataTable
        columns={columns}
        data={finalData}
        pagination
        subHeader
        customStyles={expandCustomStyles}
        subHeaderComponent={<div></div>}
      />
    </>
    
  );
}

export default ExpandedComponent;
