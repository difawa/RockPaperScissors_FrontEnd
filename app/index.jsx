import { useCallback, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import * as SplashScreen from 'expo-splash-screen';
import { Link, useRouter } from 'expo-router';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView}>
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
