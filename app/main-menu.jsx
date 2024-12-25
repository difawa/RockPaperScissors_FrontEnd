import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
import TopLogo from "../components/TopLogo";
import MenuButton from "../components/MenuButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function MainMenu() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    };

    getUserData();
  }, []);

  const handleExit = async () => {
    try {
      await AsyncStorage.clear(); // Hapus semua data di AsyncStorage
      Alert.alert("Logged Out", "All data has been cleared.");
      router.replace("/"); // Kembali ke halaman login
    } catch (error) {
      console.error("Failed to clear AsyncStorage:", error);
    }
  };

  return (
    <>
      <TopLogo />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>HAND OF FATE</Text>
        <Text style={styles.welcome}>WELCOME, {username.toUpperCase()}</Text>
      </View>

      <MenuButton
        text="START"
        onPress={() => router.push("/mode")}
        color="#FEBB24"
        color2="#D7E773"
      />
      <MenuButton
        text="LEADERBOARD"
        onPress={() => router.push("/leaderboard")}
        color="#FEBB24"
        color2="#D7E773"
      />
      <MenuButton
        text="EXIT"
        onPress={handleExit}
        color="#F80000"
        color2="#E87575"
      />

      <Svg
        width="100%"
        height="144"
        preserveAspectRatio="none"
        viewBox="0 0 393 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginTop: -10 }}
      >
        <Path
          d="M393 129.764L8.22544e-06 0V39.4221L393 144L393 129.764Z"
          fill="#D7E773"
        />
      </Svg>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    color: "#FEBB24",
    fontFamily: "BlackHanSans",
  },
  welcome: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "BlackHanSans",
    marginTop: 10,
  },
});
