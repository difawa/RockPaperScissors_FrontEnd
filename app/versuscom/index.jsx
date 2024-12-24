import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import TopLogo from "../../components/TopLogo";
import rock from '../../assets/images/rock.png';
import paper from '../../assets/images/paper.png';
import scissors from '../../assets/images/scissor.png';
import scorebg from '../../assets/images/score.png'
import { useRouter } from "expo-router";
import { useState } from "react";

const user = {
    id: 1,
    username: "difawinanda",
    email: "N6dLx@example.com"
}


export default function MainMenu() {
    const options = ["rock", "scissors", "paper"];
    const randomIndex = Math.floor(Math.random() * options.length); // Angka acak antara 0 dan 2
    const [choices, setChoices] = useState({ user: '', com: '' });
    const [scores, setScores] = useState({ user: 0, com: 0 });

    const router = useRouter();

    return (
        <>
            <TopLogo />

            <View style={{ alignSelf: 'flex-end', marginTop: -5, marginRight: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={scorebg} style={{ width: 139, height: 42 }} />
                <Text style={styles.scores}>{scores.user} : {scores.com}</Text>
            </View>
            <View style={{ width: '70%' }}>
                <Text style={styles.title}>CHOOSE</Text>
                <Text style={{ ...styles.title, color: '#FFF', alignSelf: 'flex-end', marginVertical: -10 }}>YOUR</Text>
                <Text style={{ ...styles.title, alignSelf: 'center' }}>FATE</Text>
            </View>
            <Text style={styles.select}>SELECT ONE :</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => { setChoices({ ...choices, user: 'rock', com: options[randomIndex] }), router.replace('/versuscom/result') }}>
                    <Image source={rock} style={{ width: 100, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setChoices({ ...choices, user: 'scissors', com: options[randomIndex] })}>
                    <Image source={scissors} style={{ width: 100, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: -80, marginBottom: -80 }} onPress={() => setChoices({ ...choices, user: 'paper', com: options[randomIndex] })} >
                <Image source={paper} style={{ width: 100, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <Text style={{color: '#fff'}}>{JSON.stringify(choices)}</Text>
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
        marginTop: 20
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        marginTop: -15
    },
    scores: {
        color: '#FFF',
        fontFamily: 'BlackOpsOne',
        position: 'absolute',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }
})