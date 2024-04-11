import React, { Fragment } from 'react';
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import logo from './Logo.png';

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
            marginLeft: 10
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
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <Image style={styles.logo} src={logo} />
                <Text style={styles.reportTitle}>JAI BHARAT MARUTI LIMITED</Text>
            </View>
        </View>
    );

    const test = [
        { name: 'Training Topic', key: 'projectName' },
        { name: 'Trainer Name', key: 'trainerName' },
        { name: 'Venue', key: 'plantName' },
        { name: 'Plant ID', key: 'plantId' },
        { name: 'Date', key: 'date' },
        { name: 'From Time', key: 'fromTime' },
        { name: 'To Time', key: 'toTime' }
    ];

    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            {test.map(({ name }, index) => (
                <View key={index} style={styles.theader}>
                    <Text>{name}</Text>
                </View>
            ))}
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

    const headers2 = [
        { name: 'Participant List', key: '_id' },
        { name: 'Plant ID', key: 'empPlantId' },
        { name: 'Designation', key: 'department' },
        {
            name: 'Punch In',
            key: (row) => row.timeInfo.length > 0 ? row.timeInfo[0].time : '',
          },
          {
            name: 'Punch Out',
            key: (row) => row.timeInfo.length > 0 ? row.timeInfo[row.timeInfo.length - 1].time : '',
          },
    ];

    const TableHead2 = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            {headers2.map(({ name }, index) => (
                <View key={index} style={styles.theader}>
                    <Text>{name}</Text>
                </View>
            ))}
        </View>
    );

    const TableBody2 = () => (
        <Fragment>
            {expandedData.map((receipt, index) => {
                return (
                <View style={{ width: '100%', flexDirection: 'row' }} key={index}>
                    {headers2.map(({ key }, innerIndex) => (
                        <View style={styles.tbody} key={innerIndex}>
                            <Text>{receipt[key]}</Text>
                        </View>
                    ))}
                </View>
            )})}
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
