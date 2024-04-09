// import React from 'react';
// import DataTable from 'react-data-table-component';
// import ExpendedComponent from './ExpendedComponent';
// import FilterComponent from './FilterComponent'; // Make sure to import your FilterComponent
// import { expandCustomStyles, expandTableCustomStyles } from '../UI/Table';

// export default function Table({ employees, handleEdit, handleDelete }) {
//   const columns = [
//     {
//       name: 'Training Topic',
//       selector: (row) => row.projectName,
//     },
//     {
//       name: 'Trainer Name',
//       selector: (row) => row.trainerName,
//     },
//     {
//       name: 'Venue',
//       selector: (row) => row.venue,
//     },
//     {
//       name: 'Plant Code',
//       selector: (row) => row.plantCode,
//     },
//     {
//       name: 'Date',
//       selector: (row) => new Date(row.date).toLocaleDateString('SV-se'),
//     },
//     {
//       name: 'From Time',
//       selector: (row) => row.fromTime,
//     },
//     {
//       name: 'To Time',
//       selector: (row) => row.toTime,
//     },
//   ];

//   const ExpandedComponent = ({ data }) => {
//     return <ExpendedComponent data={data}/>;
//   };

//   const [filterText, setFilterText] = React.useState('');
//   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//   const filteredItems = employees?.filter((row) =>
//     row.plantCode.toLowerCase().includes(filterText.toLowerCase())
//   );

//   const subHeaderComponentMemo = React.useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setResetPaginationToggle(!resetPaginationToggle);
//         setFilterText('');
//       }
//     };

//     return (
//       <div className='row'>
//       <FilterComponent
//         onFilter={(e) => setFilterText(e.target.value)}
//         onClear={handleClear}
//         filterText={filterText}
//       />
//       </div>
//     );
//   }, [filterText, resetPaginationToggle]);

//   return (
//     <DataTable
//       columns={columns}
//       data={filteredItems} // Use filteredItems instead of fakeUsers
//       expandableRows
//       expandableRowsComponent={ExpandedComponent}
//       pagination
//       subHeader
//       subHeaderComponent={subHeaderComponentMemo}
//       customStyles={expandTableCustomStyles}
//     />
//   );
// }

// import React from 'react';
// import DataTable from 'react-data-table-component';
// import ExpendedComponent from './ExpendedComponent';
// import FilterComponent from './FilterComponent'; 
// import { expandTableCustomStyles } from '../UI/Table'; 

// export default function Table({ trainings }) { 
//   const columns = [
//     {
//       name: 'Training Topic',
//       selector: (row) => row.projectName,
//     },
//     {
//       name: 'Trainer Name',
//       selector: (row) => row.trainerName,
//     },
//     {
//       name: 'Venue',
//       selector: (row) => row.venue,
//     },
//     {
//       name: 'Plant Code',
//       selector: (row) => row.plantCode,
//     },
//     {
//       name: 'Date',
//       selector: (row) => new Date(row.date).toLocaleDateString('en-US'), // Update locale if needed
//     },
//     {
//       name: 'From Time',
//       selector: (row) => row.fromTime,
//     },
//     {
//       name: 'To Time',
//       selector: (row) => row.toTime,
//     },
//   ];

//   const ExpandedComponent = ({ data }) => {
//     return <ExpendedComponent data={data}/>;
//   };

//   const [filterText, setFilterText] = React.useState('');
//   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//   const filteredItems = trainings?.filter((row) =>
//     row.plantCode?.toLowerCase().includes(filterText.toLowerCase())
//   );
// console.log("d",filteredItems,trainings)
//   const subHeaderComponentMemo = React.useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setResetPaginationToggle(!resetPaginationToggle);
//         setFilterText('');
//       }
//     };

//     return (
//       <div className='row'>
//         <FilterComponent
//           onFilter={(e) => setFilterText(e.target.value)}
//           onClear={handleClear}
//           filterText={filterText}
//         />
//       </div>
//     );
//   }, [filterText, resetPaginationToggle]);

