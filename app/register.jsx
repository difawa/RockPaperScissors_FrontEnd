import { Link } from "expo-router";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";

export default function Register() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/hof_icon.png')}/>

            <TextInput placeholder="Username" style={styles.input}/>
            <TextInput placeholder="Email" keyboardType="email-address" style={styles.input}/>
            <TextInput placeholder="Password" keyboardType="password" style={styles.input} secureTextEntry={true}/>
            <Text>Already have an account? <Link href={"/"}><Text>Login here</Text></Link></Text>
            <TouchableOpacity style={styles.button}><Text style={{color: '#fff'}}>Register</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#51ABCB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1, 
        backgroundColor: '#fff',
        marginVertical: 10,
        borderRadius: 4,
        paddingHorizontal: 10
    },
    button: {
        width: 100,
        height: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 20
    }
})