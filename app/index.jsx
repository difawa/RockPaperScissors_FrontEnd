import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import { Link, useRouter } from 'expo-router';


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [hidepassword, setHidePassword] = useState(true);
  const router = useRouter();

  const handleSignIn = () => {
    if (!form.email || !form.password) {
      Alert.alert("Validation Error", "Please fill in all fields before signing in.");
      return;
    }

    console.log("Form Data:", form);
    Alert.alert("Success", "Next, let's play the game!");
    // Lakukan validasi tambahan atau pengiriman data ke backend di sini
    router.replace("/main-menu");
  };

  return (
    <View
      style={styles.container}>
      <Image source={require('../assets/images/logo.png')} />

      <InputBox text="Email" keyboardType="email-address" form={form} setForm={setForm} LowerCase={true} />
      <InputBox text="Password" secureTextEntry={hidepassword} password={true} setPasswordVisible={setHidePassword} PasswordVisible={hidepassword} form={form} setForm={setForm} />

      <Text style={{ color: '#fff', alignSelf: 'flex-start' }}>Don't have an account? <Link href={"/register"}><Text style={{ color: '#FEBB24', fontWeight: 'bold' }}>Register here</Text></Link></Text>
      <SubmitButton text="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1A1C22',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
};
