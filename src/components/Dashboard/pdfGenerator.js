import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable

export const generatePDF = (upperData, expandedData) => {
  const pdf = new jsPDF();

  // Set font and font size for the table
  pdf.setFont('helvetica');
  pdf.setFontSize(12);

  // Create an array to store table data
  const tableData = [];

  // Add upper-level data to the table data
  tableData.push([
    'Project Name',
    'Trainer Name',
    'Venue',
    'Plant Code',
    'Date',
    'From Time',
    'To Time',
  ]);
  tableData.push([
    upperData.projectName,
    upperData.trainerName,
    upperData.venue,
    upperData.plantCode,
    new Date(upperData.date).toLocaleDateString('SV-se'),
    upperData.fromTime,
    upperData.toTime,
  ]);

  // Add a separator row
  tableData.push(['', '', '', '', '', '', '']);

  // Add headers for the expanded data
  tableData.push([
    'Emp ID',
    'Plant ID',
    'Emp Name',
    'Designation',
    'Punch In',
    'Punch Out',
  ]);

  // Add expanded data to the table
  expandedData.forEach((row) => {
    tableData.push([
      row.empOnlyId,
      row.empPlantId[0],
      row.empFName[0],
      row.department[0],
      new Date(row.timeInfo[0].time).toLocaleString('SV-se'),
      new Date(row.timeInfo[row.timeInfo.length - 1].time).toLocaleString('SV-se'),
    ]);
  });

  // Set the position for the table
  const tableStart = 10;

  // Ensure that the autoTable method is available
  if (typeof pdf.autoTable === 'function') {
    // Draw the table using autoTable method
    pdf.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: tableStart,
    });
  } else {
    console.error('autoTable method is not available. Please check if jspdf-autotable is correctly imported.');
  }

  return pdf;
};
