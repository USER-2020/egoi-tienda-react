import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import efecty from '../../assets/mastercard-8 4.png';

const styles = StyleSheet.create({
    page: {
        width: '100%', // Ancho de una factura postal pequeña
        height: '100%', // Alto de una factura postal pequeña
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    image: {
        width: 100,
        height: 50
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    infoContainerRef: {
        flexDirection: 'row',
        marginBottom: 10
    },
    infoLabel: {
        width: 150,
        fontWeight: 'bold'
    },
    infoLabelConvenio: {
        width: 200,
        fontWeight: 'bold'
    },
    infoValue: {
        flex: 1
    },
    description: {
        marginBottom: 10
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10
    },
    footerText: {
        textAlign: 'center'
    }
});

const PDFContent = ({ dataRefEfecty, totalAmount, description }) => {
    const id = dataRefEfecty ? dataRefEfecty.id : null;
    const [referenciaData, setReferenciaData] = useState("");


    useEffect(() => {
        // console.log("datos de la referencia", dataRefEfecty);

        if (dataRefEfecty) {
            setReferenciaData(dataRefEfecty);
        }
    }, [dataRefEfecty]);

    return (
        <Document>
            <Page size="A5" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.header}>
                        <Image style={styles.image} src={efecty} />
                        <Text style={styles.headerText}>Referencia de Pago</Text>
                        {/* <Text style={styles.headerText}>Número de convenio</Text>
                        <Text style={styles.headerText}>110757</Text> */}
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabelConvenio}>Número de convenio:</Text>
                        <Text style={styles.infoValue}>110757</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>ID de referencia:</Text>
                        <Text style={styles.infoValue}>{id}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Total a pagar:</Text>
                        <Text style={styles.infoValue}>${totalAmount.toLocaleString('es')}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text>Descripción del producto:</Text>
                        <Text>{description}</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Dirección de correo: ejemplo@example.com</Text>
                        <Text style={styles.footerText}>Teléfono: 123-456-7890</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFContent;
