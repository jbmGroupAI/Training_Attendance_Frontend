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
  }, []); 



    // useEffect(() => {
    //   fetch('http://localhost:3011/v1/employee')
    //     .then(response => response.json())
    //     .then(data => {
    //       // Process data to aggregate by employee name and calculate training count
    //       const aggregatedData = {};
    //       data.forEach(employee => {
    //         const { employeeName, employeeId, trainingId } = employee;
    //         if (!aggregatedData[employeeId]) {
    //           aggregatedData[employeeId] = {
    //             employeeName,
    //             employeeId,
    //             trainingCount: 0
    //           };
    //         }
    //         const uniqueTrainingSessions = new Set();
    //         trainingId.forEach(training => {
    //           uniqueTrainingSessions.add(training._id);
    //         });
    //         aggregatedData[employeeId].trainingCount = uniqueTrainingSessions.size;
    //       });
    //       setData(Object.values(aggregatedData));
    //     })
    //     .catch(error => console.error('Error fetching data:', error));
    // }, []);
  

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
    // {
    //   name: 'Training Count',
    //   selector: 'trainingCount',
    // },
  ];
  return (
    <>
      <Header setShowReport={setShowReport} />
      <DataTable
        columns={columns}
        data={data}
        pagination
        expandableRows
        // expandableRowsComponent={(props) => <ExpandableComponent {...props} data={data}   />}
        expandableRowsComponent={(props) => <ExpandableComponent {...props} data={props.data.trainingId} employeeId={props.data.employeeId} employeeName={props.data.employeeName} parentTableData={props.data}/>}

        
        onRowClicked={(row) => console.log('Row clicked:', row)} // Handle row click event if needed
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              const keyword = e.target.value.toLowerCase();
              setData(data.filter((item) =>
                item.employeeName.toLowerCase().includes(keyword) ||
                item.employeeId.toLowerCase().includes(keyword)
              ));
            }}
          />
        }
      />
    </>
  );
}


// import React, { useState, useEffect } from 'react';
// import Header from '../Header';
// import DataTable from 'react-data-table-component';
// import ExpandableComponent from './ExpandableComponent';

// export default function Index({ setShowReport }) {
//   const [data, setData] = useState([]);
// console.log('gffgf',data)
//   useEffect(() => {
//     // Fetch data from the API when the component mounts
//     fetch('http://localhost:3011/v1/employee')
//       .then(response => response.json())
//       .then(data => {
//         // Process data to aggregate by employee name and calculate meeting count
//         const aggregatedData = {};
//         data.forEach(employee => {
//           const { employeeName, employeeId, trainingId } = employee;
//           if (!aggregatedData[employeeName]) {
//             aggregatedData[employeeName] = {
//               employeeName,
//               employeeId,
//               meetingCount: 0
//             };
//           }
//           const meetingsAttended = new Set();
//           trainingId.forEach(training => {
//             meetingsAttended.add(training._id);
//           });
//           aggregatedData[employeeName].meetingCount = meetingsAttended.size;
//         });
//         setData(Object.values(aggregatedData));
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []); 

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
//       name: 'Meeting Count',
//       selector: 'meetingCount',
//     },
//   ];

//   return (
//     <>
//       <Header setShowReport={setShowReport} />
//       <DataTable
//         columns={columns}
//         data={data}
//         pagination
//         expandableRows
//         expandableRowsComponent={(props) => (
//           <ExpandableComponent
//             {...props}
//             data={props.data ? props.data.trainingId : []} // Assuming `trainingId` holds the array of meetings
//             employeeId={props.data ? props.data.employeeId : ""}
//             employeeName={props.data ? props.data.employeeName : ""}
//             parentTableData={props.data} // Pass the entire employee object if needed
//           />
//         )}
//         // expandableRowsComponent={(props) => <ExpandableComponent {...props} data={props.data.trainingId} employeeId={props.data.employeeId} employeeName={props.data.employeeName} parentTableData={props.data}/>}
//         onRowClicked={(row) => console.log('Row clicked:', row)} // Handle row click event if needed
//       />
//     </>
//   );
// }



