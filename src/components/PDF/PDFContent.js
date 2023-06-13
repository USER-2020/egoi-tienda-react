import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Definir los estilos para el PDF
const styles = StyleSheet.create({
    page: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    view: {
        width:'100%',
        height:'100%'
    }
});

const PDFContent = ({ closeModalPDF }) => (
    <Document>
        <Page size="A4"  style={styles.page}>
            <View style={styles.section}>
                <Text>Hola desde el PDF</Text> {/* Aquí puedes mostrar los datos que desees */}
            </View>
        </Page>
    </Document>
);

export default PDFContent;
