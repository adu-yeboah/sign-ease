import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home/homeScreen'
import LiveScreen from '../screens/live/liveScreen'
import WelcomeScreen from '../screens/welcome/welcomeScreen'
import PictureScreen from '../screens/picture/pictureScreen'

export default function Route() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Live' component={LiveScreen} />
      <Stack.Screen name='Picture' component={PictureScreen} />
    </Stack.Navigator>
  )
}