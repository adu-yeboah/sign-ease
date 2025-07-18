import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/routes/mainNavigation';
import "./global.css"
// Prevent the splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Inter: Inter_400Regular,
  //   'Inter-Medium': Inter_500Medium,
  //   'Inter-Bold': Inter_700Bold,
  // });

  // useEffect(() => {
  //   // if (fontsLoaded) {
  //   //   SplashScreen.hideAsync();
  //   // }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}