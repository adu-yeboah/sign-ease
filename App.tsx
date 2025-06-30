import "./global.css";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlashMessageProvider } from "@/context/flashmessageContext";
import Route from "@/navigation/route";

SplashScreen.preventAutoHideAsync(); 

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Kanit": require("./assets/fonts/Kanit/Kanit-Regular.ttf"),
    "ALmendra_SC": require("./assets/fonts/Almendra_SC/AlmendraSC-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep the splash screen showing
  }

  return (
    <NavigationContainer>
      <FlashMessageProvider>
        <StatusBar style="light" backgroundColor={"white"} />
        <Route />
      </FlashMessageProvider>
    </NavigationContainer>
  );
}
