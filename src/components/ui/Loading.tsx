import { View, Text } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import SafeWrapper from './SafeWrapper';
import { Ionicons } from '@expo/vector-icons';


export default function Loading() {
    return (
        <SafeWrapper>
            <View className="flex-1 justify-center items-center bg-white">
                <Animatable.View
                    animation="rotate"
                    iterationCount="infinite"
                    duration={500}
                    className="h-20 w-20 border-dotted border-4 border-b-4 border-purple-500 rounded-full flex justify-center items-center"
                >
                    <Ionicons name="language" size={24} color="#8B5CF6" />
                </Animatable.View>
                <Text className="mt-4 text-purple-800 font-medium">Loading signs...</Text>
            </View>
        </SafeWrapper>
    );
}