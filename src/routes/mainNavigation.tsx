import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import BottomTabNavigator from './tabNavigation';
import SignListScreen from '@/screens/SignList';
import SignDetailScreen from '@/screens/SignDetail';
import QuizScreen from '@/screens/QuizScreen';
import Settings from '@/screens/Settings';
import DisplayQuiz from '@/screens/DisplayQuiz';
import Login from '@/screens/auth/Login';
import Register from '@/screens/auth/Register';
import LiveQuiz from '@/screens/LiveQuiz';
import { useAuth } from '@/context/authContext';


const Stack = createNativeStackNavigator<RootStackParamList>();


export default function AppNavigator() {
  const { user } = useAuth()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'fade',
        animationDuration: 300,
      }}
      initialRouteName={user ? 'Home' : 'Login'}
    >

      {/* Authentication */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ route }) => ({
          animation: 'slide_from_right',
          gestureEnabled: true,
        })}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={({ route }) => ({
          animation: 'slide_from_left',
          gestureEnabled: true,
        })}
      />


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

      <Stack.Screen
        name="QuizDisplay"
        component={DisplayQuiz}
        options={{
          animation: 'slide_from_bottom',
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="LiveQuiz"
        component={LiveQuiz}
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
    // </NavigationContainer>
  );
}