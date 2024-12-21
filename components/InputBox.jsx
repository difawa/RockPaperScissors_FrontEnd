import { Text, TextInput, StyleSheet } from "react-native"


export default function InputBox(props) {
    return (
        <>
            <Text style={{ color: '#fff', alignSelf: 'flex-start', paddingLeft: 20 }}>{props.text}<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput placeholder={props.text} style={styles.input} />
        </>
    )
}

const styles = StyleSheet.create({
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
    }
})
