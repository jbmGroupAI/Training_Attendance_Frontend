// import React, { useState, useEffect } from 'react';
// import Header from '../Header';
// import DataTable from 'react-data-table-component';
// import ExpandableComponent from './ExpandableComponent';
// import { expandTableCustomStyles, tableCustomStyles } from '../../UI/Table';
// import config from "../../../config.json";

// export default function Index() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch(`${config.url}/employee`)
//       .then(response => response.json())
//       .then(data => {
//         const aggregatedData = {};
//         data?.forEach(employee => {
//           const { employeeName, employeeId, trainingId, plantIds } = employee;
//           const key = `${employeeName}-${employeeId}`;
//           if (!aggregatedData[key]) {
//             aggregatedData[key] = {
//               employeeName,
//               employeeId,
//               plantIds,
//               trainingId: [],
//             };
//           }
//           aggregatedData[key].trainingId = aggregatedData[key].trainingId.concat(trainingId);
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
//       name: 'Plant ID',
//       selector: 'plantIds',
//     },
//     {
//       name: 'Training Count',
//       selector: (row) => row.trainingId.length,
//     },
//   ];
//   console.log("data", data)
//   return (
//     <div className='container-fluid p-0 '>
//     <div className='mx-2'>
//       <DataTable
//         columns={columns}
//         data={data}
//         pagination
//         expandableRows
//         customStyles={expandTableCustomStyles}
//         expandableRowsComponent={(props) => (
//           <ExpandableComponent
//             {...props}
//             data={props.data.trainingId} 
//             employeeId={props.data.employeeId}
//             employeeName={props.data.employeeName}
//             parentTableData={props.data}
//             />
//         )}
//         onRowClicked={(row) => console.log('Row clicked:', row)} 
//         subHeader
//         subHeaderComponent={
//           <div className='col-3'>
//           <input
//             type="text"
//             placeholder="Search..."
//             onChange={(e) => {
//               const keyword = e.target.value.toLowerCase();
//               setData(data.filter((item) =>
//                 item.employeeName.toLowerCase().includes(keyword) ||
//                 item.employeeId.toLowerCase().includes(keyword)
//               ));
//             }}
//             className='input-field'
//           />
//           </div>
//         }
//       />
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Header from '../Header';
import DataTable from 'react-data-table-component';
import ExpandableComponent from './ExpandableComponent';
import { expandTableCustomStyles, tableCustomStyles } from '../../UI/Table';
import config from "../../../config.json";

export default function Index() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch(`${config.url}/employee`)
      .then(response => response.json())
      .then(data => {
        const aggregatedData = {};
        data?.forEach(employee => {
          const { employeeName, employeeId, trainingId, plantIds } = employee;
          const key = `${employeeName}-${employeeId}`;
          if (!aggregatedData[key]) {
            aggregatedData[key] = {
              employeeName,
              employeeId,
              plantIds,
              trainingId: [],
            };
          }
          aggregatedData[key].trainingId = aggregatedData[key].trainingId.concat(trainingId);
        });
        const finalData = Object.values(aggregatedData);
        setData(finalData);
        setFilteredData(finalData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
      name: 'Plant ID',
      selector: 'plantIds',
    },
    {
      name: 'Training Count',
      selector: (row) => row.trainingId.length,
    },
  ];

  return (
    <div className='container-fluid p-0 '>
      <div className='mx-2'>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          expandableRows
          customStyles={expandTableCustomStyles}
          expandableRowsComponent={(props) => (
            <ExpandableComponent
              {...props}
              data={props.data.trainingId}
              employeeId={props.data.employeeId}
              employeeName={props.data.employeeName}
              parentTableData={props.data}
            />
          )}
          onRowClicked={(row) => console.log('Row clicked:', row)}
          subHeader
          subHeaderComponent={
            <div className='col-3'>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  const keyword = e.target.value.toLowerCase();
                  setFilteredData(data.filter((item) =>
                    item.employeeName.toLowerCase().includes(keyword) ||
                    item.employeeId.toLowerCase().includes(keyword)
                  ));
                }}
                className='input-field'
              />
            </div>
          }
        />
      </div>
    </div>
  );
}

