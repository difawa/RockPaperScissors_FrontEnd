import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
export default function EndGamePopOut({ visible, setVisible }) {
    const router = useRouter()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>Game is Over!</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
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
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#FF5733',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
})