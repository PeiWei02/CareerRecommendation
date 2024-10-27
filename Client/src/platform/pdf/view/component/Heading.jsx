import { StyleSheet, Text } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    heading: {
        color: '#ffffff',
        fontSize: 22,
    },
});

export function Heading({ content, bulletNumber }) {
    return <Text style={styles.heading}>{`${bulletNumber} | ${content}`}</Text>;
}

Heading.propTypes = {
    content: PropTypes.string.isRequired,
    bulletNumber: PropTypes.string.isRequired,
};
