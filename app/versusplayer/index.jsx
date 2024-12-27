import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import Score from "../../components/ScoreUser";
import { BASE_URL } from "@env";
import { Audio } from "expo-av";
import EndGamePopOut from "../../components/EndGamePopOut";

export default function VersusPlayer() {
  const [choices, setChoices] = useState({ user: "", opponent: "" });
  const [scores, setScores] = useState({ user: 0, opponent: 0 });
  const [result, setResult] = useState("");
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [rounds, setRounds] = useState(0);
  const [audioFiles, setAudioFiles] = useState({});
  const [visiblePopOut, setVisiblePopOut] = useState(false);
  const [finalGame, setFinalGame] = useState("");

  const preloadAudios = async () => {
    const audioPaths = {
      handOfFate: require("../../assets/audio/HandofFate.mp3"),
      rock: require("../../assets/audio/rock.mp3"),
      paper: require("../../assets/audio/paper.mp3"),
      scissors: require("../../assets/audio/scissors.mp3"),
      win: require("../../assets/audio/win.mp3"),
      lose: require("../../assets/audio/lose.mp3"),
      draw: require("../../assets/audio/draw.mp3"),
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
      await audioFiles[key].replayAsync(); // Play the sound from the start
    } else {
      console.log("Audio not found");
    }
  };

  useEffect(() => {
    preloadAudios();

    return () => {
      // Cleanup all audio files
      Object.values(audioFiles).forEach((sound) => {
        if (sound) {
          sound.unloadAsync();
        }
      });
    };
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(parseInt(storedUserId, 10)); // Konversi ke integer
          console.log("User ID fetched from AsyncStorage:", storedUserId);
        }
      } catch (error) {
        console.error("Failed to fetch userId from AsyncStorage:", error);
      }
    };

    fetchUserId();

    const newSocket = io(`${BASE_URL}`, { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("gameStarted", (data) => {
      console.log("Game started:", data);
      setGameId(data.gameId);
    });

    newSocket.on("roundResult", (data) => {
      console.log("Round result received:", data);
      if (!data || !data.choices || !data.scores) {
        console.error("Invalid round result data:", data);
        return;
      }

      setChoices({
        user: data.choices[userId],
        opponent:
          Object.entries(data.choices).find(
            ([id]) => parseInt(id, 10) !== userId
          )?.[1] || "",
      });

      setScores({
        user: data.scores[userId] || 0,
        opponent:
          Object.entries(data.scores).find(
            ([id]) => parseInt(id, 10) !== userId
          )?.[1] || 0,
      });

      setRounds((prevCount) => prevCount + 1);

      if (data.winner === null) {
        setResult("It's a Draw");
      } else if (data.winner === userId) {
        setResult("You Win");
      } else {
        setResult("You Lose");
      }
    });

    newSocket.on("opponentDisconnected", () => {
      Alert.alert("Game Over", "Your opponent has disconnected.");
      setGameId(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (socket && userId) {
      console.log("Sending joinGame with userId:", userId);
      socket.emit("joinGame", { userId });
    }
  }, [socket, userId]);

  useEffect(() => {
    if (scores.user === 3 || scores.opponent === 3 || rounds === 5) {
      let winner = "";

      if (scores.user === scores.opponent) {
        Alert.alert("Game Over", "It's a draw!");
        playAudio("draw");
        winner = "draw";
      } else {
        const gameWinner = scores.user > scores.opponent ? "user1" : "user2"; // user1 = You, user2 = Opponent
        const winnerName = gameWinner === "user1" ? "You" : "Opponent";
        Alert.alert("Game Over", `${winnerName} won the match!`);
        if (gameWinner === "user1") {
          playAudio("win");
        } else {
          playAudio("lose");
        }
        winner = gameWinner;
      }

      setFinalGame(winner);
      setVisiblePopOut(true);
    }
  }, [scores, rounds]);

  const handleChoice = (userChoice) => {
    if (!socket || !gameId) {
      Alert.alert("Error", "No active game or socket connection found.");
      return;
    }

    if (scores.user === 3 || scores.opponent === 3 || rounds === 5) {
      Alert.alert("Game Over", "The match has already ended.");
      return;
    }
    playAudio(userChoice);
    console.log("Player choice sent:", userChoice);
    socket.emit("playerChoice", { gameId, userId, choice: userChoice });
    setChoices((prev) => ({ ...prev, user: userChoice }));
    setResult("Waiting for opponent...");
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
          {choices.opponent === "paper" && (
            <Image source={comPaper} style={{ width: 100 }} />
          )}
          {choices.opponent === "rock" && (
            <Image source={comRock} style={{ width: 100 }} />
          )}
          {choices.opponent === "scissors" && (
            <Image source={comScissors} style={{ width: 100 }} />
          )}
          <Text style={styles.textResult}>{result}</Text>
          {choices.user === "paper" && (
            <Image source={userPaper} style={{ width: 100 }} />
          )}
          {choices.user === "rock" && (
            <Image source={userRock} style={{ width: 100 }} />
          )}
          {choices.user === "scissors" && (
            <Image source={userScissors} style={{ width: 100 }} />
          )}
        </View>
      </View>

      <Score playerScore={scores.user} enemyScore={scores.opponent} />

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
      <EndGamePopOut
        visible={visiblePopOut}
        setVisible={setVisiblePopOut}
        finalGame={finalGame}
      />
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
