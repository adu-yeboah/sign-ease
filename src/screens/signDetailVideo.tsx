import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import * as Animatable from 'react-native-animatable';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as Speech from 'expo-speech';
import SafeWrapper from '@/components/ui/SafeWrapper';
import AnimatedButton from '@/components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/utils';
import { simpleData } from '@/data/simple';

const { width: screenWidth } = Dimensions.get('window');
type SignDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignDetail'>;

const SignDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<SignDetailNavigationProp>();
  const { signId } = route.params;

  const sign = simpleData.find((s: any) => s.id === signId);

  const getCategoryColor = () => {
    if (!sign) return 'bg-accent-500';
    switch (sign.category) {
      case 'alphabet': return 'bg-accent-500';
      case 'simple': return 'bg-primary-500';
      case 'advanced': return 'bg-secondary-500';
      default: return 'bg-accent-500';
    }
  };

  const speakDescription = useCallback(() => {
    if (sign?.description) {
      Speech.stop(); 
      Speech.speak(sign.description, { rate: 1.0, pitch: 1.0 });
    }
  }, [sign]);

  const renderCarouselItem = ({ item }: { item: any }) => {
    const player = useVideoPlayer(item, (playerInstance) => {
      playerInstance.loop = true;
    });

    return (
      <View className="flex-1 items-center justify-center">
        <VideoView
          player={player}
          style={{ width: '100%', height: "100%", borderRadius: 12 }}
          allowsFullscreen
          contentFit={"cover"}
        //   nativeControls={false}
          allowsPictureInPicture
        />
      </View>
    );
  };

  if (!sign) {
    return (
      <SafeWrapper>
        <View className="flex-1 items-center justify-center">
          <Text className="text-accent-700 font-display text-lg">Sign not found</Text>
        </View>
      </SafeWrapper>
    );
  }

  return (
    <SafeWrapper>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-accent-700 font-display">
          Sign Details
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View
          animation="fadeIn"
          duration={800}
          className={`rounded-2xl ${getCategoryColor()} p-6 mb-6`}
        >
          <View className="items-center">
            <Text className="text-3xl font-bold text-white font-display text-center mb-1">
              {sign.name}
            </Text>
            <Text className="text-white/80 font-medium text-center mb-6">
              {sign.category.charAt(0).toUpperCase() + sign.category.slice(1)} Sign
            </Text>

            <View className="bg-white/20 rounded-xl mb-4 w-full h-72">
              {sign.images && sign.images.length > 0 ? (
                <Carousel
                  loop
                  width={screenWidth - 80}
                  height={256}
                  data={sign.images}
                  renderItem={renderCarouselItem}
                  autoPlay={false}
                  scrollAnimationDuration={500}
                />
              ) : null}
            </View>
          </View>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={200}
          className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-accent-700 font-display">
              About This Sign
            </Text>
            <TouchableOpacity onPress={speakDescription}>
              <Ionicons name="volume-high" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          <Text className="text-text text-base leading-6">
            {sign.description}
          </Text>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={400}
          className="px-4"
        >
          {/* <AnimatedButton
            title="Next Sign"
            onPress={() => navigation.navigate('SignDetail', { signId: sign.id })}
            className="w-full bg-warning-500"
            animation="pulse"
            iterationCount="infinite"
            icon="help-circle-outline"
          /> */}
        </Animatable.View>
      </ScrollView>
    </SafeWrapper>
  );
};

export default SignDetailScreen;
