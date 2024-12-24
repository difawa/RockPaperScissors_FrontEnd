import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import lightning from '../../assets/images/lightning.png'

const user = {
    id: 1,
    username: "difawinanda",
    email: "N6dLx@example.com"
}

export default function Mode() {
    const router = useRouter();
    return (
        <>
            <Svg width="100%" height="100" preserveAspectRatio="none"
                viewBox="0 0 393 137" fill="none"
                xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1 }}>
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 123.456L393 0V37.5057L0 137L0 123.456Z" fill="#D7E773" />
            </Svg>

            <Image source={lightning} style={{ marginVertical: -50}} />

            <Svg width="100%" height="144" viewBox="0 0 393 144" fill="none" xmlns="http://www.w3.org/2000/svg" style={{zIndex: 1}}>
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M393 129.764L8.22544e-06 0V39.4221L393 144L393 129.764Z" fill="#D7E773" />
            </Svg>
        </>
    );
}

const styles = StyleSheet.create({
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