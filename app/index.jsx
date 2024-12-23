import { useState } from "react";
import { Text, View, Image, Alert } from "react-native";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import { Link, useRouter } from "expo-router";
import axios from "axios";

import { LOCALHOST } from '@env'

export default function App() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [hidepassword, setHidePassword] = useState(true);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      Alert.alert(
        "Validation Error",
        "Please fill in all fields before signing in."
      );
      return;
    }

    try {
      // Kirim permintaan login ke backend menggunakan axios
      const response = await axios.post(
        `http://${LOCALHOST}:4000/auth/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      // Jika login berhasil, lanjutkan ke menu utama
      Alert.alert("Success", "Next, let's play the game!");
      console.log(response.data); // Response dari server bisa disesuaikan
      router.replace("/main-menu");
    } catch (error) {
      // Tangani error jika login gagal
      console.error(error);
      Alert.alert(
        "Login Error",
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} />

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
        Don't have an account?{" "}
        <Link href={"/register"}>
          <Text style={{ color: "#FEBB24", fontWeight: "bold" }}>
            Register here
          </Text>
        </Link>
      </Text>
      <SubmitButton text="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#1A1C22",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
};
