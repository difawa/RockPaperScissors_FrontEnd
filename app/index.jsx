import { useState } from "react";
import { Text, View, Image, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import ErrorPopOut from "../components/ErrorPopOut";

export default function App() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [hidepassword, setHidePassword] = useState(true);
  const [visible, setVisible] = useState(false);
  const [errorStatus, setErrorStatus] = useState();

  const router = useRouter();


  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      setErrorStatus(400);
      setVisible(true);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: form.email,
        password: form.password,
      });

      const { token, userId, username } = response.data;

      // Simpan token, userId, dan username ke AsyncStorage
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", userId.toString());
      await AsyncStorage.setItem("username", username);

      router.replace("/main-menu");
    } catch (error) {
      setErrorStatus(error.status)
      if ([401, 404].includes(error.status)) {
        setVisible(true);
      } else if (error.code == "ERR_NETWORK") {
        Alert.alert(
          "Network Error",
          "Please check your internet connection and try again.")
      } else {
        console.error(error);
        Alert.alert(
          "Login Error",
          error.response?.data?.message || "An error occurred during login."
        );
      }
    }
  };

  return (
    <>
      <Image source={require("../assets/images/logo.png")} />

      <View style={{ width: "100%", paddingHorizontal: 20 }}>
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
      </View>
      <SubmitButton text="Sign In" onPress={handleSignIn} />
      <ErrorPopOut visible={visible} setVisible={setVisible} errorStatus={errorStatus} />
    </>
  );
}
