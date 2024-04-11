import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ExpendedComponent from './ExpendedComponent';
import FilterComponent from './FilterComponent';
import DateRangeFilter from '../DateRange/DateRange';
import { expandTableCustomStyles } from '../UI/Table';

export default function Table({  trainings, handleEdit, handleDelete, handleChangeDateRange,setFilteredDates, filteredDates } ) {
  const [filterText, setFilterText] = useState('');
  // const [filteredDates, setFilteredDates] = useState({
  //   startDate: new Date().setHours(0, 0, 0),
  //   endDate: new Date().setHours(23, 59, 59)
  // });

  const handleFilter = ({ startDate, endDate }) => {
    setFilteredDates({ startDate, endDate });
  };

  useEffect(() => {
    handleChangeDateRange(filteredDates);
  }, [filteredDates]);

  const filteredItems = trainings?.filter((row) => {
    const { projectName, trainerName, plantName, plantId } = row;
    const searchText = filterText.toLowerCase();
    return (
      projectName.toLowerCase().includes(searchText) ||
      trainerName.toLowerCase().includes(searchText) ||
      plantName.toLowerCase().includes(searchText) ||
      plantId.toLowerCase().includes(searchText)
    );
  });

  const columns = [
    {
      name: 'Training Topic',
      selector: (row) => row.projectName,
    },
    {
      name: 'Trainer Name',
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
      name: 'Date',
      selector: (row) => new Date(row.date).toLocaleDateString('SV-se'),
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
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row._id)}>Delete</button>
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
          <DateRangeFilter onFilter={handleFilter} defaultStartDate={filteredDates.startDate} defaultEndDate={filteredDates.endDate} />
        </div>
      </>
    );
  }, []);

  console.log("s",trainings)

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      customStyles={expandTableCustomStyles}
    />
  );
}


