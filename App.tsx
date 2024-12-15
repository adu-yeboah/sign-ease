import "./global.css"
import WelcomeScreen from "./screens/welcome/welcomeScreen";
import { useFonts } from "expo-font";
import Route from "./navigation/route";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Kanit': require('./assets/fonts/Kanit/Kanit-Regular.ttf'),
    'Kumar': require('./assets/fonts/Kumar_One/KumarOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <WelcomeScreen />;
  }
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}
