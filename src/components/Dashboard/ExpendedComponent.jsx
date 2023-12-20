import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { generatePDF } from './pdfGenerator'; // Adjust the path as needed

function formatDateToISOString(date) {
  if (!(date instanceof Date)) {
    throw new Error('Input must be a Date object');
  }

  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export default function ExpendedComponent({ data }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { fromTime, toTime, date } = data;
  const [sHours, Sminutes] = fromTime.split(':');
  const [eHours, eminutes] = toTime.split(':');
  const startTime = new Date(date).setHours(sHours, Sminutes, 0);
  const endTime = new Date(date).setHours(eHours, eminutes, 0);

  const columns = [
    {
      name: 'Emp ID',
      selector: (row) => row.empOnlyId,
    },
    {
      name: 'Plant ID',
      selector: (row) => row.empPlantId[0],
    },
    {
      name: 'Emp Name',
      selector: (row) => row.empFName[0],
    },
    {
      name: 'Designation',
      selector: (row) => row.department[0],
    },
    {
      name: 'Punch In',
      selector: (row) => new Date(row.timeInfo[0].time).toLocaleString('SV-se'),
    },
    {
      name: 'Punch Out',
      selector: (row) =>
        new Date(row.timeInfo[(row.timeInfo).length - 1].time).toLocaleString('SV-se'),
    },
  ];

  const handleDownloadPDF = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://fr.thirdeye-ai.com/face/getFaceInfo?startDate=${formatDateToISOString(
          new Date(startTime)
        )}Z&endDate=${formatDateToISOString(new Date(endTime))}&companyId=JBMGroup&camId=TrainingProgram`
      );

      const tableData = res.data;

      const pdf = generatePDF(data, tableData);
      pdf.save('Training_Attendance.pdf');
    } catch (error) {
      setError('Error downloading PDF. Please try again.');
      console.error('Error downloading PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      console.log('Fetching data');
      try {
        const res = await axios.get(
          `http://fr.thirdeye-ai.com/face/getFaceInfo?startDate=${formatDateToISOString(
            new Date(startTime)
          )}Z&endDate=${formatDateToISOString(new Date(endTime))}&companyId=JBMGroup&camId=TrainingProgram`
        );
        const data = res.data;
        setTableData(data);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        console.error('Error in expended table ', error);
      }
    }

    getData();
  }, [data]);

  return (
    <>
      <DataTable columns={columns} data={tableData} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleDownloadPDF} disabled={loading}>
        {loading ? 'Downloading...' : 'Download PDF'}
      </button>
    </>
  );
}
