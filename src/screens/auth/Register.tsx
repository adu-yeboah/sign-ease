import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/types/utils';
import SafeWrapper from '@/components/ui/SafeWrapper';
import AnimatedButton from '@/components/Button';
import { useAuth } from '@/context/authContext';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function SignupScreen() {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading, error } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await register({
        // id: Math.random().toString(36).substring(7),
        fullName: name,
        email,
      });
      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Registration Failed', error || 'Could not create account');
    }
  };

  return (
    <SafeWrapper>
      <KeyboardAvoidingView
        behavior='padding'
        className='flex-1'
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View className="flex-1 px-6 justify-center">



            <View className="mb-10">
              <Image
                source={require("@assets/images/utils/logo.png")}
                className="h-20 w-48 mb-6"
                resizeMode="contain"
              />
              <Text className="text-2xl font-bold text-gray-800">Create account</Text>
              <Text className="text-gray-500">Get started with signing up</Text>
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-2">Full Name</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-4"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
              />
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
              title={loading ? "Creating Account..." : "Sign Up"}
              onPress={handleSignup}
              animation="fadeIn"
              duration={500}
              className="w-full bg-primary-500 mb-4"
              disabled={loading}
            />

            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-500">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-primary-500 font-semibold">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeWrapper>
  );
}