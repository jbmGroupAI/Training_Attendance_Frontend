import React, { Fragment, useEffect, useState } from 'react';
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import logo from './Logo.png';
import logoo from './third-eye.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// const Report = () => {
//   const [trainingData, setTrainingData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { id } = useParams();
//   const [plannedCount, setPlannedCount] = useState(0);
//   const [actualCount, setActualCount] = useState(0);
//   const [plannedVsActual, setPlannedVsActual] = useState(0);

//   useEffect(() => {
//     const fetchTrainingData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3011/v1/training/final/6622368a2544be5b80cd173f`);
//         setTrainingData(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching training data:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchTrainingData();
//   }, []);

//   useEffect(() => {
//     if (trainingData) {
//       // Count planned employees
//       const plannedEmployees = trainingData.allEmployees.filter(employee => employee.planned);
//       setPlannedCount(plannedEmployees.length);

//       // Count actual employees with punch in and punch out times
//       const actualEmployees = plannedEmployees.filter(employee => employee.timeInfo && employee.timeInfo.length > 0);
//       setActualCount(actualEmployees.length);

//       // Calculate planned vs actual
//       setPlannedVsActual(plannedCount - actualCount);
//     }
//   }, [trainingData, plannedCount, actualCount]);


const Report = ({data}) => {
  console.log("xcvbnm,.", data)
  const [trainingData, setTrainingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [plannedCount, setPlannedCount] = useState(0);
  const [actualCount, setActualCount] = useState(0);
  const [plannedVsActual, setPlannedVsActual] = useState(0);
  const [meetingHours, setMeetingHours] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(`http://localhost:3011/v1/training/final?meetingId=${data?._id}`);
        setTrainingData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching training data:', error);
        setIsLoading(false);
      }
    };

    fetchTrainingData();
  }, []);

  useEffect(() => {
    if (trainingData) {
      // Count planned employees
      const plannedEmployees = trainingData.allEmployees.filter(employee => employee.planned);
      setPlannedCount(plannedEmployees.length);

      // Count actual employees with punch in and punch out times
      const actualEmployees = plannedEmployees.filter(employee => employee.timeInfo && employee.timeInfo.length > 0);
      setActualCount(actualEmployees.length);

      // Calculate planned vs actual
      setPlannedVsActual(plannedCount - actualCount);

      // Calculate meeting hours
      // let totalMeetingHours = 0;
      // trainingData.allEmployees.forEach(employee => {
      //   if (employee.fromTime && employee.toTime) {
      //     const fromTime = new Date(employee.fromTime);
      //     const toTime = new Date(employee.toTime);
      //     const diffMs = toTime - fromTime;
      //     const diffHours = diffMs / (1000 * 60 * 60);
      //     totalMeetingHours += diffHours;
      //   }
      // });
      // setMeetingHours(totalMeetingHours);

      // Calculate total time
    //   let totalTimeHours = 0;
    //   trainingData.allEmployees.forEach(employee => {
    //     if (employee.timeInfo && employee.timeInfo.length > 0) {
    //       const punchInTime = new Date(employee.timeInfo[0].time);
    //       const punchOutTime = new Date(employee.timeInfo[employee.timeInfo.length - 1].time);
    //       const diffMs = punchOutTime - punchInTime;
    //       const diffHours = diffMs / (1000 * 60 * 60);
    //       totalTimeHours += diffHours;
    //     }
    //   });
    //   setTotalTime(totalTimeHours);
     }
  }, [trainingData, plannedCount, actualCount]);

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
      flexDirection: 'column'
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
    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: 'bold',
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      height: 50,
      backgroundColor: '#DEDEDE',
      borderColor: 'whitesmoke',
      borderRightWidth: 1,
      borderBottomWidth: 1
    },
    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: 'whitesmoke',
      borderRightWidth: 1,
      borderBottomWidth: 1
    }
  });

  const InvoiceTitle = () => (
    <View style={{ position: 'relative', alignItems: 'center' }} >
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>JAY BHARAT MARUTI LIMITED</Text>
      <Text style={{ fontSize: 12 }}>Attendance Sheet</Text>
      <Text style={{ fontSize: 10 }}>Internal Training Programme</Text>
      <Image source={logo} style={{ width: 80, height: 80, ...styles.logo }} />
      <Image source={logoo} style={{ width: 80, height: 80, ...styles.logoo }} />
    </View>
  );

  function formatTime(date) {
    const dateTime = new Date(date);
    dateTime.setHours(dateTime.getHours() - 5);
    dateTime.setMinutes(dateTime.getMinutes() - 30);
    // Format the time as desired (e.g., HH:mm)
    const formattedTime = `${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
    return formattedTime;
  }

  const test = [
    { name: 'Training Topic', key: 'projectName' },
    { name: 'Faculty Name', key: 'trainerName' },
    { name: 'Venue', key: 'plantName' },
    { name: 'Plant ID', key: 'plantId' },
    { name: 'Date', key: 'date' },
    { name: 'From Time', key: 'fromTime' },
    { name: 'To Time', key: 'toTime' },
    { name: 'Faculty Mail', key: 'facultyMail' },
    // { name: 'Meeting Hours', key: "Meeting Hours" },
  ];

  // const TableHead = () => (
  //   <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
  //     {test.map(({ name }, index) => (
  //       <View key={index} style={styles.theader}>
  //         <Text>{name}</Text>
  //       </View>
  //     ))}
  //   </View>
  // );

  const TableHead = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      {test.map(({ name }, index) => {
        return (
          <View key={index} style={styles.theader}>
            <Text>{name}</Text>
          </View>
        )
      })}
    </View>
  );

  const TableBody = ({ trainingData }) => (
  
    <View style={{ width: '100%', flexDirection: 'row' }}>
      {test.map(({ key }, index) => {

// const punchInTime = receipt.timeInfo.length > 0 ? new Date(receipt.timeInfo[0].time) : null;
// const punchOutTime = receipt.timeInfo.length > 0 ? new Date(receipt.timeInfo[receipt.timeInfo.length - 1].time) : null;

// let meetingHours = 0;
// //let totalTime = 0;

// if (trainingData.fromTime && trainingData.toTime) {
//   const fromTime = new Date(trainingData.fromTime);
//   const toTime = new Date(trainingData.toTime);
//   let meetingHours = 0;
//   const meetingHoursDiff = (toTime.getTime() - fromTime.getTime());
//   meetingHours = Math.abs(meetingHoursDiff);
// }


        console.log("table",TableBody)
        return(
        <View style={styles.tbody} key={index}>
          <Text>{key === "date" ? new Date(trainingData[key]).toLocaleDateString('sv-SE') : trainingData[key]}</Text>
        </View>
        )
      })}
    </View>

  );

  const test1 = [
    { name: 'Employee Name', key: "empFName[0]" },
    { name: ' Employee ID', key: "empOnlyId" },
    { name: 'Category', key: "planned ? 'Planned' : 'Unplanned'" },
    { name: 'Department', key: "department.join(', ')" },
    { name: 'Plant ID', key: "empPlantId.join(', ')" },
    { name: 'Acknowledgement', key: "acknowledgement ? 'Yes' : 'No'" },
    { name: 'Punch In', key: "Punch In" },
    { name: 'Punch Out', key: "Punch Out" },
  ];

  // const TableHead2 = () => (
  //   <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
  //     {test1.map(({ name }, index) => (
  //       <View key={index} style={styles.theader}>
  //         <Text>{name}</Text>
  //       </View>
  //     ))}
  //   </View>
  // );

  const TableHead2 = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      {test1.map(({ name }, index) => {
        return (
          <View key={index} style={styles.theader}>
            <Text>{name}</Text>
          </View>
        )
      })}
      {/* <View style={styles.theader}>
        <Text>Total Time</Text>
      </View> */}
    </View>
  );

  const TableBody1 = ({ trainingData }) => (
    <Fragment>
      {trainingData.allEmployees.map((receipt, index) => (
        <View style={{ width: '100%', flexDirection: 'row' }} key={index}>
          {test1.map(({ key }, innerIndex) => (
            <View style={styles.tbody} key={innerIndex}>
              {key === 'Punch In' && (
                <Text>{receipt.timeInfo && receipt.timeInfo.length > 0 ? formatTime(receipt.timeInfo[0].time) : '-'}</Text>
              )}
              {key === 'Punch Out' && (
                <Text>{receipt.timeInfo && receipt.timeInfo.length > 0 ? formatTime(receipt.timeInfo[receipt.timeInfo.length - 1].time) : '-'}</Text>
              )}
              {key !== 'Punch In' && key !== 'Punch Out' && (
                <Text>
                  {key === "date"
                    ? new Date(receipt[key]).toLocaleDateString('sv-SE')
                    : eval(`receipt.${key}`)}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </Fragment>
  );

  const TableFooter = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
      <View style={styles.theader}>
        <Text>Total Planned Employees: {plannedCount}</Text>
      </View>
      <View style={styles.theader}>
        <Text>Total Actual Employees: {actualCount}</Text>
      </View>
      <View style={styles.theader}>
        <Text>Planned vs Actual: {plannedVsActual}</Text>
      </View>
      {/* <View style={styles.theader}>
        <Text>Meeting Hours: {meetingHours.toFixed(2)}</Text>
      </View>
      <View style={styles.theader}>
        <Text>Total Time: {totalTime.toFixed(2)}</Text>
      </View> */}
      <View style={styles.theader}>
        <Text>Meeting Description: {trainingData.meetingDescription}</Text>
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <TableHead trainingData={trainingData} />
        <TableBody trainingData={trainingData} />
        <TableHead2 trainingData={trainingData} />
        <TableBody1 trainingData={trainingData} />
        <TableFooter />
      </Page>
    </Document>
  );
}

export default Report;