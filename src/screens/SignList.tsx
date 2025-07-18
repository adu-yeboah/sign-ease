import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SignCard from '../components/SignCard';
import signsData from "../data/sign.json";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/utils';
import SafeWrapper from '../components/ui/SafeWrapper';

type SignListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignList'>;

const SignListScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<SignListNavigationProp>();
  const { category } = route.params;

  const filteredSigns = signsData.filter((sign: any) => sign.category === category);

  const getCategoryColor = () => {
    switch (category) {
      case 'alphabet': return 'bg-accent-500';
      case 'simple': return 'bg-primary-500';
      case 'advanced': return 'bg-secondary-500';
      default: return 'bg-accent-500';
    }
  };

  return (
    <SafeWrapper>
      <LinearGradient
        colors={['#F9FAFB', '#EDE9FE']}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 bg pt-4 pb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#8B5CF6" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-accent-700 font-display">
            {category.charAt(0).toUpperCase() + category.slice(1)} Signs
          </Text>
          <View className="w-6" />
        </View>

        <FlatList
          data={filteredSigns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SignCard sign={item} categoryColor={getCategoryColor()} />}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeWrapper>
  );
};

export default SignListScreen;