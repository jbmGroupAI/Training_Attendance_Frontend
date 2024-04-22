import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ExpendedComponent from './ExpendedComponent';
import FilterComponent from './FilterComponent';
import DateRangeFilter from '../DateRange/DateRange';
import { expandTableCustomStyles } from '../UI/Table';
import Test from './Test';
import axios from 'axios';
import config from '../../config.json'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from "../Reports/Report"
import moment from "moment";

export default function Table({ trainings, handleEdit, handleDelete, handleChangeDateRange, setFilteredDates, filteredDates }) {
  const [filterText, setFilterText] = useState('');

  const handleFilter = ({ startDate, endDate }) => {
    setFilteredDates({ startDate, endDate });
  };
  const handleSendData = (upperData, expandedData, finalData) => {
    console.log('fffff', upperData)
    upperData.allEmployees = finalData;
    axios.post(`${config.url}/training/complete`, upperData)

      .then(response => {
        console.log('Data sent successfully:', response.data);

      })
      .catch(error => {
        console.error('Failed to send data:', error);

      });
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
      name: 'Meeting hours',
      selector: (row) => row.totalMeetingTime,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div style={{ display: 'flex' }} className="action-buttons">
          <button style={{ marginRight: '5px', padding: '3px 8px', border: 'none', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', fontSize: '12px' }} onClick={() => handleEdit(row)}>Edit</button>
          <button style={{ padding: '3px 8px', border: 'none', cursor: 'pointer', backgroundColor: '#dc3545', color: '#fff', fontSize: '12px' }} onClick={() => handleDelete(row._id)}>Delete</button>

        </div>
      ),
    }
  ];

  const ExpandedComponent = ({ data }) => {
    console.log('first', data)
    const [employeeData, setEmployeeData] = useState([])
    const date = moment(data.date).format("YYYY-MM-DD");
    const startTime = `${date}T${data.fromTime}:00.000Z`;
    const endTime = date + "T" + data?.toTime + ":00.000Z";
    useEffect(() => {
      const fetchAttendanceData = async () => {
        try {
          const response = await axios.get(
            "http://fr.thirdeye-ai.com/face/getFaceInfo",
            {
              params: {
                plantId: data.plantId,
                startDate: startTime,
                endDate: endTime,
                companyId: "JBMGroup",
                camId: "TrainingProgram",
              },
            }
          );

          setEmployeeData(response.data);
        } catch (error) {
        }
      };

      fetchAttendanceData();
    }, []);
    const employeeMap = {};
    data?.empCodes?.forEach((emp) => {
      const [fName, empOnlyId] = emp?.split(" - ");
      employeeMap[empOnlyId] = {
        empFName: [fName],
        empOnlyId,
        _id: `${fName}_${empOnlyId}`,
        planned: true,
      };
    });

    employeeData?.forEach((emp) => {
      if (!employeeMap[emp.empOnlyId]) {
        emp.planned = false;
      } else {
        emp.planned = true;
      }
      employeeMap[emp.empOnlyId] = emp;
    });

    const finalData = Object.values(employeeMap);

    console.log("guhuyhuhyu", finalData);
    return <>

      <ExpendedComponent data={data} empCodes={data.empCodes} plantId={data.plantId} />
     {!data.acknowledgement&& <button onClick={() => handleSendData(data, data.empCodes, finalData)}>Send Mail</button>}
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
     {data.acknowledgement&& <div className="d-flex justify-content-end">
        <PDFDownloadLink
          document={<Report data={data}/>}
          fileName="TrainingAttendance.pdf"
          data={data}
        >
          {({ loading }) => (
            <button disabled={loading} className="btn-login m-2">
              {loading ? "Downloading..." : "Download"}
            </button>
          )}
        </PDFDownloadLink>

      </div>}
    </>
  };

  // const ExpandedComponent = ({ data }) => {
  //   return (
  //     <>
  //       <ExpendedComponent data={data} empCodes={data.empCodes} plantId={data.plantId} />
  //       <button onClick={() => handleSendData(data, data.empCodes)}>Send Mail</button>
  //       <div className="d-flex justify-content-end">
  //         {/* Ensure trainingData is available and pass it to FinalData */}
  //         {data.trainingData && (
  //           <PDFDownloadLink
  //             document={<FinalData trainingData={data.trainingData} />}
  //             fileName="TrainingAttendance.pdf"
  //           >
  //             {({ loading }) => (
  //               <button disabled={loading} className="btn-login m-2">
  //                 {loading ? "Downloading..." : "Download"}
  //               </button>
  //             )}
  //           </PDFDownloadLink>
  //         )}
  //       </div>
  //     </>
  //   );
  // };


  const Test1 = ({ upperData, expandedData }) => {
    return <Test upperData={upperData} expandedData={expandedData} />;
  }

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
