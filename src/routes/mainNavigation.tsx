import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '@/types/utils';
import BottomTabNavigator from './tabNavigation';
import SignListScreen from '@/screens/SignList';
import SignDetailScreen from '@/screens/SignDetail';
import QuizScreen from '@/screens/QuizScreen';
import Settings from '@/screens/Settings';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
          animationDuration: 300,
        }}
      >
        {/* Main Tab Navigator */}
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
        />

        {/* Category Sign List */}
        <Stack.Screen
          name="SignList"
          component={SignListScreen}
          options={({ route }) => ({
            animation: 'slide_from_right',
            gestureEnabled: true,
          })}
        />

        {/* Sign Detail View */}
        <Stack.Screen
          name="SignDetail"
          component={SignDetailScreen}
          options={{
            animation: 'slide_from_right',
            gestureEnabled: true,
            presentation: 'card',
          }}
        />

        {/* Quiz Screen */}
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{
            animation: 'slide_from_bottom',
            gestureEnabled: false,
          }}
        />

        {/* Notification Screen */}
        <Stack.Screen
          name="Notification"
          component={Settings}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}