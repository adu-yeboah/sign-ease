import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useDailyChallenge } from '@/hooks/useDailyChallenge';
import { Ionicons } from '@expo/vector-icons';
import SafeWrapper from '@/components/ui/SafeWrapper';
import * as Animatable from 'react-native-animatable';
import ProgressCard from '@/components/ProgressCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import Loading from '@/components/ui/Loading';

type DailyChallengeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DailyChallenge'>;

const DailyChallengeScreen = () => {
  const navigation = useNavigation<DailyChallengeNavigationProp>();
  const { challengeSigns, isLoading, progress, completeSign } = useDailyChallenge();

  if (isLoading) {
    return (
     <Loading />
    );
  }

  return (
    <SafeWrapper>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Daily Challenge</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Progress Overview */}
        <Animatable.View 
          animation="fadeIn"
          className="bg-white rounded-xl p-6 mb-6 shadow-sm"
        >
          <Text className="text-lg font-bold text-gray-800 mb-2">
            Today's Progress
          </Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-600">
              {Math.round(progress * 3)} of 3 signs completed
            </Text>
          </View>
          <View className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <View 
              className="h-full rounded-full bg-purple-500" 
              style={{ width: `${progress * 100}%` }}
            />
          </View>
          {progress >= 1 && (
            <Animatable.View 
              animation="bounceIn"
              className="mt-4 bg-green-100 p-3 rounded-lg flex-row items-center"
            >
              <Ionicons name="trophy" size={24} color="#10B981" />
              <Text className="ml-2 text-green-800 font-medium">
                Challenge completed! Come back tomorrow for more!
              </Text>
            </Animatable.View>
          )}
        </Animatable.View>

        {/* Challenge Signs */}
        <Text className="text-lg font-bold text-gray-800 mb-4">
          Today's Signs to Learn
        </Text>
        
        {challengeSigns.map((sign, index) => (
          <Animatable.View
            key={sign.id}
            animation="fadeInUp"
            duration={600}
            delay={index * 100}
            className="mb-4"
          >
            <ProgressCard 
              sign={sign} 
              onPress={() => navigation.navigate('SignDetail', { signId: sign.id })}
              showAction={!sign.learned}
              actionIcon="checkmark-circle"
              onActionPress={() => completeSign(sign.id)}
            />
          </Animatable.View>
        ))}

       
      </ScrollView>
    </SafeWrapper>
  );
};

export default DailyChallengeScreen;