//   return (
//     <DataTable
//       columns={columns}
//       data={trainings} 
//       expandableRows
//       expandableRowsComponent={ExpandedComponent}
//       pagination
//       subHeader
//       subHeaderComponent={subHeaderComponentMemo}
//       customStyles={expandTableCustomStyles} 
//     />
//   );
// }




// import React from 'react';
// import DataTable from 'react-data-table-component';
// import ExpendedComponent from './ExpendedComponent';
// import FilterComponent from './FilterComponent'; 
// import { expandTableCustomStyles } from '../UI/Table'; 

// export default function Table({ trainings }) { 
//   const columns = [
//     {
//       name: 'Training Topic',
//       selector: (row) => row.projectName,
//     },
//     {
//       name: 'Trainer Name',
//       selector: (row) => row.trainerName,
//     },
//     // {
//     //   name: 'Venue',
//     //   selector: (row) => row.venue,
//     // },
//     {
//       name: 'Plant Name',
//       selector: (row) => row.plantName,
//     },
//     {
//       name: 'Plant ID',
//       selector: (row) => row.plantId,
//     },
//     {
//       name: 'Emp Name/ID',
//       selector: (row) => row.empCodes.join(', '), // Assuming empCodes is an array of strings
//     },
//     // {
//     //   name: 'Plant Code',
//     //   selector: (row) => row.plantCode,
//     // },
//     {
//       name: 'Date',
//       selector: (row) => new Date(row.date).toLocaleDateString('en-US'), // Update locale if needed
//     },
//     {
//       name: 'From Time',
//       selector: (row) => row.fromTime,
//     },
//     {
//       name: 'To Time',
//       selector: (row) => row.toTime,
//     },
//   ];

//   const ExpandedComponent = ({ data }) => {
//     return <ExpendedComponent data={data} />;
//   };

//   const [filterText, setFilterText] = React.useState('');
//   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//   const filteredItems = trainings?.filter((row) =>
//     row.plantCode?.toLowerCase().includes(filterText.toLowerCase())
//   );

//   const subHeaderComponentMemo = React.useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setResetPaginationToggle(!resetPaginationToggle);
//         setFilterText('');
//       }
//     };

//     return (
//       <div className='row'>
//         <FilterComponent
//           onFilter={(e) => setFilterText(e.target.value)}
//           onClear={handleClear}
//           filterText={filterText}
//         />
//       </div>
//     );
//   }, [filterText, resetPaginationToggle]);

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

// import React from 'react';
// import DataTable from 'react-data-table-component';
// import ExpendedComponent from './ExpendedComponent';
// import FilterComponent from './FilterComponent'; 
// import { expandTableCustomStyles } from '../UI/Table'; 

// export default function Table({ trainings }) { 
//   const columns = [
//     {
//       name: 'Training Topic',
//       selector: (row) => row.projectName,
//     },
//     {
//       name: 'Trainer Name',
//       selector: (row) => row.trainerName,
//     },
//     // {
//     //   name: 'Venue',
//     //   selector: (row) => row.venue,
//     // },
//     {
//       name: 'Venue',
//       selector: (row) => row.plantName,
//     },
//     {
//       name: 'Plant ID',
//       selector: (row) => row.plantId,
//     },
//     // {
//     //   name: 'Emp Name/ID',
//     //   selector: (row) => row.empCodes.join(', '), // Assuming empCodes is an array of strings
//     // },
//     // {
//     //   name: 'Plant Code',
//     //   selector: (row) => row.plantCode,
//     // },
//     {
//       name: 'Date',
//       selector: (row) => new Date(row.date).toLocaleDateString('en-US'), // Update locale if needed
//     },
//     {
//       name: 'From Time',
//       selector: (row) => row.fromTime,
//     },
//     {
//       name: 'To Time',
//       selector: (row) => row.toTime,
//     },
//   ];

//   const ExpandedComponent = ({ data }) => {
//     return <ExpendedComponent data={data} empCodes={data.empCodes} />;
//   };

//   const [filterText, setFilterText] = React.useState('');
//   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//   const filteredItems = trainings?.filter((row) =>
//     row.plantCode?.toLowerCase().includes(filterText.toLowerCase())
//   );

