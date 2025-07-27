import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/utils';
import AnimatedButton from '../components/Button';
import SafeWrapper from '../components/ui/SafeWrapper';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeWrapper>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <View className="flex-row items-center">
          <Image
            source={require("@assets/images/utils/logo.png")}
            className='h-10 w-40'
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="settings" size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 40 }}>


        <View className="gap-3 mt-5">
          <AnimatedButton
            title="Alphabet"
            description="Learn the sign language alphabet"
            onPress={() => navigation.navigate('SignList', { category: 'alphabet' })}
            animation="fadeInUp"
            duration={500}
            className="w-full bg-accent-500"
            icon="text-outline"
          />

          <AnimatedButton
            title="Simple Words"
            description="Everyday words and phrases"
            onPress={() => navigation.navigate('SignList', { category: 'simple' })}
            animation="fadeInUp"
            duration={700}
            className="w-full bg-primary-500"
            icon="chatbox-outline"
          />

          <AnimatedButton
            title="Advanced Words"
            description="Complex terms and expressions"
            onPress={() => navigation.navigate('SignList', { category: 'advanced' })}
            animation="fadeInUp"
            duration={900}
            className="w-full bg-secondary-500"
            icon="bulb-outline"
          />

          <View className="pt-6">
            <AnimatedButton
              title="Take a Quiz"
              description="Test your knowledge"
              onPress={() => navigation.navigate('QuizDisplay')}
              animation="pulse"
              duration={1600}
              iterationCount="infinite"
              className="w-full bg-warning-500"
              icon="help-circle-outline"
            />
          </View>
        </View>
      </ScrollView>
    </SafeWrapper>
  );
};

export default HomeScreen;