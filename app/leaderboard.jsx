import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Arrow from "../assets/images/home.png";
import crown from "../assets/images/crown.png";
import gold from "../assets/images/Gold.png";
import bronze from "../assets/images/Bronze.png";
import silver from "../assets/images/Silver.png";
import workout from "../assets/images/Workout.png";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // Menyimpan data user yang sedang login
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/"); // Kembali ke halaman login jika token tidak ada
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = await AsyncStorage.getItem("userToken"); // Fetch the token here
      if (!token) {
        console.error("No token found!");
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/matches/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const apiUsers = response.data.map((user, index) => {
          // Array gambar yang bisa dipilih secara acak
          const images = [
            "https://via.placeholder.com/70", // Gambar placeholder
            "https://randomuser.me/api/portraits/lego/4.jpg",
            "https://randomuser.me/api/portraits/lego/7.jpg",
            "https://randomuser.me/api/portraits/lego/3.jpg",
            "https://randomuser.me/api/portraits/lego/0.jpg",
            "https://randomuser.me/api/portraits/lego/2.jpg",
            "https://randomuser.me/api/portraits/lego/5.jpg",
            "https://randomuser.me/api/portraits/lego/8.jpg",
            "https://randomuser.me/api/portraits/lego/1.jpg",
            "https://randomuser.me/api/portraits/lego/1.jpg",
            "https://randomuser.me/api/portraits/lego/6.jpg",
          ];

          // Pilih gambar secara acak
          const randomImage = images[Math.floor(Math.random() * images.length)];

          return {
            id: index + 1,
            name: user.username,
            points: user.points,
            image: randomImage, // Gambar yang dipilih secara acak
          };
        });
        setUsers(apiUsers);

        // Ambil informasi user yang sedang login
        const username = await AsyncStorage.getItem("username");
        setCurrentUser(username); // Set username yang sedang login
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FEBB24" />
      </View>
    );
  }

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const topThree = sortedUsers.slice(0, 3);
  const others = sortedUsers.slice(3);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/main-menu")}>
        <Image source={Arrow} style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.leaderboardtext}>LEADERBOARD</Text>
      {/* top 3 */}
      <View style={styles.topThreeContainer}>
        <View style={styles.secondPlace}>
          <Image source={{ uri: topThree[1]?.image }} style={styles.topImage} />
          <View style={{ bottom: 25, zIndex: 1 }}>
            <Image source={silver} />
          </View>
          <Text style={styles.topText}>{topThree[1]?.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Image source={workout} style={{ top: -4 }} />
            <Text style={styles.scoreText}> {topThree[1]?.points} pts</Text>
          </View>
        </View>
        <View style={styles.firstPlace}>
          <View style={{ top: 10, zIndex: 1, marginTop: 30 }}>
            <Image source={crown} />
          </View>
          <Image source={{ uri: topThree[0]?.image }} style={styles.topImage} />
          <View style={{ bottom: 25, zIndex: 1 }}>
            <Image source={gold} />
          </View>
          <Text style={styles.topText}>{topThree[0]?.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Image source={workout} style={{ top: -4 }} />
            <Text style={styles.scoreText}> {topThree[0]?.points} pts</Text>
          </View>
        </View>
        <View style={styles.thirdPlace}>
          <Image source={{ uri: topThree[2]?.image }} style={styles.topImage} />
          <View style={{ bottom: 25, zIndex: 1 }}>
            <Image source={bronze} />
          </View>
          <Text style={styles.topText}>{topThree[2]?.name}</Text>
          <View style={{ flexDirection: "row" }}>
            <Image source={workout} style={{ top: -4 }} />
            <Text style={styles.scoreText}> {topThree[2]?.points} pts</Text>
          </View>
        </View>
      </View>

      <View style={styles.flatlistContainer}>
        <FlatList
          style={{ height: 450 }}
          data={others}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.listItem,
                item.name === currentUser && styles.highlightedItem, // Highlight baris yang sesuai
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 15, color: "#ffffff", marginLeft: 5 }}>
                  {index + 4}.
                </Text>
                <Image source={{ uri: item.image }} style={styles.listImage} />
                <Text style={styles.nameText}>{item.name}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#FEBB24",
                    marginRight: 5,
                    fontFamily: "PlusJakartaSans-Regular",
                  }}
                >
                  {item.points} pts
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  arrow: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
    marginTop: 50,
  },
  leaderboardtext: {
    alignSelf: "center",
    marginBottom: 60,
    fontSize: 25,
    color: "#FEBB24",
    fontFamily: "BlackHanSans",
  },
  topThreeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  firstPlace: {
    alignItems: "center",
    width: 100,
    top: -100,
    zIndex: 1,
    marginTop: 30,
  },
  secondPlace: {
    alignItems: "center",
    width: 100,
  },
  thirdPlace: {
    alignItems: "center",
    width: 100,
  },
  topText: {
    top: -10,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  scoreText: {
    fontSize: 14,
    color: "white",
    top: -8,
    fontFamily: "PlusJakartaSans-Regular",
  },
  topImage: {
    borderRadius: 9999,
    borderWidth: 3,
    borderColor: "#FEBB24",
    width: 70,
    height: 70,
    alignItems: "center",
  },
  flatlistContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingTop: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  listImage: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#FEBB24",
    width: 40,
    height: 40,
    alignItems: "center",
    marginLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    width: 320,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#252728",
    borderRadius: 20,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  nameText: {
    fontSize: 13,
    color: "#ffffff",
    marginLeft: 15,
    fontWeight: "bold",
  },
  highlightedItem: {
    backgroundColor: "#D7E77399", // Warna highlight
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
