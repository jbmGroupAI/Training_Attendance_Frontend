import React, { Fragment } from 'react';
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import logo from './Logo.png';
import logoo from './third-eye.png';

export default function Test({ upperData, expandedData }) {
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


    const test = [
        { name: 'Training Topic', key: 'projectName' },
        { name: 'Faculty Name', key: 'trainerName' },
        { name: 'Venue', key: 'plantName' },
        { name: 'Plant ID', key: 'plantId' },
        { name: 'Date', key: 'date' },
        { name: 'From Time', key: 'fromTime' },
        { name: 'To Time', key: 'toTime' },
        { name: 'Meeting hours', key: 'totalMeetingTime' },
        { name: 'Status', key: 'status' },
    ];

    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            {test.map(({ name }, index) => {
                console.log(name)
                return(
                
                <View key={index} style={styles.theader}>
                    <Text>{name}</Text>
                </View>
            )})}
        </View>
    );

    const TableBody = () => (
        <View style={{ width: '100%', flexDirection: 'row' }}>
            {test.map(({ key }, index) => (
                <View style={styles.tbody} key={index}>
                    <Text>{key === "date" ? new Date(upperData[key]).toLocaleDateString('sv-SE') : upperData[key]}</Text>
                </View>
            ))}
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

    const headers2 = [
        { name: 'Participant List', key: '_id' },
        { name: 'Plant ID', key: 'empPlantId' },
        { name: 'Designation', key: 'department' },
        {
            name: 'Punch In',
            key: 'Punch In',
        },
        {
            name: 'Punch Out',
            key: 'Punch Out',
        },
    ];

    const TableHead2 = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            {headers2.map(({ name }, index) => {

                console.log(name)

                return (
                    <View key={index} style={styles.theader}>
                        <Text>{name}</Text>
                    </View>
                )
            })}
        </View>
    );
    const TableBody2 = () => (
        <Fragment>
            {expandedData.map((receipt, index) => {
                console.log("receipt", receipt)
                return (
                    <View style={{ width: '100%', flexDirection: 'row' }} key={index}>
                        {headers2.map(({ key }, innerIndex) => {
                            if (key === 'Punch In') {
                                return (
                                    <View style={styles.tbody} key={innerIndex}>
                                        <Text>{receipt.hasOwnProperty('timeInfo') ? formatTime(receipt.timeInfo[0].time) : ""}</Text>
                                    </View>
                                )
                            }
                            else if (key === 'Punch Out') {
                                return (
                                    <View style={styles.tbody} key={innerIndex}>
                                        <Text>{receipt.hasOwnProperty('timeInfo') ? formatTime(receipt.timeInfo[receipt.timeInfo.length - 1].time) : ""}</Text>
                                    </View>
                                )
                            }
                            else {
                                return (
                                    <View style={styles.tbody} key={innerIndex}>
                                        <Text>{receipt.hasOwnProperty(key) ? receipt[key] : ""}</Text>
                                    </View>
                                )
                            }
                        })}
                    </View>
                )
            })}
        </Fragment>
    );


    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <TableHead />
                <TableBody />
                <TableHead2 />
                <TableBody2 />
            </Page>
        </Document>
    );
}

