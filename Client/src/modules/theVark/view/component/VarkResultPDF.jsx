import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 5 },
});

export const VarkResultPDF = ({ personalityInfo }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Your VARK Results</Text>
          <Text style={styles.text}>You are a {personalityInfo.name}!</Text>
          <Text style={styles.text}>
            Description: {personalityInfo.description}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Traits</Text>
          <Text style={styles.text}>{personalityInfo.traits}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Techniques</Text>
          <Text style={styles.text}>{personalityInfo.techniques}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.text}>{personalityInfo.feedback}</Text>
        </View>
      </Page>
    </Document>
  );
};

VarkResultPDF.propTypes = {
  personalityInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    traits: PropTypes.string.isRequired,
    techniques: PropTypes.string.isRequired,
    feedback: PropTypes.string.isRequired,
  }).isRequired,
};
