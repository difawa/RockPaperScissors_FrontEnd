import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import rock from '../../assets/images/rock.png';
import paper from '../../assets/images/paper.png';
import scissors from '../../assets/images/scissor.png';
import scorebg from '../../assets/images/score.png'
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import lightning from '../../assets/images/lightning.png'
import { Alert } from "react-native";
import userPaper from '../../assets/images/userpaper.png'
import userRock from '../../assets/images/userrock.png'
import userScissors from '../../assets/images/userscissors.png'
import comPaper from '../../assets/images/compaper.png'
import comRock from '../../assets/images/comrock.png'
import comScissors from '../../assets/images/comscissors.png'

const user = {
    id: 1,
    username: "difawinanda",
    email: "N6dLx@example.com"
}

const options = ["rock", "scissors", "paper"];
const comGenerator = () => {
    const options = ["rock", "scissors", "paper"];
    const random = Math.floor(Math.random() * 3);
    return options[random];
}

const compareChoices = (user, com) => {
    if (user === com) { return "It's a Draw"; }
    else if ((user === "rock" && com === "scissors") ||
        (user === "scissors" && com === "paper") ||
        (user === "paper" && com === "rock")) {
        return "You Win";
    }
    else { return "You Lose"; }
};

export default function MainMenu() {
    const [choices, setChoices] = useState({ user: '', com: '' });
    const [scores, setScores] = useState({ user: 0, com: 0 });
    const [result, setResult] = useState("");
    const router = useRouter();

    const handleChoice = (userChoice) => {
        const comChoice = comGenerator();
        const gameResult = compareChoices(userChoice, comChoice);
        setChoices({ user: userChoice, com: comChoice });
        setResult(gameResult); if (gameResult === "You Win") {
            setScores(prevScores => {
                const newScores = { ...prevScores, user: prevScores.user + 1 }; if (newScores.user === 5) {
                    Alert.alert("Congratulations!", "You won the game!");
                    return { user: 0, com: 0 }; // Reset skor setelah menang
                } return newScores;
            });
        } else if (gameResult === "You Lose") {
            setScores(prevScores => {
                const newScores = { ...prevScores, com: prevScores.com + 1 }; if (newScores.com === 5) {
                    Alert.alert("Game Over", "The computer won the game."); return { user: 0, com: 0 }; // Reset skor setelah kalah
                } return newScores;
            });
        }
    }

    return (
        <>
            <Svg width="100%" height="100" preserveAspectRatio="none"
                viewBox="0 0 393 137" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path d="M0 123.456L393 0V37.5057L0 137L0 123.456Z" fill="#D7E773" />
            </Svg>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={lightning} style={{ width: 393, height: 420, opacity: 0.35 }} />
                <View style={{ position: 'absolute', alignItems: 'center' }}>
                    {choices.com === 'paper' && <Image source={comPaper} style={{ width: 100 }} />}
                    {choices.com === 'rock' && <Image source={comRock} style={{ width: 100 }} />}
                    {choices.com === 'scissors' && <Image source={comScissors} style={{ width: 100 }} />}
                    <Text style={styles.textResult} >{result}</Text>
                    {choices.user === 'paper' && <Image source={userPaper} style={{ width: 100 }} />}
                    {choices.user === 'rock' && <Image source={userRock} style={{ width: 100 }} />}
                    {choices.user === 'scissors' && <Image source={userScissors} style={{ width: 100 }} />}
                </View>
            </View>
            <View style={styles.scoreContainer}>
                <Image source={scorebg} style={{ width: 139, height: 42 }} />
                <Text style={styles.textScores}>{scores.user} : {scores.com}</Text>
            </View>

            <Text style={styles.select}>SELECT ONE :</Text>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => handleChoice('rock')}>
                    <Image source={rock} resizeMode="contain" style={{ width: 100 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChoice('scissors')}>
                    <Image source={scissors} resizeMode="contain" style={{ width: 100 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: -80, marginBottom: -80 }} onPress={() => handleChoice('paper')} >
                    <Image source={paper} resizeMode="contain" style={{ width: 100 }} />
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
        marginTop: 20
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    },
    scoreContainer: { marginTop: -5, alignItems: 'center', justifyContent: 'center' },
    textScores: {
        color: '#FFF',
        fontFamily: 'BlackOpsOne',
        position: 'absolute',
        fontSize: 20,
        textShadow: '-1px 1px 10px black',
    },
    textResult: { fontSize: 40, fontFamily: 'BlackOpsOne', color: '#FFF', textShadow: '-1px 1px 10px black' }
})