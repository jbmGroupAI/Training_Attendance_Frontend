
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ExpendedComponent from './ExpendedComponent';
import FilterComponent from './FilterComponent';
import DateRangeFilter from '../DateRange/DateRange';
import { expandTableCustomStyles } from '../UI/Table';
import axios from 'axios';
import config from '../../config.json';
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from "../Reports/Report";
import moment from "moment";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Delete, Edit } from '../GlobalSVG/GlobalSVG';
import { Tooltip } from 'react-tooltip';





export default function Table({ trainings, handleEdit, handleDelete, handleChangeDateRange, setFilteredDates, filteredDates }) {
  const [filterText, setFilterText] = useState('');

  const handleFilter = ({ startDate, endDate }) => {
    setFilteredDates({ startDate, endDate });
  };

  const filteredTrainings = trainings.filter((row) => {
    const { projectName, trainerName, plantNames, plantIds, date, fromTime, toTime, totalMeetingTime, status } = row;
    const searchText = filterText.toLowerCase();
    return (
      projectName.toLowerCase().includes(searchText) ||
      trainerName.toLowerCase().includes(searchText) ||
      plantNames.some(plantName => plantName.toLowerCase().includes(searchText)) ||
      plantIds.some(plantId => plantId.toLowerCase().includes(searchText)) ||
      new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC' }).includes(searchText) ||
      fromTime.toLowerCase().includes(searchText) ||
      toTime.toLowerCase().includes(searchText) ||
      totalMeetingTime.toLowerCase().includes(searchText) ||
      status.toLowerCase().includes(searchText)
    );
  });

  const handleSendData = (upperData, expandedData, finalData) => {
    const currentTime = new Date();
    
    upperData.endTraining = currentTime;
    
    const updatedFinalData = finalData.map(employee => ({
      ...employee,
    }));
    
    upperData.allEmployees = updatedFinalData;
    
    console.log('Sending data:', upperData);
    
    axios.post(`${config.url}/training/complete`, upperData)
      .then(response => {
        console.log('Data sent successfully:', response.data);
        toast.success('Report is available after the acknowledgement');
      })
      .catch(error => {
        console.error('Failed to send data:', error);
        toast.error('Failed to send data');
      });
  };
  
  
  

  useEffect(() => {
    handleChangeDateRange(filteredDates);
  }, [filteredDates]);

  const columns = [
    { name: 'Training Topic', selector: row => <div data-tooltip-id={`tooltip-projectName-${row.id}`} data-tooltip-content={row.projectName}>{row.projectName}</div> },
    { name: 'Trainer Name', selector: row => <div data-tooltip-id={`tooltip-trainerName-${row.id}`} data-tooltip-content={row.trainerName}>{row.trainerName}</div> },
    { name: 'Venue', selector: row => <div data-tooltip-id={`tooltip-venue-${row.id}`} data-tooltip-content={row.venue}>{row.venue}</div> },
    { name: 'Plant Names', selector: row => <div data-tooltip-id={`tooltip-plantNames-${row.id}`} data-tooltip-content={row.plantNames.join(', ')}>{row.plantNames.join(', ')}</div> },
    { name: 'Plant ID', selector: row => <div data-tooltip-id={`tooltip-plantIds-${row.id}`} data-tooltip-content={row.plantIds.join(', ')}>{row.plantIds.join(', ')}</div> },
    { name: 'Date', selector: row => <div data-tooltip-id={`tooltip-date-${row.id}`} data-tooltip-content={new Date(row.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}>{new Date(row.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</div> },
    { name: 'From Time', selector: row => <div data-tooltip-id={`tooltip-fromTime-${row.id}`} data-tooltip-content={row.fromTime}>{row.fromTime}</div> },
    { name: 'To Time', selector: row => <div data-tooltip-id={`tooltip-toTime-${row.id}`} data-tooltip-content={row.toTime}>{row.toTime}</div> },
    { name: 'Meeting hours', selector: row => <div data-tooltip-id={`tooltip-totalMeetingTime-${row.id}`} data-tooltip-content={row.totalMeetingTime}>{row.totalMeetingTime}</div> },
    { name: 'Status', selector: row => <div data-tooltip-id={`tooltip-status-${row.id}`} data-tooltip-content={row.status}>{row.status}</div> },
    {
      name: 'Actions',
      cell: row => {
        const isCompleted = row.status === "Completed";
        return (
          <div style={{ display: 'flex' }} className="action-buttons">
            <button className='btn-edit' onClick={() => handleEdit(row)} disabled={isCompleted}><Edit /></button>
            <button className='btn-delete' onClick={() => handleDelete(row._id)} disabled={isCompleted}><Delete /></button>
          </div>
        );
      },
    }
  ];
  const ExpandedComponent = ({ data }) => {
    console.log('Expanded data:', data);
    const [employeeData, setEmployeeData] = useState([]);
    const date = moment(data.date).format("YYYY-MM-DD");
    const startTime = `${date}T${data.fromTime}:00.000Z`;
    const endTime = `${date}T${data.toTime}:00.000Z`;

    useEffect(() => {
      const fetchAttendanceData = async () => {
        try {
          // const response = await axios.get(
          //   "http://fr.thirdeye-ai.com/face/getFaceInfo",
          //   {
          //     params: {
          //       plantId: data.plantIds,
          //       startDate: startTime,
          //       endDate: endTime,
          //       companyId: "JBMGroup",
          //       camId: "TrainingProgram",
          //     },
          //   }
          // );
          const response = await axios.get(
            "http://jbmgroup.fr.thirdeye-ai.com/face/getFaceInfo",
            {
              params: {
                startDate: startTime,
                endDate: endTime,
                frGroupName: "ThirdEye AI",
                companyId: "JBMGroup",
                frGroup: "frAttendance",
                filterBy: "mac",
                machineId: "666c142fb9414542a36859b4",
                mac: "666c142fb9414542a36859b4",
                allPunch: "true"
              },
            }
          );
          setEmployeeData(response.data);
        } catch (error) {
          console.error('Failed to fetch attendance data:', error);
        }
      };
      fetchAttendanceData();
    }, [data.plantIds, startTime, endTime]);

    const employeeMap = {};
    data.empCodes.forEach(emp => {
      const { empFName, empOnlyId } = emp;
      employeeMap[empOnlyId] = {
        empFName,
        empOnlyId,
        _id: `${empFName}_${empOnlyId}`,
        planned: true,
      };
    });

    employeeData.forEach(emp => {
      if (!employeeMap[emp.empOnlyId]) {
        employeeMap[emp.empOnlyId] = emp;
        emp.planned = false;
      } else {
        employeeMap[emp.empOnlyId] = { ...employeeMap[emp.empOnlyId], ...emp, planned: true };
      }
    });

    const finalData = Object.values(employeeMap);

    console.log("Final data:", finalData);
    return (
      <>
        <ExpendedComponent data={data} empCodes={data.empCodes} plantId={data.plantIds} />
        {!data.acknowledgement && 
          <div className='d-flex justify-content-between'>
            <div className='p-1'></div>
            <div>
              <button className='btn-login' onClick={() => handleSendData(data, data.empCodes, finalData)}>Send Mail</button>
            </div>
          </div>
        }
        {data.acknowledgement && 
          <div className="d-flex justify-content-end">
            <PDFDownloadLink
              document={<Report data={data} />}
              fileName="TrainingAttendance.pdf"
              data={data}
            >
              {({ loading }) => (
                <button disabled={loading} className="btn-login m-2">
                  {loading ? "Downloading..." : "Download"}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        }
      </>
    );
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <div className='w-100 d-flex justify-content-between align-items-center'>
        <FilterComponent onFilter={e => setFilterText(e.target.value)} />
        <div>
          <DateRangeFilter
            onFilter={handleFilter}
            defaultStartDate={filteredDates.startDate}
            defaultEndDate={filteredDates.endDate}
          />
        </div>
      </div>
    );
  }, [filteredDates]);

  return (
    <div className="container-fluid p-7">
      <div className="mx-4 my-2 py-7 ">
      <DataTable
        columns={columns}
        data={filteredTrainings}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        customStyles={expandTableCustomStyles}
      />
      <ToastContainer />
      {filteredTrainings.map(row => (
          <>
            <Tooltip id={`tooltip-projectName-${row.id}`} />
            <Tooltip id={`tooltip-trainerName-${row.id}`} />
            <Tooltip id={`tooltip-venue-${row.id}`} />
            <Tooltip id={`tooltip-plantNames-${row.id}`} />
            <Tooltip id={`tooltip-plantIds-${row.id}`} />
            <Tooltip id={`tooltip-date-${row.id}`} />
            <Tooltip id={`tooltip-fromTime-${row.id}`} />
            <Tooltip id={`tooltip-toTime-${row.id}`} />
            <Tooltip id={`tooltip-totalMeetingTime-${row.id}`} />
            <Tooltip id={`tooltip-status-${row.id}`} />
          </>
        ))}
    </div>
    </div>
  );
}

