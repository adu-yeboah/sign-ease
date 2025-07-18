import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/utils';
import BottomTabNavigator from './tabNavigation';
import SignListScreen from '../screens/SignList';
import SignDetailScreen from '../screens/SignDetail';
import QuizScreen from '../screens/QuizScreen';
import Notification from '../screens/Notification';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignList"
          component={SignListScreen}
          options={({ route }) => ({
            title: `${route.params.category.toUpperCase()} Signs`,
          })}
        />
        <Stack.Screen
          name="SignDetail"
          component={SignDetailScreen}
          options={({ route }) => ({ title: route.params.signId })}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: 'Quiz Time!' }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}