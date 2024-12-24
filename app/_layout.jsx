import { Stack, Slot } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'BlackHanSans': require('../assets/fonts/BlackHanSans.ttf'),
    'BlackOpsOne': require('../assets/fonts/BlackOpsOne.ttf'),
    'CabinSketch-Regular': require('../assets/fonts/CabinSketch-Regular.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#1A1C22",
    alignItems: "center",
    justifyContent: "center",
  },
};
