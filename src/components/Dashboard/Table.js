import React from 'react';
import DataTable from 'react-data-table-component';
import ExpendedComponent from './ExpendedComponent';
import FilterComponent from './FilterComponent'; // Make sure to import your FilterComponent

export default function Table({ employees, handleEdit, handleDelete }) {
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
      selector: (row) => row.venue,
    },
    {
      name: 'Plant Code',
      selector: (row) => row.plantCode,
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
  ];

  const ExpandedComponent = ({ data }) => {
    return <ExpendedComponent data={data} />;
  };

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = employees?.filter((row) =>
    row.plantCode.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems} // Use filteredItems instead of fakeUsers
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
    />
  );
}
