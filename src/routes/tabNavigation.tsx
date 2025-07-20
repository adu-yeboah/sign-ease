import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import HomeScreen from '../screens/Home';
import ProgressScreen from '../screens/Progress';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#EDE9FE',
          borderTopWidth: 0,
          elevation: 6,
          height: 60,
          paddingBottom: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Learn"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="school"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text style={{
              color,
              fontSize: 12,
              fontFamily: 'Inter-Bold',
              marginTop: -4
            }}>
              Learn
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="analytics-sharp"
              size={size}
              color={color} />
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text style={{
              color,
              fontSize: 12,
              fontFamily: 'Inter-Bold',
              marginTop: -4,
            }}>
              Progress
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}