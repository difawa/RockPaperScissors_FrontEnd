import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function EndGamePopOut({ visible, setVisible, finalGame }) {
    const router = useRouter()
    const textResult = function (finalGame) {
        if (finalGame === 'user1') {
            return (<Text style={{color: '#fff'}}>You <Text style={{color: '#009D47'}}>Win!</Text></Text>)
        } else if (finalGame === 'user2') {
            return (<Text style={{color: '#fff'}}>You <Text style={{color: '#F80000'}}>Lose!</Text></Text>)
        } else if (finalGame === 'draw') {
            return (<Text style={{color: '#fff'}}>It's a Draw!</Text>)
        } else {
            return 'Something wrong. Please try again.'
        }
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.overlay}>
                <View style={[styles.modal, { borderColor: finalGame === 'user1' ? '#009D47' : finalGame === 'user2' ? '#F80000' : '#fff' }]}>
                    <Text style={styles.modalText}>{textResult(finalGame)}</Text>
                    <TouchableOpacity
                        style={styles.playAgain}
                        onPress={() => router.replace('/versuscom')}
                    >
                        <Text style={styles.closeButtonText}>PLAY AGAIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toLeaderboardButton}
                        onPress={() => router.replace('/leaderboard')}
                    >
                        <Text style={styles.closeButtonText}>GO TO LEADERBOARD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: 300,
        padding: 20,
        backgroundColor: '#252728',
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'BlackOpsOne',
    },
    playAgain: {
        padding: 10,
        backgroundColor: '#D7E773',
        borderRadius: 999,
    },
    closeButtonText: {
        color: '#fff',
        fontFamily: 'BlackHanSans',
        textAlign: 'center',
        textShadow: '0px 0px 5px black',
    },
    toLeaderboardButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FEBB24',
        borderRadius: 999,
    },
})