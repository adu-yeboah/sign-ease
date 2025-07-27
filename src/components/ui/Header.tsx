import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';

export default function Header({ title}: {title: string}) {
    const navigation = useNavigation();

    return (
        <Animatable.View
            animation={"fadeInLeft"}
            duration={1000}
            className="flex-row justify-between items-center px-6 pt-4 pb-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#8B5CF6" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-accent-700 font-display">
                {title}
            </Text>
            <View className="w-6" />
        </Animatable.View>
    )
}
