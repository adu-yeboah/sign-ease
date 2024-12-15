import { View, Text, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { icons } from '../../constants'

export default function WelcomeScreen() {
    return (
        <View className='flex-1 '>
            <LinearGradient
                colors={["#90E0EF", "#48CAE4"]}
                className='flex-1 justify-center items-center'
                start={[0, 0.2]}
                end={[0, 1]}
            >
                <View className='flex-col gap-5 justify-center, items-center'>
                    <Image source={icons.logo} className='h-60 w-60'/>
                    <Text className='font-Kanit text-h1 font-bold'>
                        SIGN-EASE
                    </Text>
                </View>
            </LinearGradient>
        </View>
    )
}