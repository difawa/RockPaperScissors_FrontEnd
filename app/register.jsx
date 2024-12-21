import { Link } from "expo-router";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} />

            <TextInput placeholder="Username" style={styles.input} />
            <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} />
            <TextInput placeholder="Password" keyboardType="password" style={styles.input} secureTextEntry={true} />
            <Text style={{ color: '#fff', alignSelf: 'flex-start' }}>Already have an account? <Link href={""}><Text style={{ color: '#FEBB24', fontWeight: 'bold' }}>Login here</Text></Link></Text>
            <TouchableOpacity style={styles.button}><Text style={{ color: '#fff' }}>Register</Text></TouchableOpacity>
            <LinearGradient
                // Button Linear Gradient
                colors={['#FEBB24', '#E5C98A']}
                style={styles.button} >
                <Text>Register</Text>
            </LinearGradient>
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
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        backgroundColor: '#7C5F1E',
        marginVertical: 10,
        borderRadius: 100,
        paddingHorizontal: 20,
        color: '#fff',
    },
    button: {
        width: 100,
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 20,
    }
})