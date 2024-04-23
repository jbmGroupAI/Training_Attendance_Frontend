import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import logo from './Logo.png';
import logoo from './third-eye.png';

const Report = ({ upperData,expandedData}) => {
    console.log('data',upperData)
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
            fontSize: 15,
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
            height: 20,
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

    const test1 = [
        { name: 'Employee Name', key: 'employeeName' },
        { name: 'Employee ID', key: 'employeeId' },
        { name: 'Training Count', key: 'trCount' },
    ];
    console.log('Test1:', test1);



    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            {test1.map(({ name }, index) => (
                <View key={index} style={styles.theader}>
                    <Text>{name}</Text>
                </View>
            ))}
        </View>
    );


//     const TableBody = () => (
//         <View style={{ width: '100%', flexDirection: 'row' }}>
//             {test1.map(({ key ,name}, index) =>{ 
//                 console.log("ggg : ",name === "Training Count" ? upperData?.trainingId
//                 ?.length: upperData[key])
//                 return(
//                 <View style={styles.tbody} key={index}>
//                     <Text>{name === "Training Count" ? upperData?.trainingId
// ?.length: upperData[key]}</Text>
//                 </View>
// )})}
//         </View>
//     );

const TableBody = () => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
        {test1.map(({ key ,name}, index) => (
            <View style={styles.tbody} key={index}>
                <Text>{name === "Training Count" ? upperData?.trainingId?.length : upperData?.[key]}</Text>
            </View>
        ))}
    </View>
);
    
    const test2 = [
        { name: 'Training Topic', key: 'projectName' },
        { name: 'Trainer Name', key: 'trainerName' },
        { name: 'Venue', key: 'plantName' },
        { name: 'Plant ID', key: 'plantId' },
        { name: 'Date', key: 'date' },
        { name: 'From Time', key: 'fromTime' },
        { name: 'To Time', key: 'toTime' }
    ];
    console.log('Test2:', test2);

    const TableHead1 = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            {test2.map(({ name }, index) => (
                <View key={index} style={styles.theader}>
                    <Text>{name}</Text>
                </View>
            ))}
        </View>
    );

    // const TableBody2 = () => {
    //     console.log('Expanded Data:', expandedData);
    //     return (
    //         <>
    //             {expandedData.map((rowData, rowIndex) => (
    //                 <View key={rowIndex} style={{ width: '100%', flexDirection: 'row' }}>
    //                     {test2.map(({ key }, cellIndex) => (
    //                         <View style={styles.tbody} key={cellIndex}>
    //                             <Text>{key === "date" ? new Date(rowData[key]).toLocaleDateString('sv-SE') : rowData[key]}</Text>
    //                         </View>
    //                     ))}
    //                 </View>
    //             ))}
    //         </>
    //     );
    // };

    const TableBody2 = () => {
        console.log('Expanded Data:', expandedData);
        return (
            <>
                {/* Iterate over each item in expandedData */}
                {expandedData.map((rowData, rowIndex) => (
                    <View key={rowIndex} style={{ width: '100%', flexDirection: 'row' }}>
                        {/* Render each column based on the test2 keys */}
                        {test2.map(({ key }, cellIndex) => (
                            <View style={styles.tbody} key={cellIndex}>
                                {/* Use conditional rendering if necessary */}
                                {/* Example: Format the date if the key is 'date' */}
                                <Text>{key === "date" ? new Date(rowData[key]).toLocaleDateString('sv-SE') : rowData[key]}</Text>
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
                <TableHead1/>
                <TableBody2/>
            </Page>
        </Document>
    );
};

export default Report;
