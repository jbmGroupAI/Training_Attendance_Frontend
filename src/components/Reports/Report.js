// import React, { Fragment, useEffect, useState } from 'react';
// import { Image, Text, View, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import config from "../../config.json";

// import logo from './Logo.png';
// import logoo from './third-eye.png';

// Font.register({
//   family: "Open Sans",
//   fonts: [
//     {
//       src: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap",
//     },
//   ],
// });

// const Report = ({ data }) => {
//   const [trainingData, setTrainingData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { id } = useParams();
//   const [plannedCount, setPlannedCount] = useState(0);
//   const [unplannedCount, setUnplannedCount] = useState(0);
//   const [totalEmployees, setTotalEmployees] = useState(0); // New state for total employees
//   const [actualCount, setActualCount] = useState(0);
//   const [plannedVsActual, setPlannedVsActual] = useState(0);
//   const [totalPresent, setTotalPresent] = useState(0);
//   const [totalAbsent, setTotalAbsent] = useState(0);
//   const [legalCodes, setLegalCodes] = useState("");

//   useEffect(() => {
//     const fetchTrainingData = async () => {
//       try {
//         const response = await axios.get(`${config.url}/training/final?meetingId=${data?._id}`);
//         setTrainingData(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching training data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchTrainingData();
//   }, [data]);

  
 


//   useEffect(() => {
//     async function getLegalCode(){
//     try {
//       console.log("ss",trainingData)
//       const res = await axios.get(`${config.url}/post?venueId=${trainingData.venueId}`);
//       const data = res.data;
//       const temp = data.find((d)=> d.venueId === trainingData.venueId)
//       console.log("temp",temp)
//       if(data){
//       setLegalCodes(temp.legalCode)
//       }
     
//     } catch (error) {
//       console.log("error while getting legal code", error);
//     }
//   }
//   if(trainingData){
//     getLegalCode()
//   }
//   }, [trainingData]);
  


//   useEffect(() => {
//     if (trainingData) {
//       const plannedEmployees = trainingData.allEmployees.filter(employee => employee.planned);
//       const unplannedEmployees = trainingData.allEmployees.filter(employee => !employee.planned);
//       setPlannedCount(plannedEmployees.length);
//       setUnplannedCount(unplannedEmployees.length);
//       setTotalEmployees(plannedEmployees.length + unplannedEmployees.length); // Update total employees

//       const actualEmployees = plannedEmployees.filter(employee => employee.timeInfo && employee.timeInfo.length > 0);
//       setActualCount(actualEmployees.length);

//       setPlannedVsActual(plannedCount - actualCount);

