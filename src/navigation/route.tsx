import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/screens/home/homeScreen'
import LiveScreen from '@/screens/live/liveScreen'
import PictureScreen from '@/screens/picture/pictureScreen'
import SettingsScreen from '@/screens/settings/settingsScreen'
import LearnScreen from '@/screens/learn/learnScreen'


export default function Route() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Live' component={LiveScreen} />
      <Stack.Screen name='Picture' component={PictureScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
      <Stack.Screen name='learn' component={LearnScreen} />

    </Stack.Navigator>
  )
}