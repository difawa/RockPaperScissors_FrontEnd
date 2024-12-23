import { StyleSheet, Text, View, Image } from 'react-native';
import board from '../assets/images/board.png'

export default function Leaderboard() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>LEADERBOARD</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1C22',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 35,
        color: '#FEBB24',
        fontFamily: 'BlackHanSans',
    }
});