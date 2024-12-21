import { Text, TextInput, StyleSheet, TouchableOpacity, View } from "react-native"
import IonIcons from '@expo/vector-icons/Ionicons';

export default function InputBox(props) {
    const validateInput = (value) => {
        if (props.keyboardType === "email-address") {
            return /^[a-zA-Z0-9\@\.\-\_]+$/.test(value);
        } else if (props.text === "Username") {
            return /^[a-zA-Z0-9\.\_]+$/.test(value);
        }
        else {
            return true;
        }
    };
    return (
        <>
            <Text style={{ color: '#fff', alignSelf: 'flex-start', paddingLeft: 20 }}>{props.text}<Text style={{ color: 'red' }}>*</Text></Text>
            <View style={{ width: '100%' }}>
                <TextInput placeholder={props.text}
                    style={styles.input}
                    keyboardType={props.keyboardType}
                    secureTextEntry={props.secureTextEntry}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={props.form[props.text.toLowerCase()]}
                    onChangeText={(text) => { if (validateInput(text) || text === '') { props.setForm({ ...props.form, [props.text.toLowerCase()]: props.LowerCase ? text.toLowerCase() : text }) } }} />
                {props.password &&
                    <TouchableOpacity
                        onPress={() => props.setPasswordVisible(!props.PasswordVisible)}
                        style={styles.icon}>
                        <IonIcons
                            name={props.PasswordVisible ? "eye-off" : "eye"}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#7C5F1E',
        marginVertical: 10,
        borderRadius: 100,
        paddingHorizontal: 20,
        color: '#fff',
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 22,
    }
})
