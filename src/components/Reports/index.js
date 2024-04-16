// import React from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import logo from './Logo.png';
// import logoo from './third-eye.png';

// class AttendanceSheet extends React.Component {
//   constructor(props) {
//     super(props);
//     this.attendanceSheetRef = React.createRef();
//   }

//   generatePDF = () => {
//     const input = this.attendanceSheetRef.current;

//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 210;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save("attendance_sheet.pdf");
//     });
//   };

//   render() {
//     const styles = {
//       logo: {
//         width: 120,
//         marginLeft: 10,
//         position: 'absolute',
//         top: 0,
//         left: 0
//       },
//       logoo: {
//         width: 120,
//         marginRight: 10,
//         position: 'absolute',
//         top: 0,
//         right: 0
//       }
//     };

//     return (
//       <div ref={this.attendanceSheetRef} style={{ position: 'relative', textAlign: 'center' }}>
//         <h1>JAY BHARAT MARUTI LIMITED</h1>
//         <h2>Attendance Sheet</h2>
//         <h3>Internal Training Programme</h3>
//         <img style={styles.logo} src={logo} alt="Logo" />
//         <img style={styles.logoo} src={logoo} alt="Logo" />
        
//         <table style={{ margin: 'auto', marginTop: '120px', border: '1px solid black', borderCollapse: 'collapse', width: "80%" }}>
//           <thead>
//             <tr>
//               <th style={{ border: '1px solid black', padding: '8px' }}>S.No.</th>
//               <th style={{ border: '1px solid black', padding: '8px' }}>Planned Participant</th>
//               <th style={{ border: '1px solid black', padding: '8px' }}>E. code Dept./Plant</th>
//               <th style={{ border: '1px solid black', padding: '8px' }}>Designation</th>
//               <th style={{ border: '1px solid black', padding: '8px' }}>FR IN</th>
//               <th style={{ border: '1px solid black', padding: '8px' }}>FR OUT</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* You can dynamically generate table rows here */}
//             {Array.from({ length: 20 }, (_, index) => (
//               <tr key={index}>
//                 <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
//                 <td style={{ border: '1px solid black', padding: '8px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '8px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '8px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '8px' }}></td>
//                 <td style={{ border: '1px solid black', padding: '8px' }}></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// export default AttendanceSheet;


// import React from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import logo from './Logo.png';
// import logoo from './third-eye.png';

// class AttendanceSheet extends React.Component {
//   constructor(props) {
//     super(props);
//     this.attendanceSheetRef = React.createRef();
//   }

//   generatePDF = () => {
//     const input = this.attendanceSheetRef.current;

//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 210;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
//       pdf.save("attendance_sheet.pdf");
//     });
//   };

//   render() {
//     const { upperData, expandedData } = this.props;
//     const styles = {
//       logo: {
//         width: 120,
//         marginLeft: 10,
//         position: 'absolute',
//         top: 0,
//         left: 0
//       },
//       logoo: {
//         width: 120,
//         marginRight: 10,
//         position: 'absolute',
//         top: 0,
//         right: 0
//       },
//       theader: {
//         border: '1px solid black',
//         padding: '8px'
//       },
//       tbody: {
//         border: '1px solid black',
//         padding: '8px'
//       }
//     };

//     function formatTime(date) {
//       const dateTime = new Date(date);
//       dateTime.setHours(dateTime.getHours() - 5);
//       dateTime.setMinutes(dateTime.getMinutes() - 30);

//       // Format the time as desired (e.g., HH:mm)
//       const formattedTime = `${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}`;

//       return formattedTime;
//     }
//     const test = [
//       { name: 'Training Topic', key: 'projectName' },
//       { name: 'Trainer Name', key: 'trainerName' },
//       { name: 'Venue', key: 'plantName' },
//       { name: 'Plant ID', key: 'plantId' },
//       { name: 'Date', key: 'date' },
//       { name: 'From Time', key: 'fromTime' },
//       { name: 'To Time', key: 'toTime' }
//   ];

//   const TableHead = () => (
//       <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//           {test.map(({ name }, index) => (
//               <View key={index} style={styles.theader}>
//                   <Text>{name}</Text>
//               </View>
//           ))}
//       </View>
//   );

//   const headers2 = [
//     { name: 'Participant List', key: '_id' },
//     { name: 'Plant ID', key: 'empPlantId' },
//     { name: 'Designation', key: 'department' },
//     {
//       name: 'Punch In',
//       key: (row) => (row.timeInfo.length > 0 ? formatTime(row.timeInfo[0].time) : ''),
//     },
//     {
//       name: 'Punch Out',
//       key: (row) =>
//         row.timeInfo.length > 0 ? formatTime(row.timeInfo[row.timeInfo.length - 1].time) : '',
//     },
//   ];
  
//   const TableHead2 = () => (
//     <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//       {headers2.map(({ name, key }, index) => (
//         <View key={index} style={styles.theader}>
//           <Text>{name}</Text>
//         </View>
//       ))}
//     </View>
//   );

//     return (
//       <div ref={this.attendanceSheetRef} style={{ position: 'relative', textAlign: 'center' }}>
//         <h1>JAY BHARAT MARUTI LIMITED</h1>
//         <h2>Attendance Sheet</h2>
//         <h3>Internal Training Programme</h3>
//         <img style={styles.logo} src={logo} alt="Logo" />
//         <img style={styles.logoo} src={logoo} alt="Logo" />

//         <table style={{ margin: 'auto', marginTop: '120px', border: '1px solid black', borderCollapse: 'collapse', width: "80%" }}>
//           <thead>
//             <tr>
//               {test.map(({ name }, index) => (
//                 <th key={index} style={styles.theader}>{name}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {test.map(({ key }, index) => (
//                 <td key={index} style={styles.tbody}>{key === "date" ? new Date(upperData[key]).toLocaleDateString('sv-SE') : upperData[key]}</td>
//               ))}
//             </tr>
//           </tbody>
//         </table>

//         <table style={{ margin: 'auto', marginTop: '20px', border: '1px solid black', borderCollapse: 'collapse', width: '80%' }}>
//           <thead>
//             <tr>
//               {headers2.map(({ name }, index) => (
//                 <th key={index} style={styles.theader}>{name}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {expandedData.map((receipt, index) => (
//               <tr key={index}>
//                 {headers2.map(({ key }, innerIndex) => (
//                   <td key={innerIndex} style={styles.tbody}>
//                     {/* Check if the key is a function */}
//                     {typeof key === 'function' ? key(receipt) : receipt[key]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// export default AttendanceSheet;


