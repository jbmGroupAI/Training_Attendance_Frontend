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
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching training data:', error);
        setIsLoading(false);
      }
    };

    fetchTrainingData();
  }, [data]);

  // async function getlegalcode(id){
  //   try {
  //     const res = await axios.get(`${config.url}/post?vanueId=${id}`)
  //   const data = res.data
  //   return data
  //   } catch (error) {
  //     console.log("error while getting legal code",error)
  //   }  
  // }

 


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
      // if (trainingData && trainingData.venueId) {
      //   for (const venueId of trainingData.venueId) {
      //     const data = data.find((d)=> d.venueId === venueId);
      //     if (data) {
      //       setLegalCodes(data.legalCode);
      //     }
      //   }
      // }
    } catch (error) {
      console.log("error while getting legal code", error);
    }
  }
  if(trainingData){
    getLegalCode()
  }
  }, [trainingData]);
  

  // useEffect(() => {
  //   if (trainingData && trainingData.plantNames) {
  //     const fetchLegalCodes = async () => {
  //       const fetchedLegalCodes = {};
  //       for (const plantName of trainingData.plantNames) {
  //         if (config.plantcodes && config.plantcodes[plantName]) {
  //           fetchedLegalCodes[plantName] = config.plantcodes[plantName];
  //         }
  //       }
  //       setLegalCodes(fetchedLegalCodes);
  //     };

  //     fetchLegalCodes();
  //   }
  // }, [trainingData]);

  // useEffect(() => {
  //   if (trainingData && trainingData.venueId) {
  //     const fetchLegalCodes = async () => {
  //       const fetchedLegalCodes = {};
  //       for (const venueId of trainingData.venueId) {
  //         if (data.venueId && data.venueId) {
  //           const data = getlegalcode(vanueId)
  //           fetchedLegalCodes[venueId] = plantcodes[plantName];
  //         }
  //       }
  //       setLegalCodes(fetchedLegalCodes);
  //     };

  //     fetchLegalCodes();
  //   }
  // }, [trainingData]);

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
      fontSize: 10,
      fontStyle: 'bold',
      paddingTop: 8,
      paddingLeft: 7,
      flex: 1,
      height: 28,
      backgroundColor: '#DEDEDE',
      borderColor: 'whitesmoke',
      borderRightWidth: 1,
      borderBottomWidth: 1
    },
    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: 'bold',
      paddingTop: 8,
      paddingLeft: 7,
      flex: 1,
      height: 28,
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
      
      {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.keys(legalCodes).map((plantName, index) => (
          <Text
            key={index}
            style={{
              fontSize: 10,
              marginRight: 10,
              fontWeight: 'bold'
            }}
          >
            {legalCodes[plantName]}
          </Text>
        ))}
      </View> */}
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* {Object.keys(legalCodes).map((venueId, index) => (
          <Text
            key={index}
            style={{
              fontSize: 10,
              marginRight: 10,
              fontWeight: 'bold'
            }}
          >
            {legalCodes[venueId]}
          </Text>
        ))} */}
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
    { name: 'Training Topic', key: 'projectName' },
    { name: 'Trainer Name', key: 'trainerName' },
    { name: 'Venue', key: 'venue' },
    { name: 'Plant Names', key: 'plantNames' },
    { name: 'Plant ID', key: 'plantIds' },
    { name: 'Date', key: 'date' },
    { name: 'From Time', key: 'fromTime' },
    { name: 'To Time', key: 'toTime' },
  ];

  const TableHead = () => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 , alignItems: 'center'}}>
      {test.map(({ name }, index) => (
        <View key={index} style={styles.theader}>
          <Text>{name} </Text>
        </View>
      ))}
    </View>
  );

  const TableBody = ({ trainingData }) => (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
      {test.map(({ key }, index) => (
        <View style={styles.tbody} key={index}>
          <Text>
            {key === "plantNames"
              ? trainingData[key]?.join(', ')
              : key === "plantIds"
              ? trainingData[key]?.join(', ')
              : key === "date"
              ? new Date(trainingData[key]).toLocaleDateString('sv-SE')
              : trainingData[key]}
          </Text>
        </View>
      ))}
    </View>
  );

  const test1 = [
    { name: 'Employee Name', key: "empFName[0]" },
    { name: 'Employee ID', key: "empOnlyId" },
    { name: 'Category', key: "planned ? 'Planned' : 'Unplanned'" },
    { name: 'Department', key: "department.join(', ')" },
    { name: 'Plant ID', key: "empPlantId.join(', ')" },
    { name: 'Acknowledgement', key: "acknowledgement ? 'Yes' : 'No'" },
    { name: 'Punch In', key: "Punch In" },
    { name: 'Punch Out', key: "Punch Out" },
  ];

  const TableHead2 = () => (
    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 , alignItems: 'center'}}>
      {test1.map(({ name }, index) => (
        <View key={index} style={styles.theader}>
          <Text>{name}</Text>
        </View>
      ))}
    </View>
  );

  const TableBody1 = ({ trainingData }) => (
    <Fragment>
      {trainingData.allEmployees.map((receipt, index) => (
        <View style={{ width: '100%', flexDirection: 'row' , alignItems: 'center'}} key={index}>
          {test1.map(({ key }, innerIndex) => (
            <View style={styles.tbody} key={innerIndex}>
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
