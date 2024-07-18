// import React from "react";
// import {
//   Document,
//   Page,
//   View,
//   Text,
//   Image,
//   StyleSheet,
// } from "@react-pdf/renderer";
// import logo from "./Logo.png";
// import logoo from "./third-eye.png";

// const Report = ({ upperData, expandedData }) => {
//   const styles = StyleSheet.create({
//     page: {
//       fontSize: 11,
//       paddingTop: 20,
//       paddingLeft: 40,
//       paddingRight: 40,
//       lineHeight: 1.5,
//       flexDirection: "column",
//     },

//     spaceBetween: {
//       flex: 1,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       color: "#3E3E3E",
//     },

//     titleContainer: {
//       flexDirection: "row",
//       marginTop: 24,
//     },

//     logo: {
//       width: 120,
//       marginLeft: 10,
//       position: "absolute",
//       top: 0,
//       left: 0,
//     },
//     logoo: {
//       width: 120,
//       marginRight: 10,
//       position: "absolute",
//       top: 0,
//       right: 0,
//     },

//     reportTitle: {
//       fontSize: 15,
//       textAlign: "center",
//       fontStyle: "bold",
//       alignItems: "center",
//     },

//     addressTitle: {
//       fontSize: 11,
//       fontStyle: "bold",
//     },

//     invoice: {
//       fontWeight: "bold",
//       fontSize: 20,
//     },

//     invoiceNumber: {
//       fontSize: 11,
//       fontWeight: "bold",
//     },

//     address: {
//       fontWeight: 400,
//       fontSize: 10,
//     },

//     theader: {
//       marginTop: 20,
//       fontSize: 10,
//       fontStyle: "bold",
//       paddingTop: 4,
//       paddingLeft: 7,
//       flex: 1,
//       backgroundColor: "#0566fc1a",
//       borderColor: "#0566fc1a",
//       color: "#060bb7",
//     },

//     tbody: {
//       fontSize: 9,
//       paddingTop: 4,
//       paddingLeft: 7,
//       flex: 1,
//       borderColor: "whitesmoke",
//       borderRightWidth: 1,
//       borderBottomWidth: 1,
//     },
//   });

//   const InvoiceTitle = () => (
//     <View style={{ position: "relative", alignItems: "center" }}>
//       <Text style={{ fontSize: 15, fontWeight: "bold" }}>JBM Group</Text>
//       <Text style={{ fontSize: 12 }}>Individual Training Record</Text>
//       <Text style={{ fontSize: 10 }}>Internal Training Programme</Text>
//       <Image source={logo} style={{ width: 80, height: 80, ...styles.logo }} />
//       <Image
//         source={logoo}
//         style={{ width: 80, height: 80, ...styles.logoo }}
//       />
//     </View>
//   );

//   const test1 = [
//     { name: "Employee Name", key: "employeeName", size: "30%" },
//     { name: "Employee ID", key: "employeeId", size: "30%" },
//     { name: "Plant ID", key: "plantIds", size: "20%" },
//     { name: "Training Count", key: "trCount", size: "20%" },
//   ];

//   const TableHead = () => (
//     <div style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
//       {test1.map(({ name, size }, index) => (
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
//             borderTopLeftRadius: index === 0 ? 4 : 0,
//             borderTopRightRadius: index === test1.length - 1 ? 4 : 0,
//             borderLeft: index === 0 ? "1px solid lightskyblue" : 0,
//             borderRight: index === (test1.length -1) ? "1px solid lightskyblue" : 0 
//           }}
//         >
//           <Text>{name}</Text>
//         </View>
//       ))}
//     </div>
//   );

//   const TableBody = () => (
//     <div style={{ width: "100%", flexDirection: "row" }}>
//       {test1.map(({ key, name, size }, index) => (
//         <View
//           style={{
//             width: size,
//             border: 1,
//             borderColor: "whitesmoke",
//             fontSize: 9,
//             paddingTop: 6,
//             paddingLeft: 7,
//           }}
//           key={index}
//         >
//           <Text>
//             {name === "Training Count"
//               ? upperData?.trainingId?.length
//               : upperData?.[key]}
//           </Text>
//         </View>
//       ))}
//     </div>
//   );

//   const test2 = [
//     { name: "Training Topic", key: "projectName", size: "15%" },
//     { name: "Trainer Name", key: "trainerName", size: "15%" },
//     { name: "Plant Names", key: "plantNames.join(', ')", size: "15%" },
//     { name: "Plant ID", key: "plantIds", size: "10%" },
//     { name: "Date", key: "date", size: "15%" },
//     { name: "From Time", key: "fromTime", size: "10%" },
//     { name: "To Time", key: "toTime", size: "10%" },
//     { name: "Training Hours", key: "trainingHours", size: "10%" },
//   ];

