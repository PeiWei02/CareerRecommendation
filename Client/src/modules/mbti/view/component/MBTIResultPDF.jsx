import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 5 },
});

export const MBTIResultPDF = ({ results }) => {
  return (
    <Document>
      {results.map((result, index) => (
        <Page key={index} style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Your MBTI Results</Text>
            <Text style={styles.text}>You are a {result.name}!</Text>
            <Text style={styles.text}>Description: {result.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Cognitive Function</Text>
            <Text style={styles.text}>{result.cognitiveFunction}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Strengths</Text>
            <Text style={styles.text}>{result.strengths}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Weaknesses</Text>
            <Text style={styles.text}>{result.weaknesses}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Interaction</Text>
            <Text style={styles.text}>{result.interaction}</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

MBTIResultPDF.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      cognitiveFunction: PropTypes.string.isRequired,
      strengths: PropTypes.string.isRequired,
      weaknesses: PropTypes.string.isRequired,
      interaction: PropTypes.string.isRequired,
    })
  ).isRequired,
};
