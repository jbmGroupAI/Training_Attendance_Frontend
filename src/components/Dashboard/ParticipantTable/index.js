

import React, { useState, useEffect } from 'react';
import Header from '../Header';
import DataTable from 'react-data-table-component';
import ExpandableComponent from './ExpandableComponent';

export default function Index() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('http://localhost:3011/v1/employee')
      .then(response => response.json())
      .then(data => {
        // Aggregate data to group by unique employeeName and employeeId
        const aggregatedData = {};
        data.forEach(employee => {
          const { employeeName, employeeId, trainingId } = employee;
          const key = `${employeeName}-${employeeId}`;
          if (!aggregatedData[key]) {
            aggregatedData[key] = {
              employeeName,
              employeeId,
              trainingId: [],
            };
          }
          // Concatenate trainingId arrays to include all training sessions for this employee
          aggregatedData[key].trainingId = aggregatedData[key].trainingId.concat(trainingId);
        });
        setData(Object.values(aggregatedData));
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
      name: 'Training Count',
      selector: (row) => row.trainingId.length,
    },
  ];

  return (
    <div className='container-fluid p-0'>
    <Header/>
    <div className='container'>
      <DataTable
        columns={columns}
        data={data}
        pagination
        expandableRows
        expandableRowsComponent={(props) => (
          <ExpandableComponent
            {...props}
            data={props.data.trainingId} // Assuming `trainingId` holds the array of meetings
            employeeId={props.data.employeeId}
            employeeName={props.data.employeeName}
            parentTableData={props.data} // Pass the entire employee object if needed
          />
        )}
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
      </div>
    </div>
  );
}
