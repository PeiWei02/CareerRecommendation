import { StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    divider: {
        height: 3,
        backgroundColor: '#646cffaa',
        marginVertical: 8,
    },
});

export function Divider() {
    return <View style={styles.divider} />;
}
