// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import { saveAs } from "file-saver";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Test from "./Test";
// import moment from "moment";
// import { expandCustomStyles } from "../UI/Table";

// function ExpandedComponent({ data, empCodes, plantIds }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [employeeData, setEmployeeData] = useState([]);

//   const date = moment(data.date).format("YYYY-MM-DD");
//   const startTime = `${date}T${data.fromTime}:00.000Z`;
//   const endTime = date + "T" + data?.toTime + ":00.000Z";

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         setLoading(true);
//        // http://jbmgroup.fr.thirdeye-ai.com/face/getFaceInfo?startDate=2024-06-14T00:00:00.001Z&endDate=2024-06-14T23:59:59.059Z&frGroupName=ThirdEye%20AI&companyId=JBMGroup&frGroup=frAttendance&filterBy=mac&machineId=666c142fb9414542a36859b4&allPunch=true
//         // const response = await axios.get(
//         //   "http://jbmgroup.fr.thirdeye-ai.com/face/getFaceInfo",
//         //   {
//         //     params: {
//         //       // plantId: plantIds,
//         //       startDate: startTime,
//         //       endDate: endTime,
//         //       companyId: "JBMGroup",
//         //       machineId:"666c142fb9414542a36859b4",
//         //       mac:"666c142fb9414542a36859b4",
//         //       allPunch:"true"
//         //     },
//         //   }
//         // );

//         const response = await axios.get(
//           "http://jbmgroup.fr.thirdeye-ai.com/face/getFaceInfo",
//           {
//             params: {
//               startDate: startTime,
//               endDate: endTime,
//               frGroupName: "ThirdEye AI",
//               companyId: "JBMGroup",
//               frGroup: "frAttendance",
//               filterBy: "mac",
//               machineId: "666c142fb9414542a36859b4",
//               mac: "666c142fb9414542a36859b4",
//               allPunch: "true"
//             },
//           }
//         );

