// import React, { useState, useEffect } from 'react';
// import DataTable from 'react-data-table-component';
// import ExpendedComponent from './ExpendedComponent';
// import FilterComponent from './FilterComponent';
// import DateRangeFilter from '../DateRange/DateRange';
// import { expandTableCustomStyles } from '../UI/Table';

// export default function Table({ trainings, handleEdit, handleDelete, handleChangeDateRange, setFilteredDates, filteredDates }) {
//   const [filterText, setFilterText] = useState('');

//   const handleFilter = ({ startDate, endDate }) => {
//     setFilteredDates({ startDate, endDate });
//   };

//   useEffect(() => {
//     handleChangeDateRange(filteredDates);
//   }, [filteredDates]);

//   const filteredItems = trainings?.filter((row) => {
//     const { projectName, trainerName, plantName, plantId } = row;
//     const searchText = filterText.toLowerCase();
//     return (
//       projectName.toLowerCase().includes(searchText) ||
//       trainerName.toLowerCase().includes(searchText) ||
//       plantName.toLowerCase().includes(searchText) ||
//       plantId.toLowerCase().includes(searchText)
//     );
//   });

//   const columns = [
//     {
//       name: 'Training Topic',
//       selector: (row) => row.projectName,
//     },
//     {
//       name: 'Faculty Name',
//       selector: (row) => row.trainerName,
//     },
//     {
//       name: 'Venue',
//       selector: (row) => row.plantName,
//     },
//     {
//       name: 'Plant ID',
//       selector: (row) => row.plantId,
//     },
//     {
//       name: 'Date',
//       selector: (row) => new Date(row.date).toLocaleDateString('en-US', { timeZone: 'UTC' }),
//     },
//     {
//       name: 'From Time',
//       selector: (row) => row.fromTime,
//     },
//     {
//       name: 'To Time',
//       selector: (row) => row.toTime,
//     },
    
//     {
//       name: 'Status',
//       selector: (row) => {
//         const currentTime = new Date();
//         const meetingStartDate = new Date(row.date);
//         const meetingStartTimeParts = row.fromTime.split(":");
//         meetingStartDate.setHours(parseInt(meetingStartTimeParts[0]), parseInt(meetingStartTimeParts[1]), 0, 0);
        
//         const meetingEndDate = new Date(row.date);
//         const meetingEndTimeParts = row.toTime.split(":");
//         meetingEndDate.setHours(parseInt(meetingEndTimeParts[0]), parseInt(meetingEndTimeParts[1]), 0, 0);
    
//         if (currentTime > meetingEndDate) {
//           return <span style={{ color: 'green' }}>Completed</span>;
//         } else if (currentTime >= meetingStartDate) {
//           return <span style={{ color: 'blue' }}>Running</span>;
//         } else {
//           return <span style={{ color: 'black' }}>Not Started</span>;
//         }
//       },
//     },
    
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div style={{ display: 'flex' }} className="action-buttons">
//           <button style={{ marginRight: '5px', padding: '5px 10px', border: 'none', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff' }} onClick={() => handleEdit(row)}>Edit</button>
//           <button style={{ padding: '5px 10px', border: 'none', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff' }} onClick={() => handleDelete(row._id)}>Delete</button>
//         </div>
//       ),
//     },
//   ];

//   const ExpandedComponent = ({ data }) => {
//     return <ExpendedComponent data={data} empCodes={data.empCodes} plantId={data.plantId} />;
//   };

//   const subHeaderComponentMemo = React.useMemo(() => {
//     return (
//       <>
//         <FilterComponent onFilter={(e) => setFilterText(e.target.value)} />
//         <div>
//           <DateRangeFilter
//             onFilter={handleFilter}
//             defaultStartDate={filteredDates.startDate}
//             defaultEndDate={filteredDates.endDate}
//           />
//         </div>
//       </>
//     );
//   }, []);

//   return (
//     <DataTable
//       columns={columns}
//       data={filteredItems}
//       expandableRows
//       expandableRowsComponent={ExpandedComponent}
//       pagination
//       subHeader
//       subHeaderComponent={subHeaderComponentMemo}
//       customStyles={expandTableCustomStyles}
//     />
//   );
// }


import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ExpendedComponent from './ExpendedComponent';
import FilterComponent from './FilterComponent';
import DateRangeFilter from '../DateRange/DateRange';
import { expandTableCustomStyles } from '../UI/Table';

export default function Table({ trainings, handleEdit, handleDelete, handleChangeDateRange, setFilteredDates, filteredDates }) {
  const [filterText, setFilterText] = useState('');

  const handleFilter = ({ startDate, endDate }) => {
    setFilteredDates({ startDate, endDate });
  };

  useEffect(() => {
    handleChangeDateRange(filteredDates);
  }, [filteredDates]);

  
  const columns = [
    {
      name: 'Training Topic',
      selector: (row) => row.projectName,
    },
    {
      name: 'Faculty Name',
      selector: (row) => row.trainerName,
    },
    {
      name: 'Venue',
      selector: (row) => row.plantName,
    },
    {
      name: 'Plant ID',
      selector: (row) => row.plantId,
    },
    {
      name: 'Meeting hours',
      selector: (row) => row.totalMeetingTime,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
    {
      name: 'Date',
      selector: (row) => new Date(row.date).toLocaleDateString('en-US', { timeZone: 'UTC' }),
    },
    {
      name: 'From Time',
      selector: (row) => row.fromTime,
    },
    {
      name: 'To Time',
      selector: (row) => row.toTime,
    },
  
    {
      name: 'Actions',
      cell: (row) => (
        <div style={{ display: 'flex' }} className="action-buttons">
          <button style={{ marginRight: '5px', padding: '5px 10px', border: 'none', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff' }} onClick={() => handleEdit(row)}>Edit</button>
          <button style={{ padding: '5px 10px', border: 'none', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff' }} onClick={() => handleDelete(row._id)}>Delete</button>
        </div>
      ),
    },
  ];

  const ExpandedComponent = ({ data }) => {
    return <ExpendedComponent data={data} empCodes={data.empCodes} plantId={data.plantId} />;
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <>
        <FilterComponent onFilter={(e) => setFilterText(e.target.value)} />
        <div>
          <DateRangeFilter
            onFilter={handleFilter}
            defaultStartDate={filteredDates.startDate}
            defaultEndDate={filteredDates.endDate}
          />
        </div>
      </>
    );
  }, []);

  return (
    <DataTable
      columns={columns}
      data={trainings}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      customStyles={expandTableCustomStyles}
    />
  );
}
