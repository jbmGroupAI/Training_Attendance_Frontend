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
    //   name: 'Actions',
    //   cell: (row) => (
    //     <div>
    //       <button onClick={() => setShowReport(true)}>View Report</button> {/* Show Report Button */}
    //     </div>
    //   ),
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
        //expandableRowsComponent={(props) => <ExpandableComponent {...props} data={data}   />}
        expandableRowsComponent={(props) => <ExpandableComponent {...props} data={props.data.trainingId} employeeId={props.data.employeeId} employeeName={props.data.employeeName} parentTableData={props.data}/>}

        
        onRowClicked={(row) => console.log('Row clicked:', row)} // Handle row click event if needed
      />
    </>
  );
}


