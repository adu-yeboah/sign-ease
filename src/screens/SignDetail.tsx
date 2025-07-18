import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRoute, useNavigation } from '@react-navigation/native';
import signsData from "../data/sign.json";
import AnimatedButton from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Sign } from '../types/utils';
import SafeWrapper from '../components/ui/SafeWrapper';

const SignDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { signId } = route.params;

  const sign = signsData.find((s: any) => s.id === signId);

  const getCategoryColor = () => {
    if (!sign) return 'bg-accent-500';
    switch (sign.category) {
      case 'alphabet': return 'bg-accent-500';
      case 'simple': return 'bg-primary-500';
      case 'advanced': return 'bg-secondary-500';
      default: return 'bg-accent-500';
    }
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
        <View className="w-6" /> {/* Spacer for alignment */}
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

            <View className="bg-white/20 rounded-xl p-4 mb-4">
              {sign.gifUrl ? (
                <Image
                  source={{ uri: sign.gifUrl }}
                  className="w-64 h-64"
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={{ uri: sign.imageUrl }}
                  className="w-64 h-64"
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={200}
          className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
        >
          <Text className="text-lg font-bold text-accent-700 font-display mb-3">
            About This Sign
          </Text>
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
          <AnimatedButton
            title="Take Quiz on This Sign"
            onPress={() => { }}
            className="w-full bg-warning-500"
            animation="pulse"
            iterationCount="infinite"
            icon="help-circle-outline"
          />
        </Animatable.View>

        {sign.relatedSigns && sign.relatedSigns.length > 0 && (
          <Animatable.View
            animation="fadeInUp"
            duration={800}
            delay={600}
            className="mt-8"
          >
            <Text className="text-lg font-bold text-accent-700 font-display mb-3">
              Related Signs
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
              {sign.relatedSigns.map(relatedSign => (
                <TouchableOpacity key={relatedSign.id} className="mr-3">
                  <View className="bg-accent-100 rounded-lg p-3 items-center w-24">
                    <Image source={{ uri: relatedSign.imageUrl }} className="w-12 h-12 mb-1" />
                    <Text className="text-accent-700 text-xs text-center">{relatedSign.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animatable.View>
        )}
      </ScrollView>
    </SafeWrapper>
  );
};

export default SignDetailScreen;