//       const presentEmployees = actualEmployees.filter(employee => employee.acknowledgement);
//       setTotalPresent(presentEmployees.length);
//       setTotalAbsent(plannedEmployees.length - presentEmployees.length);
//     }
//   }, [trainingData, plannedCount]);

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   const styles = StyleSheet.create({
//     page: {
//       fontSize: 11,
//       paddingTop: 20,
//       paddingLeft: 40,
//       paddingRight: 40,
//       lineHeight: 1.5,
//       flexDirection: 'column',
//     },
//     spaceBetween: {
//       flex: 1,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       color: "#3E3E3E"
//     },
//     titleContainer: {
//       flexDirection: 'row',
//       marginTop: 24
//     },
//     logo: {
//       width: 120,
//       marginLeft: 10,
//       position: 'absolute',
//       top: 0,
//       left: 0
//     },
//     logoo: {
//       width: 120,
//       marginRight: 10,
//       position: 'absolute',
//       top: 0,
//       right: 0
//     },
//     reportTitle: {
//       fontSize: 20,
//       textAlign: 'center',
//       fontStyle: 'bold',
//       alignItems: 'center'
//     },
//     addressTitle: {
//       fontSize: 11,
//       fontStyle: 'bold'
//     },
//     invoice: {
//       fontWeight: 'bold',
//       fontSize: 20
//     },
//     invoiceNumber: {
//       fontSize: 11,
//       fontWeight: 'bold'
//     },
//     address: {
//       fontWeight: 400,
//       fontSize: 10
//     },
//     tfooter: {
//       marginTop: 20,
//       fontSize: 10,
//       fontStyle: 'bold',
//       paddingTop: 8,
//       paddingLeft: 7,
//       flex: 1,
//       height: 28,
//       // backgroundColor: '#DEDEDE',
//       // borderColor: 'whitesmoke',
//       borderRightWidth: 1,
//       borderBottomWidth: 1,
//       backgroundColor: "#0566fc1a",
//           color: "#060bb7",
//           border: "1px solid lightskyblue",
//     },
//     theader: {
//       marginTop: 20,
//       fontSize: 10,
//       fontStyle: 'bold',
//       paddingTop: 8,
//       paddingLeft: 7,
//       flex: 1,
//       backgroundColor: '#0566fc1a',
//       borderColor: '#0566fc1a',
//       color:'#060bb7'
//     },
//     tbody: {
//       fontSize: 9,
//       paddingTop: 4,
//       paddingLeft: 7,
//       flex: 1,
//       border:1,
//       borderColor: 'whitesmoke',
//       width:400
//     }
//   });

//   const InvoiceTitle = () => (
//     <View style={{ position: 'relative', alignItems: 'center' }} >
//       <Text style={{ fontSize: 15, fontWeight: 'bold' }}>JAY BHARAT MARUTI LIMITED</Text>
//       <Text style={{ fontSize: 12 }}>Attendance Sheet</Text>
//       <Text style={{ fontSize: 10 }}>Internal Training Programme</Text>
//       <Image source={logo} style={{ width: 80, height: 80, ...styles.logo }} />
//       <Image source={logoo} style={{ width: 80, height: 80, ...styles.logoo }} />
      
      
//     <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        
//         <Text style={{
//               fontSize: 10,
//               marginRight: 10,
//               fontWeight: 'bold'
//             }}>{legalCodes}</Text>
//       </View>

//     </View>
//   );
  

//   function formatTime(date) {
//     const dateTime = new Date(date);
//     dateTime.setHours(dateTime.getHours() - 5);
//     dateTime.setMinutes(dateTime.getMinutes() - 30);
//     return `${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
//   }

//   const test = [
//     { name: 'Training Topic', key: 'projectName', size: '15%' },
//     { name: 'Trainer Name', key: 'trainerName', size: '15%' },
//     { name: 'Plant Names', key: 'plantNames', size: '20%' },
//     { name: 'Plant ID', key: 'plantIds', size: '10%' },
//     { name: 'Date', key: 'date', size: '15%' },
//     { name: 'From Time', key: 'fromTime', size: '15%' },
//     { name: 'To Time', key: 'toTime', size: '15%' },
//   ];


//   const TableHead = () => (
//     <div style={{ flexDirection: 'row', marginTop: 10 }}>
//       {test.map(({ name, size }, index) => {
//         return(
//         <View
//           key={index}
//           style={
            
//             {
//               width: size,
//             marginTop: 20,
//             fontSize: 10,
//             fontStyle: "bold",
//             paddingTop: 4,
//             paddingLeft: 7,
//             backgroundColor: "#0566fc1a",
//             color: "#060bb7",
//             border: "1px solid lightskyblue",
//             borderTopLeftRadius: index === 0 ? 5 : 0,
//             borderTopRightRadius: index === (test.length - 1) ? 5 : 0,
//             borderLeft: index === 0 ? "1px solid lightskyblue" : 0,
//             borderRight: index === (test.length -1) ? "1px solid lightskyblue" : 0 
//             }
//           }
//         >
//           <Text>{name}</Text>
//         </View>
//       )})}
//     </div>
//   );
//   const TableBody = ({ trainingData }) => (
//     <div style={{ width: '100%', flexDirection: 'row' }}>
//       {test.map(({ key,size }, index) => (
//         <View style={ {width: size,
//           border: 1,
//           borderColor: "whitesmoke",
//           fontSize: 9,
//           paddingTop: 6,
//           paddingLeft: 7,}} key={index}>
//           <Text>{key === "date" ? new Date(trainingData[key]).toLocaleDateString('sv-SE') : trainingData[key]}</Text>
//         </View>
//       ))}
//     </div>
//   );

//   const test1 = [
//     { name: 'Employee Name', key: "empFName[0]",size:'15%' },
//     { name: 'Emp ID', key: "empOnlyId",size:'10%' },
//     { name: 'Category', key: "planned ? 'Planned' : 'Unplanned'",size:'15%' },
//     { name: 'Department', key: "department.join(', ')",size:'15%' },
//     { name: 'Plant ID', key: "empPlantId.join(', ')",size:'10%' },
//     { name: 'Acknowledgement', key: "acknowledgement ? 'Yes' : 'No'",size:'15%' },
//     { name: 'Punch In', key: "Punch In",size:'10%' },
//     { name: 'Punch Out', key: "Punch Out",size:'10%' },
//   ];

//   const TableHead2 = () => (
//     <div style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//       {test1.map(({ name,size }, index) => (
//         <View key={index}  style={{ width: size,
//           marginTop: 20,
//           fontSize: 10,
//           fontStyle: "bold",
//           paddingTop: 4,
//           paddingLeft: 7,
//           backgroundColor: "#0566fc1a",
//           color: "#060bb7",
//           border: "1px solid lightskyblue",
//           borderTopLeftRadius: index === 0 ? 5 : 0,
//           borderTopRightRadius: index === (test1.length - 1) ? 5 : 0,
//           borderLeft: index === 0 ? "1px solid lightskyblue" : 0,
//           borderRight: index === (test1.length -1) ? "1px solid lightskyblue" : 0 }}>
//           <Text>{name}</Text>
//         </View>
//       ))}
//     </div>
//   );

//   const TableBody1 = ({ trainingData }) => (
//     <>
//       {trainingData.allEmployees.map((receipt, index) => (
//         <div style={{ width: '100%', flexDirection: 'row' }} key={index}>
//           {test1.map(({ key,size }, innerIndex) => (
//             <View style={{width: size,
//               border: 1,
//               borderColor: "whitesmoke",
//               fontSize: 9,
//               paddingTop: 6,
//               paddingLeft: 7,}} key={innerIndex}>
//               {key === 'Punch In' && (
//                 <Text>{receipt.timeInfo && receipt.timeInfo.length > 0 ? formatTime(receipt.timeInfo[0].time) : '-'}</Text>
//               )}
//               {key === 'Punch Out' && (
//                 <Text>{receipt.acknowledgement ? new Date(trainingData.endTraining).toLocaleString('en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   hour12: false,
//                   }) : '-'}</Text>
//               )}
//               {key !== 'Punch In' && key !== 'Punch Out' && (
//                 <Text>
//                   {key === "date"
//                     ? new Date(receipt[key]).toLocaleDateString('sv-SE')
//                     : eval(`receipt.${key}`)}
//                 </Text>
//               )}
//             </View>
//           ))}
//         </div>
        
//       ))}
//       </>
//   );

//   const TableFooter = () => (
//     <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//       <View style={styles.tfooter}>
//         <Text>Total Employees: {totalEmployees}</Text>
//       </View>
//       <View style={styles.tfooter}>
//         <Text>Total Planned Employees: {plannedCount}</Text>
//       </View>
//       <View style={styles.tfooter}>
//         <Text>Total Present(Planned): {totalPresent}</Text>
//       </View>
//       <View style={styles.tfooter}>
//         <Text>Total Absent(Planned): {totalAbsent}</Text>
//       </View>
//     </View>
//   );

//   const TableFooter2 = () => (
//     <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//       <View style={styles.tfooter}>
//         <Text>Meeting Description: {trainingData.meetingDescription}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <Document>
//       <Page size="A4" style={styles.page} wrap={false}>
//         <InvoiceTitle />

//         <TableHead trainingData={trainingData} />
//         <TableBody trainingData={trainingData} />
//         <TableHead2 trainingData={trainingData} />
//         <TableBody1 trainingData={trainingData} />
//         <TableFooter />
//         <TableFooter2 />
//       </Page>
//     </Document>
//   );
// };

// export default Report;


// import React, { Fragment, useEffect, useState } from 'react';
// import { Image, Text, View, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import config from "../../config.json";

// import logo from './Logo.png';
// import logoo from './third-eye.png';

// Font.register({
//   family: "Open Sans",
//   fonts: [
//     {
//       src: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap",
//     },
//   ],
// });

// const Report = ({ data }) => {
//   const [trainingData, setTrainingData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { id } = useParams();
//   const [plannedCount, setPlannedCount] = useState(0);
//   const [unplannedCount, setUnplannedCount] = useState(0);
//   const [totalEmployees, setTotalEmployees] = useState(0); // New state for total employees
//   const [actualCount, setActualCount] = useState(0);
//   const [plannedVsActual, setPlannedVsActual] = useState(0);
//   const [totalPresent, setTotalPresent] = useState(0);
//   const [totalAbsent, setTotalAbsent] = useState(0);
//   const [legalCodes, setLegalCodes] = useState("");

//   useEffect(() => {
//     const fetchTrainingData = async () => {
//       try {
//         const response = await axios.get(`${config.url}/training/final?meetingId=${data?._id}`);
//         setTrainingData(response.data);
//         console.log('Fetched training data:', response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching training data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchTrainingData();
//   }, [data]);

//   useEffect(() => {
//     async function getLegalCode(){
//       try {
//         console.log("ss",trainingData)
//         const res = await axios.get(`${config.url}/post?venueId=${trainingData.venueId}`);
//         const data = res.data;
//         const temp = data.find((d)=> d.venueId === trainingData.venueId)
//         console.log("temp",temp)
//         if(data){
//           setLegalCodes(temp.legalCode)
//         }
//       } catch (error) {
//         console.log("error while getting legal code", error);
//       }
//     }
//     if(trainingData){
//       getLegalCode()
//     }
//   }, [trainingData]);

//   useEffect(() => {
//     if (trainingData) {
//       const plannedEmployees = trainingData.allEmployees.filter(employee => employee.planned);
//       const unplannedEmployees = trainingData.allEmployees.filter(employee => !employee.planned);
//       setPlannedCount(plannedEmployees.length);
//       setUnplannedCount(unplannedEmployees.length);
//       setTotalEmployees(plannedEmployees.length + unplannedEmployees.length); // Update total employees

//       const actualEmployees = plannedEmployees.filter(employee => employee.timeInfo && employee.timeInfo.length > 0);
//       setActualCount(actualEmployees.length);

//       setPlannedVsActual(plannedCount - actualCount);

//       const presentEmployees = actualEmployees.filter(employee => employee.acknowledgement);
//       setTotalPresent(presentEmployees.length);
//       setTotalAbsent(plannedEmployees.length - presentEmployees.length);
//     }
//   }, [trainingData, plannedCount]);

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   const styles = StyleSheet.create({
//     page: {
//       fontSize: 11,
//       paddingTop: 20,
//       paddingLeft: 40,
//       paddingRight: 40,
//       lineHeight: 1.5,
//       flexDirection: 'column',
//     },
//     spaceBetween: {
//       flex: 1,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       color: "#3E3E3E"
//     },
//     titleContainer: {
//       flexDirection: 'row',
//       marginTop: 24
//     },
//     logo: {
//       width: 120,
//       marginLeft: 10,
//       position: 'absolute',
//       top: 0,
//       left: 0
//     },
//     logoo: {
//       width: 120,
//       marginRight: 10,
//       position: 'absolute',
//       top: 0,
//       right: 0
//     },
//     reportTitle: {
//       fontSize: 20,
//       textAlign: 'center',
//       fontStyle: 'bold',
//       alignItems: 'center'
//     },
//     addressTitle: {
//       fontSize: 11,
//       fontStyle: 'bold'
//     },
//     invoice: {
//       fontWeight: 'bold',
//       fontSize: 20
//     },
//     invoiceNumber: {
//       fontSize: 11,
//       fontWeight: 'bold'
//     },
//     address: {
//       fontWeight: 400,
//       fontSize: 10
//     },
//     tfooter: {
//       marginTop: 20,
//       fontSize: 9,
//       fontStyle: 'bold',
//       paddingTop: 8,
//       paddingLeft: 3,
//       flex: 1,
//       height: 30,
//       backgroundColor: "#0566fc1a",
//       color: "#060bb7",
//       border: "1px solid lightskyblue",
//     },
//     theader: {
//       marginTop: 20,
//       fontSize: 10,
//       fontStyle: 'bold',
//       paddingTop: 8,
//       paddingLeft: 7,
//       flex: 1,
//       backgroundColor: '#0566fc1a',
//       borderColor: '#0566fc1a',
//       color:'#060bb7'
//     },
//     tbody: {
//       fontSize: 9,
//       paddingTop: 4,
//       paddingLeft: 7,
//       flex: 1,
//       border:1,
//       borderColor: 'whitesmoke',
//       width:400
//     }
//   });

//   const InvoiceTitle = () => (
//     <View style={{ position: 'relative', alignItems: 'center' }} >
//       <Text style={{ fontSize: 15, fontWeight: 'bold' }}>JAY BHARAT MARUTI LIMITED</Text>
//       <Text style={{ fontSize: 12 }}>Attendance Sheet</Text>
//       <Text style={{ fontSize: 10 }}>Internal Training Programme</Text>
//       <Image source={logo} style={{ width: 80, height: 80, ...styles.logo }} />
//       <Image source={logoo} style={{ width: 80, height: 80, ...styles.logoo }} />
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
//         <Text style={{
//           fontSize: 10,
//           marginRight: 10,
//           fontWeight: 'bold'
//         }}>{legalCodes}</Text>
//       </View>
//     </View>
//   );

//   function formatTime(date) {
//     const dateTime = new Date(date);
//     dateTime.setHours(dateTime.getHours() - 5);
//     dateTime.setMinutes(dateTime.getMinutes() - 30);
//     return `${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
//   }

//   const test = [
//     { name: 'Training Topic', key: 'projectName', size: '15%' },
//     { name: 'Trainer Name', key: 'trainerName', size: '15%' },
//     { name: 'Plant Names', key: 'plantNames', size: '20%' },
//     { name: 'Plant ID', key: 'plantIds', size: '10%' },
//     { name: 'Date', key: 'date', size: '15%' },
//     { name: 'From Time', key: 'fromTime', size: '15%' },
//     { name: 'To Time', key: 'toTime', size: '15%' },
//   ];

//   const TableHead = () => (
//     <div style={{ flexDirection: 'row', marginTop: 10 }}>
//       {test.map(({ name, size }, index) => (
//         <View
//           key={index}
//           style={{
//             width: size,
//             marginTop: 20,
//             fontSize: 10,
//             fontStyle: "bold",
//             paddingTop: 4,
//             paddingLeft: 7,
//             backgroundColor: "#0566fc1a",
//             color: "#060bb7",
//             border: "1px solid lightskyblue",
//             borderTopLeftRadius: index === 0 ? 5 : 0,
//             borderTopRightRadius: index === (test.length - 1) ? 5 : 0,
//             borderLeft: index === 0 ? "1px solid lightskyblue" : 0,
//             borderRight: index === (test.length - 1) ? "1px solid lightskyblue" : 0 
//           }}
//         >
//           <Text>{name}</Text>
//         </View>
//       ))}
//     </div>
//   );

//   const TableBody = ({ trainingData }) => (
//     <div style={{ width: '100%', flexDirection: 'row' }}>
//       {test.map(({ key, size }, index) => (
//         <View style={{ width: size, border: 1, borderColor: "whitesmoke", fontSize: 9, paddingTop: 6, paddingLeft: 7 }} key={index}>
//           <Text>
//             {key === "date" ? 
//               new Date(trainingData[key]).toLocaleDateString('sv-SE') : 
//               Array.isArray(trainingData[key]) ? 
//                 trainingData[key].join(', ') : 
//                 trainingData[key]}
//           </Text>
//         </View>
//       ))}
//     </div>
//   );

//   const test1 = [
//     { name: 'Employee Name', key: "empFName[0]", size: '15%' },
//     { name: 'Emp ID', key: "empOnlyId", size: '10%' },
//     { name: 'Category', key: "planned ? 'Planned' : 'Unplanned'", size: '15%' },
//     { name: 'Department', key: "department.join(', ')", size: '15%' },
//     { name: 'Plant ID', key: "empPlantId.join(', ')", size: '10%' },
//     { name: 'Acknowledgement', key: "acknowledgement ? 'Yes' : 'No'", size: '15%' },
//     { name: 'Punch In', key: "Punch In", size: '10%' },
//     { name: 'Punch Out', key: "Punch Out", size: '10%' },
//   ];

//   const TableHead2 = () => (
//     <div style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//       {test1.map(({ name, size }, index) => (
//         <View key={index} style={{ width: size, marginTop: 20, fontSize: 10, fontStyle: "bold", paddingTop: 4, paddingLeft: 7, backgroundColor: "#0566fc1a", color: "#060bb7", border: "1px solid lightskyblue", borderTopLeftRadius: index === 0 ? 5 : 0, borderTopRightRadius: index === (test1.length - 1) ? 5 : 0, borderLeft: index === 0 ? "1px solid lightskyblue" : 0, borderRight: index === (test1.length - 1) ? "1px solid lightskyblue" : 0 }}>
//           <Text>{name}</Text>
//         </View>
//       ))}
//     </div>
//   );

//   const TableBody1 = ({ trainingData }) => (
//     <>
//       {trainingData.allEmployees.map((receipt, index) => (
//         <div style={{ width: '100%', flexDirection: 'row' }} key={index}>
//           {test1.map(({ key, size }, innerIndex) => (
//             <View style={{ width: size, border: 1, borderColor: "whitesmoke", fontSize: 9, paddingTop: 6, paddingLeft: 7 }} key={innerIndex}>
//               {key === 'Punch In' && (
//                 <Text>{receipt.timeInfo && receipt.timeInfo.length > 0 ? formatTime(receipt.timeInfo[0].time) : '-'}</Text>
//               )}
//               {key === 'Punch Out' && (
//                 <Text>{receipt.acknowledgement ? new Date(trainingData.endTraining).toLocaleString('en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   hour12: false,
//                 }) : '-'}</Text>
//               )}
//               {key !== 'Punch In' && key !== 'Punch Out' && (
//                 <Text>
//                   {key === "date"
//                     ? new Date(receipt[key]).toLocaleDateString('sv-SE')
//                     : eval(`receipt.${key}`)}
//                 </Text>
//               )}
//             </View>
//           ))}
//         </div>
//       ))}
//     </>
//   );

//   const TableFooter = () => (
//     <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//       <View style={styles.tfooter}>
//         <Text>Total Employees: {totalEmployees}</Text>
//       </View>
//       <View style={styles.tfooter}>
//         <Text>Total Planned Employees: {plannedCount}</Text>
//       </View>
//       <View style={styles.tfooter}>
//         <Text>Total Present(Planned): {totalPresent}</Text>
//       </View>
//       <View style={styles.tfooter}>
//         <Text>Total Absent(Planned): {totalAbsent}</Text>
//       </View>
//     </View>
//   );

//   const TableFooter2 = () => (
//     <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
//       <View style={styles.tfooter}>
//         <Text>Meeting Description: {trainingData.meetingDescription}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <Document>
//       <Page size="A4" style={styles.page} wrap={false}>
//         <InvoiceTitle />

//         <TableHead trainingData={trainingData} />
//         <TableBody trainingData={trainingData} />
//         <TableHead2 trainingData={trainingData} />
//         <TableBody1 trainingData={trainingData} />
//         <TableFooter />
//         <TableFooter2 />
//       </Page>
//     </Document>
//   );
// };

// export default Report;

import React, { Fragment, useEffect, useState } from 'react';
import { Image, Text, View, Page, Document, StyleSheet, Font } from '@react-pdf/renderer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from "../../config.json";

import logo from './Logo.png';
import logoo from './third-eye.png';

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap",
    },
  ],
});

