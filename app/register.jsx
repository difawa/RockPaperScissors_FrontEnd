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
import axios from "axios";

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
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
    ) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    } else if (form.password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      // Kirim data ke API
      const response = await axios.post(
        `http://${LOCALHOST}:4000/auth/register`,
        {
          username: form.username,
          email: form.email,
          password: form.password,
        }
      );

      if (response.status === 201) {
        // Jika registrasi berhasil
        Alert.alert(
          "Success",
          "Your account has been created! Login now and play the game!"
        );
        router.push(""); // Redirect ke halaman login atau halaman berikutnya
      }
    } catch (error) {
      // Tangani error jika terjadi
      console.error(error);
      Alert.alert(
        "Error",
        "There was an error registering your account. Please try again."
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
