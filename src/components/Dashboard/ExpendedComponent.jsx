// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import axios from 'axios';
// import { expandCustomStyles } from '../UI/Table';
// import { saveAs } from 'file-saver';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import Test from './Test';

// function formatDateToISOString(date) {
//   if (!(date instanceof Date)) {
//     throw new Error('Input must be a Date object');
//   }

//   const pad = (num) => String(num).padStart(2, '0');

//   const year = date.getFullYear();
//   const month = pad(date.getMonth() + 1); // Months are 0-based
//   const day = pad(date.getDate());
//   const hours = pad(date.getHours());
//   const minutes = pad(date.getMinutes());
//   const seconds = pad(date.getSeconds());

//   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
// }

// export default function ExpandedComponent({ data, empCodes }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [employeeData, setEmployeeData] = useState([]);

//   console.log("hshshhs",empCodes)

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://fr.thirdeye-ai.com/face/getFaceInfo', {
//           params: {
//             startDate: formatDateToISOString(new Date('2024-03-04')),
//             endDate: formatDateToISOString(new Date('2024-04-05')),
//             companyId: 'JBMGroup',
//             camId: 'TrainingProgram',
//           },
//         });
//         setEmployeeData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch attendance data');
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const columns = [
//     {
//       name: 'Employee Code',
//       selector: (row) => `${row.empFName[0]} - ${row.empOnlyId}`,
//     },
//     {
//       name: 'Plant ID',
//       selector:(row) =>  row.empPlantId  ? row.empPlantId : ""
//     },
//     {
//       name: 'Designation',
//       selector: (row) =>  row.department  ? row.department : ""
//     },
//     {
//       name: 'Punch In',
//       selector: (row) => row.timeInfo  ?  (row.timeInfo.length > 0 ? row.timeInfo[0].time : '') : "",
//     },
//     {
//       name: 'Punch Out',
//       selector: (row) => row.timeInfo  ? 
//         (row.timeInfo.length > 0 ? row.timeInfo[row.timeInfo.length - 1].time : ''):"",
//     },
//   ];

//   // Filter employeeData based on empCodes
//   // const employeeData = employeeData.filter((emp) =>
//   //   empCodes.includes(`${emp.empFName[0]} - ${emp.empOnlyId}`)
//   // );



  
//   const allEmpData = empCodes.map((emp)=>{
//     const empFName = []
//     const [fName, empOnlyId] = emp.split(' - ') 
//       empFName.push(fName)
//       return {empFName, empOnlyId};
//   })
//   const finalData = [...allEmpData, ...employeeData]

//   return (
//     <>
//       <DataTable
//         columns={columns}
//         data={finalData}
//         customStyles={expandCustomStyles}
//         pagination
//         subHeader
//         subHeaderComponent={<div></div>}
//       />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div className='d-flex justify-content-end'>
//         <PDFDownloadLink
//           document={<Test upperData={data} expandedData={employeeData} />}
//           fileName='Report.pdf'
//         >
//           <button disabled={loading} className='btn-login m-2'>
//             {loading ? 'Downloading...' : 'Download PDF'}
//           </button>
//         </PDFDownloadLink>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { expandCustomStyles } from '../UI/Table';
import { saveAs } from 'file-saver';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Test from './Test';
import moment from 'moment';

function formatDateToISOString(date) {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a Date object');
  }

  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// export default function ExpandedComponent({ data, empCodes }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [employeeData, setEmployeeData] = useState([]);

//   console.log("hshshhs",empCodes)

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://fr.thirdeye-ai.com/face/getFaceInfo', {
//           params: {
//             startDate: formatDateToISOString(new Date('2024-03-04')),
//             endDate: formatDateToISOString(new Date('2024-04-05')),
//             companyId: 'JBMGroup',
//             camId: 'TrainingProgram',
//           },
//         });
//         setEmployeeData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch attendance data');
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const columns = [
//     {
//       name: 'Employee Code',
//       selector: (row) => `${row.empFName[0]} - ${row.empOnlyId}`,
//     },
//     {
//       name: 'Plant ID',
//       selector:(row) =>  row.empPlantId  ? row.empPlantId : ""
//     },
//     {
//       name: 'Designation',
//       selector: (row) =>  row.department  ? row.department : ""
//     },
//     {
//       name: 'Punch In',
//       selector: (row) => row.timeInfo  ?  (row.timeInfo.length > 0 ? row.timeInfo[0].time : '') : "",
//     },
//     {
//       name: 'Punch Out',
//       selector: (row) => row.timeInfo  ? 
//         (row.timeInfo.length > 0 ? row.timeInfo[row.timeInfo.length - 1].time : ''):"",
//     },
//   ];

//   // Filter out duplicates from empCodes
//   const uniqueEmpCodes = [...new Set(empCodes)];

//   // Create finalData array by merging empCodes and employeeData
//   const allEmpData = uniqueEmpCodes.map((emp)=>{
//     const empFName = []
//     const [fName, empOnlyId] = emp.split(' - ') 
//       empFName.push(fName)
//       return {empFName, empOnlyId};
//   });
//   const finalData = [...allEmpData, ...employeeData];

//   // Filter finalData to remove duplicate employee codes
//   const uniqueFinalData = finalData.filter((emp, index, self) =>
//     index === self.findIndex((e) => e.empOnlyId === emp.empOnlyId)
//   );

//   return (
//     <>
//       <DataTable
//         columns={columns}
//         data={uniqueFinalData}
//         customStyles={expandCustomStyles}
//         pagination
//         subHeader
//         subHeaderComponent={<div></div>}
//       />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div className='d-flex justify-content-end'>
//         <PDFDownloadLink
//           document={<Test upperData={data} expandedData={employeeData} />}
//           fileName='Report.pdf'
//         >
//           <button disabled={loading} className='btn-login m-2'>
//             {loading ? 'Downloading...' : 'Download PDF'}
//           </button>
//         </PDFDownloadLink>
//       </div>
//     </>
//   );
// }

// export default function ExpandedComponent({ data, empCodes }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [employeeData, setEmployeeData] = useState([]);

//   console.log("hshshhs", empCodes);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://fr.thirdeye-ai.com/face/getFaceInfo', {
//           params: {
//             startDate: formatDateToISOString(new Date('2024-03-04')),
//             endDate: formatDateToISOString(new Date('2024-04-05')),
//             companyId: 'JBMGroup',
//             camId: 'TrainingProgram',
//           },
//         });
//         setEmployeeData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch attendance data');
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const columns = [
//     {
//       name: 'Employee Code',
//       selector: (row) => `${row.empFName[0]} - ${row.empOnlyId}`,
//     },
//     {
//       name: 'Plant ID',
//       selector: (row) => row.empPlantId ? row.empPlantId : ""
//     },
//     {
//       name: 'Designation',
//       selector: (row) => row.department ? row.department : ""
//     },
//     {
//       name: 'Punch In',
//       selector: (row) => row.timeInfo ?
//         (row.timeInfo.length > 0 ? row.timeInfo[0].time : '') : "",
//     },
//     {
//       name: 'Punch Out',
//       selector: (row) => row.timeInfo ?
//         (row.timeInfo.length > 0 ? row.timeInfo[row.timeInfo.length - 1].time : '') : "",
//     },
//   ];

//   // Create a map to store employee data with employee codes as keys
//   const employeeMap = {};

//   // Populate employeeMap with empCodes data
//   empCodes.forEach((emp) => {
//     const [fName, empOnlyId] = emp.split(' - ');
//     employeeMap[empOnlyId] = { empFName: [fName], empOnlyId };
//   });

//   // Override existing employee data with new data from employeeData
//   employeeData.forEach((emp) => {
//     employeeMap[emp.empOnlyId] = emp;
//   });

//   // Convert employeeMap to array
//   const finalData = Object.values(employeeMap);

//   return (
//     <>
//       <DataTable
//         columns={columns}
//         data={finalData}
//         customStyles={expandCustomStyles}
//         pagination
//         subHeader
//         subHeaderComponent={<div></div>}
//       />
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div className='d-flex justify-content-end'>
//         <PDFDownloadLink
//           document={<Test upperData={data} expandedData={employeeData} />}
//           fileName='Report.pdf'
//         >
//           <button disabled={loading} className='btn-login m-2'>
//             {loading ? 'Downloading...' : 'Download PDF'}
//           </button>
//         </PDFDownloadLink>
//       </div>
//     </>
//   );
// }


export default function ExpandedComponent({ data, empCodes, selectedPlantId,plantId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  console.log("Selected", data);
  const date = moment(data.date).format("YYYY-MM-DD")
  const startTime = `${date}T${data.fromTime}:00.000Z`
  const endTime = date+"T"+data?.toTime+":00.000Z"
  console.log(startTime , endTime)

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://fr.thirdeye-ai.com/face/getFaceInfo', {
          params: {
            plantId:plantId,
            startDate: startTime,
            endDate: endTime,
            companyId: 'JBMGroup',
            camId: 'TrainingProgram',
          },
        });
        setEmployeeData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch attendance data');
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const columns = [
    {
      name: 'Employee Code',
      selector: (row) => `${row.empFName[0]} - ${row.empOnlyId}`,
    },
    {
      name: 'Plant ID',
      selector: (row) => row.empPlantId ? row.empPlantId : ""
    },
    {
      name: 'Designation',
      selector: (row) => row.department ? row.department : ""
    },
    {
      name: 'Punch In',
      selector: (row) => row.timeInfo ?
        (row.timeInfo.length > 0 ? row.timeInfo[0].time : '') : "",
    },
    {
      name: 'Punch Out',
      selector: (row) => row.timeInfo ?
        (row.timeInfo.length > 0 ? row.timeInfo[row.timeInfo.length - 1].time : '') : "",
    },
  ];

  const employeeMap = {};

  // Populate employeeMap with empCodes data
  empCodes.forEach((emp) => {
    const [fName, empOnlyId] = emp.split(' - ');
    employeeMap[empOnlyId] = { empFName: [fName], empOnlyId };
  });

  // Override existing employee data with new data from employeeData
  employeeData.forEach((emp) => {
    employeeMap[emp.empOnlyId] = emp;
  });

  // Convert employeeMap to array
  const finalData = Object.values(employeeMap);

  return (
    <>
      <DataTable
        columns={columns}
        data={finalData} // Use finalData instead of filteredEmployeeData
        customStyles={expandCustomStyles}
        pagination
        subHeader
        subHeaderComponent={<div></div>}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='d-flex justify-content-end'>
        <PDFDownloadLink
          document={<Test upperData={data} expandedData={employeeData} />}
          fileName='Report.pdf'
        >
          <button disabled={loading} className='btn-login m-2'>
            {loading ? 'Downloading...' : 'Download PDF'}
          </button>
        </PDFDownloadLink>
      </div>
    </>
  );
}
