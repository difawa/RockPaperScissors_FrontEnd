import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>{props.text}</Text>
      <View
        style={[
          styles.ellipse,
          { transform: [{ rotate: "38deg" }] }, // Putar elips 45 derajat
        ]}
      ></View>
      <View
        style={[
          styles.ellipse2,
          { transform: [{ rotate: "-45deg" }] }, // Putar elips 45 derajat
        ]}
      ></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FEBB24",
    height: 70,
    width: 220,
    borderRadius: 36,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#55361B",
    borderWidth: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "#4F4F4F", // warna bayangan
    textShadowOffset: { width: 0, height: 3 }, // posisi bayangan
    textShadowRadius: 4,
  },
  ellipse: {
    width: 22,
    height: 11,
    borderRadius: "100%",
    backgroundColor: "#D7E773",
    position: "absolute",
    top: 8,
    right: 9,
  },
  ellipse2: {
    width: 16,
    height: 12,
    borderRadius: "100%",
    backgroundColor: "#D7E773",
    position: "absolute",
    top: 12,
    left: 8,
  },
});
