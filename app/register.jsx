import { Link, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";

export default function Register() {
  const [hidepassword, setHidePassword] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  const handleSignUp = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert(
        "Validation Error",
        "Please fill in all fields before signing up."
      );
      return;
    } else if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email) ==
      false
    ) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    // Mengirim data ke backend
    try {
      const response = await fetch("http://172.20.10.3:4000/auth/register", {
        //localhost azka
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Success",
          "Your account has been created! Login now and play the game!"
        );
        router.push("/login");
      } else {
        Alert.alert(
          "Error",
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error registering user:", error);
      Alert.alert(
        "Error",
        "Failed to connect to the server. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} />

      <InputBox
        text="Username"
        form={form}
        setForm={setForm}
        LowerCase={true}
      />
      <InputBox
        text="Email"
        keyboardType="email-address"
        form={form}
        setForm={setForm}
        LowerCase={true}
      />
      <InputBox
        text="Password"
        secureTextEntry={hidepassword}
        password={true}
        setPasswordVisible={setHidePassword}
        PasswordVisible={hidepassword}
        form={form}
        setForm={setForm}
      />
      <Text style={{ color: "#fff", alignSelf: "flex-start" }}>
        Already have an account?{" "}
        <Link href={"/"}>
          <Text style={{ color: "#FEBB24", fontWeight: "bold" }}>
            Login here
          </Text>
        </Link>
      </Text>
      <SubmitButton text="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1C22",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
