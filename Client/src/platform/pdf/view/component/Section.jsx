import { StyleSheet, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    section: { marginBottom: 20 },
});

export function Section({ children }) {
    return <View style={styles.section}>{children}</View>;
}

Section.propTypes = {
    children: PropTypes.node.isRequired,
};
