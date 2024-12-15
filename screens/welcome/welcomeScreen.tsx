import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class WecomeScreen extends Component {
    render() {
        return (
            <View className="flex-1 justify-center items-center bg-blue-500 mt-11">
                <Text className="text-blue text-6xl">Hello, Tailwind in Expo!</Text>
            </View>
        )
    }
}