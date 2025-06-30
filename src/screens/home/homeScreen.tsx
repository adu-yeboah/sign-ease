import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatedTouchableCard } from '@/components/card'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function HomeScreen() {
    const navigation = useNavigation()
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0.9)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            })
        ]).start()
    }, [])

    const handlePressIn = (scaleValue: Animated.Value) => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start()
    }

    const handlePressOut = (scaleValue: Animated.Value) => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <LinearGradient 
                colors={['#f7f7f7', '#ffffff']}
                className='absolute top-0 left-0 right-0 bottom-0'
            />
            
            <Animated.View 
                className='flex-1 px-containerPadding'
                style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
            >
                {/* Header */}
                <View className='flex-row justify-between items-center mt-padding5 mb-6'>
                    <View>
                        <Text className='text-black text-h2 font-ALmendra_SC'>sign-ease</Text>
                        <Text className='text-gray-500 font-Roboto mt-1'>Ghanaian Sign Language Translator</Text>
                    </View>
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        className='p-2 rounded-full bg-gray-100'
                    >
                        <AntDesign name="setting" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Main Content */}
                <View className='flex-col gap-4 w-full py-padding3'>
                    {/* Live Translation */}
                    <AnimatedTouchableCard 
                        onPress={() => navigation.navigate('Live' as never)}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        icon={icons.video}
                        title="Live Translation"
                        description="Real-time sign language translation"
                        colors={['#4F46E5', '#7C3AED']}
                    />

                    {/* Picture Translation */}
                    <AnimatedTouchableCard 
                        onPress={() => navigation.navigate('Picture' as never)}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        icon={icons.pic}
                        title="Image Translation"
                        description="Upload images for interpretation"
                        colors={['#10B981', '#3B82F6']}
                    />

                    {/* Learn Alphabet */}
                    <AnimatedTouchableCard 
                        onPress={() => navigation.navigate('Alphabet' as never)}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        icon={icons.book} 
                        title="Learn Alphabet"
                        description="Master GSL letters and basics"
                        colors={['#F59E0B', '#EF4444']}
                    />
                </View>

               
            </Animated.View>
        </SafeAreaView>
    )
}
