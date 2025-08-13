import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import BottomTabNavigator from './tabNavigation';
import SignDetailScreen from '@/screens/SignDetail';
import QuizScreen from '@/screens/quizes/QuizScreen';
import Settings from '@/screens/Settings';
import DisplayQuiz from '@/screens/quizes/DisplayQuiz';
import Login from '@/screens/auth/Login';
import Register from '@/screens/auth/Register';
import LiveQuiz from '@/screens/quizes/LiveQuiz';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignDetailVideoScreen from '@/screens/signDetailVideo';
import DailyChallenges from '@/screens/quizes/DailyChallenges';
import CategoryScreen from '@/screens/Category';


const Stack = createNativeStackNavigator<RootStackParamList>();
const user = AsyncStorage.getItem("user")


export default function AppNavigator() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'fade',
        animationDuration: 300,
      }}
      initialRouteName='Home'
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
        name="Category"
        component={CategoryScreen}
        options={({ route }) => ({
          animation: 'slide_from_right',
          gestureEnabled: true,
        })}
      />

      <Stack.Screen
        name="SignDetail"
        component={SignDetailScreen}
        options={{
          animation: 'slide_from_right',
          gestureEnabled: true,
          presentation: 'card',
        }}
      />

      <Stack.Screen
        name="SignDetailVideo"
        component={SignDetailVideoScreen}
        options={{
          animation: 'slide_from_right',
          gestureEnabled: true,
          presentation: 'card',
        }}
      />

{/* Quiz Screens */}
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

      <Stack.Screen
        name="DailyChallenge"
        component={DailyChallenges}
        options={{
          animation: 'slide_from_bottom',
          gestureEnabled: false,
        }}
      />



      {/* Notification Screen */}
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}