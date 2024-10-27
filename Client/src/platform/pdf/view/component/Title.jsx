import { StyleSheet, Text } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    title: { fontSize: 30, marginBottom: 5, color: '#ffffff' },
});

export function Title({ content }) {
    return <Text style={styles.title}>{content}</Text>;
}

Title.propTypes = {
    content: PropTypes.string.isRequired,
};
