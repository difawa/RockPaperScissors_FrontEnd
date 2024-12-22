import { View, Text, StyleSheet } from "react-native"

export default function InGame() {
    return (
        <View style={styles.container}>
            <Text>IN GAME</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1C22',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
})