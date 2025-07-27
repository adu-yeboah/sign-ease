import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/routes/mainNavigation';
import "./global.css"
import { UpdatePrompt } from '@/components/Updates';
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
      <UpdatePrompt />
      <AppNavigator />
    </SafeAreaProvider>
  );
}