//   const TableHead1 = () => (
//     <div style={{ width: "100%", flexDirection: "row", marginTop: 15 }}>
//       {test2.map(({ name, size }, index) => (
//         <View
//           key={index}
//           style={{
//             width: size,
//             fontStyle: "bold",
//             border: 1,
//             backgroundColor: "#0566fc1a",
//             color: "#060bb7",
//             border: "1px solid lightskyblue",
//             fontSize: 9,
//             paddingTop: 6,
//             paddingLeft: 7,
//           }}
//         >
//           <Text>{name}</Text>
//         </View>
//       ))}
//     </div>
//   );

//   const calculateTrainingHours = (fromTime, toTime) => {
//     const [fromHours, fromMinutes] = fromTime.split(":").map(Number);
//     const [toHours, toMinutes] = toTime.split(":").map(Number);
//     const fromDate = new Date();
//     fromDate.setHours(fromHours);
//     fromDate.setMinutes(fromMinutes);

//     const toDate = new Date();
//     toDate.setHours(toHours);
//     toDate.setMinutes(toMinutes);

//     const diffMs = toDate.getTime() - fromDate.getTime();
//     const diffHours = diffMs / (1000 * 60 * 60);
//     return diffHours.toFixed(2);
//   };

//   const TableBody2 = () => {
//     return (
//       <>
//         {expandedData.map((rowData, rowIndex) => (
//           <View key={rowIndex} style={{ width: "100%", flexDirection: "row" }}>
//             {test2.map(({ key, size }, cellIndex) => (
//               <View
//                 style={{
//                   width: size,
//                   border: 1,
//                   borderColor: "whitesmoke",
//                   fontSize: 9,
//                   paddingTop: 4,
//                   paddingLeft: 7,
//                 }}
//                 key={cellIndex}
//               >
//                 <Text>
//                   {key === "date"
//                     ? new Date(rowData[key]).toLocaleDateString("sv-SE")
//                     : key === "trainingHours"
//                     ? calculateTrainingHours(
//                         rowData["fromTime"],
//                         rowData["toTime"]
//                       )
//                     : rowData[key]}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         ))}
//       </>
//     );
//   };

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <InvoiceTitle />
//         <TableHead />
//         <TableBody />
//         <TableHead1 />
//         <TableBody2 />
//       </Page>
//     </Document>
//   );
// };

// export default Report;


import React, { useEffect, useState } from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import logo from "./Logo.png";
import logoo from "./third-eye.png";

