import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import SafeWrapper from './SafeWrapper';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeWrapper>
      <View className="flex-1 justify-center items-center bg-white">
        <Image
          source={require("@assets/images/utils/logo.png")}
          className="h-40 w-64"
          resizeMode="contain"
        />
      </View>
    </SafeWrapper>
  );
};

export default SplashScreen;