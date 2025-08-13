import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { SignType } from '@/types/sign';
import { useSign } from '@/hooks/useSign';

type SignDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignDetail'>;

const SignCard: React.FC<{ sign: SignType; categoryColor: string }> = ({
  sign,
  categoryColor
}) => {
  const navigation = useNavigation<SignDetailNavigationProp>();
  const { markAsLearned } = useSign();

  const handlePress = () => {
    markAsLearned(sign.id, sign.category);

    navigation.navigate('SignDetail', { signId: sign.id });

  };

  const firstMedia = sign.media?.[0];

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      delay={100}
      className={`w-[48%] mb-4 rounded-xl overflow-hidden ${categoryColor}`}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className="p-4"
      >
        {/* Media Container */}
        <View className="bg-white/20 rounded-lg p-3 items-center justify-center mb-3 h-32">
          {firstMedia?.type === 'image' ? (
            <Image
              source={firstMedia.uri}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="items-center justify-center w-full h-full">
              <Ionicons
                name="play-circle"
                size={48}
                color="rgba(255,255,255,0.8)"
              />
              <Text className="text-white mt-2 text-xs">Video</Text>
            </View>
          )}
        </View>

        {/* Sign Info */}
        <View className="items-center">
          <Text className="text-white text-lg font-bold text-center">
            {sign.name}
          </Text>
          <Text className="text-white/80 text-sm text-center mt-1">
            {sign.category === 'alphabet' ? 'Letter' : 'Sign'}
          </Text>
        </View>

        {/* Learned Indicator */}
        {sign.learned && (
          <View className="absolute top-2 right-2 bg-white/20 p-1 rounded-full">
            <Entypo name="check" size={16} color="yellow" />
          </View>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default SignCard;