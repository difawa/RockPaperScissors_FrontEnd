import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'BlackHanSans': require('../assets/fonts/BlackHanSans.ttf'),
    'BlackOpsOne' : require('../assets/fonts/BlackOpsOne.ttf'),
    'CabinSketch-Regular' : require('../assets/fonts/CabinSketch-Regular.ttf')
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
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="main-menu" options={{ headerShown: false }} />
        <Stack.Screen name="leaderboard" options={{ headerShown: false }} />
        <Stack.Screen name="mode" options={{ headerShown: false }} />
        <Stack.Screen name="in-game" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}