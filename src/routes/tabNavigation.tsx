import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import HomeScreen from '../screens/Home';
import ProgressScreen from '../screens/Progress';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
       headerShown: false
      }}
    >
      <Tab.Screen
        name="Learn"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, fontFamily: 'Inter-Bold' }}>Learn</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="star" size={size} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, fontFamily: 'Inter-Bold' }}>Progress</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}