const Report = ({ data }) => {
  const [trainingData, setTrainingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [plannedCount, setPlannedCount] = useState(0);
  const [unplannedCount, setUnplannedCount] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0); // New state for total employees
  const [actualCount, setActualCount] = useState(0);
  const [plannedVsActual, setPlannedVsActual] = useState(0);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [legalCodes, setLegalCodes] = useState("");

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(`${config.url}/training/final?meetingId=${data?._id}`);
        setTrainingData(response.data);
        console.log('Fetched training data:', response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching training data:', error);
        setIsLoading(false);
      }
    };

    fetchTrainingData();
  }, [data]);

  useEffect(() => {
    async function getLegalCode(){
      try {
        console.log("ss",trainingData)
        const res = await axios.get(`${config.url}/post?venueId=${trainingData.venueId}`);
        const data = res.data;
        const temp = data.find((d)=> d.venueId === trainingData.venueId)
        console.log("temp",temp)
        if(data){
          setLegalCodes(temp.legalCode)
        }
      } catch (error) {
        console.log("error while getting legal code", error);
      }
    }
    if(trainingData){
      getLegalCode()
    }
  }, [trainingData]);

  useEffect(() => {
    if (trainingData) {
      const plannedEmployees = trainingData.allEmployees.filter(employee => employee.planned);
      const unplannedEmployees = trainingData.allEmployees.filter(employee => !employee.planned);
      setPlannedCount(plannedEmployees.length);
      setUnplannedCount(unplannedEmployees.length);
      setTotalEmployees(plannedEmployees.length + unplannedEmployees.length); // Update total employees

      const actualEmployees = plannedEmployees.filter(employee => employee.timeInfo && employee.timeInfo.length > 0);
      setActualCount(actualEmployees.length);

      setPlannedVsActual(plannedCount - actualCount);

      const presentEmployees = actualEmployees.filter(employee => employee.acknowledgement);
      setTotalPresent(presentEmployees.length);
      setTotalAbsent(plannedEmployees.length - presentEmployees.length);
    }
  }, [trainingData, plannedCount]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: 'column',
    },
    spaceBetween: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: "#3E3E3E"
    },
    titleContainer: {
      flexDirection: 'row',
      marginTop: 24
    },
    logo: {
      width: 120,
      marginLeft: 10,
      position: 'absolute',
      top: 0,
      left: 0
    },
    logoo: {
      width: 120,
      marginRight: 10,
      position: 'absolute',
      top: 0,
      right: 0
    },
    reportTitle: {
      fontSize: 20,
      textAlign: 'center',
      fontStyle: 'bold',
      alignItems: 'center'
    },
    addressTitle: {
      fontSize: 11,
      fontStyle: 'bold'
    },
    invoice: {
      fontWeight: 'bold',
      fontSize: 20
    },
    invoiceNumber: {
      fontSize: 11,
      fontWeight: 'bold'
    },
    address: {
      fontWeight: 400,
      fontSize: 10
    },
    tfooter: {
      marginTop: 20,
      fontSize: 9,
      fontStyle: 'bold',
      paddingTop: 8,
      paddingLeft: 3,
      flex: 1,
      height: 30,
      backgroundColor: "#0566fc1a",
      color: "#060bb7",
      border: "1px solid lightskyblue",
    },
    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: 'bold',
      paddingTop: 8,
      paddingLeft: 7,
      flex: 1,
      backgroundColor: '#0566fc1a',
      borderColor: '#0566fc1a',
      color:'#060bb7'
    },
    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      border:1,
      borderColor: 'whitesmoke',
      width:400
    }
  });

  const InvoiceTitle = () => (
    <View style={{ position: 'relative', alignItems: 'center' }} >
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>JAY BHARAT MARUTI LIMITED</Text>
      <Text style={{ fontSize: 12 }}>Attendance Sheet</Text>
      <Text style={{ fontSize: 10 }}>Internal Training Programme</Text>
      <Image source={logo} style={{ width: 80, height: 80, ...styles.logo }} />
      <Image source={logoo} style={{ width: 80, height: 80, ...styles.logoo }} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Text style={{
          fontSize: 10,
          marginRight: 10,
          fontWeight: 'bold'
        }}>{legalCodes}</Text>
      </View>
    </View>
  );

  function formatTime(date) {
    const dateTime = new Date(date);
    dateTime.setHours(dateTime.getHours() - 5);
    dateTime.setMinutes(dateTime.getMinutes() - 30);
    return `${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
  }

  const test = [
    { name: 'Training Topic', key: 'projectName', size: '15%' },
    { name: 'Trainer Name', key: 'trainerName', size: '15%' },
    { name: 'Plant Names', key: 'plantNames', size: '20%' },
    { name: 'Plant ID', key: 'plantIds', size: '10%' },
    { name: 'Date', key: 'date', size: '15%' },
    { name: 'From Time', key: 'fromTime', size: '15%' },
    { name: 'To Time', key: 'toTime', size: '15%' },
  ];

  const TableHead = () => (
    <div style={{ flexDirection: 'row', marginTop: 10 }}>
      {test.map(({ name, size }, index) => (
        <View
          key={index}
          style={{
            width: size,
            marginTop: 20,
            fontSize: 10,
            fontStyle: "bold",
            paddingTop: 4,
            paddingLeft: 7,
            backgroundColor: "#0566fc1a",
            color: "#060bb7",
            border: "1px solid lightskyblue",
            borderTopLeftRadius: index === 0 ? 5 : 0,
            borderTopRightRadius: index === (test.length - 1) ? 5 : 0,
            borderLeft: index === 0 ? "1px solid lightskyblue" : 0,
            borderRight: index === (test.length - 1) ? "1px solid lightskyblue" : 0 
          }}
        >
          <Text>{name}</Text>
        </View>
      ))}
    </div>
  );

  const TableBody = ({ trainingData }) => (
    <div style={{ width: '100%', flexDirection: 'row' }}>
      {test.map(({ key, size }, index) => (
        <View style={{ width: size, border: 1, borderColor: "whitesmoke", fontSize: 9, paddingTop: 6, paddingLeft: 7 }} key={index}>
          <Text>
            {key === "date" ? 
              new Date(trainingData[key]).toLocaleDateString('sv-SE') : 
              Array.isArray(trainingData[key]) ? 
                trainingData[key].join(', ') : 
                trainingData[key]}
          </Text>
        </View>
      ))}
    </div>
  );

  const test1 = [
    { name: 'Employee Name', key: "empFName[0]", size: '15%' },
    { name: 'Emp ID', key: "empOnlyId", size: '10%' },
    { name: 'Category', key: "planned ? 'Planned' : 'Unplanned'", size: '15%' },
    { name: 'Department', key: "department.join(', ')", size: '15%' },
    { name: 'Plant ID', key: "empPlantId.join(', ')", size: '10%' },
    { name: 'Acknowledgement', key: "acknowledgement ? 'Yes' : 'No'", size: '15%' },
    { name: 'Punch In', key: "Punch In", size: '10%' },
    { name: 'Punch Out', key: "Punch Out", size: '10%' },
  ];

  const TableHead2 = () => (
    <div style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      {test1.map(({ name, size }, index) => (
        <View key={index} style={{ width: size, marginTop: 20, fontSize: 10, fontStyle: "bold", paddingTop: 4, paddingLeft: 7, backgroundColor: "#0566fc1a", color: "#060bb7", border: "1px solid lightskyblue", borderTopLeftRadius: index === 0 ? 5 : 0, borderTopRightRadius: index === (test1.length - 1) ? 5 : 0, borderLeft: index === 0 ? "1px solid lightskyblue" : 0, borderRight: index === (test1.length - 1) ? "1px solid lightskyblue" : 0 }}>
          <Text>{name}</Text>
        </View>
      ))}
    </div>
  );

  const TableBody1 = ({ trainingData }) => (
    <>
      {trainingData.allEmployees.map((receipt, index) => (
        <div style={{ width: '100%', flexDirection: 'row' }} key={index}>
          {test1.map(({ key, size }, innerIndex) => (
            <View style={{ width: size, border: 1, borderColor: "whitesmoke", fontSize: 9, paddingTop: 6, paddingLeft: 7 }} key={innerIndex}>
              {key === 'Punch In' && (
                <Text>{receipt.timeInfo && receipt.timeInfo.length > 0 ? formatTime(receipt.timeInfo[0].time) : '-'}</Text>
              )}
              {key === 'Punch Out' && (
                <Text>{receipt.acknowledgement ? new Date(trainingData.endTraining).toLocaleString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }) : '-'}</Text>
              )}
              {key === "acknowledgement ? 'Yes' : 'No'" && (
                <Text>{receipt.acknowledgementStatus === 'Absent' ? 'Absent' : receipt.acknowledgement ? 'Yes' : 'No'}</Text>
              )}
              {key !== 'Punch In' && key !== 'Punch Out' && key !== "acknowledgement ? 'Yes' : 'No'" && (
                <Text>
                  {key === "date"
                    ? new Date(receipt[key]).toLocaleDateString('sv-SE')
                    : eval(`receipt.${key}`)}
                </Text>
              )}
            </View>
          ))}
        </div>
      ))}
    </>
  );
  
  const TableFooter = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <View style={styles.tfooter}>
        <Text>Total Employees: {totalEmployees}</Text>
      </View>
      <View style={styles.tfooter}>
        <Text>Total Planned Employees: {plannedCount}</Text>
      </View>
      <View style={styles.tfooter}>
        <Text>Total Present(Planned): {totalPresent}</Text>
      </View>
      <View style={styles.tfooter}>
        <Text>Total Absent(Planned): {totalAbsent}</Text>
      </View>
    </View>
  );

  const TableFooter2 = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <View style={styles.tfooter}>
        <Text>Meeting Description: {trainingData.meetingDescription}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <InvoiceTitle />

        <TableHead trainingData={trainingData} />
        <TableBody trainingData={trainingData} />
        <TableHead2 trainingData={trainingData} />
        <TableBody1 trainingData={trainingData} />
        <TableFooter />
        <TableFooter2 />
      </Page>
    </Document>
  );
};

export default Report;
