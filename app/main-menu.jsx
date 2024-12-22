import { View, Text, StyleSheet, Image } from "react-native";
import MenuButton from "../components/MenuButton";
import Svg, { Path } from "react-native-svg";
import toplogo from '../assets/images/toplogo.png'
import { useRouter } from "expo-router";

export default function MainMenu() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Image source={toplogo} style={{ position: 'absolute', top: 20, width: '210', height: '240', resizeMode: 'contain' }} />
            <Svg width="100%" height="100" preserveAspectRatio="none"
                viewBox="0 0 393 137" fill="none"
                xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 130 }}>
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 123.456L393 0V37.5057L0 137L0 123.456Z" fill="#D7E773" />
            </Svg>

            <View style={styles.titleContainer}>
                <Text style={{ ...styles.title, color: '#FEBB24' }}>Hand of</Text>
                <Text style={{ ...styles.title, color: '#fff' }}>Fate</Text>
            </View>

            <MenuButton text="START" onPress={() => router.push('/in-game')} />
            <MenuButton text="LEADERBOARD" onPress={() => router.push('/leaderboard')} />
            <MenuButton text="EXIT" onPress={() => router.replace('/')} />

            <Svg width="100%" height="144" viewBox="0 0 393 144" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 60, width: '100%' }}>
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
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 60,
        fontWeight: '900',
        margin: -4
    }
})