import { icons } from "@/constants"
import { LinearGradient } from "expo-linear-gradient"
import { useRef } from "react"
import { Animated, Image, Text, TouchableOpacity, View } from "react-native"

export const AnimatedTouchableCard = ({ ...props }: any) => {
    const scaleValue = useRef(new Animated.Value(1)).current
    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={props.onPress}
                onPressIn={() => props.onPressIn(scaleValue)}
                onPressOut={() => props.onPressOut(scaleValue)}
            >
                <LinearGradient
                    colors={props.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className='rounded-xl p-5 flex-row items-center'
                >
                    <View className='bg-white/20 rounded-lg p-3 mr-4'>
                        <Image 
                            source={props.icon} 
                            className='h-10 w-10' 
                            resizeMode='contain'
                            tintColor='white'
                        />
                    </View>
                    <View className='flex-1'>
                        <Text className='text-white font-KanitBold text-lg mb-1'>
                            {props.title}
                        </Text>
                        <Text className='text-white/90 font-Roboto text-sm'>
                            {props.description}
                        </Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    )
}