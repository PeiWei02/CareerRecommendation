import { StyleSheet, Text, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    listItem: { marginBottom: 5, color: '#aaaaaa', fontSize: 14 },
});

export function List({ items }) {
    return (
        <View>
            {items.map((item, index) => (
                <Text
                    key={index}
                    style={styles.listItem}
                >
                    • {item}
                </Text>
            ))}
        </View>
    );
}

List.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
