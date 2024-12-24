import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import MenuButton from "../components/MenuButton";
import Svg, { Path } from "react-native-svg";
import TopLogo from "../components/TopLogo";
import { useRouter } from "expo-router";

const user = {
    id: 1,
    username: "difawinanda",
    email: "N6dLx@example.com"
}

export default function MainMenu() {
    const router = useRouter();
    return (
        <>
            <TopLogo />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>HAND OF FATE</Text>
                <Text style={styles.welcome}>WELCOME, {user.username}</Text>
            </View>

            <MenuButton text="START" onPress={() => router.push('/mode')} color='#FEBB24' color2="#D7E773" />
            <MenuButton text="LEADERBOARD" onPress={() => router.push('/leaderboard')} color='#FEBB24' color2="#D7E773" />
            <MenuButton text="EXIT" onPress={() => router.replace('/')} color='#F80000' color2="#E87575" />


            <Svg width="100%" height="144" preserveAspectRatio="none" viewBox="0 0 393 144" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: -10 }}>
                <Path d="M393 129.764L8.22544e-06 0V39.4221L393 144L393 129.764Z" fill="#D7E773" />
            </Svg>
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 20
    },
    title: {
        fontSize: 40,
        color: '#FEBB24',
        fontFamily: 'BlackHanSans'
    },
    welcome: {
        color: '#fff',
        fontSize: 25,
        fontFamily: 'BlackHanSans',
        marginTop: 10
    }
})