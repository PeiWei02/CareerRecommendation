import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 5 },
});

export const Holland6ResultPDF = ({holland6Result}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Your Holland6 Result</Text>
          <Text style={styles.text}>You are a {holland6Result.title}!</Text>
          <Text style={styles.text}>
            Description: {holland6Result.description}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Characteristics</Text>
          <Text style={styles.text}>{holland6Result.characteristics}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Careers</Text>
          <Text style={styles.text}>{holland6Result.careers}</Text>
        </View>
      </Page>
    </Document>
  );
}

Holland6ResultPDF.propTypes = {
  holland6Result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    characteristics: PropTypes.string.isRequired,
    careers: PropTypes.string.isRequired,
  }).isRequired,
};