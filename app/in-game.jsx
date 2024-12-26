import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MenuButton from "../components/MenuButton";
import Svg, { Path } from "react-native-svg";
import toplogo from '../assets/images/toplogo.png';
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
        <View style={styles.container}>
            <Image source={toplogo} style={{ position: 'absolute', top: 1, width: '250', height: '390', resizeMode: 'contain' }} />
            <Svg width="100%" height="100" preserveAspectRatio="none"
                viewBox="0 0 393 137" fill="none"
                xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 200 }}>
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 123.456L393 0V37.5057L0 137L0 123.456Z" fill="#D7E773" />
            </Svg>

            <View style={{ position: 'relative', flexDirection: 'row', marginTop: 250, marginRight: 20, alignSelf: 'flex-end' }}>
                <Image source={score} />
            </View>

            <View style={{ marginTop: 30, marginLeft: 75, flexDirection: 'row', alignSelf: 'flex-start' }}>
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
        fontSize: 50,
        color: '#FEBB24',
        fontFamily: 'BlackOpsOne',
    },
    select: {
        fontSize: 20,
        color: '#D7E773',
        fontFamily: 'BlackHanSans',
        marginTop: 60,
        marginBottom: 20
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    }
})