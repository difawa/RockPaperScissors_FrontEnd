import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MenuButton from "../components/MenuButton";
import Svg, { Path } from "react-native-svg";
import toplogo from '../assets/images/toplogo.png'
import { useRouter } from "expo-router";
import vscom from '../assets/images/vscom.png'
import vsuser from '../assets/images/vsuser.png'
import TopLogo from "../components/TopLogo";

const user = {
    id: 1,
    username: "difawinanda",
    email: "N6dLx@example.com"
}

export default function Mode() {
    const router = useRouter();
    return (
        <>

            <TopLogo />

            <Text style={styles.title}>Choose <Text style={{ color: '#FFF' }}>Player :</Text></Text>
            
            <TouchableOpacity onPress={() => router.push('/versuscom')}>
                <Image source={vscom} style={styles.vs} />
            </TouchableOpacity>
            
            <Text style={styles.or}>O<Text style={{ color: '#FFF' }}>R</Text></Text>
            
            <TouchableOpacity onPress={() => router.push('/versushuman')}>
                <Image source={vsuser} style={styles.vs} />
            </TouchableOpacity>

            <Svg width="100%" height="144" viewBox="0 0 393 144" fill="none" preserveAspectRatio="none">
                <Path d="M393 129.764L8.22544e-06 0V39.4221L393 144L393 129.764Z" fill="#D7E773" />
            </Svg>

        </>
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
        marginTop: 15
    },
    or: {
        color: '#FEBB24',
        fontSize: 30,
        fontFamily: 'CabinSketch-Regular',
    },
    vs: { width: 236, height: 93, marginTop: 20, marginBottom: 15 }
})