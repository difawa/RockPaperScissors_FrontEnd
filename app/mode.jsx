import { View, Text, StyleSheet, Image } from "react-native";
import MenuButton from "../components/MenuButton";
import Svg, { Path } from "react-native-svg";
import toplogo from '../assets/images/toplogo.png'
import { useRouter } from "expo-router";
import vscom from '../assets/images/vscom.png'
import vsuser from '../assets/images/vsuser.png'

const user = {
    id: 1,
    username: "difawinanda",
    email: "N6dLx@example.com"
}

export default function Mode() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Image source={toplogo} style={{ position: 'absolute', top: 25, width: '170', height: '190', resizeMode: 'contain' }} />
            <Svg width="100%" height="100" preserveAspectRatio="none"
                viewBox="0 0 393 137" fill="none"
                xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 110 }}>
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 123.456L393 0V37.5057L0 137L0 123.456Z" fill="#D7E773" />
            </Svg>

            <Text style={styles.title}>Choose <Text style={{ color: '#FFF' }}>Player :</Text></Text>
            <Image source={vscom} style={styles.vs} />
            <Text style={styles.or}>O<Text style={{ color: '#FFF' }}>R</Text></Text>
            <Image source={vsuser} style={styles.vs} />

            <Svg width="100%" height="144" viewBox="0 0 393 144" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 40, width: '100%' }}>
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M393 129.764L8.22544e-06 0V39.4221L393 144L393 129.764Z" fill="#D7E773" />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1C22',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        color: '#FEBB24',
        fontFamily: 'BlackOpsOne',
        marginTop: 40
    },
    or: {
        color: '#FEBB24',
        fontSize: 30,
        fontFamily: 'CabinSketch-Regular',
    },
    vs: { width: 236, height: 93, marginVertical: 20 }
})