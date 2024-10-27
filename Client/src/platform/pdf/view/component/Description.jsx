import { StyleSheet, Text } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    description: {
        fontSize: 15,
        marginBottom: 5,
        color: '#aaaaaa',
    },
});

export function Description({ content }) {
    return <Text style={styles.description}>{content}</Text>;
}

Description.propTypes = {
    content: PropTypes.string.isRequired,
};
