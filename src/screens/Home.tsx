import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SignCategory } from '@/types/sign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import SafeWrapper from '@/components/ui/SafeWrapper';
import AnimatedButton from '@/components/Button';
import { useSign } from '@/hooks/useSign';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const CATEGORIES: {
  id: SignCategory;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}[] = [
    { id: 'alphabet', name: 'ABCs', icon: 'people-outline', color: '#8B5CF6' },
    { id: 'numbers', name: 'Numbers', icon: 'calculator-outline', color: '#3B82F6' },
    { id: 'animals', name: 'Animals', icon: 'paw-outline', color: '#10B981' },
    { id: 'food', name: 'Food', icon: 'fast-food-outline', color: '#EF4444' },
    { id: 'greetings', name: 'Greetings', icon: 'hand-left-outline', color: '#F59E0B' },
    { id: 'family', name: 'Family', icon: 'people-outline', color: '#EC4899' },
    {
      id: 'simple',
      name: "Simple",
      icon: 'color-palette-outline',
      color: '#EC4899',
    },
    {
      id: 'actions',
      name: "Actions",
      icon: 'walk-outline',
      color: '#8B5CF6'
    },
  ];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { progress } = useSign()
  

  return (
    <SafeWrapper>
      {/* Header with Logo */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-2">
        <Image
          source={require('@assets/images/utils/logo.png')}
          className="h-12 w-48"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 40 }}>

        <TouchableOpacity
          className="bg-purple-100 rounded-xl p-4 mb-6 flex-row items-center"
          onPress={() => navigation.navigate('DailyChallenge')}
        >
          <Ionicons name="trophy" size={28} color="#8B5CF6" />
          <View className="ml-3">
            <Text className="text-purple-800 font-bold text-lg">Daily Challenge!</Text>
            <Text className="text-purple-600">Learn 3 signs today 🎉</Text>
          </View>
        </TouchableOpacity>

        {/* Progress Summary */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Your Progress
          </Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-600">Total signs learned: </Text>
            {progress && (
              <Text className="font-bold text-purple-600">You know {progress.alphabet?.learned}/{progress.alphabet?.total} letters!</Text>
            )}
          </View>
          <View className="h-2 bg-gray-100 rounded-full">
            <View className="h-full rounded-full bg-purple-500" style={{ width: progress ? (progress.alphabet?.learned / progress.alphabet?.total) * 100 : 0 }} />
          </View>
        </View>



        {/* Category Grid */}
        <Text className="text-xl font-bold text-gray-800 mb-4">Learn Signs</Text>
        <View className="flex-row flex-wrap justify-between">
          {CATEGORIES.map((category) => {
            const categoryProgress = progress && progress[category.id];
            return (
              <TouchableOpacity
                key={category.id}
                className="w-[48%] mb-4 p-4 rounded-xl items-center"
                style={{ backgroundColor: `${category.color}20` }}
                onPress={() =>
                  navigation.navigate('Category', { category: category.id })
                }
              >
                <View
                  className="p-3 rounded-full mb-2"
                  style={{ backgroundColor: category.color }}
                >
                  {
                    category.id == "alphabet" ? <MaterialCommunityIcons name="alphabetical" size={24} color="white" /> : <Ionicons name={category.icon} size={24} color="white" />
                  }

                </View>
                <Text className="font-bold text-gray-800">{category.name}</Text>
                {categoryProgress && (
                  <Text className="text-xs text-gray-500 mt-1">
                    {categoryProgress.learned}/{categoryProgress.total}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quiz Display */}
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


      </ScrollView>

    </SafeWrapper>
  );
};

export default HomeScreen;