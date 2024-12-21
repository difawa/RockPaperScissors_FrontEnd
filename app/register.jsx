import { Link } from "expo-router";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InputBox from "../components/InputBox";
import { useState } from "react";

export default function Register() {
    const [hidepassword, setHidePassword] = useState(true);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} />

            <InputBox text="Username" />
            <InputBox text="Email" keyboardType="email-address" />
            <InputBox text="Password" secureTextEntry={hidepassword} />
            <Text style={{ color: '#fff', alignSelf: 'flex-start' }}>Already have an account? <Link href={""}><Text style={{ color: '#FEBB24', fontWeight: 'bold' }}>Login here</Text></Link></Text>
            <LinearGradient
                // Button Linear Gradient
                colors={['#FEBB24', '#E5C98A']}
                style={styles.button} end={{ x: 1, y: 0 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign Up</Text>
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