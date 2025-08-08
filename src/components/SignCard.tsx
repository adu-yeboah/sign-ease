import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/utils';
import { Entypo } from '@expo/vector-icons';
import { SignType } from '@/types/sign';
import { useSign } from '@/hooks/useSign';

type SignDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignDetail'>;

const SignCard: React.FC<{ sign: SignType; categoryColor: string }> = ({ sign, categoryColor }) => {
  const navigation = useNavigation<SignDetailNavigationProp>();
  const { markAsLearned } = useSign()

  const handlePress = () => {
    navigation.navigate('SignDetail', { signId: sign.id })
    markAsLearned(sign.id)
  }

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={1000}
      className={`w-[48%] mb-5 rounded-xl overflow-hidden ${categoryColor}`}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View className="p-4">
          <View className="bg-white/20 rounded-lg p-3 items-center mb-3">
            {/* <Image
                source={require(sign.images[0])}
                className="w-20 h-20"
                resizeMode="contain"
              /> */}

            {sign.category == 'alphabet' && (
              <Text className="text-white text-2xl py-4 font-bold font-display text-center">
                {sign.name}
              </Text>
            )
            }

          </View>

          <View className="items-center">

            {sign.category !== 'alphabet' && (
              <Text className="text-white text-lg font-bold font-display text-center">
                {sign.name}
              </Text>
            )
            }

            <Text className="text-white/80 text-sm text-center mt-1">
              {sign.category === 'alphabet' ? 'Letter' : 'Sign'}
            </Text>

            {sign.learned && (
              <View className="mt-2 bg-white/30 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-bold flex-row gap-2">
                  <Entypo name="star" size={24} color="black" />
                  Learned
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default SignCard;