//   const subHeaderComponentMemo = React.useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setResetPaginationToggle(!resetPaginationToggle);
//         setFilterText('');
//       }
//     };

//     return (
//       <div className='row'>
//         <FilterComponent
//           onFilter={(e) => setFilterText(e.target.value)}
//           onClear={handleClear}
//           filterText={filterText}
//         />
//       </div>
//     );
//   }, [filterText, resetPaginationToggle]);

//   return (
//     <DataTable
//       columns={columns}
//       data={trainings} 
//       expandableRows
//       expandableRowsComponent={ExpandedComponent}
//       pagination
//       subHeader
//       subHeaderComponent={subHeaderComponentMemo}
//       customStyles={expandTableCustomStyles} 
//     />
//   );
// }

import React from 'react';
import DataTable from 'react-data-table-component';
import ExpendedComponent from './ExpendedComponent';
import FilterComponent from './FilterComponent'; 
import { expandTableCustomStyles } from '../UI/Table'; 

export default function Table({ trainings, handleEdit, handleDelete }) { 
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
    console.log("data", data)
    return <ExpendedComponent data={data} empCodes={data.empCodes} plantId={data.plantId}/>;
  };

  // const [filterText, setFilterText] = React.useState('');
  // const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  // const filteredItems = trainings?.filter((row) =>
  //   row.plantCode?.toLowerCase().includes(filterText.toLowerCase())
  // );

  

  // const subHeaderComponentMemo = React.useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText('');
  //     }
  //   };

  //   return (
  //     <div className='row'>
  //       <FilterComponent
  //         onFilter={(e) => setFilterText(e.target.value)}
  //         onClear={handleClear}
  //         filterText={filterText}
  //       />
  //     </div>
  //   );
  // }, [filterText, resetPaginationToggle]);

  const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = trainings?.filter((row) =>
      row.plantCode?.toLowerCase().includes(filterText.toLowerCase())
    );
  console.log("d",filteredItems,trainings)
    const subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
        }
      };
  
      return (
        <div className='row'>
          <FilterComponent
            onFilter={(e) => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        </div>
      );
    }, [filterText, resetPaginationToggle]);
console.log(trainings,"trainings")
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

// import React from 'react';
// import DataTable from 'react-data-table-component';
// import ExpendedComponent from './ExpendedComponent';
// import FilterComponent from './FilterComponent'; 
// import { expandTableCustomStyles } from '../UI/Table'; 

// export default function Table({ filteredItems, handleEdit, handleDelete }) { 
//   console.log("Filtered Items:", filteredItems);
//   const columns = [
//     {
//       name: 'Training Topic',
//       selector: (row) => row.projectName,
//     },
//     {
//       name: 'Trainer Name',
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
//             name: 'Date',
//             selector: (row) => new Date(row.date).toLocaleDateString('SV-se'),
//           },
//     {
//       name: 'From Time',
//       selector: (row) => row.fromTime,
//     },
//     {
//       name: 'To Time',
//       selector: (row) => row.toTime,
//     },
//     {
//       name: 'Actions',
//       cell: (row) => (
//         <div>
//           <button onClick={() => handleEdit(row)}>Edit</button>
//           <button onClick={() => handleDelete(row._id)}>Delete</button>
//         </div>
//       ),
//     },
//   ];

  

//   const ExpandedComponent = ({ data }) => {
//     return <ExpendedComponent data={data} empCodes={data.empCodes} />;
//   };

//   const [filterText, setFilterText] = React.useState('');
//   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//   // const filteredItems = filter((row) =>
//   //   row.plantName?.toLowerCase().includes(filterText.toLowerCase())
//   // );
//   console.log("Filtered Items:", filteredItems);

//   const subHeaderComponentMemo = React.useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setResetPaginationToggle(!resetPaginationToggle);
//         setFilterText('');
//       }
//     };

//     return (
//       <div className='row'>
//         <FilterComponent
//           onFilter={(e) => setFilterText(e.target.value)}
//           onClear={handleClear}
//           filterText={filterText}
//         />
//       </div>
//     );
//   }, [filterText, resetPaginationToggle]);

//   //console.log("filteritems:", filteredItems);

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

