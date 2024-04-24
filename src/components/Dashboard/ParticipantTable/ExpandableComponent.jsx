import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Report from './Report'

function ExpandableComponent({ employeeId, employeeName, data ,parentTableData}) {
  const [meetings, setMeetings] = useState([]);
 

  useEffect(() => {
    const filteredMeetings = data.filter(
      (item) =>
        item &&
        item.empCodes &&
        item.empCodes.some((emp) =>
          typeof emp === 'string' && emp.includes(`${employeeName} - ${employeeId}`)
        )
    );
    setMeetings(filteredMeetings);
  }, [employeeId, employeeName, data]);

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
      selector: (row) => row.plantName,
    },
    {
      name: "Plant ID",
      selector: (row) => row.plantId,
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
    <DataTable
      columns={columns}
      data={meetings}
      pagination
      subHeader
      subHeaderComponent={<div></div>}
    />
    {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
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


