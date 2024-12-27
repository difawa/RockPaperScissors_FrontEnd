import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function EndGamePopOut({ visible, setVisible, finalGame }) {
  const router = useRouter();

  // Fungsi untuk menentukan hasil permainan
  const resultDetails = (finalGame) => {
    if (finalGame === "user1") {
      return {
        text: (
          <Text style={{ color: "#fff" }}>
            You <Text style={{ color: "#009D47" }}>Win!</Text>
          </Text>
        ),
        points: "+3 pts",
        borderColor: "#009D47",
        icon: require("../assets/images/reward.png"), // Ganti dengan path ikon Anda
      };
    } else if (finalGame === "user2") {
      return {
        text: (
          <Text style={{ color: "#fff" }}>
            You <Text style={{ color: "#F80000" }}>Lose!</Text>
          </Text>
        ),
        points: "+0 pts",
        borderColor: "#F80000",
        icon: require("../assets/images/reward.png"), // Ganti dengan path ikon Anda
      };
    } else if (finalGame === "draw") {
      return {
        text: <Text style={{ color: "#fff" }}>It's a Draw!</Text>,
        points: "+1 pts",
        borderColor: "#FEBB24",
        icon: require("../assets/images/reward.png"), // Ganti dengan path ikon Anda
      };
    } else {
      return {
        text: "Something wrong. Please try again.",
        points: "",
        borderColor: "#fff",
        icon: null,
      };
    }
  };

  const details = resultDetails(finalGame);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { borderColor: details.borderColor }]}>
          {/* Hasil Permainan */}
          <Text style={styles.modalText}>{details.text}</Text>

          {/* Ikon dan Poin */}
          <View style={styles.resultContainer}>
            {details.icon && (
              <Image source={details.icon} style={styles.icon} />
            )}
            <Text style={styles.pointsText}>{details.points}</Text>
          </View>

          {/* Tombol */}
          <TouchableOpacity
            style={styles.playAgain}
            onPress={() => router.replace("/versususer")}
          >
            <Text style={styles.closeButtonText}>PLAY AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toLeaderboardButton}
            onPress={() => router.replace("/leaderboard")}
          >
            <Text style={styles.closeButtonText}>GO TO LEADERBOARD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: "#252728",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 32,
    fontFamily: "BlackOpsOne",
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  pointsText: {
    fontSize: 18,
    fontFamily: "BlackHanSans",
    color: "#fff",
  },
  playAgain: {
    padding: 10,
    backgroundColor: "#D7E773",
    borderRadius: 999,
  },
  closeButtonText: {
    color: "#fff",
    fontFamily: "BlackHanSans",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
  },
  toLeaderboardButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FEBB24",
    borderRadius: 999,
  },
});
