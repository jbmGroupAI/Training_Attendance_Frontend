
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
    { name: 'Training Topic', selector: row => row.projectName },
    { name: 'Trainer Name', selector: row => row.trainerName },
    { name: 'Venue', selector: row => row.plantNames.join(', ') },
    { name: 'Plant ID', selector: row => row.plantIds.join(', ') },
    { name: 'Date', selector: row => new Date(row.date).toLocaleDateString('en-US', { timeZone: 'UTC' }) },
    { name: 'From Time', selector: row => row.fromTime },
    { name: 'To Time', selector: row => row.toTime },
    { name: 'Meeting hours', selector: row => row.totalMeetingTime },
    { name: 'Status', selector: row => row.status },
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
    <div className="container-fluid p-0">
      <div className="mx-4 my-2">
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
    </div>
    </div>
  );
}