//         setEmployeeData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch attendance data");
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const columns = [
//     {
//       name: "Participant List",
//       selector: (row) => `${row.empFName[0]} - ${row.empOnlyId}`,
//     },
//     {
//       name: "Plant ID",
//       selector: (row) => (row.empPlantId ? row.empPlantId : ""),
//     },
//     {
//       name: "Designation",
//       selector: (row) => (row.department ? row.department : ""),
//     },
//     {
//       name: "Punch In",
//       selector: (row) =>
//         row.timeInfo && row.timeInfo.length > 0
//           ? formatTime(row.timeInfo[0].time)
//           : "",
//     },
//     {
//       name: "Punch Out",
//       selector: (row) =>
//         row.timeInfo && row.timeInfo.length > 0
//           ? formatTime(row.timeInfo[row.timeInfo.length - 1].time)
//           : "",
//     },
//     {
//       name: "Category",
//       selector: (row) => (row.planned ? "Planned" : "Unplanned"),
//     },
//   ];

//   function formatTime(date) {
//     const dateTime = new Date(date);
//     dateTime.setHours(dateTime.getHours() - 5);
//     dateTime.setMinutes(dateTime.getMinutes() - 30);

//     const formattedTime = `${dateTime.getHours()}:${String(
//       dateTime.getMinutes()
//     ).padStart(2, "0")}`;

//     return formattedTime;
//   }

//   const employeeMap = {};
// console.log("jjdjjd",employeeMap)
//   empCodes.forEach((emp) => {
//     //  const [fName, empOnlyId] = emp.split(" - ");
//     const {empFName, empOnlyId} = emp

// //     const fName = typeof emp === 'string' ? emp.split(" - ")[0] : '';
// // const empOnlyId = typeof emp === 'string' ? emp.split(" - ")[1] : '';
//     employeeMap[empOnlyId] = {
//       empFName: [empFName],
//       empOnlyId,
//       _id: `${empFName}_${empOnlyId}`,
//       planned: true,
//     };
//   });

//   employeeData.forEach((emp) => {
//     if (!employeeMap[emp.empOnlyId]) {
//       emp.planned = false;
//     } else {
//       emp.planned = true;
//     }
//     employeeMap[emp.empOnlyId] = emp;
//   });

//   const finalData = Object.values(employeeMap);

//   return (
//     <>
//       <DataTable
//         columns={columns}
//         data={finalData}
//         pagination
//         subHeader
//         customStyles={expandCustomStyles}
//         subHeaderComponent={<div></div>}
//       />
//     </>
//   );
// }

// export default ExpandedComponent;

// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import axios from "axios";
// import moment from "moment";
// import { expandCustomStyles } from "../UI/Table";

// function ExpandedComponent({ data, empCodes, plantIds }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [employeeData, setEmployeeData] = useState([]);

//   const date = moment(data.date).format("YYYY-MM-DD");
//   const startTime = `${date}T${data.fromTime}:00.000Z`;
//   const endTime = date + "T" + data?.toTime + ":00.000Z";

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         setLoading(true);

//         const response = await axios.get(
//           "http://jbmgroup.fr.thirdeye-ai.com/face/getFaceInfo",
//           {
//             params: {
//               startDate: startTime,
//               endDate: endTime,
//               frGroupName: "ThirdEye AI",
//               companyId: "JBMGroup",
//               frGroup: "frAttendance",
//               filterBy: "mac",
//               machineId: "666c142fb9414542a36859b4",
//               mac: "666c142fb9414542a36859b4",
//               allPunch: "true"
//             },
//           }
//         );

//         setEmployeeData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError("Failed to fetch attendance data");
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const columns = [
//     {
//       name: "Participant List",
//       selector: (row) => `${row.empFName[0]} - ${row.empOnlyId}`,
//     },
//     {
//       name: "Plant ID",
//       selector: (row) => (row.empPlantId ? row.empPlantId : ""),
//     },
//     {
//       name: "Designation",
//       selector: (row) => (row.department ? row.department : ""),
//     },
//     {
//       name: "Punch In",
//       selector: (row) =>
//         row.timeInfo && row.timeInfo.length > 0
//           ? formatTime(row.timeInfo[0].time)
//           : "",
//     },
//     {
//       name: "Punch Out",
//       selector: (row) =>
//         row.timeInfo && row.timeInfo.length > 0
//           ? formatTime(row.timeInfo[row.timeInfo.length - 1].time)
//           : "",
//     },
//     {
//       name: "Category",
//       selector: (row) => (row.planned ? "Planned" : "Unplanned"),
//     },
//   ];

//   function formatTime(date) {
//     const dateTime = new Date(date);
//     dateTime.setHours(dateTime.getHours() - 5);
//     dateTime.setMinutes(dateTime.getMinutes() - 30);

//     const formattedTime = `${dateTime.getHours()}:${String(
//       dateTime.getMinutes()
//     ).padStart(2, "0")}`;

//     return formattedTime;
//   }

//   const employeeMap = {};
  
//   empCodes.forEach((emp) => {
//     const {empFName, empOnlyId} = emp;
//     employeeMap[empOnlyId] = {
//       empFName: [empFName],
//       empOnlyId,
//       _id: `${empFName}_${empOnlyId}`,
//       planned: true,
//     };
//   });

//   employeeData.forEach((emp) => {
//     if (!employeeMap[emp.empOnlyId]) {
//       emp.planned = false;
//     } else {
//       emp.planned = true;
//     }
//     employeeMap[emp.empOnlyId] = emp;
//   });

//   const finalData = Object.values(employeeMap);

//   return (
//     <>
//       <DataTable
//         columns={columns}
//         data={finalData}
//         pagination
//         subHeader
//         customStyles={expandCustomStyles}
//         subHeaderComponent={<div></div>}
//       />
//     </>
//   );
// }

// export default ExpandedComponent;

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import moment from "moment";
import { expandCustomStyles } from "../UI/Table";

function ExpandedComponent({ data, empCodes, plantIds }) {
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
          "http://jbmgroup.fr.thirdeye-ai.com/face/getFaceInfo",
          {
            params: {
              startDate: startTime,
              endDate: endTime,
              frGroupName: "ThirdEye AI",
              companyId: "JBMGroup",
              frGroup: "frAttendance",
              filterBy: "mac",
              machineId: "666c142fb9414542a36859b4",
              mac: "666c142fb9414542a36859b4",
              allPunch: "true"
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
        row.timeInfo && row.timeInfo.length > 1
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

    const formattedTime = `${dateTime.getHours()}:${String(
      dateTime.getMinutes()
    ).padStart(2, "0")}`;

    return formattedTime;
  }

  const employeeMap = {};

  empCodes.forEach((emp) => {
    const { empFName, empOnlyId } = emp;
    employeeMap[empOnlyId] = {
      empFName: [empFName],
      empOnlyId,
      _id: `${empFName}_${empOnlyId}`,
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
