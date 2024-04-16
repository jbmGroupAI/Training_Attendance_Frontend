// import React, { useState, useEffect } from 'react';
// import Header from '../Header';
// import DataTable from 'react-data-table-component';

// const Index = ({ setShowReport }) => {
//   const [data, setData] = useState([]);
  

//   const handleView = (row) => {
//     console.log('View button clicked for:', row);
//   };

//   const handleDownload = (rowId) => {
//     console.log('Download button clicked for row ID:', rowId);
//   };

//   const columns = [
//     {
//       name: 'Participant Name',
//       selector: (row) => row.employeeName,
//     },
//     {
//       name: 'Emp Code',
//       selector: (row) => row.employeeId,
//     },
//     {
//       name: 'Meeting Count',
//       selector: (row) => row.trainingId,
//     },
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div style={{ display: 'flex' }} className="action-buttons">
//           <button
//             style={{
//               marginRight: '5px',
//               padding: '5px 10px',
//               border: 'none',
//               cursor: 'pointer',
//               backgroundColor: '#007bff',
//               color: '#fff',
//             }}
//             onClick={() => handleView(row)}
//           >
//             View
//           </button>
//           <button
//             style={{
//               marginRight: '5px',
//               padding: '5px 10px',
//               border: 'none',
//               cursor: 'pointer',
//               backgroundColor: '#dc3545',
//               color: '#fff',
//             }}
//             onClick={() => handleDownload(row._id)}
//           >
//             Download
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       {/* Pass setShowReport as a prop to Header */}
//       <Header setShowReport={setShowReport} /> 
//       <DataTable columns={columns} data={data} pagination />
//     </div>
//   );
// }

// export default Index;


// import React, { useState, useEffect } from 'react';
// import Header from '../Header';
// import DataTable from 'react-data-table-component';

// const Index = ({ setShowReport }) => {
//   const [data, setData] = useState([]);
//   const [selectedMeetingDetails, setSelectedMeetingDetails] = useState(null);

//   useEffect(() => {
//     // Fetch data from the API when the component mounts
//     fetch('http://localhost:3011/v1/employee')
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []); // Empty dependency array ensures this effect runs only once on component mount

//   const handleView = (participant) => {
//     // Handle view button click
//     console.log('View button clicked for:', participant);
//     // Set selected meeting details to be displayed
//     setSelectedMeetingDetails(participant.trainingId);
//   };

//   const handleDownload = (rowId) => {
//     // Handle download button click
//     console.log('Download button clicked for row ID:', rowId);
//     // Implement download functionality if needed
//   };

//   const columns = [
//     {
//       name: 'Employee Name',
//       selector: 'employeeName',
//     },
//     {
//       name: 'Employee ID',
//       selector: 'employeeId',
//     },
//     {
//       name: 'Training Count',
//       selector: (row) => row.trainingId.length,
//     },
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div>
//           {row.trainingId.length > 0 && ( // Render view button only if training count > 0
//             <button onClick={() => handleView(row)}>View</button>
//           )}
//           <button onClick={() => handleDownload(row._id)}>Download</button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Header setShowReport={setShowReport} /> 
//       <DataTable columns={columns} data={data} pagination />

//       {/* Render meeting details if selectedMeetingDetails is set */}
//       {selectedMeetingDetails && (
//         <div>
//           <h2>Meeting Details</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Project Name</th>
//                 <th>Trainer Name</th>
//                 <th>Plant Name</th>
//                 <th>Date</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedMeetingDetails.map((meeting, index) => (
//                 <tr key={index}>
//                   <td>{meeting.projectName}</td>
//                   <td>{meeting.trainerName}</td>
//                   <td>{meeting.plantName}</td>
//                   <td>{new Date(meeting.date).toLocaleDateString()}</td>
//                   <td>{meeting.fromTime} - {meeting.toTime}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Index;

// Parent component
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import DataTable from 'react-data-table-component';
import ExpandableComponent from './ExpandableComponent';

export default function Index({ setShowReport }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:3011/v1/employee')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const columns = [
    {
      name: 'Employee Name',
      selector: 'employeeName',
    },
    {
      name: 'Employee ID',
      selector: 'employeeId',
    },
    {
      name: 'Training Count',
      selector: (row) => row.trainingId.length,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button onClick={() => setShowReport(true)}>View Report</button> {/* Show Report Button */}
        </div>
      ),
    },
  ];

  return (
    <>
      <Header setShowReport={setShowReport} />
      <DataTable
        columns={columns}
        data={data}
        pagination
        expandableRows
        //expandableRowsComponent={(props) => <ExpandableComponent {...props} data={data}   />}
        expandableRowsComponent={(props) => <ExpandableComponent {...props} data={props.data.trainingId} employeeId={props.data.employeeId} employeeName={props.data.employeeName} />}

        onRowClicked={(row) => console.log('Row clicked:', row)} // Handle row click event if needed
      />
    </>
  );
}
