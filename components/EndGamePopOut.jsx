import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
export default function EndGamePopOut({ visible, setVisible, finalGame }) {
    const router = useRouter()
    const textResult = function (finalGame) {
        if (finalGame === 'user1') {
            return 'Game is Over! You Win!'
        } else if (finalGame === 'user2') {
            return 'Game is Over! You Lose!'
        } else if (finalGame === 'draw') {
            return 'Game is Over! It\'s a Draw!'
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
                <View style={styles.modal}>
                    <Text style={styles.modalText}>{textResult(finalGame)}</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => router.replace('/versuscom')}
                    >
                        <Text style={styles.closeButtonText}>Play again!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toLeaderboardButton}
                        onPress={() => router.replace('/leaderboard')}
                    >
                        <Text style={styles.closeButtonText}>Go to Leaderboard</Text>
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
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    toLeaderboardButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FF5733',
        borderRadius: 5,
    },
})