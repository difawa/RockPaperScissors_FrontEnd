import { Link } from "expo-router";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InputBox from "../components/InputBox";
import { useState } from "react";

export default function Register() {
    const [hidepassword, setHidePassword] = useState(true);
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const handleSignUp = () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert("Validation Error", "Please fill in all fields before signing up.");
            return;
        }
    
        // Jika semua input terisi, lanjutkan proses
        console.log("Form Data:", form); // Debugging
        Alert.alert("Success", "Your account has been created!");
        // Lakukan validasi tambahan atau pengiriman data ke backend di sini
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} />

            <InputBox text="Username" form={form} setForm={setForm} LowerCase={true} />
            <InputBox text="Email" keyboardType="email-address" form={form} setForm={setForm} LowerCase={true} />
            <InputBox text="Password" secureTextEntry={hidepassword} password={true} setPasswordVisible={setHidePassword} PasswordVisible={hidepassword} form={form} setForm={setForm} />
            <Text style={{ color: '#fff', alignSelf: 'flex-start' }}>Already have an account? <Link href={""}><Text style={{ color: '#FEBB24', fontWeight: 'bold' }}>Login here</Text></Link></Text>
            <TouchableOpacity onPress={handleSignUp}>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#FEBB24', '#E5C98A']}
                    style={styles.button} end={{ x: 1, y: 0 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign Up</Text>
                </LinearGradient>
            </TouchableOpacity>
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