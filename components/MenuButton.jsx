import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuButton({onPress, text, color, color2}) {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.button, backgroundColor: color}}>
            <Text style={styles.buttonText}>{text}</Text>
            <View
                style={[
                    {...styles.ellipse, backgroundColor: color2},
                    { transform: [{ rotate: '38deg' }] }, // Putar elips 45 derajat
                ]}
            ></View>
            <View
                style={[
                    {...styles.ellipse2, backgroundColor: color2},
                    { transform: [{ rotate: '-45deg' }] }, // Putar elips 45 derajat
                ]}
            ></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 70,
        width: 220,
        borderRadius: 36,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#55361B',
        borderWidth: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textShadow: '0 3px 4px #4F4F4F', // warna bayangan
    },
    ellipse: {
        width: 22,
        height: 11,
        borderRadius: '100%',
        position: 'absolute',
        top: 8,
        right: 9
      },
    ellipse2: {
        width: 16,
        height: 12,
        borderRadius: '100%',
        position: 'absolute',
        top: 12,
        left: 8
      }
});