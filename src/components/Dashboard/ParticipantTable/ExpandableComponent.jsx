// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import Report from './Report'
// import { expandCustomStyles, expandTableCustomStyles, tableCustomStyles } from "../../UI/Table";

// function ExpandableComponent({ employeeId, employeeName, data ,parentTableData}) {
//   const [meetings, setMeetings] = useState([]);
 

//   useEffect(() => {
//     const filteredMeetings = data.filter(
//       (item) =>
//         item &&
//         item.empCodes &&
//         item.empCodes.some((emp) =>
//           typeof emp === 'string' && emp.includes(`${employeeName} - ${employeeId}`)
//         )
//     );
//     setMeetings(filteredMeetings);
//   }, [employeeId, employeeName, data]);

//   const columns = [
//     {
//       name: "Training Topic",
//       selector: (row) => row.projectName,
//     },
//     {
//       name: "Faculty Name",
//       selector: (row) => row.trainerName,
//     },
//     {
//       name: "Venue",
//       selector: (row) => row.plantName,
//     },
//     {
//       name: "Plant ID",
//       selector: (row) => row.plantId,
//     },
//     {
//       name: "Date",
//       selector: (row) =>
//         new Date(row.date).toLocaleDateString("en-US", { timeZone: "UTC" }),
//     },
//     {
//       name: "From Time",
//       selector: (row) => row.fromTime,
//     },
//     {
//       name: "To Time",
//       selector: (row) => row.toTime,
//     },
//   ];

//   return (
//     <>
//     <div className="">
//     <DataTable
//       columns={columns}
//       data={meetings}
//       pagination
//       subHeader
//       subHeaderComponent={<div></div>}
//       customStyles={expandCustomStyles}
//     />
//     </div>
//     {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
//       <div className='d-flex justify-content-end'>
//         <PDFDownloadLink
//           document={<Report upperData={parentTableData} expandedData={meetings} />}
//           fileName='Individual_Training.pdf'
//         >
//           {({ loading }) => (
//             <button disabled={loading} className='btn-login m-2'>
//               {loading ? 'Downloading...' : 'Download'}
//             </button>
//           )}
//         </PDFDownloadLink>
//       </div>
//       </>
//   );
// }

// export default ExpandableComponent;


import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Report from './Report';
import { expandCustomStyles } from "../../UI/Table";

function ExpandableComponent({ employeeId, employeeName, data, parentTableData }) {

  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredMeetings = data.filter(
      (item) =>
        item &&
        item.empCodes &&
        item.empCodes.filter((emp) =>
          emp.empFName === employeeName && emp.empOnlyId === employeeId
        )
    );
    setMeetings(filteredMeetings);
  }, [employeeId, employeeName, data]);


  console.log("gghhhh",data,meetings)


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = meetings.filter(meeting =>
    meeting.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );
console.log("hhh",meetings)
  const columns = [
    {
      name: "Training Topic",
      selector: (row) => row.projectName,
    },
    {
      name: "Faculty Name",
      selector: (row) => row.trainerName,
    },
    {
      name: "Venue",
      selector: (row) => row.plantNames,
    },
    {
      name: "Plant ID",
      selector: (row) => row.plantIds,
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.date).toLocaleDateString("en-US", { timeZone: "UTC" }),
    },
    {
      name: "From Time",
      selector: (row) => row.fromTime,
    },
    {
      name: "To Time",
      selector: (row) => row.toTime,
    },
  ];

  return (
    <>
      <div className="">
        {/* <input
          type="text"
          placeholder="Search Training Topic"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: '10px', padding: '5px', width: '50%',right:'10px ',position: "absolute"}}
          

        /> */}
        <div className="d-flex justify-content-end">
        <input
  type="text"
  placeholder="Search Training Topic"
  value={searchTerm}
  onChange={handleSearch}
  className="input-field"
  style={{ marginBottom: '10px', padding: '5px', width: '20%', }}
/>
</div>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          subHeader
          subHeaderComponent={<div></div>}
          customStyles={expandCustomStyles}
        />
      </div>
      <div className='d-flex justify-content-end'>
        <PDFDownloadLink
          document={<Report upperData={parentTableData} expandedData={meetings} />}
          fileName='Individual_Training.pdf'
        >
          {({ loading }) => (
            <button disabled={loading} className='btn-login m-2'>
              {loading ? 'Downloading...' : 'Download'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </>
  );
}

export default ExpandableComponent;
