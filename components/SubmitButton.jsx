import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SubmitButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#FEBB24", "#E5C98A"]}
        style={styles.button}
        end={{ x: 1, y: 0 }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{props.text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginTop: 20,
  },
});
