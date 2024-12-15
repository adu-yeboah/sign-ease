import { View, Text } from "react-native";
import "./global.css"
import { red } from "react-native-reanimated/lib/typescript/Colors";

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500 mt-11">
      <Text className="text-blue text-6xl">Hello, Tailwind in Expo!</Text>
    </View>
  );
}
