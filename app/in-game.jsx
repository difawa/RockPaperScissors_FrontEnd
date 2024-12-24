import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import TopLogo from "../components/TopLogo";
import rock from '../assets/images/rock.png';
import paper from '../assets/images/paper.png';
import scissor from '../assets/images/scissor.png';
import score from '../assets/images/score.png'
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

            <View style={{ position: 'relative', right: 20, width: '100%', alignItems: 'flex-end' }}>
                <Image source={score} style={{ width: 139, height: 42 }} />
            </View>
            <View style={{ marginTop: 20, marginLeft: 75, flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Text style={styles.title}>CHOOSE</Text>
            </View>
            <View style={{ marginRight: 75, flexDirection: 'row', alignSelf: 'flex-end' }}>
                <Text style={styles.title}><Text style={{ color: '#FFF' }}>YOUR</Text></Text>
            </View>
            <Text style={styles.title}>FATE</Text>
            <View>
                <Text style={styles.select}>SELECT ONE :</Text>
            </View>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => router.push('/RR_draw')}>
                    <Image source={rock} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={scissor} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity>
                    <Image source={paper} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({


    title: {
        fontSize: 50,
        color: '#FEBB24',
        fontFamily: 'BlackOpsOne',
    },
    select: {
        fontSize: 20,
        color: '#D7E773',
        fontFamily: 'BlackHanSans',
        marginTop: 30,
        marginBottom: 20
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    }
})