const Report = ({ upperData, expandedData, employeeId }) => {
  const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      lineHeight: 1.5,
      flexDirection: "column",
    },

    spaceBetween: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      color: "#3E3E3E",
    },

    titleContainer: {
      flexDirection: "row",
      marginTop: 24,
    },

    logo: {
      width: 120,
      marginLeft: 10,
      position: "absolute",
      top: 0,
      left: 0,
    },
    logoo: {
      width: 120,
      marginRight: 10,
      position: "absolute",
      top: 0,
      right: 0,
    },

    reportTitle: {
      fontSize: 15,
      textAlign: "center",
      fontStyle: "bold",
      alignItems: "center",
    },

    addressTitle: {
      fontSize: 11,
      fontStyle: "bold",
    },

    invoice: {
      fontWeight: "bold",
      fontSize: 20,
    },

    invoiceNumber: {
      fontSize: 11,
      fontWeight: "bold",
    },

    address: {
      fontWeight: 400,
      fontSize: 10,
    },

    theader: {
      marginTop: 20,
      fontSize: 10,
      fontStyle: "bold",
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      backgroundColor: "#0566fc1a",
      borderColor: "#0566fc1a",
      color: "#060bb7",
    },

    tbody: {
      fontSize: 9,
      paddingTop: 4,
      paddingLeft: 7,
      flex: 1,
      borderColor: "whitesmoke",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
  });

  const InvoiceTitle = () => (
    <View style={{ position: "relative", alignItems: "center" }}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>JBM GROUP</Text>
      <Text style={{ fontSize: 12 }}>Individual Training Record</Text>
      <Text style={{ fontSize: 10 }}>Internal Training Programme</Text>
      <Image source={logo} style={{ width: 80, height: 80, ...styles.logo }} />
      <Image
        source={logoo}
        style={{ width: 80, height: 80, ...styles.logoo }}
      />
    </View>
  );

  const test1 = [
    { name: "Employee Name", key: "employeeName", size: "30%" },
    { name: "Employee ID", key: "employeeId", size: "30%" },
    { name: "Plant ID", key: "plantIds", size: "20%" },
    { name: "Training Count", key: "trCount", size: "20%" },
  ];

  const TableHead = () => (
    <div style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
      {test1.map(({ name, size }, index) => (
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
            borderTopLeftRadius: index === 0 ? 4 : 0,
            borderTopRightRadius: index === test1.length - 1 ? 4 : 0,
            borderLeft: index === 0 ? "1px solid lightskyblue" : 0,
            borderRight: index === test1.length - 1 ? "1px solid lightskyblue" : 0
          }}
        >
          <Text>{name}</Text>
        </View>
      ))}
    </div>
  );

  const TableBody = () => (
    <div style={{ width: "100%", flexDirection: "row" }}>
      {test1.map(({ key, name, size }, index) => (
        <View
          style={{
            width: size,
            border: 1,
            borderColor: "whitesmoke",
            fontSize: 9,
            paddingTop: 6,
            paddingLeft: 7,
          }}
          key={index}
        >
          <Text>
            {name === "Training Count"
              ? upperData?.trainingId?.length
              : upperData?.[key]}
          </Text>
        </View>
      ))}
    </div>
  );

  const test2 = [
    { name: "Training Topic", key: "projectName", size: "17%" },
    { name: "Trainer Name", key: "trainerName", size: "15%" },
    { name: "Plant Names", key: "plantNames", size: "10%" },
    { name: "Plant ID", key: "plantIds", size: "8%" },
    { name: "Date", key: "date", size: "15%" },
    { name: "From Time", key: "fromTime", size: "8%" },
    { name: "To Time", key: "toTime", size: "8%" },
    { name: "Training Hours", key: "trainingHours", size: "10%" },
    { name: "Attendance", key: "attendance", size: "10%" }
  ];

  const TableHead1 = () => (
    <div style={{ width: "100%", flexDirection: "row", marginTop: 15 }}>
      {test2.map(({ name, size }, index) => (
        <View
          key={index}
          style={{
            width: size,
            fontStyle: "bold",
            border: 1,
            backgroundColor: "#0566fc1a",
            color: "#060bb7",
            border: "1px solid lightskyblue",
            fontSize: 9,
            paddingTop: 6,
            paddingLeft: 7,
          }}
        >
          <Text>{name}</Text>
        </View>
      ))}
    </div>
  );

  const calculateTrainingHours = (fromTime, toTime) => {
    const [fromHours, fromMinutes] = fromTime.split(":").map(Number);
    const [toHours, toMinutes] = toTime.split(":").map(Number);
    const fromDate = new Date();
    fromDate.setHours(fromHours);
    fromDate.setMinutes(fromMinutes);

    const toDate = new Date();
    toDate.setHours(toHours);
    toDate.setMinutes(toMinutes);

    const diffMs = toDate.getTime() - fromDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours.toFixed(2);
  };


  // function switchTextdata(key,row){
  //   switch (key) {
  //     case "plantName": return 'abc'
  //     case "plantIds": return 'bcd'
  //     default: '123'
  //   }
  // }

  const TableBody2 = () => {
    return (
      <>
        {expandedData.map((rowData, rowIndex) => (
          <View key={rowIndex} style={{ width: "100%", flexDirection: "row" }}>
            {test2.map(({ key, size }, cellIndex) => (
              <View
                style={{
                  width: size,
                  border: 1,
                  borderColor: "whitesmoke",
                  fontSize: 9,
                  paddingTop: 4,
                  paddingLeft: 7,
                }}
                key={cellIndex}
              >
                <Text>
                  {key === "date"
                    ? new Date(rowData[key]).toLocaleDateString("sv-SE")
                    : key === "trainingHours"
                    ? calculateTrainingHours(
                        rowData["fromTime"],
                        rowData["toTime"]
                      )
                    : key === "plantNames"
                    ? rowData[key].join(", ")
                    : key === "plantIds"
                    ? rowData[key].join(", ")
                    : key === "attendance"
                    ?(
                      (() => {
                        console.log("rowDDDD", rowData)
                        const temp = rowData?.allEmployees?.find(
                          (employee) => employee.empOnlyId === employeeId
                        );
                        console.log("temp", temp);
                        return temp && temp.acknowledgement ? "Present" : "Absent";
                      })()
                    ): rowData[key]}
                </Text>
      

              </View>
            ))}
          </View>
        ))}
      </>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <TableHead />
        <TableBody />
        <TableHead1 />
        <TableBody2 />
      </Page>
    </Document>
  );
};

export default Report;
