import { View, Image, Text, StyleSheet } from "react-native"
import scorebg from '../assets/images/score-user.png'

export default function Score({playerScore, enemyScore}) {
    return (
        <>
            <View style={styles.scoreContainer}>
                <Image source={scorebg} style={{ width: 139, height: 42 }} />
                <Text style={styles.scoreText}>{playerScore} : {enemyScore}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    scoreContainer: { marginTop: -5, alignItems: 'center', justifyContent: 'center' },
    scoreText: {
        color: '#FFF',
        fontFamily: 'BlackOpsOne',
        position: 'absolute',
        fontSize: 20,
        textShadow: '-1px 1px 10px black',
    },
})