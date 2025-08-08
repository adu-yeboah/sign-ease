import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/types/utils';
import SafeWrapper from '@/components/ui/SafeWrapper';
import AnimatedButton from '@/components/Button';
import { useAuth } from '@/context/authContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Login Failed', error || 'Invalid credentials');
    }
  };

  return (
    <SafeWrapper>
      <View className="flex-1 px-6 justify-center">
        <View className="mb-10">
          <Image
            source={require("@assets/images/utils/logo.png")}
            className="h-20 w-48 mb-6"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-gray-800">Welcome </Text>
          <Text className="text-gray-500">Sign in to continue</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Password</Text>
          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-lg p-4 pr-12"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              className="absolute right-3 top-4"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#6B7280" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <AnimatedButton
          title={loading ? "Signing In..." : "Sign In"}
          onPress={handleLogin}
          animation="fadeIn"
          duration={500}
          className="w-full bg-primary-500 mb-4"
          disabled={loading}
        />

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-primary-500 font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeWrapper>
  );
}