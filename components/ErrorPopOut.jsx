import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'

export default function ErrorPopOut({ visible, setVisible, errorStatus }) {
    const message = () => {
        switch (errorStatus) {
            case 401:
                return 'Your password is incorrect.';
            case 404:
                return 'Account is not found.';
            case 409:
                return 'Account is already exist. Use another email or username.';
        }

        return errorStatus
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
                    <Text style={styles.modalText}>{message()}</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>CLOSE</Text>
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
        borderWidth: 5,
        borderColor: '#FEBB24'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'BlackOpsOne',
        color: '#fff'
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
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 7
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F80000',
        borderRadius: 999,
    },
})