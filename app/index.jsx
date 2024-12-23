import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import { Link, useRouter } from 'expo-router';
import { z } from 'zod';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Must be 4 or more characters long" }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [hidepassword, setHidePassword] = useState(true);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Validation Error", "Please fill in all fields before signing in.");
      return;
    }
    try {
      const res = await fetch("http://172.20.10.3:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        const token = data.token;
        console.log("Login berhasil:", token);

        await AsyncStorage.setItem("userToken", token);
        Alert.alert("Login berhasil dan token tersimpan!");

        router.push("/main-menu");
      } else {
        Alert.alert("Login Gagal", data.message || "Error terjadi.");
      }
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "Terjadi kesalahan. Silakan coba lagi nanti.");
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
