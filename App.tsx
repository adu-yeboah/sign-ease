import "./global.css"
import WelcomeScreen from "./screens/welcome/welcomeScreen";
import { useFonts } from "expo-font";
import Route from "./navigation/route";
import { NavigationContainer } from "@react-navigation/native";
import { FlashMessageProvider } from "./context/flashmessageContext";

export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Kanit': require('./assets/fonts/Kanit/Kanit-Regular.ttf'),
    'ALmendra_SC': require('./assets/fonts/Almendra_SC/AlmendraSC-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <WelcomeScreen />;
  }
  return (
    <NavigationContainer>
      <FlashMessageProvider>
        <Route />
      </FlashMessageProvider>
    </NavigationContainer>
  );
}
