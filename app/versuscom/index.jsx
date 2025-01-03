import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import rock from "../../assets/images/rock.png";
import paper from "../../assets/images/paper.png";
import scissors from "../../assets/images/scissor.png";
import lightning from "../../assets/images/lightning.png";
import userPaper from "../../assets/images/userpaper.png";
import userRock from "../../assets/images/userrock.png";
import userScissors from "../../assets/images/userscissors.png";
import comPaper from "../../assets/images/compaper.png";
import comRock from "../../assets/images/comrock.png";
import comScissors from "../../assets/images/comscissors.png";
import Score from "../../components/Score";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";
import EndGamePopOut from "../../components/EndGamePopOut";
import { Audio } from 'expo-av';

const options = ["rock", "scissors", "paper"];

const comGenerator = () => {
  const random = Math.floor(Math.random() * 3);
  return options[random];
};

const compareChoices = (user, com) => {
  if (user === com) return "It's a Draw";
  if (
    (user === "rock" && com === "scissors") ||
    (user === "scissors" && com === "paper") ||
    (user === "paper" && com === "rock")
  ) {
    return "You Win";
  }
  return "You Lose";
};



export default function VersusCom() {
  const [choices, setChoices] = useState({ user: "", com: "" });
  const [scores, setScores] = useState({ user: 0, com: 0 });
  const [result, setResult] = useState("");
  const [rounds, setRounds] = useState([]);
  const [visiblePopOut, setVisiblePopOut] = useState(false);
  const [finalGame, setFinalGame] = useState("");

  const [audioFiles, setAudioFiles] = useState({});

  const preloadAudios = async () => {
    const audioPaths = {
      handOfFate: require('../../assets/audio/HandofFate.mp3'),
      rock: require('../../assets/audio/rock.mp3'),
      paper: require('../../assets/audio/paper.mp3'),
      scissors: require('../../assets/audio/scissors.mp3'),
      win: require('../../assets/audio/win.mp3'),
      lose: require('../../assets/audio/lose.mp3'),
      draw: require('../../assets/audio/draw.mp3'),
    };

    const loadedAudios = {};
    for (const [key, path] of Object.entries(audioPaths)) {
      const { sound } = await Audio.Sound.createAsync(path);
      loadedAudios[key] = sound;
    }

    setAudioFiles(loadedAudios);
  };

  useEffect(() => {
    if (audioFiles.handOfFate) {
      playAudio("handOfFate");
    }
  }, [audioFiles]);

  const playAudio = async (key) => {
    if (audioFiles[key]) {
      await audioFiles[key].replayAsync(); // Memutar audio dari awal
    }
    else { console.log('audio not found') }
  };

  useEffect(() => {
    preloadAudios();

    return () => {
      // Cleanup semua audio saat komponen di-unmount
      Object.values(audioFiles).forEach((sound) => {
        if (sound) {
          sound.unloadAsync();
        }
      });
    };

  }, []);

  useEffect(() => {
    if (scores.user === 3 || scores.com === 3 || rounds.length === 5) {
      recordMatch();
    }
  }, [scores, rounds]);

  const handleChoice = (userChoice) => {
    if (scores.user === 3 || scores.com === 3 || rounds.length === 5) {
      // Alert.alert("Game Over", "The match has already ended.");
      return;
    }
    playAudio(userChoice);

    const comChoice = comGenerator();
    const gameResult = compareChoices(userChoice, comChoice);
    setChoices({ user: userChoice, com: comChoice });
    setResult(gameResult);

    setRounds((prevRounds) => [
      ...prevRounds,
      {
        winner:
          gameResult === "You Win"
            ? "user1"
            : gameResult === "You Lose"
              ? "user2"
              : "draw",
      },
    ]);

    if (gameResult === "You Win") {
      setScores((prevScores) => ({ ...prevScores, user: prevScores.user + 1 }));
    } else if (gameResult === "You Lose") {
      setScores((prevScores) => ({ ...prevScores, com: prevScores.com + 1 }));
    }
  };

  const recordMatch = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");
      if (!userId || !token)
        throw new Error("Missing user authentication details.");

      const response = await axios.post(
        `${BASE_URL}/matches/record`,
        {
          user1Id: userId,
          user2Id: "computer",
          rounds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from server:", response.data); // Debugging
      setFinalGame(response.data.match.winner);
      function lastAudio() { response.data.match.winner === 'user1' ? playAudio('win') : response.data.match.winner === 'user2' ? playAudio('lose') : playAudio('draw') };
      setTimeout(() => { setVisiblePopOut(true), lastAudio() }, 1000);
    } catch (error) {
      if (error.response) {
        // Response dari server ada tapi dengan status error
        console.error(
          "Backend error:",
          error.response.status,
          error.response.data
        );
        Alert.alert(
          "Error",
          error.response.data.message || "Failed to record match."
        );
      } else if (error.request) {
        // Tidak ada respons dari server
        console.error("Network error:", error.request);
        Alert.alert(
          "Error",
          "Network error. Please check your connection or server availability."
        );
      } else {
        // Error lain
        console.error("Error:", error.message);
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <>
      <Svg
        width="100%"
        height="100"
        preserveAspectRatio="none"
        viewBox="0 0 393 137"
        fill="none"
      >
        <Path d="M0 123.456L393 0V37.5057L0 137L0 123.456Z" fill="#D7E773" />
      </Svg>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={lightning}
          style={{ width: 393, height: 420, opacity: 0.35 }}
        />
        <View style={{ position: "absolute", alignItems: "center" }}>
          {choices.com === "paper" && (
            <Image source={comPaper} style={{ width: 150, height: 150 }} resizeMode="contain" />
          )}
          {choices.com === "rock" && (
            <Image source={comRock} style={{ width: 150, height: 150 }} resizeMode="contain" />
          )}
          {choices.com === "scissors" && (
            <Image source={comScissors} style={{ width: 150, height: 150 }} resizeMode="contain" />
          )}
          <Text style={styles.textResult}>{result}</Text>
          {choices.user === "paper" && (
            <Image source={userPaper} style={{ width: 150, height: 150 }} resizeMode="contain" />
          )}
          {choices.user === "rock" && (
            <Image source={userRock} style={{ width: 150, height: 150 }} resizeMode="contain" />
          )}
          {choices.user === "scissors" && (
            <Image source={userScissors} style={{ width: 150, height: 150 }} resizeMode="contain" />
          )}
        </View>
      </View>

      <Score playerScore={scores.user} enemyScore={scores.com} />

      <Text style={styles.select}>SELECT ONE :</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleChoice("rock")}>
          <Image source={rock} resizeMode="contain" style={{ width: 100 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChoice("scissors")}>
          <Image
            source={scissors}
            resizeMode="contain"
            style={{ width: 100 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChoice("paper")}>
          <Image source={paper} resizeMode="contain" style={{ width: 100 }} />
        </TouchableOpacity>
      </View>
      <EndGamePopOut visible={visiblePopOut} setVisible={setVisiblePopOut} finalGame={finalGame} />
    </>
  );
}

const styles = StyleSheet.create({
  select: {
    fontSize: 20,
    color: "#D7E773",
    fontFamily: "BlackHanSans",
    marginTop: 20,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  textResult: {
    fontSize: 40,
    fontFamily: "BlackOpsOne",
    color: "#FFF",
    textShadow: "-1px 1px 10px black",
  },
});
